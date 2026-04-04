// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2026-04-03',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/',
    buildAssetsDir: 'assets',
  },
  nitro: {
    preset: 'github-pages'
  },
  build: {
    transpile: ['gsap'],
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
})
