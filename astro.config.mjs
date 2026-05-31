import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://slicebill.app",
  output: "static",
  integrations: [tailwind()],
});
