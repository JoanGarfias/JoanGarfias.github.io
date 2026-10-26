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
</script>

<template>
  <article
    class="featured-card group"
    :class="{ 'is-dimmed': props.dimmed, 'is-highlighted': props.highlighted }"
  >
    <div class="featured-media">
      <ProjectImage
        v-if="project.cover"
        :image="project.cover"
        :priority="props.priority"
        sizes="(min-width: 1024px) 720px, 100vw"
        class="h-full w-full object-cover object-top transition duration-500 ease-brand group-hover:scale-[1.03]"
      />
      <PendingSlot v-else type="foto" ratio="16/10" :label="`Portada de ${project.name}`" hint="Captura horizontal, mín. 1600×1000px, WebP" />
    </div>

    <div class="flex flex-col gap-6 p-6 sm:p-8">
      <div>
        <span class="font-meta text-sm font-black tracking-[0.2em] text-accent-soft">{{ project.number }}</span>
        <component :is="props.titleTag ?? 'h3'" class="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
          <NuxtLink :to="project.links.caseStudy" class="featured-title">{{ project.name }}</NuxtLink>
        </component>
        <p class="mt-1 text-sm text-ink-muted">{{ project.year }} · {{ project.role }}</p>
      </div>

      <dl class="grid gap-4 text-[0.9375rem] leading-relaxed">
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

      <div class="flex flex-wrap items-center gap-3">
        <span v-if="project.metric" class="metric">{{ project.metric }}</span>
        <DraftTag v-if="project.draft" />
      </div>

      <ul class="flex flex-wrap gap-2" aria-label="Tecnologías">
        <li v-for="tech in project.stack" :key="tech" class="chip">{{ tech }}</li>
      </ul>

      <NuxtLink :to="project.links.caseStudy" class="case-link mt-auto">
        Ver caso de estudio <span class="sr-only">de {{ project.name }}</span>
        <ArrowUpRight class="h-4 w-4 transition-transform duration-180 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.featured-card {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--gradient-glass);
  transition: border-color 400ms var(--ease-brand), transform 400ms var(--ease-brand), opacity 300ms var(--ease-brand), box-shadow 400ms var(--ease-brand);
}

@media (min-width: 1024px) {
  .featured-card { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
}

.featured-card:hover,
.featured-card.is-highlighted {
  transform: translateY(-2px);
  border-color: rgba(103, 232, 249, 0.45);
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.3);
}

.featured-card.is-dimmed { opacity: 0.35; }

.featured-media {
  --pending-radius: 0;
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--surface-1);
}

@media (min-width: 1024px) {
  .featured-media { aspect-ratio: auto; min-height: 100%; }
}

.featured-title { transition: color 180ms var(--ease-brand); }
.featured-title:hover { color: var(--cyan-soft); }

.dl-term {
  margin-bottom: 0.2rem;
  color: var(--cyan-soft);
  font-family: var(--font-meta);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.metric {
  border-radius: 999px;
  background: rgba(103, 232, 249, 0.12);
  padding: 0.3rem 0.75rem;
  color: var(--cyan-soft);
  font-size: 0.875rem;
  font-weight: 800;
}

.chip {
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  background: var(--surface-1);
  padding: 0.25rem 0.7rem;
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 700;
}

.case-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--cyan);
  font-size: 0.9375rem;
  font-weight: 800;
}

.case-link:hover { color: var(--cyan-strong); }
</style>
