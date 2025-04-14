"use client";
import { getGenderLabel } from "~/utils/getLabels";
import { BackgroundGradient } from "../ui/background-gradient";
import { Link } from "@remix-run/react";

export function CharacterCard({
  name,
  gender,
  planetName,
  url,
}: {
  name: string;
  gender: string;
  planetName: string;
  url: string;
}) {
  function extractIdFromUrl(url: string): string | null {
    const match = url.match(/\/people\/(\d+)\//);
    return match ? match[1] : null;
  }

  return (
    <div className="w-full lg:min-w-80 lg:w-1/6 cursor-pointer">
      <Link to={`/personagens/${extractIdFromUrl(url)}`}>
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-8 bg-white dark:bg-zinc-900 lg:h-56 text-center">
          <p className="sm:text-xl font-bold lg:text-2xl text-black mt-4 mb-2 dark:text-neutral-200">
            {name}
          </p>
          <p className="lg:mt-5 sm:text-lg text-black mt-4 mb-2 dark:text-neutral-200">
            {getGenderLabel(gender)}
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Planeta {planetName === "unknown" ? "Desconhecido" : planetName}
          </p>
        </BackgroundGradient>
      </Link>
    </div>
  );
}
