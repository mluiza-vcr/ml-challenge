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
  const totalPages = Math.ceil(count / 10);

  return (
    <div>
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-5 lg:flex-wrap lg:justify-evenly">
        {results
          ?.slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((character) => {
            return <CharacterCard key={character.name} character={character} />;
          })}
      </div>
      <div className="mt-6 lg:mt-10">
        {totalPages > 1 && (
          <Pagination className="flex flex-wrap justify-center gap-2 mt-4 px-4">
            <PaginationContent className="flex flex-wrap justify-center gap-2">
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
                      className="min-w-[36px] text-center"
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
