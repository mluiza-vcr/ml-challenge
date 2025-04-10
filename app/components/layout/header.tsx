import { Link } from "@remix-run/react";
import Logo from "/logo-dark.png";
import { UserNav } from "./user-nav";

export default function Header() {
  return (
    <div
      className="flex justify-between h-16 items-center px-4 border-b supports-backdrop-blur:bg-background/60 bg-background/60 backdrop-blur z-50"
      style={{ gridArea: "header" }}
    >
      <Link to="/aplicativos">
        <img src={Logo} alt="logotipo" className="w-10" />
      </Link>
      <div className="flex items-center space-x-4">
        <UserNav />
      </div>
    </div>
  );
}
