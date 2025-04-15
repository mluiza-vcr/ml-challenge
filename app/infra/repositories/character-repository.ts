import { api } from "~/infra/api-star-wars";
import pLimit from "p-limit";

export interface Character {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
  planetName: string;
  url: string;
}

export interface CharacterDetail {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  planetName: string;
  filmTitles: string[];
  homeworld: string;
}

const planetCache = new Map<string, string>();
const limit = pLimit(3); // 3 requisições de planeta ao mesmo tempo

export class CharacterRepository {
  async retry<T>(fn: () => Promise<T>, retries = 3, delay = 500): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      if (retries <= 0) throw err;
      console.warn(`Retrying... attempts left: ${retries}`);
      await new Promise((res) => setTimeout(res, delay));
      return this.retry(fn, retries - 1, delay * 2); // Exponential backoff
    }
  }

  async getPlanetName(url: string) {
    if (planetCache.has(url)) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return { data: planetCache.get(url)!, error: null };
    }

    try {
      const response = await this.retry(() => api.get(url), 3, 500);
      const name = response.data.name;
      planetCache.set(url, name);
      return { data: name, error: null };
    } catch (err) {
      console.error(`Failed to fetch planet at ${url}:`, err);
      return { data: null, error: err };
    }
  }

  async getAllCharacters() {
    try {
      let allCharacters: Character[] = [];
      let nextUrl: string | null = "/people";

      while (nextUrl) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const response: any = await api.get(nextUrl);
        allCharacters = [...allCharacters, ...response.data.results];
        nextUrl =
          response.data.next?.replace("https://swapi.py4e.com/api", "") ?? null;
      }

      const charactersWithPlanets = await Promise.all(
        allCharacters.map(async (char: Character) => {
          const planetRes = await limit(() =>
            this.getPlanetName(char.homeworld)
          );
          return {
            ...char,
            planetName: planetRes.data ?? "Desconhecido",
          };
        })
      );

      console.log(charactersWithPlanets);

      return {
        data: charactersWithPlanets,
        error: null,
      };
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (err: any) {
      console.log("err", err);
      return {
        data: null,
        error: err,
      };
    }
  }

  async getCharacterById(id: string) {
    try {
      const response = await api.get(`/people/${id}`);
      const character = response.data;

      const homeworldResponse = await api.get(character.homeworld);
      const planetName = homeworldResponse.data.name;

      const filmsResponses = await Promise.all(
        character.films.map((filmUrl: string) => api.get(filmUrl))
      );
      const filmTitles = filmsResponses.map(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (filmRes: { data: { title: any } }) => filmRes.data.title
      );

      return {
        data: {
          character,
          planetName,
          filmTitles,
        },
        error: null,
      };
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (err: any) {
      console.log("err", err);
      return {
        data: null,
        error: err,
      };
    }
  }
}
