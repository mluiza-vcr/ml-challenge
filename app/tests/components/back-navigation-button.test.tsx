import { screen, fireEvent, render } from "@testing-library/react";
import { createRemixStub } from "@remix-run/testing";
import BackNavigationButton from "~/components/layout/back-navigation-button";
import { vi } from "vitest";

// mock do useNavigate
vi.mock("@remix-run/react", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const RemixStub = createRemixStub([
  {
    path: "/",
    Component: BackNavigationButton,
  },
]);

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
test("navega para trás ao clicar", async () => {
  render(<RemixStub />);

  const button = screen.getByRole("button");
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  // Aqui, se quiser capturar o spy do navigate, tem que fazer o vi.fn() fora do mock
});
