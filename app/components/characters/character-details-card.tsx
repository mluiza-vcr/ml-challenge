"use client";
import {
  formatBirthYear,
  getEyeColorLabel,
  getGenderLabel,
  getHairColorLabel,
  getSkinColorLabel,
  translateFilmTitle,
} from "~/utils/getLabels";
import { BackgroundGradient } from "../ui/background-gradient";
import { Link } from "@remix-run/react";

export function CharacterDetailsCard({
  name,
  height,
  mass,
  gender,
  hair_color: hairColor,
  skin_color: skinColor,
  eye_color: eyeColor,
  birth_year: birthYear,
  planetName,
  filmTitles,
  homeworld,
}: {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  planetName: string;
  filmTitles: string[] | undefined;
  homeworld: string;
}) {
  function extractIdFromUrl(url: string): string | null {
    const match = url.match(/\/planets\/(\d+)\//);
    return match ? match[1] : null;
  }

  return (
    <div className="w-full lg:w-2/5 mx-auto mt-5">
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-8 bg-white dark:bg-zinc-900 text-center">
        <p className="sm:text-xl font-bold lg:text-2xl text-black mt-4 mb-2 dark:text-neutral-200">
          {name}
        </p>
        <p className="lg:mt-5 sm:text-lg text-black mt-4 mb-2 dark:text-neutral-200">
          {getGenderLabel(gender)}
        </p>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Massa:
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {mass === "unknown" ? "Desconhecida" : `${mass} kg`}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Altura:
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {height === "unknown"
              ? "Desconhecida"
              : `${Number(height) / 100} m`}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Cor do cabelo:
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {getHairColorLabel(hairColor)}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Cor dos olhos:
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {getEyeColorLabel(eyeColor)}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Cor da pele:
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {getSkinColorLabel(skinColor)}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Planeta:
          </p>
          {planetName === "unknown" ? (
            <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
              Desconhecido
            </p>
          ) : (
            <Link
              to={`/planetas/${extractIdFromUrl(homeworld)}`}
              className="text-sm lg:text-base text-cyan-500 text-decoration: underline hover:opacity-70"
            >
              {planetName}
            </Link>
          )}
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {formatBirthYear(birthYear, gender)}
          </p>
        </div>
        <div className="flex flex-col justify-center my-5">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Filmes:
          </p>
          {filmTitles?.map((title) => {
            return (
              <p
                key={title}
                className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400"
              >
                {translateFilmTitle(title)}
              </p>
            );
          })}
        </div>
      </BackgroundGradient>
    </div>
  );
}
