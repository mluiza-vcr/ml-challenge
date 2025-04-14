import { createRemixStub } from "@remix-run/testing";
import { render, screen, waitFor } from "@testing-library/react";
import Footer from "~/components/layout/footer";

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
test("renders Footer correctly", async () => {
  // Definindo o RemixStub para simular a rota
  const RemixStub = createRemixStub([
    {
      path: "/",
      Component: Footer,
      loader() {
        return {};
      },
    },
  ]);

  render(<RemixStub />);

  // Verificando se o texto do ano atual e do nome de Maria Luiza aparecem na tela
  const yearText = new Date().getFullYear().toString();
  await waitFor(() => screen.getByText(`© ${yearText} Sua Galáxia Estelar`));
  await waitFor(() => screen.getByText("Maria Luiza Rodrigues"));

  // Verificando se o link do LinkedIn está presente e tem o href correto
  const linkedinLink = screen.getByRole("link", {
    name: "Maria Luiza Rodrigues",
  });
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(linkedinLink).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/mluiza-vcr/"
  );
});
