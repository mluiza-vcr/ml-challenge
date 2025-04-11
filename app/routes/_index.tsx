import type { MetaFunction } from "@remix-run/node";
import IntroPage from "~/components/intro/intro-page";
import { generatePageTile } from "~/utils/metadata";

export const meta: MetaFunction = () => {
  return [{ title: generatePageTile("Home") }];
};

export default function Index() {
  return <IntroPage />;
}
