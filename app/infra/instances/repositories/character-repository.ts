import { api } from "~/infra/instances/api-star-wars";
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
  async getPlanetName(url: string) {
    if (planetCache.has(url)) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return { data: planetCache.get(url)!, error: null };
    }

    try {
      const response = await api.get(url);
      const name = response.data.name;
      planetCache.set(url, name);
      return { data: name, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }

  async getCharacters(page: number, search: string) {
    try {
      const response = await api.get(
        `/people/?search=${encodeURIComponent(search)}&page=${page}`
      );

      const characters = response.data.results;

      const charactersWithPlanets = await Promise.all(
        characters.map(async (char: Character) => {
          const planetRes = await limit(() =>
            this.getPlanetName(char.homeworld)
          );
          return {
            ...char,
            planetName: planetRes.data ?? "Desconhecido",
          };
        })
      );

      return {
        data: {
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
          results: charactersWithPlanets,
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

  async getCharacterById(id: string) {
    try {
      const response = await api.get(`/people/${id}`);
      const character = response.data;

      const homeworldResponse = await api.get(character.homeworld);
      const planetName = homeworldResponse.data.name;

      const filmsResponses = await Promise.all(
        character.films.map((filmUrl: string) => api.get(filmUrl))
      );
      const filmTitles = filmsResponses.map((filmRes) => filmRes.data.title);

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
