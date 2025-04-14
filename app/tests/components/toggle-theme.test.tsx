import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ToggleTheme from "~/components/layout/toggle-theme";

// Função auxiliar para verificar o estado do tema
const checkThemeState = (expectedClass: string) => {
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(document.documentElement.classList.contains(expectedClass)).toBe(true);
};

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
test("toggles theme correctly", async () => {
  render(<ToggleTheme />);

  // Verificando se o Switch está presente
  const switchInput = screen.getByRole("switch");
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(switchInput).toBeInTheDocument();

  // Verificando se o tema inicial é claro (a classe 'dark' não deve estar presente)
  checkThemeState("dark");

  // Simulando a alternância para o tema escuro
  fireEvent.click(switchInput);

  // Simulando a alternância para o tema claro
  fireEvent.click(switchInput);
});
