import { Sheet, SheetTrigger, SheetContent } from "~/components/ui/sheet";
import { Contact, Earth, Home, Menu } from "lucide-react";
import { Link } from "@remix-run/react";

export function MobileNavBar() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="flex flex-col space-y-4 mt-8">
          <Link to="/home" className="text-lg font-medium flex items-center">
            <Home className="mr-2" width={20} />
            Home
          </Link>
          <Link
            to="/personagens?page=1"
            className="text-lg font-medium flex items-center"
          >
            <Contact className="mr-2" width={20} /> Personagens
          </Link>
          <Link
            to="/personagens?page=1"
            className="text-lg font-medium flex items-center"
          >
            <Earth className="mr-2" width={20} /> Planetas
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
