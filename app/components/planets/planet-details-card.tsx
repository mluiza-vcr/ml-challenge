"use client";
import {
  formatPopulation,
  getClimateLabel,
  getOrbitalPeriodLabel,
  getRotationPeriodLabel,
  getTerrainLabel,
} from "~/utils/getLabels";
import { BackgroundGradient } from "../ui/background-gradient";
import { Link } from "@remix-run/react";

export function PlanetDetailsCard({
  name,
  diameter,
  population,
  climate,
  rotation_period: rotationPeriod,
  orbital_period: orbitalPeriod,
  terrain,
  residentsInfo,
}: {
  name: string;
  diameter: string;
  url: string;
  population: string;
  climate: string;
  rotation_period: string;
  orbital_period: string;
  terrain: string;
  residentsInfo: {
    name: string;
    url: string;
  }[];
}) {
  function extractIdFromUrl(url: string): string | null {
    const match = url.match(/\/people\/(\d+)\//);
    return match ? match[1] : null;
  }

  return (
    <div className="w-full lg:w-2/5 mx-auto mt-5">
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-8 bg-white dark:bg-zinc-900 text-center">
        <p className="sm:text-xl font-bold lg:text-2xl text-black mt-4 mb-2 dark:text-neutral-200">
          {name === "unknown" ? "Desconhecido" : name}
        </p>
        <p className="lg:mt-5 sm:text-lg text-black mt-4 mb-2 dark:text-neutral-200">
          {diameter} km de diâmetro
        </p>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            População:
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {population === "unknown"
              ? "Desconhecida"
              : `${formatPopulation(population)}`}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Período rotacional:
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {getRotationPeriodLabel(rotationPeriod)}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Período orbital:
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {getOrbitalPeriodLabel(orbitalPeriod)}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Clima:
          </p>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
            {getClimateLabel(climate)}
          </p>
        </div>
        <div className="flex flex-col justify-center my-5">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Terreno:
          </p>
          {getTerrainLabel(terrain).includes(",") ? (
            getTerrainLabel(terrain)
              .split(",")
              .map((char) => {
                return (
                  <p
                    key={char}
                    className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400"
                  >
                    {char}
                  </p>
                );
              })
          ) : (
            <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
              {getTerrainLabel(terrain)}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-center my-5">
          <p className="text-sm lg:text-base font-bold text-neutral-600 dark:text-neutral-400">
            Residentes:
          </p>
          {residentsInfo.length > 0 ? (
            residentsInfo?.map((resident) => {
              return (
                <p
                  key={resident.name}
                  className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400"
                >
                  <Link
                    to={`/personagens/${extractIdFromUrl(resident.url)}`}
                    className="text-sm lg:text-base text-cyan-500 text-decoration: underline hover:opacity-70"
                  >
                    {resident.name}
                  </Link>
                </p>
              );
            })
          ) : (
            <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
              Desconhecidos
            </p>
          )}
        </div>
      </BackgroundGradient>
    </div>
  );
}
