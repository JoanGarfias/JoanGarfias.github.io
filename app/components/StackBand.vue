<script setup lang="ts">
import { ArrowUpRight, Award } from 'lucide-vue-next'
import { projectsUsing } from '~/content/projects'
import { certifications, stackGroups } from '~/content/stack'

// level: nivel del titular "Stack" (3 en la home, 2 en /proyectos donde Proyectos es H1)
const props = withDefaults(defineProps<{ level?: number }>(), { level: 3 })

// v-model: tecnología seleccionada (resalta los proyectos que la usan)
const activeTech = defineModel<string | null>({ default: null })

// Hover previsualiza; clic fija la selección (y la quita si ya estaba)
const hoverTech = ref<string | null>(null)
const shownTech = computed(() => hoverTech.value ?? activeTech.value)
const usedIn = computed(() => (shownTech.value ? projectsUsing(shownTech.value) : []))

const toggle = (name: string) => {
  activeTech.value = activeTech.value === name ? null : name
}
</script>

<template>
  <div id="stack" class="stack-band">
    <SectionLabel index="02" label="Stack" />
    <component :is="`h${props.level}`" class="section-title mt-6 max-w-[24ch]">
      Las herramientas detrás de <span class="text-soft">cada proyecto.</span>
    </component>
    <p class="mt-4 max-w-xl text-ink-body">Elige una tecnología para ver en qué proyectos la usé.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-2">
      <div v-for="group in stackGroups" :key="group.title" class="card p-6">
        <component :is="`h${props.level + 1}`" class="mb-4 text-sm font-semibold text-ink-strong">{{ group.title }}</component>
        <ul class="flex flex-wrap gap-2">
          <li v-for="item in group.items" :key="item.name">
            <button
              type="button"
              class="tech-chip"
              :aria-pressed="activeTech === item.name"
              @click="toggle(item.name)"
              @mouseenter="hoverTech = item.name"
              @mouseleave="hoverTech = null"
              @focus="hoverTech = item.name"
              @blur="hoverTech = null"
            >
              <img v-if="item.icon" :src="`/icons/${item.icon}`" alt="" width="18" height="18" class="h-[18px] w-[18px] object-contain" />
              {{ item.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <p class="used-in" aria-live="polite">
      <template v-if="shownTech && usedIn.length">
        <span class="text-ink-muted">{{ shownTech }} en:&nbsp;</span>
        <template v-for="(project, i) in usedIn" :key="project.slug">
          <NuxtLink :to="project.links.caseStudy" class="used-in__link">{{ project.name }}</NuxtLink><span v-if="i < usedIn.length - 1" class="text-ink-muted">, </span>
        </template>
      </template>
      <span v-else-if="shownTech" class="text-ink-muted">Aún no tengo un caso de estudio publicado con {{ shownTech }}.</span>
    </p>

    <component :is="`h${props.level + 1}`" class="mt-12 flex items-center gap-2 text-sm font-semibold text-ink-strong">
      <Award class="h-4 w-4 text-accent-ink" aria-hidden="true" /> Certificaciones
    </component>
    <ul class="mt-4 border-t border-line">
      <li v-for="cert in certifications" :key="cert.code">
        <a :href="cert.url" target="_blank" rel="noopener noreferrer" class="cert-row group">
          <div class="min-w-0">
            <p class="font-display text-xl font-medium tracking-tight text-ink-strong md:text-2xl">{{ cert.issuer }}</p>
            <p class="mt-1 text-sm leading-relaxed text-ink-muted">{{ cert.description }}</p>
          </div>
          <span class="flex items-center gap-3 text-sm font-medium text-ink-strong">
            <span class="font-meta whitespace-nowrap">{{ cert.code }}</span>
            <span class="cert-row__arrow"><ArrowUpRight class="arrow-swap h-4 w-4" aria-hidden="true" /></span>
            <span class="sr-only">Ver credencial en Credly (abre en otra pestaña)</span>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.stack-band {
  margin-top: 6rem;
}

.tech-chip {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card-sm);
  background: var(--surface-0);
  padding: 0.5rem 0.95rem;
  color: var(--text-strong);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 180ms var(--ease-brand), background-color 180ms var(--ease-brand), color 180ms var(--ease-brand), transform 180ms var(--ease-brand);
}

.tech-chip:hover { border-color: var(--text-strong); }
.tech-chip:active { transform: scale(0.96); }

.tech-chip[aria-pressed="true"] {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--on-accent);
}

.used-in {
  min-height: 1.75rem;
  margin-top: 1.25rem;
  font-size: 0.9375rem;
}

.used-in__link {
  color: var(--text-strong);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.cert-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid var(--border-subtle);
  padding: 1.5rem 0.5rem;
  transition: background-color 300ms var(--ease-brand), padding 300ms var(--ease-brand);
}

.cert-row:hover {
  background: var(--surface-1);
  padding-inline: 1rem;
}

.cert-row__arrow {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  overflow: hidden;
  border-radius: 999px;
  background: var(--surface-2);
  transition: background-color 250ms var(--ease-brand);
}

.cert-row:hover .cert-row__arrow {
  background: var(--accent);
  color: var(--on-accent);
}

@media (min-width: 768px) {
  .cert-row { flex-direction: row; align-items: center; justify-content: space-between; }
}
</style>
