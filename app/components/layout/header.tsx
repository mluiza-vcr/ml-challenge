import { Link } from "@remix-run/react";
import Logo from "/logo-dark.png";
import ToggleTheme from "./toggle-theme";

export default function Header() {
  return (
    <div
      className="flex justify-between h-16 items-center px-4 border-b supports-backdrop-blur:bg-background/60 bg-background/60 backdrop-blur z-50"
      style={{ gridArea: "header" }}
    >
      <Link to="/outrapagina">
        <img src={Logo} alt="logotipo" className="w-24" />
      </Link>
      {/* <div className="flex items-center space-x-4">
        <UserNav />
      </div> */}
      <ToggleTheme />
    </div>
  );
}
