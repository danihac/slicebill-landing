import { defineConfig } from "astro/config";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://slicebill.app",
  output: "static",
  redirects: {
    "/pl/polityka-cookie": "/pl/polityka-cookies",
  },
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
  },
});
