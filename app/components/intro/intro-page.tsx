import { Link } from "@remix-run/react";
import ShimmerButton from "~/components/ui/shimmer-button";
import { ShootingStars } from "~/components/ui/shooting-stars";
import { Spotlight } from "~/components/ui/spotlight";
import { StarsBackground } from "~/components/ui/stars-background";
import LogoML from "/logo-dark.png";
import LogoStarWars from "/logo-star-wars.png";

export default function HomePage() {
  return (
    <main className="flex">
      <div className="w-full h-screen flex flex-col md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <ShootingStars />
        <StarsBackground />
        <div className="flex flex-col justify-center items-center">
          <img src={LogoML} alt="logotipo" className="w-64 mt-10 md:mt-0" />
        </div>
        <Spotlight className="left-0 md:left-60 md:-top-20" fill="blue" />
        <div className="p-6 mx-auto relative z-10 w-full md:pt-0">
          <div className="flex flex-col justify-center items-center">
            <img src={LogoStarWars} alt="logotipo" className="w-96" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <Link to="/home">
              <ShimmerButton className="shadow-2xl m-auto" type="submit">
                <span className=" whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg p-3">
                  The force will be with you
                </span>
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
