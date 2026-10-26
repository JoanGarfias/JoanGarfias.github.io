<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'
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
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <component :is="`h${props.level}`" class="eyebrow">Stack</component>
        <p class="mt-3 max-w-xl text-[0.9375rem] text-ink-muted">Elige una tecnología para ver en qué proyectos la usé.</p>
      </div>
    </div>

    <div class="grid gap-8 lg:grid-cols-2">
      <div v-for="group in stackGroups" :key="group.title">
        <component :is="`h${props.level + 1}`" class="mb-4 text-sm font-black uppercase tracking-[0.18em] text-ink-strong">{{ group.title }}</component>
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
        <span class="text-ink-title-2">{{ shownTech }} en:&nbsp;</span>
        <template v-for="(project, i) in usedIn" :key="project.slug">
          <NuxtLink :to="project.links.caseStudy" class="used-in__link">{{ project.name }}</NuxtLink><span v-if="i < usedIn.length - 1" class="text-ink-title-2">, </span>
        </template>
      </template>
      <span v-else-if="shownTech" class="text-ink-muted">Aún no tengo un caso de estudio publicado con {{ shownTech }}.</span>
    </p>

    <ul class="mt-10 grid gap-4">
      <li v-for="cert in certifications" :key="cert.code">
        <a :href="cert.url" target="_blank" rel="noopener noreferrer" class="cert-card group">
          <div class="max-w-2xl space-y-2">
            <p class="text-xs font-black uppercase tracking-[0.18em] text-accent-soft">{{ cert.issuer }}</p>
            <p class="text-xl font-black uppercase tracking-tight text-ink-strong md:text-2xl">{{ cert.code }}</p>
            <p class="text-sm leading-relaxed text-ink-body md:text-base">{{ cert.description }}</p>
          </div>
          <span class="inline-flex items-center gap-2 text-sm font-semibold text-accent-soft transition-colors group-hover:text-ink-strong">
            Ver credencial en Credly
            <ExternalLink class="h-4 w-4" aria-hidden="true" />
            <span class="sr-only">(abre en otra pestaña)</span>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.stack-band {
  scroll-margin-top: 6rem;
  border-top: 1px solid var(--border-subtle);
  margin-top: 4rem;
  padding-top: 3rem;
}

.tech-chip {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card-sm);
  background: var(--surface-2);
  padding: 0.5rem 0.9rem;
  color: var(--text-body);
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 180ms var(--ease-brand), background-color 180ms var(--ease-brand), color 180ms var(--ease-brand);
}

.tech-chip:hover { border-color: rgba(103, 232, 249, 0.45); }

.tech-chip[aria-pressed="true"] {
  border-color: var(--cyan);
  background: rgba(103, 232, 249, 0.12);
  color: var(--text-strong);
}

.used-in {
  min-height: 1.75rem;
  margin-top: 1.5rem;
  font-family: var(--font-meta);
  font-size: 0.875rem;
}

.used-in__link {
  color: var(--cyan);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: rgba(103, 232, 249, 0.35);
  text-underline-offset: 3px;
}

.cert-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-feature);
  background: var(--gradient-glass);
  padding: 1.5rem;
  transition: border-color 400ms var(--ease-brand), transform 400ms var(--ease-brand);
}

.cert-card:hover { transform: translateY(-2px); border-color: rgba(103, 232, 249, 0.35); }

@media (min-width: 768px) {
  .cert-card { flex-direction: row; align-items: center; justify-content: space-between; padding: 2rem; }
}
</style>
