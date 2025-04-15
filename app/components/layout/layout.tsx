import type { ReactNode } from "react";
import GlobalLoading from "./global-loading";
import Header from "./header";
import { StarsBackground } from "../ui/stars-background";
import { ShootingStars } from "../ui/shooting-stars";
import { Spotlight } from "../ui/spotlight";
import { cn } from "~/lib/utils";
import Footer from "./footer";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative h-[100dvh] flex flex-col overflow-hidden">
      <ShootingStars starWidth={15} />
      <StarsBackground />
      <Spotlight className="left-0 md:left-0" fill="blue" />
      <Header />
      <main className="flex-1 w-full overflow-auto p-5 pb-10 relative">
        {children}
      </main>
      <Footer />
      <GlobalLoading />
    </div>
  );
}
