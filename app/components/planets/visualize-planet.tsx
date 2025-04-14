import { useNavigate, useParams } from "@remix-run/react";
import { PlanetDetailsCard } from "./planet-details-card";
import type { PlanetDetail } from "~/infra/repositories/planet-repository";
import { Button } from "../ui/button";

export default function VisualizePlanet({ planet }: { planet: PlanetDetail }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentId = Number(id);

  const handlePrevious = () => {
    if (currentId > 1) {
      navigate(`/planetas/${currentId - 1}`);
    }
  };

  const handleNext = () => {
    navigate(`/planetas/${currentId + 1}`);
  };

  return (
    <div>
      <PlanetDetailsCard
        name={planet.name}
        diameter={planet.diameter}
        population={planet.population}
        url={planet.url}
        climate={planet.climate}
        rotation_period={planet.rotation_period}
        orbital_period={planet.orbital_period}
        terrain={planet.terrain}
        residentsInfo={planet.residentsInfo}
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
          disabled={currentId === 61}
          variant="outline"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
