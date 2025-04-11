import type { Character } from "~/infra/instances/repositories/character-repository";
import { CharacterCard } from "./character-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export default function ListCharacters({
  results,
  count,
  page,
}: {
  results: Character[] | undefined;
  count: number;
  page: number;
}) {
  console.log("results", results);

  const totalPages = Math.ceil(count / 10); // SWAPI retorna 10 por página

  return (
    <div>
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-5 lg:flex-wrap lg:justify-evenly">
        {results?.map((character) => {
          return (
            <CharacterCard
              key={character.name}
              name={character.name}
              gender={character.gender}
              planetName={character.planetName}
            />
          );
        })}
      </div>
      <div className="lg:mt-10">
        {totalPages > 1 && (
          <Pagination className="justify-center mt-8">
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`?page=${page - 1}`} />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`?page=${pageNumber}`}
                      isActive={pageNumber === page}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`?page=${page + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
