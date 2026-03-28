import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget = env.VITE_API_PROXY_TARGET || "http://localhost:3001";
  const proxyTimeoutMs = Number(env.VITE_API_PROXY_TIMEOUT_MS || "300000"); // 5 min

  return {
    base: "/TEAM-59/",
    server: {
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          timeout: Number.isFinite(proxyTimeoutMs) ? proxyTimeoutMs : 300000,
          proxyTimeout: Number.isFinite(proxyTimeoutMs) ? proxyTimeoutMs : 300000,
        },
      },
    },
    build: {
      rollupOptions: {},
    },
  };
});
