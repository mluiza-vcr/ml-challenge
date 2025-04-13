"use client";
import { BackgroundGradient } from "../ui/background-gradient";
import { Link } from "@remix-run/react";

export function CharacterDetailsCard({
  name,
  height,
  mass,
  hair_color,
  skin_color,
  eye_color,
  birth_year,
  gender,
}: {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
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
    <div className="w-2/5 mx-auto cursor-pointer mt-5">
      {/* <Link to={`/personagens/${extractIdFromUrl(url)}`}> */}
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-8 bg-white dark:bg-zinc-900 lg:h-56 text-center">
        <p className="sm:text-xl font-bold lg:text-2xl text-black mt-4 mb-2 dark:text-neutral-200">
          {name}
        </p>
        <p className="lg:mt-5 sm:text-lg text-black mt-4 mb-2 dark:text-neutral-200">
          {getGenderLabel(gender)}
        </p>
        <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
          {mass}
        </p>
      </BackgroundGradient>
      {/* </Link> */}
    </div>
  );
}
