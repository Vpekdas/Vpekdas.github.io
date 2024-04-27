import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Vpekdas.github.io/' : './',
  build: {
    minify: "terser",
  },
})