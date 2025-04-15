import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useEffect, useMemo, useState } from "react";
import ErrorPage from "~/components/global/error-page";
import Layout from "~/components/layout/layout";
import LoadingData from "~/components/layout/loading-data";
import Title from "~/components/layout/title";
import { generatePageTile } from "~/utils/metadata";
import { Input } from "~/components/ui/input";
import ListPlanets from "~/components/planets/list-planets";
import {
  type Planet,
  PlanetRepository,
} from "~/infra/repositories/planet-repository";
import { getClimateLabel } from "~/utils/getLabels";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") || "1");
  const search = url.searchParams.get("search") || "";

  const repository = new PlanetRepository();
  const planetsPromise = repository.getPlanets(page, search);

  return defer({ planetsPromise, page });
}

export const meta: MetaFunction = () => {
  return [{ title: generatePageTile("Planetas") }];
};

export default function Characters() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAllPlanets = async () => {
      const repository = new PlanetRepository();
      const { data, error } = await repository.getAllPlanets();

      if (data) {
        setPlanets(data);
      } else {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchAllPlanets();
  }, []);

  function filterPlanets(planets: Planet[], search: string) {
    const lower = search.toLowerCase();

    return planets.filter((planet) => {
      const nameMatch = planet.name.toLowerCase().includes(lower);
      const rawClimate = planet.climate.toLowerCase();
      const translatedClimate = getClimateLabel(rawClimate).toLowerCase();
      const diameter = planet.diameter.toLowerCase();

      return (
        nameMatch ||
        rawClimate.includes(lower) ||
        translatedClimate.includes(lower) ||
        diameter.includes(lower)
      );
    });
  }

  function paginate<T>(array: T[], page: number, perPage: number) {
    const start = (page - 1) * perPage;
    return array.slice(start, start + perPage);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const filtered = useMemo(
    () => filterPlanets(planets, searchTerm),
    [planets, searchTerm]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const paginated = useMemo(
    () => paginate(filtered, page, itemsPerPage),
    [filtered, page]
  );

  return (
    <Layout>
      <Title>Planetas</Title>
      {isLoading ? (
        <LoadingData />
      ) : error ? (
        <ErrorPage />
      ) : (
        <div className="flex flex-col space-y-10 items-center">
          <div className="mt-5 lg:mt-0">
            <Input
              placeholder="Buscar por nome, clima ou diâmetro"
              className="w-72"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">
              Nenhum personagem encontrado.
            </p>
          ) : (
            <ListPlanets
              results={paginated}
              count={filtered.length}
              page={page}
              onPageChange={setPage}
            />
          )}
        </div>
      )}
    </Layout>
  );
}
