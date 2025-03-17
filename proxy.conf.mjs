import "dotenv/config";

export default {
  "/api/tmdb": {
    target: "https://api.themoviedb.org/3",
    secure: true,
    pathRewrite: {
      "^/api/tmdb": "",
    },
    changeOrigin: true,
    configure(proxy) {
      proxy.on("proxyReq", (proxyReq) => {
        proxyReq.setHeader(
          "Authorization",
          `Bearer ${process.env.TMDB_API_KEY}`,
        );
        proxyReq.setHeader("Content-Type", "application/json");
      });
    },
    logLevel: "debug",
  },
};
