import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Characters from "~/routes/personagens";
import { vi } from "vitest";

// primeiro mock padrão
vi.mock("~/infra/repositories/character-repository", () => ({
  CharacterRepository: class {
    async getCharacters(_page: number, search: string) {
      if (search.toLowerCase() === "darth") {
        return {
          error: null,
          data: {
            results: [{ name: "Darth Vader", url: "/people/4/" }],
            count: 1,
          },
        };
      }

      return {
        error: null,
        data: {
          results: [
            { name: "Luke Skywalker", url: "/people/1/" },
            { name: "Leia Organa", url: "/people/5/" },
          ],
          count: 2,
        },
      };
    }
  },
}));

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
test("exibe lista de personagens e faz busca", async () => {
  render(
    <MemoryRouter initialEntries={["/characters"]}>
      <Characters />
    </MemoryRouter>
  );

  // Aguarda renderização inicial
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(screen.getByText("Leia Organa")).toBeInTheDocument();

  // Digita "Darth" no campo de busca
  const input = screen.getByPlaceholderText("Pesquise por nome");
  fireEvent.change(input, { target: { value: "Darth" } });

  // Clica no botão "Pesquisar"
  const searchButton = screen.getByRole("button", { name: /pesquisar/i });
  fireEvent.click(searchButton);

  // Aguarda atualização da lista
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(await screen.findByText("Darth Vader")).toBeInTheDocument();

  // Garante que os personagens anteriores não estão mais visíveis
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(screen.queryByText("Luke Skywalker")).not.toBeInTheDocument();
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(screen.queryByText("Leia Organa")).not.toBeInTheDocument();
});
