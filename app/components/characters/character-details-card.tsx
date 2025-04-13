"use client";
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
  filmTitles: string[];
}) {
  function getGenderLabel(gender: string): string {
    switch (gender) {
      case "female":
        return "Gênero feminino";
      case "male":
        return "Gênero masculino";
      case "hermaphrodite":
        return "Hermafrodita";
      default:
        return "Gênero desconhecido";
    }
  }

  // function extractIdFromUrl(url: string): string | null {
  //   const match = url.match(/\/people\/(\d+)\//);
  //   return match ? match[1] : null;
  // }

  return (
    <div className="w-full lg:w-2/5 mx-auto cursor-pointer mt-5">
      {/* <Link to={`/personagens/${extractIdFromUrl(url)}`}> */}
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-8 bg-white dark:bg-zinc-900 text-center">
        <p className="sm:text-xl font-bold lg:text-2xl text-black mt-4 mb-2 dark:text-neutral-200">
          {name}
        </p>
        <p className="lg:mt-5 sm:text-lg text-black mt-4 mb-2 dark:text-neutral-200">
          {getGenderLabel(gender)}
        </p>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Massa
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {mass} kg
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Altura
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {Number(height) / 100} m
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Cor do cabelo
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {hairColor}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Cor dos olhos
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {eyeColor}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Cor da pele
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {skinColor}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Ano de nascimento
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {birthYear}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Planeta
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {planetName}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Filmes
          </p>
          {filmTitles.map((film) => {
            return (
              <p
                key={film}
                className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400"
              >
                {film}
              </p>
            );
          })}
        </div>
      </BackgroundGradient>
      {/* </Link> */}
    </div>
  );
}
