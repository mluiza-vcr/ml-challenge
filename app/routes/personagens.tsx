import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
import ListCharacters from "~/components/characters/list-characters";
import ErrorPage from "~/components/global/error-page";
import GlobalLoading from "~/components/layout/global-loading";
import Layout from "~/components/layout/layout";
import Title from "~/components/layout/title";
import { CharacterRepository } from "~/infra/instances/repositories/character-repository";
import { generatePageTile } from "~/utils/metadata";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const pageParam = url.searchParams.get("page");

  const page = Number.parseInt(pageParam || "1");

  const repository = new CharacterRepository();

  const charactersPromise = repository.getCharacters(page);

  return defer({ charactersPromise, page });
}

export const meta: MetaFunction = () => {
  return [{ title: generatePageTile("Personagens") }];
};

export default function Characters() {
  const { charactersPromise, page } = useLoaderData<typeof loader>();

  return (
    <>
      <Layout>
        <Title>Personagens</Title>
        <Suspense fallback={<p>Carregando personagens...</p>}>
          <Await
            resolve={charactersPromise}
            errorElement={
              <p>Falha ao carregar personagens. Tente novamente mais tarde.</p>
            }
          >
            {(characters) => {
              if (characters.error !== null) return <ErrorPage />;
              if (characters)
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
      </Layout>
    </>
  );
}
