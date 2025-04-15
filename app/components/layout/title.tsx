import type { ReactNode } from "react";
import BackNavigationButton from "./back-navigation-button";
import { AudioPlayer } from "./audio-player";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:pl-6 flex flex-col items-center lg:flex-row lg:justify-between">
      <div>
        <span>{children}</span>
        <BackNavigationButton />
      </div>
      <AudioPlayer />
    </h1>
  );
}
