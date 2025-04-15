"use client";
import type React from "react";
import { getGenderLabel } from "~/utils/getLabels";
import { BackgroundGradient } from "../ui/background-gradient";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import type { Character } from "~/infra/repositories/character-repository";

export function CharacterCard({ character }: { character: Character }) {
  function extractIdFromUrl(url: string): string | null {
    const match = url.match(/\/people\/(\d+)\//);
    return match ? match[1] : null;
  }

  const id = extractIdFromUrl(character.url);
  const [isFavorite, setIsFavorite] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!id) return;

    const stored = localStorage.getItem("favoriteCharacters");
    const favorites: Character[] = stored ? JSON.parse(stored) : [];

    const alreadyFavorited = favorites.some((fav) => {
      const favId = extractIdFromUrl(fav.url);
      return favId === id;
    });

    setIsFavorite(alreadyFavorited);
  }, [id]);

  function toggleFavorite(e: React.MouseEvent) {
    e.preventDefault(); // Impede navegação ao clicar na estrela
    if (!id) return;

    const stored = localStorage.getItem("favoriteCharacters");
    const favorites: Character[] = stored ? JSON.parse(stored) : [];

    const isAlreadyFavorited = favorites.some((fav) => {
      const favId = extractIdFromUrl(fav.url);
      return favId === id;
    });

    let updatedFavorites: Character[];

    if (isAlreadyFavorited) {
      updatedFavorites = favorites.filter((fav) => {
        const favId = extractIdFromUrl(fav.url);
        return favId !== id;
      });
    } else {
      updatedFavorites = [...favorites, character];
    }

    localStorage.setItem(
      "favoriteCharacters",
      JSON.stringify(updatedFavorites)
    );
    setIsFavorite(!isAlreadyFavorited);
  }

  return (
    <div className="w-full lg:min-w-80 lg:w-1/6 cursor-pointer">
      <Link to={`/personagens/${extractIdFromUrl(character.url)}`}>
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-8 bg-white dark:bg-zinc-900 lg:h-56 text-center">
          <div
            onClick={toggleFavorite}
            className="absolute top-4 right-4 text-purple-600 hover:scale-110 transition-transform"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleFavorite(e as unknown as React.MouseEvent);
              }
            }}
          >
            <Star
              fill={isFavorite ? "rgb(147 51 234)" : "none"}
              stroke="currentColor"
              className="w-6 h-6"
            />
          </div>
          <p className="sm:text-xl font-bold lg:text-2xl text-black mt-4 mb-2 dark:text-neutral-200">
            {character.name}
          </p>
          <p className="lg:mt-5 sm:text-lg text-black mt-4 mb-2 dark:text-neutral-200">
            {getGenderLabel(character.gender)}
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Planeta{" "}
            {character.planetName === "unknown"
              ? "Desconhecido"
              : character.planetName}
          </p>
        </BackgroundGradient>
      </Link>
    </div>
  );
}
