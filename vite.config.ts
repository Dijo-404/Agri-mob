import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api/disease": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  // componentTagger can cause native crashes in some environments; keep the
  // plugin disabled to ensure dev/build stability.
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
