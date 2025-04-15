import { useEffect, useMemo, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import ListCharacters from "~/components/characters/list-characters";
import ErrorPage from "~/components/global/error-page";
import Layout from "~/components/layout/layout";
import LoadingData from "~/components/layout/loading-data";
import Title from "~/components/layout/title";
import {
  type Character,
  CharacterRepository,
} from "~/infra/repositories/character-repository";
import { generatePageTile } from "~/utils/metadata";
import { Input } from "~/components/ui/input";

export const meta: MetaFunction = () => {
  return [{ title: generatePageTile("Personagens") }];
};

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      const repository = new CharacterRepository();
      const { data, error } = await repository.getAllCharacters();

      if (data) {
        setCharacters(data);
      } else {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchAllCharacters();
  }, []);

  function filterCharacters(characters: Character[], search: string) {
    const lower = search.toLowerCase();

    return characters.filter((char) => {
      const gender = char.gender.toLowerCase();
      const translatedGender =
        gender === "male"
          ? "masculino"
          : gender === "female"
          ? "feminino"
          : "desconhecido";

      return (
        char.name.toLowerCase().includes(lower) ||
        char.planetName.toLowerCase().includes(lower) ||
        gender.includes(lower) ||
        translatedGender.includes(lower)
      );
    });
  }

  function paginate<T>(array: T[], page: number, perPage: number) {
    const start = (page - 1) * perPage;
    return array.slice(start, start + perPage);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const filtered = useMemo(
    () => filterCharacters(characters, searchTerm),
    [characters, searchTerm]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const paginated = useMemo(
    () => paginate(filtered, page, itemsPerPage),
    [filtered, page]
  );

  return (
    <Layout>
      <Title>Personagens</Title>
      {isLoading ? (
        <LoadingData />
      ) : error ? (
        <ErrorPage />
      ) : (
        <div className="flex flex-col space-y-10 items-center">
          <div className="mt-5 lg:mt-0">
            <Input
              placeholder="Buscar por nome, planeta ou gênero"
              className="w-72"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">
              Nenhum personagem encontrado.
            </p>
          ) : (
            <ListCharacters
              results={paginated}
              count={filtered.length}
              page={page}
              onPageChange={setPage}
            />
          )}
        </div>
      )}
    </Layout>
  );
}
