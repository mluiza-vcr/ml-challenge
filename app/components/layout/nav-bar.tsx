import { Contact, Earth, Home, Music, Star } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Link } from "@remix-run/react";

export default function NavBar() {
  return (
    <nav className="flex justify-evenly gap-2">
      <CardContainer>
        <Link to="/home">
          <CardBody className="cursor-pointer text-sm hover:shadow-2xl hover:shadow-emerald-400/[0.5] bg-transparent dark:border-white/[0.2] border-black/[0.1] w-[5.6rem] h-fit rounded-xl p-3 border">
            <CardItem
              translateZ="50"
              className="text-neutral-600 dark:text-white flex justify-center items-center"
            >
              <Home className="mr-1" size={20} /> Home
            </CardItem>
          </CardBody>
        </Link>
      </CardContainer>
      <CardContainer>
        <Link to="/personagens">
          <CardBody className="cursor-pointer text-sm hover:shadow-2xl hover:shadow-emerald-400/[0.5] bg-transparent dark:border-white/[0.2] border-black/[0.1] w-[8.2rem] h-fit rounded-xl p-3 border">
            <CardItem
              translateZ="50"
              className="text-neutral-600 dark:text-white flex justify-center items-center"
            >
              <Contact className="mr-1" size={20} /> Personagens
            </CardItem>
          </CardBody>
        </Link>
      </CardContainer>
      <CardContainer>
        <Link to="/planetas">
          <CardBody className="cursor-pointer text-sm hover:shadow-2xl hover:shadow-emerald-400/[0.5] bg-transparent dark:border-white/[0.2] border-black/[0.1] w-[6.5rem] h-fit rounded-xl p-3 border">
            <CardItem
              translateZ="50"
              className="text-neutral-600 dark:text-white flex justify-center items-center"
            >
              <Earth className="mr-1" size={20} /> Planetas
            </CardItem>
          </CardBody>
        </Link>
      </CardContainer>
      <CardContainer>
        <Link to="/favoritos">
          <CardBody className="cursor-pointer text-sm hover:shadow-2xl hover:shadow-emerald-400/[0.5] bg-transparent dark:border-white/[0.2] border-black/[0.1] w-[6.5rem] h-fit rounded-xl p-3 border">
            <CardItem
              translateZ="50"
              className="text-neutral-600 dark:text-white flex justify-center items-center"
            >
              <Star className="mr-1" size={20} /> Favoritos
            </CardItem>
          </CardBody>
        </Link>
      </CardContainer>
    </nav>
  );
}
