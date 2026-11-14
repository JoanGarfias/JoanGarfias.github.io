// https://nuxt.com/docs/api/configuration/nuxt-config
import { projects } from './app/content/projects'
import tailwindcss from "@tailwindcss/vite";

const SITE_URL = 'https://www.joangarfias.me'
const SITE_TITLE = 'Joan Garfias | Desarrollador de Software · Backend & Cloud'
const SITE_DESCRIPTION = 'Construyo software con propósito desde Oaxaca, México. Desarrollador de software enfocado en backend, cloud e infraestructura.'

// Cada caso de estudio publicado se prerenderiza como HTML estático (los comentados en projects.ts no)
const projectRoutes = projects.map(p => p.links.caseStudy)

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2026-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/image'],
  content: {
    // node:sqlite (Node ≥ 22.5) evita compilar better-sqlite3, que pnpm bloquea (allowBuilds)
    experimental: { sqliteConnector: 'native' },
    build: {
      markdown: {
        // Bloques de código con los dos temas; main.css elige según data-theme
        highlight: {
          theme: { default: 'github-light', dark: 'github-dark' },
          langs: ['ts', 'js', 'vue', 'bash', 'json', 'php', 'python', 'sql', 'yaml', 'diff']
        },
        toc: { depth: 3, searchDepth: 3 }
      }
    }
  },
  hooks: {
    // Minutos de lectura de cada post (~200 palabras por minuto, sin contar el frontmatter)
    // y ancho/alto de las imágenes locales del Markdown para reservar su espacio (sin saltos de layout)
    async 'content:file:afterParse'({ file, content, collection }) {
      if (collection.name !== 'blog' || typeof file.body !== 'string') return
      const words = file.body.replace(/^---[\s\S]*?---/, '').split(/\s+/).filter(Boolean).length
      content.readingTime = Math.max(1, Math.round(words / 200))

      const { default: sharp } = await import('sharp')
      // Nodos minimark: [tag, props, ...hijos]
      const visit = async (node: unknown): Promise<void> => {
        if (!Array.isArray(node)) return
        const [tag, props] = node as [string, Record<string, unknown>]
        if (tag === 'img' && typeof props?.src === 'string' && props.src.startsWith('/') && !props.width) {
          const meta = await sharp(`public${props.src}`).metadata().catch(() => null)
          if (meta?.width && meta.height) Object.assign(props, { width: meta.width, height: meta.height })
        }
        for (const child of node.slice(2)) await visit(child)
      }
      const body = content.body as { value?: unknown[] } | undefined
      for (const node of body?.value ?? []) await visit(node)
    }
  },
  image: {
    // En cloudflare-pages Nuxt Image elegiría 'none': ipxStatic optimiza durante el prerender
    // y escribe /_ipx/* como archivos estáticos (sin sharp en el worker)
    provider: 'ipxStatic',
    format: ['avif', 'webp'],
    quality: 75
  },
  // ipxStatic no sirve /_ipx en dev: ahí se usa ipx (sharp al vuelo)
  $development: {
    image: { provider: 'ipx' }
  },
  routeRules: {
    // El stack ahora vive dentro de Proyectos
    '/habilidades': { redirect: { to: '/#stack', statusCode: 301 } },
    '/**': { prerender: true }
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // Solo servidor (formulario de contacto): NUXT_RESEND_API_KEY y NUXT_CONTACT_EMAIL
    resendApiKey: '',
    contactEmail: '',
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
    // Cloudflare Pages: las páginas se prerenderizan como HTML estático y solo /api/* corre como Pages Function
    preset: 'cloudflare-pages',
    prerender: {
      crawlLinks: true,
      // Los posts entran por crawlLinks desde /blog (los draft no se enlazan, así que no se generan)
      routes: ['/', '/proyectos', '/habilidades', '/sobre-mi', '/contacto', '/blog', '/blog/rss.xml', ...projectRoutes]
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
