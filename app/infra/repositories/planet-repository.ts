import { api } from "~/infra/api-star-wars";

export interface Planet {
  id?: string;
  name: string;
  diameter: string;
  climate: string;
  url: string;
}

export interface PlanetDetail {
  name: string;
  diameter: string;
  population: string;
  url: string;
  climate: string;
  rotation_period: string;
  orbital_period: string;
  terrain: string;
  residentsInfo: {
    name: string;
    url: string;
  }[];
}

export type SwapiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

export class PlanetRepository {
  async getPlanets(
    page: number,
    search: string
  ): Promise<{
    data: SwapiResponse | null;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    error: any;
  }> {
    try {
      const response = await api.get(
        `/planets/?search=${encodeURIComponent(search)}&page=${page}`
      );

      const planets: Planet[] = response.data.results.map((planet: Planet) => ({
        name: planet.name,
        diameter: planet.diameter,
        climate: planet.climate,
        url: planet.url,
        id: this.extractIdFromUrl(planet.url),
      }));

      const swapiResponse: SwapiResponse = {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        results: planets,
      };

      return {
        data: swapiResponse,
        error: null,
      };
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (err: any) {
      console.error("Erro ao buscar planetas:", err);
      return { data: null, error: err };
    }
  }

  async getAllPlanets(): Promise<{
    data: Planet[] | null;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    error: any;
  }> {
    const allPlanets: Planet[] = [];
    let nextUrl: string | null = "https://swapi.py4e.com/api/planets/";

    try {
      while (nextUrl) {
        const res = await fetch(nextUrl);
        const data: SwapiResponse = await res.json();

        const planets: Planet[] = data.results.map((planet: Planet) => ({
          name: planet.name,
          diameter: planet.diameter,
          climate: planet.climate,
          url: planet.url,
          id: this.extractIdFromUrl(planet.url),
        }));

        allPlanets.push(...planets);
        nextUrl = data.next;
      }

      return {
        data: allPlanets,
        error: null,
      };
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (err: any) {
      console.error("Erro ao buscar todos os planetas:", err);
      return { data: null, error: err };
    }
  }

  async getPlanetById(id: string): Promise<{
    data: PlanetDetail | null;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    error: any;
  }> {
    try {
      const response = await api.get(`/planets/${id}`);
      const planet = response.data;

      const residentsInfo = await this.getResidentsInfo(planet.residents);

      const planetDetail: PlanetDetail = {
        name: planet.name,
        diameter: planet.diameter,
        population: planet.population,
        url: planet.url,
        climate: planet.climate,
        rotation_period: planet.rotation_period,
        orbital_period: planet.orbital_period,
        terrain: planet.terrain,
        residentsInfo: residentsInfo,
      };

      return { data: planetDetail, error: null };
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (err: any) {
      console.error("Erro ao buscar planeta por ID:", err);
      return { data: null, error: err };
    }
  }

  private async getResidentsInfo(
    urls: string[]
  ): Promise<{ name: string; url: string }[]> {
    try {
      const responses = await Promise.all(
        urls.map(async (url) => {
          const res = await api.get(url);
          return { name: res.data.name, url };
        })
      );
      return responses;
    } catch (err) {
      console.error("Erro ao buscar informações dos residentes:", err);
      return [];
    }
  }
  private extractIdFromUrl(url: string): string {
    const match = url.match(/\/planets\/(\d+)\//);
    return match ? match[1] : "";
  }
}
