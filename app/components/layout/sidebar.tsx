import { Link } from "@remix-run/react";
import { PanelsTopLeft, UsersRound } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function Sidebar() {
  return (
    <aside
      className="inset-y-0 z-10 w-14 flex-col border-r bg-background"
      style={{ gridArea: "sidebar" }}
    >
      <nav className="flex flex-col items-center gap-4 py-5">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                <PanelsTopLeft className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Home</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/outrapagina"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                <UsersRound className="h-5 w-5" />
                <span className="sr-only">Outra</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Outra</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
