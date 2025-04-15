import { api } from "~/infra/api-star-wars";
import pLimit from "p-limit";

export interface Character {
  id?: string;
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

type SwapiApiCharacterResponse = {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
  url: string;
};

type SwapiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwapiApiCharacterResponse[];
};

const limit = pLimit(3); // 3 requisições de planeta ao mesmo tempo

export class CharacterRepository {
  private baseUrl = "https://swapi.py4e.com/api/people/";

  private async getPlanetName(url: string): Promise<string> {
    try {
      const res: Response = await fetch(url);
      const data: { name: string } = await res.json();
      return data.name;
    } catch (err) {
      console.error("Erro ao buscar o planeta", err);
      return "Desconhecido";
    }
  }

  async getCharacters(page: number, search: string) {
    try {
      const response = await api.get(
        `/people/?search=${encodeURIComponent(search)}&page=${page}`
      );

      const characters = response.data.results as SwapiApiCharacterResponse[];

      const charactersWithPlanets: Character[] = await Promise.all(
        characters.map(async (char) => {
          const planetName = await limit(() =>
            this.getPlanetName(char.homeworld)
          );

          return {
            ...char,
            planetName,
            id: this.extractIdFromUrl(char.url),
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

  async getAllCharacters(): Promise<{
    data: Character[] | null;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    error: any;
  }> {
    const allCharacters: Character[] = [];
    let nextUrl: string | null = this.baseUrl;

    try {
      while (nextUrl) {
        const res: Response = await fetch(nextUrl);
        const data: SwapiResponse = await res.json();

        const charactersWithPlanets: Character[] = await Promise.all(
          data.results.map(async (character) => {
            const planetName = await this.getPlanetName(character.homeworld);
            return {
              ...character,
              planetName,
              id: this.extractIdFromUrl(character.url),
            };
          })
        );

        allCharacters.push(...charactersWithPlanets);
        nextUrl = data.next;
      }

      return {
        data: allCharacters,
        error: null,
      };
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (err: any) {
      console.error("Erro ao buscar todos os personagens:", err);
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

      const characterDetail: CharacterDetail = {
        name: character.name,
        height: character.height,
        mass: character.mass,
        hair_color: character.hair_color,
        skin_color: character.skin_color,
        eye_color: character.eye_color,
        birth_year: character.birth_year,
        gender: character.gender,
        planetName,
        filmTitles,
        homeworld: character.homeworld,
      };

      return {
        data: characterDetail,
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

  private extractIdFromUrl(url: string): string {
    const match = url.match(/\/people\/(\d+)\//);
    return match ? match[1] : "";
  }
}
