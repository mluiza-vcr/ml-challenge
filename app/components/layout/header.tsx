import { Link } from "@remix-run/react";
import Logo from "/logo-star-wars.png";
import ToggleTheme from "./toggle-theme";
import NavBar from "./nav-bar";
import { MobileNavBar } from "./mobile-nav-bar";
import { AudioPlayer } from "./audio-player";

export default function Header() {
  return (
    <div
      className="flex justify-between h-20 items-center px-4 border-b supports-backdrop-blur:bg-background/60 bg-background/60 backdrop-blur z-50"
      style={{ gridArea: "header" }}
    >
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src={Logo} alt="logotipo" className="w-16" />
        </Link>
        <div className="">
          <AudioPlayer />
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex">
        <NavBar />
      </div>

      {/* Mobile Burger */}
      <MobileNavBar />

      <ToggleTheme />
    </div>
  );
}
