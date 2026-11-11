<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/content/projects'

const props = defineProps<{
  project: Project
  dimmed?: boolean
  highlighted?: boolean
  titleTag?: string
  priority?: boolean
}>()

// Barra de "navegador" sobre la captura: dominio real si el proyecto está publicado
const host = computed(() => (props.project.links.live ? new URL(props.project.links.live).host : `${props.project.slug}.local`))
</script>

<template>
  <article
    class="featured-card group"
    :class="{ 'is-dimmed': props.dimmed, 'is-highlighted': props.highlighted }"
  >
    <NuxtLink :to="project.links.caseStudy" class="featured-media" tabindex="-1" aria-hidden="true">
      <span class="featured-media__bar">
        <span class="featured-media__dots"><i></i><i></i><i></i></span>
        <span class="featured-media__url">{{ host }}</span>
        <span class="font-meta">{{ project.number }}</span>
      </span>
      <span class="featured-media__shot">
      <ProjectImage
        v-if="project.cover"
        :image="project.cover"
        :priority="props.priority"
        sizes="(min-width: 1280px) 900px, (min-width: 1024px) 60vw, 100vw"
        class="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-brand group-hover:scale-[1.04]"
      />
      <PendingSlot v-else type="foto" ratio="16/10" :label="`Portada de ${project.name}`" hint="Captura horizontal, mín. 1600×1000px, WebP" />
      </span>
      <span class="featured-media__cta">
        <ArrowUpRight class="arrow-swap h-5 w-5" aria-hidden="true" />
      </span>
    </NuxtLink>

    <div class="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
      <div>
        <p class="font-meta text-xs uppercase tracking-[0.14em] text-ink-muted">{{ project.number }} · {{ project.year }} · {{ project.role }}</p>
        <component :is="props.titleTag ?? 'h3'" class="mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl">
          <NuxtLink :to="project.links.caseStudy" class="featured-title">{{ project.name }}</NuxtLink>
        </component>
        <p class="mt-3 max-w-2xl leading-relaxed text-ink-body">{{ project.summary }}</p>
      </div>
      <div class="flex flex-wrap items-center gap-2 md:justify-end">
        <span v-if="project.metric" class="metric">{{ project.metric }}</span>
        <DraftTag v-if="project.draft" />
      </div>
    </div>

    <dl class="mt-6 grid gap-5 border-t border-line pt-6 text-[0.9375rem] leading-relaxed md:grid-cols-3">
      <div>
        <dt class="dl-term">Problema</dt>
        <dd class="text-ink-body">
          <template v-if="project.problem">{{ project.problem }}</template>
          <PendingText v-else :label="`${project.name}: ¿qué dolía antes?`" />
        </dd>
      </div>
      <div>
        <dt class="dl-term">Decisión</dt>
        <dd class="text-ink-body">
          <template v-if="project.decision">{{ project.decision }}</template>
          <PendingText v-else :label="`${project.name}: decisión técnica clave y por qué`" />
        </dd>
      </div>
      <div>
        <dt class="dl-term">Resultado</dt>
        <dd class="text-ink-body">
          <template v-if="project.result">{{ project.result }}</template>
          <PendingText v-else :label="`${project.name}: qué cambió (solo si ya es real)`" />
        </dd>
      </div>
    </dl>

    <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
      <ul class="flex flex-wrap gap-2" aria-label="Tecnologías">
        <li v-for="tech in project.stack" :key="tech" class="chip">{{ tech }}</li>
      </ul>
      <NuxtLink :to="project.links.caseStudy" class="case-link">
        Ver caso de estudio <span class="sr-only">de {{ project.name }}</span>
        <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.featured-card {
  transition: opacity 300ms var(--ease-brand);
}

.featured-card.is-dimmed { opacity: 0.35; }

.featured-media {
  --pending-radius: 0;
  position: relative;
  display: block;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-feature);
  background: var(--surface-1);
  box-shadow: var(--shadow-card);
  transition: box-shadow 400ms var(--ease-brand), transform 400ms var(--ease-brand);
}

/* Barra tipo navegador */
.featured-media__bar {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  border-bottom: 1px solid var(--border-subtle);
  padding: 0.6rem 0.9rem;
  color: var(--text-muted);
  font-size: 0.75rem;
}

.featured-media__dots { display: flex; gap: 0.35rem; }

.featured-media__dots i {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  background: var(--border-strong);
  transition: background-color 300ms var(--ease-brand);
}

.featured-card:hover .featured-media__dots i:first-child { background: var(--accent); }

.featured-media__url {
  flex: 1;
  overflow: hidden;
  border-radius: 6px;
  background: var(--surface-2);
  padding: 0.2rem 0.7rem;
  font-family: var(--font-meta);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.featured-media__shot {
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--surface-inverse);
}

.featured-card:hover .featured-media,
.featured-card.is-highlighted .featured-media {
  box-shadow: var(--shadow-float);
}

.featured-card:hover .featured-card.is-highlighted .featured-media { outline: 3px solid var(--accent); outline-offset: 4px; }

/* Botón flotante que aparece al pasar el cursor */
.featured-media__cta {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  place-items: center;
  overflow: hidden;
  border-radius: var(--radius-card);
  background: var(--accent);
  color: var(--on-accent);
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 300ms var(--ease-brand), transform 400ms var(--ease-brand);
}

.featured-card:hover .featured-media__cta {
  opacity: 1;
  transform: scale(1);
}

.featured-title {
  background: linear-gradient(var(--accent), var(--accent)) no-repeat 0 92% / 0 0.12em;
  transition: background-size 400ms var(--ease-brand);
}

.featured-title:hover { background-size: 100% 0.12em; }

.dl-term {
  margin-bottom: 0.3rem;
  color: var(--text-strong);
  font-size: 0.8125rem;
  font-weight: 600;
}

.metric {
  border-radius: 6px;
  background: var(--accent);
  padding: 0.3rem 0.8rem;
  color: var(--on-accent);
  font-size: 0.8125rem;
  font-weight: 600;
}

.case-link {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-strong);
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}

.case-link:hover { color: var(--accent-ink); }
</style>
