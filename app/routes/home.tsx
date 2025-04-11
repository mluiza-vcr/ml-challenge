import type { MetaFunction } from "@remix-run/node";
import HomePage from "~/components/home/home-page";
import Layout from "~/components/layout/layout";
import Title from "~/components/layout/title";
import { generatePageTile } from "~/utils/metadata";

export const meta: MetaFunction = () => {
  return [{ title: generatePageTile("Home") }];
};

export default function Home() {
  return (
    <>
      <Layout>
        <Title>Home</Title>
        <HomePage />
      </Layout>
    </>
  );
}
