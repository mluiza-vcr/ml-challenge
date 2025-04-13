import type { ReactNode } from "react";
import BackNavigationButton from "./back-navigation-button";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:pl-6 flex items-center">
      <span>{children}</span>
      <BackNavigationButton />
    </h1>
  );
}
