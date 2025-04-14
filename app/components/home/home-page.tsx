"use client";
import { Link } from "@remix-run/react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export default function HomePage() {
  const starWarsIntro =
    "É um período de guerra civil. Naves rebeldes, atacando a partir de uma base secreta, conquistaram sua primeira vitória contra o maligno Império Galáctico. Durante a batalha, espiões rebeldes conseguiram roubar planos secretos da arma definitiva do Império, a ESTRELA DA MORTE, uma estação espacial blindada com poder suficiente para destruir um planeta inteiro. Perseguida pelos agentes sinistros do Império, a Princesa Leia corre para casa a bordo de sua nave, guardiã dos planos roubados que podem salvar seu povo e restaurar a liberdade à galáxia.";

  return (
    <>
      <div className="px-6 lg:text-justify">
        <TextGenerateEffect words={starWarsIntro} />
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-2">
        <CardContainer>
          <CardBody className="bg-gray-50 relative hover:shadow-2xl hover:shadow-emerald-400/[0.2] bg-transparent dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
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
        <CardContainer className="mt-[-100px] lg:mt-0">
          <CardBody className="bg-gray-50 relative hover:shadow-2xl hover:shadow-emerald-400/[0.2] bg-transparent dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
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
