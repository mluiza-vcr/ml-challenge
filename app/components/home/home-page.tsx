"use client";
import { Link } from "@remix-run/react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export default function HomePage() {
  const starWarsIntro =
    "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy.";

  return (
    <>
      <div className="px-6 text-justify">
        <TextGenerateEffect words={starWarsIntro} />{" "}
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-evenly">
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-transparent dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Explorar personagens
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Encontre todos os personagens dos filmes
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4 p-8">
              <Link to="/personagens?page=1">
                <img
                  src="https://i0.wp.com/www.gibizilla.com.br/wp-content/uploads/2021/02/Darth-Vader.jpg?w=1536&ssl=1"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </Link>
            </CardItem>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-transparent dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Explorar planetas
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Viaje por todos os planetas da série
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4 p-8">
              <Link to="/personagens?page=1">
                <img
                  src="https://super.abril.com.br/wp-content/uploads/2016/12/bespinb.jpg?quality=70&strip=all"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </Link>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </>
  );
}
