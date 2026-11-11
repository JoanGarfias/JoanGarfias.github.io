<script setup lang="ts">
import { typeLabels, type CommunityEntry, type CommunityType } from '~/content/community'
import { formatEventDate } from '~/composables/useCommunity'

const props = defineProps<{ entries: CommunityEntry[]; titleTag?: string }>()

const filters: { key: CommunityType | 'todo'; label: string }[] = [
  { key: 'todo', label: 'Todo' },
  { key: 'charla', label: 'Charlas' },
  { key: 'taller', label: 'Talleres' },
  { key: 'organizacion', label: 'Organización' }
]

const active = ref<CommunityType | 'todo'>('todo')
const visible = computed(() =>
  active.value === 'todo' ? props.entries : props.entries.filter(e => e.type === active.value)
)
const count = (key: CommunityType | 'todo') =>
  key === 'todo' ? props.entries.length : props.entries.filter(e => e.type === key).length
</script>

<template>
  <div>
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
      <component :is="props.titleTag ?? 'h3'" class="font-display text-2xl font-medium tracking-tight">Línea de tiempo</component>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
        <button
          v-for="f in filters"
          :key="f.key"
          type="button"
          class="filter-chip"
          :aria-pressed="active === f.key"
          @click="active = f.key"
        >
          {{ f.label }} <span class="filter-chip__count">({{ count(f.key) }})</span>
        </button>
      </div>
    </div>

    <TransitionGroup v-if="visible.length" tag="ol" name="timeline" class="timeline" aria-live="polite">
      <li v-for="(entry, i) in visible" :key="entry.id" class="timeline-item">
        <p class="timeline-item__date">
          <ContentText :value="formatEventDate(entry.date)" label="fecha" type="dato" />
        </p>
        <span class="timeline-item__dot" :class="{ 'is-latest': i === 0 }" aria-hidden="true"></span>
        <div class="timeline-item__body">
          <div class="timeline-item__thumb">
            <img v-if="entry.photo" :src="entry.photo" alt="" width="56" height="56" loading="lazy" class="h-full w-full object-cover" />
            <PendingSlot v-else type="foto" ratio="1/1" :label="`Miniatura de ${entry.title}`" />
          </div>
          <div class="min-w-0">
            <p class="text-xs font-medium uppercase tracking-[0.12em] text-accent-ink">{{ typeLabels[entry.type] }}</p>
            <p class="mt-1 font-display text-lg font-medium text-ink-strong"><ContentText :value="entry.title" /></p>
            <p class="mt-0.5 text-sm text-ink-muted"><ContentText :value="entry.event" /> · <ContentText :value="entry.city" /></p>
          </div>
        </div>
      </li>
    </TransitionGroup>
    <p v-else class="rounded-card border border-dashed border-line p-6 text-ink-muted" aria-live="polite">
      Todavía no hay entradas de este tipo.
    </p>
  </div>
</template>

<style scoped>
.filter-chip {
  min-height: 2.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card-sm);
  background: var(--surface-1);
  padding: 0.4rem 0.95rem;
  color: var(--text-strong);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 180ms var(--ease-brand), background-color 180ms var(--ease-brand), color 180ms var(--ease-brand);
}

.filter-chip:hover { border-color: var(--text-strong); }

.filter-chip__count { color: var(--text-muted); }

.filter-chip[aria-pressed="true"] {
  border-color: var(--text-strong);
  background: var(--text-strong);
  color: var(--surface-0);
}

.filter-chip[aria-pressed="true"] .filter-chip__count { color: inherit; opacity: 0.7; }

/* Fecha · punto sobre la línea · contenido */
.timeline {
  position: relative;
  display: grid;
}

.timeline::before {
  position: absolute;
  top: 0.75rem;
  bottom: 0.75rem;
  left: 0.3125rem;
  width: 1px;
  background: var(--border-strong);
  content: "";
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 0.625rem minmax(0, 1fr);
  column-gap: 1.25rem;
  padding-block: 1rem;
}

.timeline-item__date {
  grid-column: 2;
  color: var(--text-muted);
  font-size: 0.875rem;
}

.timeline-item__dot {
  grid-row: 1;
  grid-column: 1;
  position: relative;
  width: 0.625rem;
  height: 0.625rem;
  margin-top: 0.35rem;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--surface-0);
}

.timeline-item__dot.is-latest::after {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--accent);
  animation: ripple-fade 1.8s ease-out infinite;
  content: "";
}

.timeline-item__body {
  grid-column: 2;
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr);
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

@media (min-width: 768px) {
  .timeline::before { left: calc(8rem + 1.25rem + 0.3125rem); }

  .timeline-item { grid-template-columns: 8rem 0.625rem minmax(0, 1fr); }
  .timeline-item__date { grid-row: 1; grid-column: 1; text-align: right; }
  .timeline-item__dot { grid-column: 2; }
  .timeline-item__body { grid-row: 1; grid-column: 3; margin-top: 0; }
}

.timeline-item__thumb {
  --pending-radius: var(--radius-card-sm);
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--radius-card-sm);
}

.timeline-enter-active,
.timeline-leave-active { transition: opacity 300ms var(--ease-brand), transform 300ms var(--ease-brand); }
.timeline-enter-from,
.timeline-leave-to { opacity: 0; transform: translateX(-12px); }
.timeline-leave-active { position: absolute; }
</style>
