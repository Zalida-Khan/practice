import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(), 
    viteStaticCopy({
      targets: [{ src: "src/formDescriptions.json", dest: "" }], // Copies the JSON file
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
