import { Link } from "@remix-run/react";
import ShimmerButton from "~/components/ui/shimmer-button";
import { ShootingStars } from "~/components/ui/shooting-stars";
import { Spotlight } from "~/components/ui/spotlight";
import { StarsBackground } from "~/components/ui/stars-background";
import LogoStarWars from "/logo-star-wars.png";
import StarWarsTextIntro from "../home/text-intro";

export default function HomePage() {
  return (
    <main className="flex">
      <div className="w-full h-screen flex flex-col items-center justify-between px-6 py-12 md:px-20 md:py-20 bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <ShootingStars starWidth={15} />
        <StarsBackground />
        <Spotlight className="left-0 md:left-60 md:-top-20" fill="blue" />

        {/* TOPO */}
        <div className="flex justify-center items-center -mt-5 md:mt-0">
          <img src={LogoStarWars} alt="logotipo" className="w-52 md:w-80" />
        </div>

        {/* MEIO */}
        <StarWarsTextIntro />

        {/* BASE */}
        <div className="w-full max-w-md relative z-10 mb-36">
          <Link to="/home">
            <ShimmerButton className="shadow-2xl w-full" type="submit">
              <span className="w-full whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg p-3">
                Que a força esteja com você
              </span>
            </ShimmerButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
