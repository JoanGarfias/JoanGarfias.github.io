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
    <span class="font-meta text-sm font-black tracking-[0.2em] text-accent-soft">{{ project.number }}</span>
    <span class="min-w-0">
      <span class="block text-lg font-bold text-ink-strong transition-colors group-hover:text-accent-soft md:text-xl">{{ project.name }}</span>
      <span class="mt-1 block text-[0.9375rem] leading-relaxed text-ink-muted">{{ project.summary }}</span>
    </span>
    <span class="hidden flex-wrap gap-1.5 md:flex" aria-label="Tecnologías">
      <span v-for="tech in project.stack.slice(0, 3)" :key="tech" class="chip">{{ tech }}</span>
    </span>
    <span class="font-meta text-sm text-ink-muted md:text-right">{{ project.year }}</span>
    <ArrowUpRight class="hidden h-5 w-5 text-ink-muted transition-all duration-180 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block" aria-hidden="true" />
  </NuxtLink>
</template>

<style scoped>
.project-row {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  align-items: start;
  gap: 0.5rem 1.25rem;
  border-bottom: 1px solid var(--border-subtle);
  padding: 1.5rem 0.25rem;
  transition: opacity 300ms var(--ease-brand), background-color 300ms var(--ease-brand);
}

.project-row > :nth-child(4) { grid-column: 2; }

@media (min-width: 768px) {
  .project-row {
    grid-template-columns: 3rem minmax(0, 1fr) minmax(0, 16rem) 7rem 1.25rem;
    align-items: center;
  }
  .project-row > :nth-child(4) { grid-column: auto; }
}

.project-row:hover,
.project-row.is-highlighted { background: rgba(103, 232, 249, 0.04); }

.project-row.is-dimmed { opacity: 0.35; }

.chip {
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  background: var(--surface-1);
  padding: 0.2rem 0.6rem;
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 700;
}
</style>
