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
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      title: 'Joan Garfias | Desarrollador de Software & Creador Digital',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Joan Garfias - Desarrollador de software apasionado por crear experiencias digitales excepcionales, aplicaciones web robustas y soluciones tecnológicas innovadoras.' },
        { name: 'author', content: 'Joan Garfias' },
        { name: 'keywords', content: 'Joan Garfias, Desarrollador de Software, Web Developer, Nuxt 3, Vue.js, Portfolio, Programador, México' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://joangarfias.com/' },
        { property: 'og:title', content: 'Joan Garfias | Desarrollador de Software' },
        { property: 'og:description', content: 'Explora mi portafolio de proyectos de desarrollo web y software. Soluciones digitales con enfoque en rendimiento y experiencia de usuario.' },
        { property: 'og:image', content: 'https://joangarfias.com/og-image.png' },
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://joangarfias.com/' },
        { property: 'twitter:title', content: 'Joan Garfias | Desarrollador de Software' },
        { property: 'twitter:description', content: 'Explora mi portafolio de proyectos de desarrollo web y software. Soluciones digitales con enfoque en rendimiento y experiencia de usuario.' },
        { property: 'twitter:image', content: 'https://joangarfias.com/og-image.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://joangarfias.com/' }
      ]
    }
  },
  nitro: {
    preset: 'github-pages',
    static: true
  },
  experimental: {
    payloadExtraction: true
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
