"use client";
import { BackgroundGradient } from "../ui/background-gradient";
import { Link } from "@remix-run/react";

export function CharacterCard({
  name,
  gender,
  planetName,
}: {
  name: string;
  gender: string;
  planetName: string;
}) {
  return (
    <div className="w-full lg:min-w-80 lg:w-1/6 cursor-pointer">
      <Link to="/home">
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-8 bg-white dark:bg-zinc-900 lg:h-64">
          <p className="sm:text-xl lg:text-2xl text-black mt-4 mb-2 dark:text-neutral-200">
            {name}
          </p>
          <p className="lg:mt-10 text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            {gender}
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            Planeta {planetName === "unknown" ? "Desconhecido" : planetName}
          </p>
        </BackgroundGradient>
      </Link>
    </div>
  );
}
