import type React from "react";
import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Await, useLoaderData, useSearchParams } from "@remix-run/react";
import { Suspense, useState } from "react";
import ListCharacters from "~/components/characters/list-characters";
import ErrorPage from "~/components/global/error-page";
import Layout from "~/components/layout/layout";
import LoadingData from "~/components/layout/loading-data";
import Title from "~/components/layout/title";
import { CharacterRepository } from "~/infra/repositories/character-repository";
import { generatePageTile } from "~/utils/metadata";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") || "1");
  const search = url.searchParams.get("search") || "";

  const repository = new CharacterRepository();
  const charactersPromise = repository.getCharacters(page, search);

  return defer({ charactersPromise, page });
}

export const meta: MetaFunction = () => {
  return [{ title: generatePageTile("Personagens") }];
};

export default function Characters() {
  const { charactersPromise, page } = useLoaderData<typeof loader>();
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
      <Title>Personagens</Title>

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
          <Await resolve={charactersPromise} errorElement={<ErrorPage />}>
            {(characters) => {
              if (characters.error !== null) return <ErrorPage />;
              return (
                <ListCharacters
                  results={characters?.data?.results}
                  count={characters?.data?.count}
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
