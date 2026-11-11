// Genera /sitemap.xml en cada build a partir de las páginas que Nitro prerenderiza:
// cualquier página nueva (o caso de estudio en projects.ts) entra sola, sin lista manual.
// Se excluyen redirecciones (p. ej. /habilidades), errores y archivos que no son HTML.
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'

const EXCLUDED = [/^\/api\//, /^\/_/, /^\/(200|404)(\.html)?$/]

export default defineNuxtModule({
  meta: { name: 'sitemap' },
  setup(_options, nuxt) {
    const siteUrl = String(nuxt.options.runtimeConfig.public.siteUrl).replace(/\/$/, '')

    nuxt.hook('nitro:init', (nitro) => {
      const pages = new Set<string>()

      nitro.hooks.hook('prerender:generate', (route) => {
        // Variantes con query (p. ej. /contacto?asunto=evento) son la misma página
        if (route.error || route.skip || route.route.includes('?')) return
        if (!route.contentType?.includes('text/html')) return
        // Las redirecciones prerenderizadas son HTML con meta refresh
        if (route.contents?.includes('http-equiv="refresh"')) return
        const path = route.route.replace(/\/index\.html$|\.html$/, '') || '/'
        if (EXCLUDED.some(rx => rx.test(path))) return
        pages.add(path)
      })

      nitro.hooks.hook('prerender:done', async () => {
        if (!pages.size) throw new Error('[sitemap] No se prerenderizó ninguna página: sitemap.xml no se puede generar')
        const urls = [...pages]
          .sort((a, b) => a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b))
          .map(path => `  <url><loc>${siteUrl}${path === '/' ? '/' : path}</loc></url>`)
          .join('\n')
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
        await writeFile(join(nitro.options.output.publicDir, 'sitemap.xml'), xml)
        nitro.logger.success(`[sitemap] sitemap.xml generado con ${pages.size} URLs`)
      })
    })
  }
})
