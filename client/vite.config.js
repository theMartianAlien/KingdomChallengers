import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";
import sass from 'sass'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
    css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  base: process.env.VITE_BASE_PATH //|| '/KingdomChallengers/client'
})