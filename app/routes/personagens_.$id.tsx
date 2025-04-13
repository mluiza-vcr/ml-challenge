import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import VisualizeCharacter from "~/components/characters/visualize-character";
import ErrorPage from "~/components/global/error-page";
import Layout from "~/components/layout/layout";
import LoadingData from "~/components/layout/loaging-data";
import Title from "~/components/layout/title";
import { CharacterRepository } from "~/infra/instances/repositories/character-repository";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;

  if (!id) {
    throw new Response("Character ID is required", { status: 400 });
  }

  const repository = new CharacterRepository();

  const characterPromise = repository.getCharacterById(id);

  return defer({ characterPromise });
}

export default function CharacterDetails() {
  const { characterPromise } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <Title>Detalhe do personagem</Title>
      <Suspense fallback={<LoadingData />}>
        <Await resolve={characterPromise} errorElement={<ErrorPage />}>
          {(character) => {
            if (character.error !== null) return <ErrorPage />;
            if (character)
              return (
                <VisualizeCharacter
                  character={character?.data?.character}
                  filmTitles={character?.data?.filmTitles}
                  planetName={character?.data?.planetName}
                />
              );
          }}
        </Await>
      </Suspense>
    </Layout>
  );
}
