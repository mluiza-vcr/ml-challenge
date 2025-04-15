import type { CharacterDetail } from "~/infra/repositories/character-repository";
import { CharacterDetailsCard } from "./character-details-card";
import { useNavigate, useParams } from "@remix-run/react";
import { Button } from "../ui/button";

export default function VisualizeCharacter({
  character,
}: {
  character: CharacterDetail;
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentId = Number(id);

  const handlePrevious = () => {
    if (currentId > 1) {
      navigate(`/personagens/${currentId - 1}`);
    }
  };

  const handleNext = () => {
    navigate(`/personagens/${currentId + 1}`);
  };

  return (
    <div>
      <CharacterDetailsCard
        name={character.name}
        mass={character.mass}
        gender={character.gender}
        planetName={character.planetName}
        filmTitles={character.filmTitles}
        hair_color={character.hair_color}
        skin_color={character.skin_color}
        height={character.height}
        eye_color={character.eye_color}
        birth_year={character.birth_year}
        homeworld={character.homeworld}
      />
      <div className="flex justify-center mt-6 gap-2">
        <Button
          onClick={handlePrevious}
          disabled={currentId <= 1}
          variant="outline"
        >
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentId === 87}
          variant="outline"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
