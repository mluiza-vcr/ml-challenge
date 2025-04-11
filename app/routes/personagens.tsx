import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
import ListCharacters from "~/components/characters/list-characters";
import ErrorPage from "~/components/global/error-page";
import Layout from "~/components/layout/layout";
import LoadingData from "~/components/layout/loaging-data";
import Title from "~/components/layout/title";
import { CharacterRepository } from "~/infra/instances/repositories/character-repository";
import { generatePageTile } from "~/utils/metadata";
import { TextGenerateEffect } from "~/components/ui/text-generate-effect";

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
        <Suspense fallback={<LoadingData />}>
          <Await resolve={charactersPromise} errorElement={<ErrorPage />}>
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
