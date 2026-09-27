import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

import { structuredData } from "./src/lib/seo";

function injectStructuredData(): Plugin {
  return {
    name: "inject-structured-data",
    transformIndexHtml(html) {
      const json = JSON.stringify(structuredData()).replace(/</g, "\\u003c");
      return html.replace(
        "<!-- STRUCTURED_DATA -->",
        `<script type="application/ld+json">${json}</script>`
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), injectStructuredData()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            {
              name: "react",
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            },
          ],
        },
      },
    },
  },
});
