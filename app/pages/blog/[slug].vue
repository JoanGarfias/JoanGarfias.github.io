<script setup lang="ts">
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-vue-next'

const route = useRoute()
const appConfig = useAppConfig()
const { siteUrl } = useRuntimeConfig().public
const path = `/blog/${route.params.slug}`

// Los posts publicados se prerenderizan. Si una URL no prerenderizada llega al worker de Cloudflare,
// no hay base de datos (D1) donde consultar: se trata como inexistente (404) en lugar de un 500
const { data: post } = await useAsyncData(`blog-${path}`, () =>
  queryCollection('blog').path(path).first().catch(() => null)
)

// Los borradores existen en la base pero no se publican
if (!post.value || post.value.draft) {
  throw createError({ statusCode: 404, statusMessage: 'Publicación no encontrada', fatal: true })
}

// Vecinos por fecha (más reciente primero): [más nuevo, más antiguo]
const { data: surround } = await useAsyncData(`blog-surround-${path}`, () =>
  queryCollectionItemSurroundings('blog', path, { fields: ['description'] })
    .where('draft', '=', false)
    .order('date', 'DESC')
    .catch(() => [])
)
const newer = computed(() => surround.value?.[0] ?? null)
const older = computed(() => surround.value?.[1] ?? null)

// Índice solo si el post tiene 3 o más encabezados (h2 + h3)
type TocLink = { id: string; text: string; children?: TocLink[] }
const tocLinks = computed<TocLink[]>(() => post.value?.body?.toc?.links ?? [])
const headingCount = computed(() => tocLinks.value.reduce((n, l) => n + 1 + (l.children?.length ?? 0), 0))

const p = post.value
// Igual que en ProseImg: una portada sin texto alternativo no se publica (el build falla)
if (p.cover && !p.coverAlt?.trim() && import.meta.prerender) {
  throw new Error(`[blog] ${path}: la portada necesita coverAlt (describe qué se ve en la imagen)`)
}
const url = `${siteUrl}${path}`
const image = absoluteUrl(siteUrl, p.cover ?? DEFAULT_BLOG_OG)
const imageAlt = p.cover ? (p.coverAlt ?? p.title) : 'Blog de Joan Garfias'

useSeoMeta({
  title: `${p.title} | Blog de Joan Garfias`,
  description: p.description,
  ogType: 'article',
  ogTitle: p.title,
  ogDescription: p.description,
  ogImage: image,
  ogImageAlt: imageAlt,
  twitterTitle: p.title,
  twitterDescription: p.description,
  twitterImage: image,
  twitterImageAlt: imageAlt,
  articlePublishedTime: new Date(p.date).toISOString(),
  articleModifiedTime: new Date(p.updated ?? p.date).toISOString(),
  articleAuthor: [`${siteUrl}/`],
  articleTag: p.tags
})

useHead({
  link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'Blog de Joan Garfias', href: `${siteUrl}/blog/rss.xml` }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      image,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      datePublished: new Date(p.date).toISOString(),
      dateModified: new Date(p.updated ?? p.date).toISOString(),
      inLanguage: 'es-MX',
      keywords: p.tags.join(', '),
      author: { '@type': 'Person', name: appConfig.person.name, url: `${siteUrl}/` },
      publisher: { '@type': 'Person', name: appConfig.person.name, url: `${siteUrl}/` }
    })
  }]
})
</script>

<template>
  <div v-if="post" class="pb-16 pt-6 lg:pt-10">
    <NuxtLink to="/blog" class="button-secondary group mb-10">
      <ArrowLeft class="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
      Blog
    </NuxtLink>

    <article class="mx-auto max-w-[45rem]">
      <header class="space-y-6">
        <p class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
          <time :datetime="isoDate(post.date)">{{ formatPostDate(post.date) }}</time>
          <template v-if="post.readingTime">
            <span aria-hidden="true">·</span>
            <span>{{ post.readingTime }} min de lectura</span>
          </template>
          <template v-if="post.updated">
            <span aria-hidden="true">·</span>
            <span>Actualizado el <time :datetime="isoDate(post.updated)">{{ formatPostDate(post.updated) }}</time></span>
          </template>
        </p>
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="text-xl leading-8 text-ink-body">{{ post.description }}</p>
        <ul v-if="post.tags.length" class="flex flex-wrap gap-2" aria-label="Etiquetas">
          <li v-for="tag in post.tags" :key="tag" class="chip">{{ tag }}</li>
        </ul>
      </header>

      <NuxtPicture
        v-if="post.cover"
        :src="post.cover"
        :alt="post.coverAlt ?? ''"
        width="1600"
        height="900"
        sizes="xs:100vw sm:100vw md:720px"
        format="avif,webp"
        loading="eager"
        :preload="{ fetchPriority: 'high' }"
        class="post-cover"
        :img-attrs="{ fetchpriority: 'high' }"
      />

      <nav v-if="headingCount >= 3" class="post-toc card" aria-labelledby="toc-title">
        <h2 id="toc-title" class="post-toc__title">En este post</h2>
        <ol>
          <li v-for="link in tocLinks" :key="link.id">
            <a :href="`#${link.id}`">{{ link.text }}</a>
            <ol v-if="link.children?.length">
              <li v-for="child in link.children" :key="child.id"><a :href="`#${child.id}`">{{ child.text }}</a></li>
            </ol>
          </li>
        </ol>
      </nav>

      <ContentRenderer :value="post" class="prose-site mt-12" />

      <nav v-if="newer || older" class="post-pager" aria-label="Más publicaciones">
        <NuxtLink v-if="older" :to="older.path" class="post-pager__link card group">
          <span class="flex items-center gap-2 text-sm text-ink-muted"><ArrowLeft class="h-4 w-4" aria-hidden="true" /> Anterior</span>
          <span class="post-pager__title">{{ older.title }}</span>
        </NuxtLink>
        <NuxtLink v-if="newer" :to="newer.path" class="post-pager__link post-pager__link--next card group">
          <span class="flex items-center justify-end gap-2 text-sm text-ink-muted">Siguiente <ArrowRight class="h-4 w-4" aria-hidden="true" /></span>
          <span class="post-pager__title">{{ newer.title }}</span>
        </NuxtLink>
      </nav>

      <aside class="post-cta" aria-labelledby="post-cta-title">
        <h2 id="post-cta-title" class="font-display text-2xl font-medium text-white">¿Te sirvió o tienes un proyecto en mente?</h2>
        <p class="my-4 text-sm leading-6 text-white/70">Escríbeme y conversemos sobre el problema, el alcance y la mejor forma de construirlo.</p>
        <NuxtLink to="/contacto" class="button-primary group">Hablemos <ArrowUpRight class="arrow-swap h-4 w-4" aria-hidden="true" /></NuxtLink>
      </aside>
    </article>
  </div>
</template>

<style scoped>
.post-title {
  color: var(--text-strong);
  font-family: var(--font-heading);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 1.08;
}

.post-cover {
  display: block;
  margin-top: 2.5rem;
}

.post-cover :deep(img) {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-feature);
  background: var(--surface-2);
  box-shadow: var(--shadow-card);
}

.post-toc {
  margin-top: 2.5rem;
  padding: 1.25rem 1.5rem;
  font-size: 0.9375rem;
}

.post-toc__title {
  margin-bottom: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-meta);
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
}

.post-toc ol { display: grid; gap: 0.4rem; }
.post-toc ol ol { margin-top: 0.4rem; padding-left: 1rem; }
.post-toc a { color: var(--text-body); }
.post-toc a:hover { color: var(--accent-ink); }

.post-pager {
  display: grid;
  gap: 1rem;
  margin-top: 4rem;
  border-top: 1px solid var(--border-subtle);
  padding-top: 2.5rem;
}

.post-pager__link {
  display: grid;
  gap: 0.4rem;
  padding: 1.1rem 1.25rem;
  transition: border-color 200ms var(--ease-brand);
}

.post-pager__link:hover { border-color: var(--border-strong); }
.post-pager__link--next { text-align: right; }

.post-pager__title {
  color: var(--text-strong);
  font-family: var(--font-heading);
  font-weight: 500;
  line-height: 1.3;
}

.post-cta {
  margin-top: 3rem;
  border-radius: var(--radius-feature);
  background: var(--surface-inverse);
  padding: 1.75rem;
}

@media (min-width: 640px) {
  .post-pager { grid-template-columns: 1fr 1fr; }
  .post-pager__link--next { grid-column: 2; }
}
</style>
