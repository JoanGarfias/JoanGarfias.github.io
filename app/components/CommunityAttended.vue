<script setup lang="ts">
import { ArrowUpRight, MapPin } from 'lucide-vue-next'
import type { AttendedEvent } from '~/content/community'
import { formatEventDate } from '~/composables/useCommunity'

const props = defineProps<{ events: AttendedEvent[]; titleTag?: string }>()

// "2026" se muestra tal cual; una fecha ISO completa como "abr 2026"
const when = (date?: string) => (!date ? null : /^\d{4}$/.test(date) ? date : formatEventDate(date))
</script>

<template>
  <div>
    <component :is="props.titleTag ?? 'h3'" class="font-display text-2xl font-medium tracking-tight">También me encuentras en</component>
    <p class="mt-2 max-w-xl text-sm text-ink-muted">Eventos a los que asisto o me invitan a participar. No se suman a las cifras de arriba.</p>

    <ul class="attended mt-6">
      <li v-for="e in props.events" :key="e.title" class="attended__item">
        <component
          :is="e.url ? 'a' : 'div'"
          :href="e.url"
          :target="e.url ? '_blank' : undefined"
          :rel="e.url ? 'noopener noreferrer' : undefined"
          class="attended__card"
          :class="{ 'group is-link': e.url }"
        >
          <img v-if="e.photo" :src="e.photo" :alt="`${e.title}`" loading="lazy" class="attended__photo" />
          <span class="attended__role">{{ e.role }}</span>
          <span class="mt-3 block font-display text-lg font-medium leading-snug text-ink-strong">
            {{ e.title }}<span v-if="e.url" class="sr-only"> (abre en otra pestaña)</span>
          </span>
          <span v-if="e.city || e.date" class="mt-2 flex items-center gap-1.5 text-sm text-ink-muted">
            <MapPin v-if="e.city" class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {{ [e.city, when(e.date)].filter(Boolean).join(' · ') }}
          </span>
          <ArrowUpRight v-if="e.url" class="attended__arrow arrow-swap h-4 w-4" aria-hidden="true" />
        </component>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.attended {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .attended { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1280px) {
  .attended { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

/* Más ligero que las tarjetas de charlas: borde punteado y sin foto */
.attended__card {
  position: relative;
  display: block;
  height: 100%;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-card);
  padding: 1.1rem 1.25rem;
  transition: border-color 200ms var(--ease-brand), background-color 200ms var(--ease-brand);
}

.attended__card.is-link:hover {
  border-style: solid;
  border-color: var(--text-strong);
  background: var(--surface-1);
}

.attended__photo {
  display: block;
  width: calc(100% + 2.5rem);
  aspect-ratio: 16 / 9;
  margin: -1.1rem -1.25rem 1rem;
  border-radius: var(--radius-card) var(--radius-card) 0 0;
  object-fit: cover;
}

.attended__role {
  display: inline-flex;
  border-radius: 6px;
  background: var(--surface-2);
  padding: 0.15rem 0.5rem;
  color: var(--text-body);
  font-family: var(--font-meta);
  font-size: 0.75rem;
}

.attended__arrow {
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  color: var(--text-muted);
}
</style>
