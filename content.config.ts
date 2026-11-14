// Colecciones de Nuxt Content. Los casos de estudio no pasan por aquí: siguen en app/content/proyectos (useProjects).
import { defineCollection, defineContentConfig, property } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    // content/blog/{slug}.md → /blog/{slug}
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        // title y description ya vienen en las colecciones 'page'; aquí se vuelven obligatorios
        title: z.string().min(1),
        description: z.string().min(1),
        date: z.date(),
        updated: z.date().optional(),
        // Ruta dentro de public/ (Studio sube las imágenes a public/images/blog/)
        cover: property(z.string()).editor({ input: 'media' }).optional(),
        // Obligatorio si hay portada (se valida en la página)
        coverAlt: z.string().optional(),
        tags: z.array(z.string()).default([]),
        // true → no aparece en /blog, RSS ni sitemap y su URL da 404
        draft: z.boolean().default(false),
        // Lo calcula el hook content:file:afterParse (nuxt.config.ts); no se escribe a mano
        readingTime: property(z.number()).editor({ hidden: true }).optional()
      })
    })
  }
})
