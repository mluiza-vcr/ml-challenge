import type { CharacterDetail } from "~/infra/instances/repositories/character-repository";
import { CharacterDetailsCard } from "./character-details-card";

export default function VisualizeCharacter({
  character,
  filmTitles,
  planetName,
}: {
  character: CharacterDetail;
  filmTitles: string[] | undefined;
  planetName: string;
}) {
  console.log("character", character);
  return (
    <div>
      <CharacterDetailsCard
        name={character.name}
        mass={character.mass}
        gender={character.gender}
        planetName={planetName}
        filmTitles={filmTitles}
        hair_color={character.hair_color}
        skin_color={character.skin_color}
        height={character.height}
        eye_color={character.eye_color}
        birth_year={character.birth_year}
      />
    </div>
  );
}
