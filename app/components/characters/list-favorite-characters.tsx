import type { Character } from "~/infra/repositories/character-repository";
import { CharacterCard } from "./character-card";

export default function ListFavoriteCharacters({
  results,
}: {
  results: Character[] | undefined;
}) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-5 lg:flex-wrap lg:justify-evenly mt-5">
      {results
        ?.slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((character) => {
          return <CharacterCard key={character.name} character={character} />;
        })}
    </div>
  );
}
