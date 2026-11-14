<script setup lang="ts">
import { Rss } from 'lucide-vue-next'

const { siteUrl } = useRuntimeConfig().public

// draft: true → fuera del listado (y como nadie los enlaza, tampoco se prerenderizan)
const { data: posts } = await useAsyncData('blog-index', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'date', 'cover', 'coverAlt', 'tags', 'readingTime')
    .all()
)

const title = 'Blog | Joan Garfias'
const description = 'Notas sobre backend, cloud y lo que aprendo construyendo software desde Oaxaca.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: absoluteUrl(siteUrl, DEFAULT_BLOG_OG),
  ogImageAlt: 'Blog de Joan Garfias',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: absoluteUrl(siteUrl, DEFAULT_BLOG_OG)
})

useHead({
  link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'Blog de Joan Garfias', href: `${siteUrl}/blog/rss.xml` }]
})
</script>

<template>
  <div class="pb-16 pt-6 lg:pt-10">
    <header class="max-w-3xl space-y-7">
      <div class="flex items-center gap-4">
        <SectionLabel index="//" label="Blog" />
        <span class="hidden h-px flex-1 bg-line sm:block"></span>
        <a href="/blog/rss.xml" class="inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted hover:text-accent-ink">
          <Rss class="h-4 w-4" aria-hidden="true" /> RSS
        </a>
      </div>
      <h1 class="display-title">Blog<span class="text-accent-word">.</span></h1>
      <p class="text-xl leading-8 text-ink-body">{{ description }}</p>
    </header>

    <ul v-if="posts?.length" class="mt-14 grid gap-6" role="list">
      <li v-for="(post, i) in posts" :key="post.path">
        <article class="post-card card group">
          <NuxtPicture
            v-if="post.cover"
            :src="post.cover"
            :alt="post.coverAlt ?? ''"
            width="1600"
            height="900"
            sizes="xs:100vw sm:100vw md:280px"
            format="avif,webp"
            :loading="i === 0 ? 'eager' : 'lazy'"
            class="contents"
            :img-attrs="{ class: 'post-card__cover', fetchpriority: i === 0 ? 'high' : undefined }"
          />
          <div class="post-card__body">
            <p class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
              <time :datetime="isoDate(post.date)">{{ formatPostDate(post.date) }}</time>
              <template v-if="post.readingTime">
                <span aria-hidden="true">·</span>
                <span>{{ post.readingTime }} min de lectura</span>
              </template>
            </p>
            <h2 class="post-card__title">
              <!-- El enlace cubre toda la tarjeta (::after) -->
              <NuxtLink :to="post.path" class="post-card__link">{{ post.title }}</NuxtLink>
            </h2>
            <p class="leading-7 text-ink-body">{{ post.description }}</p>
            <ul v-if="post.tags?.length" class="flex flex-wrap gap-2" aria-label="Etiquetas">
              <li v-for="tag in post.tags" :key="tag" class="chip">{{ tag }}</li>
            </ul>
          </div>
        </article>
      </li>
    </ul>

    <p v-else class="mt-14 text-ink-muted">Pronto habrá publicaciones aquí.</p>
  </div>
</template>

<style scoped>
.post-card {
  position: relative;
  display: grid;
  overflow: hidden;
  transition: border-color 200ms var(--ease-brand), transform 200ms var(--ease-brand);
}

.post-card:hover { border-color: var(--border-strong); }
.post-card:has(.post-card__link:focus-visible) { outline: 2px solid var(--accent-ink); outline-offset: 3px; }

.post-card :deep(.post-card__cover) {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background: var(--surface-2);
}

.post-card__body {
  display: grid;
  align-content: start;
  gap: 0.85rem;
  padding: 1.5rem;
}

.post-card__title {
  font-family: var(--font-heading);
  font-size: clamp(1.375rem, 2.6vw, 1.75rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: var(--text-strong);
}

.post-card__link { outline: none; }
.post-card__link::after { content: ''; position: absolute; inset: 0; }
.group:hover .post-card__link { color: var(--accent-ink); }

/* Las etiquetas quedan sobre el enlace para no romper la lectura con lector de pantalla */
.post-card__body > ul { position: relative; }

@media (min-width: 768px) {
  .post-card { grid-template-columns: 17.5rem minmax(0, 1fr); }
  .post-card :deep(.post-card__cover) { height: 100%; aspect-ratio: auto; min-height: 12rem; }
  .post-card__body { padding: 1.75rem 2rem; }
}
</style>
