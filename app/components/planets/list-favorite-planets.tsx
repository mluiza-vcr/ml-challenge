import { PlanetCard } from "./planet-card";
import type { Planet } from "~/infra/repositories/planet-repository";

export default function ListFavoritePlanets({
  results,
}: {
  results: Planet[] | undefined;
}) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-5 lg:flex-wrap lg:justify-evenly mt-5">
      {results
        ?.slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((planet) => {
          return <PlanetCard key={planet.name} planet={planet} />;
        })}
    </div>
  );
}
