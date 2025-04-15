/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "vercel",
  server: "./server.js", // ou "./vercel/server.js" se estiver separado
  ignoredRouteFiles: ["**/.*"],
  future: {
    v3_routeConvention: true, // se estiver usando a convenção nova de rotas
  },
};
