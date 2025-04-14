import type React from "react";
import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Await, useLoaderData, useSearchParams } from "@remix-run/react";
import { Suspense, useState } from "react";
import ErrorPage from "~/components/global/error-page";
import Layout from "~/components/layout/layout";
import LoadingData from "~/components/layout/loading-data";
import Title from "~/components/layout/title";
import { generatePageTile } from "~/utils/metadata";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import ListPlanets from "~/components/planets/list-planets";
import { PlanetRepository } from "~/infra/instances/repositories/planet-repository";

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
  const { planetsPromise, page } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  function updateSearchParams(newValue: string) {
    const newParams = new URLSearchParams(searchParams);
    if (newValue.trim()) {
      newParams.set("search", newValue.trim());
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      updateSearchParams(value);
    }
  }

  function handleSearch() {
    updateSearchParams(value);
  }

  function handleClear() {
    setValue("");
    updateSearchParams("");
  }

  return (
    <Layout>
      <Title>Planetas</Title>

      <div className="flex flex-col space-y-10 items-center">
        <div className="flex flex-col space-y-2 items-center mt-5 lg:mt-0">
          <Input
            placeholder="Pesquise por nome"
            className="w-72"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyDown={handleKeyDown}
          />
          <div className="flex space-x-1">
            <Button
              variant="outline"
              onClick={handleSearch}
              className="border border-solid border-cyan-600"
            >
              Pesquisar
            </Button>
            <Button variant="outline" onClick={handleClear}>
              Limpar
            </Button>
          </div>
        </div>

        <Suspense fallback={<LoadingData />}>
          <Await resolve={planetsPromise} errorElement={<ErrorPage />}>
            {(planets) => {
              if (planets.error !== null) return <ErrorPage />;
              return (
                <ListPlanets
                  results={planets?.data?.results}
                  count={planets?.data?.count || 61}
                  page={page}
                />
              );
            }}
          </Await>
        </Suspense>
      </div>
    </Layout>
  );
}
