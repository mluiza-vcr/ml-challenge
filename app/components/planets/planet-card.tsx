"use client";
import type React from "react";
import { getClimateLabel } from "~/utils/getLabels";
import { BackgroundGradient } from "../ui/background-gradient";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import type { Planet } from "~/infra/repositories/planet-repository";
import { formatDiameter } from "~/utils/getLabels";

export function PlanetCard({ planet }: { planet: Planet }) {
  function extractIdFromUrl(url: string): string | null {
    const match = url.match(/\/planets\/(\d+)\//);
    return match ? match[1] : null;
  }

  const id = extractIdFromUrl(planet.url);
  const [isFavorite, setIsFavorite] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!id) return;

    const stored = localStorage.getItem("favoritePlanets");
    const favorites: Planet[] = stored ? JSON.parse(stored) : [];

    const alreadyFavorited = favorites.some((fav) => {
      const favId = extractIdFromUrl(fav.url);
      return favId === id;
    });

    setIsFavorite(alreadyFavorited);
  }, [id]);

  function toggleFavorite(e: React.MouseEvent) {
    e.preventDefault(); // Impede navegação ao clicar na estrela
    if (!id) return;

    const stored = localStorage.getItem("favoritePlanets");
    const favorites: Planet[] = stored ? JSON.parse(stored) : [];

    const isAlreadyFavorited = favorites.some((fav) => {
      const favId = extractIdFromUrl(fav.url);
      return favId === id;
    });

    let updatedFavorites: Planet[];

    if (isAlreadyFavorited) {
      updatedFavorites = favorites.filter((fav) => {
        const favId = extractIdFromUrl(fav.url);
        return favId !== id;
      });
    } else {
      updatedFavorites = [...favorites, planet];
    }

    localStorage.setItem("favoritePlanets", JSON.stringify(updatedFavorites));
    setIsFavorite(!isAlreadyFavorited);
  }

  return (
    <div className="w-full min-w-80 lg:w-1/6 cursor-pointer relative">
      <Link to={`/planetas/${id}`}>
        <BackgroundGradient className="rounded-[22px] p-4 bg-white dark:bg-zinc-900 lg:h-56 text-center">
          <div
            onClick={toggleFavorite}
            className="absolute top-4 right-4 text-purple-600 hover:scale-110 transition-transform"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleFavorite(e as unknown as React.MouseEvent);
              }
            }}
            aria-pressed={isFavorite}
          >
            <Star
              fill={isFavorite ? "rgb(147 51 234)" : "none"}
              stroke="currentColor"
              className="w-6 h-6"
            />
          </div>
          <p className="sm:text-xl font-bold lg:text-2xl text-black lg:mt-4 lg:mb-2 dark:text-neutral-200">
            {planet.name === "unknown" ? "Desconhecido" : planet.name}
          </p>
          <p className="lg:mt-5 lg:mb-2 sm:text-lg text-black p-2 dark:text-neutral-200">
            {formatDiameter(planet.diameter)}
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Clima {getClimateLabel(planet.climate)}
          </p>
        </BackgroundGradient>
      </Link>
    </div>
  );
}
