import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
import { lingui } from "@lingui/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ["macros"],
    },
  }),
  lingui(),],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
