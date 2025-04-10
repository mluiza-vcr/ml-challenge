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
                to="/aplicativos"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                <PanelsTopLeft className="h-5 w-5" />
                <span className="sr-only">Aplicativos</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Aplicativos</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/usuarios?page=1&limit=10"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                <UsersRound className="h-5 w-5" />
                <span className="sr-only">Usuários</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Usuários</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
