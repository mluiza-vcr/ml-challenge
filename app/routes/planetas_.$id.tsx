import type { LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import ErrorPage from "~/components/global/error-page";
import Layout from "~/components/layout/layout";
import LoadingData from "~/components/layout/loading-data";
import Title from "~/components/layout/title";
import VisualizePlanet from "~/components/planets/visualize-planet";
import {
  PlanetRepository,
  SwapiResponse,
} from "~/infra/instances/repositories/planet-repository";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;

  if (!id) {
    throw new Response("Planet ID is required", { status: 400 });
  }

  const repository = new PlanetRepository();

  const characterPromise = repository.getPlanetById(id);

  return defer({ characterPromise });
}

export default function PlanetsDetails() {
  const { characterPromise } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <Title>Detalhes do planeta</Title>
      <Suspense fallback={<LoadingData />}>
        <Await resolve={characterPromise} errorElement={<ErrorPage />}>
          {(planet) => {
            if (planet.error !== null || planet.data === null)
              return <ErrorPage />;
            if (planet) return <VisualizePlanet planet={planet?.data} />;
          }}
        </Await>
      </Suspense>
    </Layout>
  );
}
