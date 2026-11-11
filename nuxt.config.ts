// https://nuxt.com/docs/api/configuration/nuxt-config
import { projects } from './app/content/projects'
import tailwindcss from "@tailwindcss/vite";

const SITE_URL = 'https://www.joangarfias.me'
const SITE_TITLE = 'Joan Garfias | Desarrollador de Software · Backend & Cloud'
const SITE_DESCRIPTION = 'Construyo software con propósito desde Oaxaca, México. Desarrollador de software enfocado en backend, cloud e infraestructura.'

// Cada caso de estudio publicado se prerenderiza como HTML estático (los comentados en projects.ts no)
const projectRoutes = projects.map(p => p.links.caseStudy)

export default defineNuxtConfig({
  compatibilityDate: '2026-04-03',
  devtools: { enabled: true },
  routeRules: {
    // El stack ahora vive dentro de Proyectos
    '/habilidades': { redirect: { to: '/#stack', statusCode: 301 } }
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
      // NUXT_PUBLIC_SHOW_PENDING=false oculta los placeholders de contenido pendiente
      showPending: true
    }
  },
  app: {
    baseURL: '/',
    buildAssetsDir: 'assets',
    head: {
      htmlAttrs: {
        lang: 'es-MX'
      },
      title: SITE_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: SITE_DESCRIPTION },
        { name: 'author', content: 'Joan Garfias' },
        { name: 'theme-color', content: '#f3f4f1' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Joan Garfias' },
        { property: 'og:locale', content: 'es_MX' },
        { property: 'og:title', content: SITE_TITLE },
        { property: 'og:description', content: SITE_DESCRIPTION },
        // Provisional hasta tener la OG image 1200×630 (ver PENDIENTES.md)
        { property: 'og:image', content: `${SITE_URL}/joan.jpeg` },
        { property: 'og:image:alt', content: 'Retrato de Joan Garfias' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SITE_TITLE },
        { name: 'twitter:description', content: SITE_DESCRIPTION },
        { name: 'twitter:image', content: `${SITE_URL}/joan.jpeg` },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ],
      script: [
        // Marca que JS cargó: solo entonces se ocultan los elementos con reveal
        // También aplica el tema guardado antes del primer pintado (claro por defecto)
        { innerHTML: "(function(d){d.classList.add('js');var t='light';try{t=localStorage.getItem('theme')==='dark'?'dark':'light'}catch(e){}d.dataset.theme=t})(document.documentElement)", tagPosition: 'head' }
      ],
      noscript: [
        { innerHTML: '<style>.scroll-reveal{opacity:1!important;transform:none!important;filter:none!important}</style>' }
      ]
    }
  },
  nitro: {
    preset: 'github-pages',
    static: true,
    prerender: {
      crawlLinks: true,
      routes: ['/', '/proyectos', '/habilidades', '/sobre-mi', '/contacto', ...projectRoutes]
    }
  },
  experimental: {
    payloadExtraction: true
  },
  features: {
    // CSS de componentes dentro del HTML: evita hojas de estilo que bloquean el primer render
    inlineStyles: true
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
    build: {
      // Un solo CSS (que inlineStyles mete en el HTML) en lugar de varias hojas por componente
      cssCodeSplit: false
    }
  },
})
