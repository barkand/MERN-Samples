import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

import { manifest } from "./manifest";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000, // 5 mb
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: [
        "./public/favicon.ico",
        "./public/robots.txt",
        "./public/pwa/favicon.png",
      ],
      manifest: manifest,
      devOptions: { enabled: true },
    }),
  ],
  server: {
    port: 3000,
  },
});
