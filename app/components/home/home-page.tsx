"use client";
import { Link } from "@remix-run/react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center lg:gap-2 -mb-8">
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
            <CardItem translateZ="100" className="w-full mt-4 p-10">
              <Link to="/personagens">
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
            <CardItem translateZ="100" className="w-full mt-4 p-10">
              <Link to="/planetas">
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
