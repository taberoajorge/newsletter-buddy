import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  server: {
    host: true,
    port: 8000,
    proxy: {
      '/send-email': 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      components: "/src/components",
    },
  },
});
