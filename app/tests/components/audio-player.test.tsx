import { render, screen, fireEvent } from "@testing-library/react";
import { AudioPlayer } from "~/components/layout/audio-player";

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
test("toggle playback and button text correctly", async () => {
  render(<AudioPlayer />);

  const button = screen.getByRole("button");

  // Verificando se o texto do botão é "Tocar música" inicialmente
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(button).toHaveTextContent("Tocar música");

  // Simulando o clique para tocar a música
  fireEvent.click(button);

  // Verificando se o texto do botão foi alterado para "Pausar música"
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(button).toHaveTextContent("Pausar música");

  // Simulando o clique para pausar a música
  fireEvent.click(button);

  // Verificando se o texto do botão foi alterado para "Tocar música"
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(button).toHaveTextContent("Tocar música");
});
