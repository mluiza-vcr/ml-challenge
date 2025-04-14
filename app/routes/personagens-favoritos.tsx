import type { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import Layout from "~/components/layout/layout";
import Title from "~/components/layout/title";
import ListFavoriteCharacters from "~/components/characters/list-favorite-characters";
import { Button } from "~/components/ui/button";
import { generatePageTile } from "~/utils/metadata";

const PAGE_SIZE = 10;

export const meta: MetaFunction = () => {
  return [{ title: generatePageTile("Personagens favoritos") }];
};

export default function FavoriteCharacters() {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [favorites, setFavorites] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number.parseInt(searchParams.get("page") || "1");

  // Carregar os favoritos do localStorage quando o componente for montado
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteCharacters");
    if (storedFavorites) {
      try {
        // Parse os dados armazenados no localStorage
        const parsedFavorites = JSON.parse(storedFavorites);

        // Verifique se os dados parseados estão completos
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Erro ao carregar favoritos do localStorage:", error);
        setFavorites([]);
      }
    }
  }, []);

  // Calcular o número total de páginas e aplicar a paginação
  const totalPages = Math.ceil(favorites.length / PAGE_SIZE);
  const paginatedFavorites = favorites.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handlePrev = () => {
    if (page > 1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", String(page - 1));
      setSearchParams(newParams);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", String(page + 1));
      setSearchParams(newParams);
    }
  };

  return (
    <Layout>
      <Title>Personagens favoritos</Title>
      {paginatedFavorites.length > 0 ? (
        <>
          <ListFavoriteCharacters results={paginatedFavorites} />
          <div className="flex justify-center items-center space-x-4 mt-6">
            <Button
              onClick={handlePrev}
              disabled={page === 1}
              variant="outline"
            >
              Anterior
            </Button>
            <span className="text-muted-foreground">
              Página {page} de {totalPages}
            </span>
            <Button
              onClick={handleNext}
              disabled={page === totalPages}
              variant="outline"
            >
              Próxima
            </Button>
          </div>
        </>
      ) : (
        <p className="text-muted-foreground mt-6 text-center">
          Nenhum personagem foi favoritado ainda.
        </p>
      )}
    </Layout>
  );
}
