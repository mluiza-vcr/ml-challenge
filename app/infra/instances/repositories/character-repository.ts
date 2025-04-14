import { api } from "~/infra/instances/api-star-wars";
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

type SwapiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};

const limit = pLimit(3); // 3 requisições de planeta ao mesmo tempo

export class CharacterRepository {
  private baseUrl = "https://swapi.py4e.com/api/people/";

  private async getPlanetName(url: string): Promise<string> {
    try {
      const res: Response = await fetch(url);
      const data: { name: string } = await res.json();
      return data.name; // Retorna apenas o nome do planeta
    } catch (err) {
      console.error("Erro ao buscar o planeta", err);
      return "Desconhecido"; // Caso haja erro, retornamos "Desconhecido"
    }
  }

  async getCharacters(page: number, search: string) {
    try {
      const response = await api.get(
        `/people/?search=${encodeURIComponent(search)}&page=${page}`
      );

      const characters = response.data.results;

      // Mapeamento para adicionar o nome do planeta aos personagens
      const charactersWithPlanets = await Promise.all(
        characters.map(async (char: Character) => {
          const planetName = await limit(() =>
            this.getPlanetName(char.homeworld)
          );

          // Não precisamos acessar planetRes.data, pois agora é apenas uma string
          return {
            ...char,
            planetName: planetName ?? "Desconhecido", // Retorna o nome do planeta ou "Desconhecido"
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

  async getAllCharacters(): Promise<{ count: number; results: Character[] }> {
    let allCharacters: Character[] = [];
    let nextUrl: string | null = this.baseUrl;

    while (nextUrl) {
      const res: Response = await fetch(nextUrl);
      const data: SwapiResponse = await res.json();

      // Mapeia cada personagem e busca o nome do planeta
      const charactersWithPlanets = await Promise.all(
        data.results.map(async (character) => {
          const planetName = await this.getPlanetName(character.homeworld);
          return { ...character, planetName }; // Adiciona o nome do planeta ao personagem
        })
      );

      allCharacters = [...allCharacters, ...charactersWithPlanets];
      nextUrl = data.next;
    }

    return {
      count: allCharacters.length,
      results: allCharacters,
    };
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
