import { Link } from "@remix-run/react";
import type { HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/aplicativos"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Aplicativos
      </Link>
      <Link
        to="/usuarios"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Usuários
      </Link>
    </nav>
  );
}
