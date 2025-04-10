import { defer, MetaFunction } from "@remix-run/node";
import OtherPage from "~/components/home/other-page";
import Layout from "~/components/layout/layout";
import Title from "~/components/layout/title";
import { generatePageTile } from "~/utils/metadata";

// export async function loader({ request }: LoaderFunctionArgs) {
//   const session = await Session.restoreSession(request);
//   if (session === null) return redirect("/logout");
//   const profile = session.profile;

//   const service = new BannerService();

//   const bannersPromise = await service.getBanners(session.accessToken);

//   return defer({ bannersPromise, profile });
// }

export const meta: MetaFunction = () => {
  return [{ title: generatePageTile("Home") }];
};

export default function Index() {
  return (
    <>
      <Layout>
        <Title>Socorro</Title>
        <OtherPage />
      </Layout>
    </>
  );
}
