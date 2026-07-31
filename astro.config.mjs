import { defineConfig } from "astro/config";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://slicebill.app",
  output: "static",
  redirects: {
    // Shorter URLs used by the mobile app
    "/privacy": "/pl/privacy-policy/",
    "/en/privacy": "/en/privacy-policy/",
    "/terms": "/pl/terms-of-service/",
    "/en/terms": "/en/terms-of-service/",

    // Redirects from legacy Polish localized URLs to new symmetric URLs
    "/pl/polityka-prywatnosci": "/pl/privacy-policy/",
    "/pl/regulamin": "/pl/terms-of-service/",
    "/pl/polityka-cookies": "/pl/cookie-policy/",
    "/pl/polityka-cookie": "/pl/cookie-policy/",

    // Redirects for historical mismatched URLs from the old language switcher bug
    "/en/regulamin": "/en/terms-of-service/",
    "/en/polityka-prywatnosci": "/en/privacy-policy/",
    "/en/polityka-cookies": "/en/cookie-policy/",
  },
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
  },
});
