<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/content/projects'

const props = defineProps<{
  project: Project
  dimmed?: boolean
  highlighted?: boolean
}>()
</script>

<template>
  <NuxtLink
    :to="project.links.caseStudy"
    class="project-row group"
    :class="{ 'is-dimmed': props.dimmed, 'is-highlighted': props.highlighted }"
  >
    <span class="font-meta text-sm text-ink-muted">{{ project.number }}</span>
    <span class="min-w-0">
      <span class="block font-display text-xl font-medium tracking-tight text-ink-strong md:text-2xl">{{ project.name }}</span>
      <span class="mt-1 block text-[0.9375rem] leading-relaxed text-ink-muted">{{ project.summary }}</span>
    </span>
    <span class="hidden flex-wrap gap-1.5 md:flex" aria-label="Tecnologías">
      <span v-for="tech in project.stack.slice(0, 3)" :key="tech" class="chip">{{ tech }}</span>
    </span>
    <span class="text-sm text-ink-muted md:text-right">{{ project.year }}</span>
    <span class="project-row__arrow" aria-hidden="true"><ArrowUpRight class="arrow-swap h-4 w-4" /></span>
  </NuxtLink>
</template>

<style scoped>
.project-row {
  position: relative;
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  align-items: start;
  gap: 0.5rem 1.25rem;
  border-bottom: 1px solid var(--border-subtle);
  padding: 1.5rem 0.5rem;
  transition: opacity 300ms var(--ease-brand), background-color 300ms var(--ease-brand), padding 300ms var(--ease-brand);
}

.project-row > :nth-child(4) { grid-column: 2; }
.project-row__arrow { display: none; }

@media (min-width: 768px) {
  .project-row {
    grid-template-columns: 2.5rem minmax(0, 1fr) minmax(0, 15rem) 6.5rem 2.25rem;
    align-items: center;
  }
  .project-row > :nth-child(4) { grid-column: auto; }

  .project-row__arrow {
    display: grid;
    width: 2.25rem;
    height: 2.25rem;
    place-items: center;
    overflow: hidden;
    border-radius: 999px;
    background: var(--surface-2);
    color: var(--text-strong);
    transition: background-color 250ms var(--ease-brand), color 250ms var(--ease-brand);
  }

  .project-row:hover .project-row__arrow {
    background: var(--accent);
    color: var(--on-accent);
  }
}

.project-row:hover,
.project-row.is-highlighted {
  background: var(--surface-1);
  padding-inline: 1rem;
}

.project-row.is-dimmed { opacity: 0.35; }
</style>
