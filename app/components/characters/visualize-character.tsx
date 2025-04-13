import type { CharacterDetail } from "~/infra/instances/repositories/character-repository";
import { CharacterDetailsCard } from "./character-details-card";

export default function VisualizeCharacter({
  character,
}: {
  character: CharacterDetail;
}) {
  console.log("character", character);
  return (
    <div>
      <CharacterDetailsCard
        name={character.name}
        mass={character.mass}
        gender={character.gender}
      />
    </div>
  );
}
