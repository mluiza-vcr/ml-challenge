import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Contact, Earth } from "lucide-react";
import Layout from "~/components/layout/layout";
import Title from "~/components/layout/title";
import { BackgroundGradient } from "~/components/ui/background-gradient";
import { generatePageTile } from "~/utils/metadata";

export const meta: MetaFunction = () => {
  return [{ title: generatePageTile("Favoritos") }];
};

export default function Favorites() {
  return (
    <Layout>
      <Title>Favoritos</Title>
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-5 lg:flex-wrap lg:justify-center mt-5">
        <Link to={"/personagens-favoritos"}>
          <BackgroundGradient className="rounded-[22px] lg:w-[400px] p-4 sm:p-8 bg-white dark:bg-zinc-900 text-center flex flex-col items-center gap-5">
            <p className="sm:text-xl font-bold lg:text-2xl text-black dark:text-neutral-200">
              Personagens favoritos
            </p>
            <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
              <Contact size={48} />
            </p>
          </BackgroundGradient>
        </Link>
        <Link to={"/planetas-favoritos"}>
          <BackgroundGradient className="rounded-[22px] lg:w-[400px] p-4 sm:p-8 bg-white dark:bg-zinc-900 text-center flex flex-col items-center gap-5">
            <p className="sm:text-xl font-bold lg:text-2xl text-black dark:text-neutral-200">
              Planetas favoritos
            </p>
            <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
              <Earth size={48} />
            </p>
          </BackgroundGradient>
        </Link>
      </div>
    </Layout>
  );
}
