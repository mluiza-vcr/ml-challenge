import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";

export default function ToggleTheme() {
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

    if (storedTheme === "dark" || !storedTheme) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Sun className="w-4 h-4" />
      <Switch checked={isDark} onCheckedChange={toggleTheme} />
      <Moon className="w-4 h-4" />
    </div>
  );
}
