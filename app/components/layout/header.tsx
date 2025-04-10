import { Link } from "@remix-run/react";
import Logo from "/logo-dark.png";
import { UserNav } from "./user-nav";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = (checked: boolean) => {
    setIsDark(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

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
      <div className="flex items-center gap-2">
        <Sun className="w-4 h-4" />
        <Switch checked={isDark} onCheckedChange={toggleTheme} />
        <Moon className="w-4 h-4" />
      </div>
    </div>
  );
}
