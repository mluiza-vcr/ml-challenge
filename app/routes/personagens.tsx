import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Await, useLoaderData, useSearchParams } from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
import ListCharacters from "~/components/characters/list-characters";
import ErrorPage from "~/components/global/error-page";
import Layout from "~/components/layout/layout";
import LoadingData from "~/components/layout/loaging-data";
import Title from "~/components/layout/title";
import { CharacterRepository } from "~/infra/instances/repositories/character-repository";
import { generatePageTile } from "~/utils/metadata";
import { TextGenerateEffect } from "~/components/ui/text-generate-effect";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Trash2Icon } from "lucide-react";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const pageParam = url.searchParams.get("page");

  const page = Number.parseInt(pageParam || "1");

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

  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const newParams = new URLSearchParams(searchParams);
      if (value) {
        newParams.set("search", value);
      } else {
        newParams.delete("search");
      }
      newParams.set("page", "1"); // reinicia a paginação
      setSearchParams(newParams);
    }
  }

  function handleSearch() {
    const newParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      newParams.set("search", value.trim());
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1"); // resetar paginação
    setSearchParams(newParams);
  }

  function handleClear() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    newParams.set("page", "1");
    setSearchParams(newParams);
    setValue("");
  }

  return (
    <>
      <Layout>
        <Title>Personagens</Title>
        <Suspense fallback={<LoadingData />}>
          <Await resolve={charactersPromise} errorElement={<ErrorPage />}>
            {(characters) => {
              if (characters.error !== null) return <ErrorPage />;
              if (characters)
                return (
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
                    <ListCharacters
                      results={characters?.data?.results}
                      count={characters?.data?.count}
                      page={page}
                    />
                  </div>
                );
            }}
          </Await>
        </Suspense>
      </Layout>
    </>
  );
}
