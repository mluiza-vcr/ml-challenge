import { Link } from "@remix-run/react";
import Logo from "/logo-star-wars.png";
import ToggleTheme from "./toggle-theme";

export default function Header() {
  return (
    <div
      className="flex justify-between h-16 items-center px-4 border-b supports-backdrop-blur:bg-background/60 bg-background/60 backdrop-blur z-50"
      style={{ gridArea: "header" }}
    >
      <Link to="/">
        <img src={Logo} alt="logotipo" className="w-16" />
      </Link>
      <ToggleTheme />
    </div>
  );
}
