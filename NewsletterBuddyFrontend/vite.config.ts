import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
    }
  }
}

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

export default defineConfig({
  plugins: [preact()],
  server: {
    host: true,
    port: PORT,
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
