import { Link } from "@remix-run/react";
import ShimmerButton from "~/components/ui/shimmer-button";
import { ShootingStars } from "~/components/ui/shooting-stars";
import { Spotlight } from "~/components/ui/spotlight";
import { StarsBackground } from "~/components/ui/stars-background";
import Logo from "/logo-dark.png";

export default function HomePage() {
  return (
    <main className="flex">
      <div className="w-full h-screen flex flex-col md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <ShootingStars />
        <StarsBackground />
        <div className="flex flex-col justify-center items-center space-y-2">
          <img src={Logo} alt="logotipo" className="w-20" />
        </div>
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className=" p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 space-y-5">
          <div className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Bem-vindos ao
            <br /> meu site
          </div>
          <p className="mt-4 text-base text-neutral-300 max-w-xl text-center mx-auto">
            Descrição aqui
          </p>
          <div className="flex flex-col justify-center items-center space-y-5">
            <Link to="/outrapagina">
              <ShimmerButton className="shadow-2xl m-auto" type="submit">
                <span className=" whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg p-3">
                  Entrar no site
                </span>
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
