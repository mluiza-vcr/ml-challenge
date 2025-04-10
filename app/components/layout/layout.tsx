import type { ReactNode } from "react";
import GlobalLoading from "./global-loading";
import Header from "./header";
import Sidebar from "./sidebar";
import { StarsBackground } from "../ui/stars-background";
import { ShootingStars } from "../ui/shooting-stars";
import { Spotlight } from "../ui/spotlight";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateAreas: `'header header' 'sidebar main'`,
        gridTemplateColumns: "min-content 1fr",
        gridTemplateRows: "60px 1fr",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <StarsBackground />
      <ShootingStars />
      <Spotlight className="left-0 md:left-60" fill="pink" />
      <Header />
      <Sidebar />
      <main
        className="flex-1 w-full pb-10 p-5 box-border overflow-auto relative"
        style={{ gridArea: "main" }}
      >
        {children}
      </main>
      <GlobalLoading />
    </div>
  );
}
