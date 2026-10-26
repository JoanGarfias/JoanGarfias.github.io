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
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <component :is="props.titleTag ?? 'h3'" class="text-sm font-black uppercase tracking-[0.18em] text-ink-strong">Línea de tiempo</component>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
        <button
          v-for="f in filters"
          :key="f.key"
          type="button"
          class="filter-chip"
          :aria-pressed="active === f.key"
          @click="active = f.key"
        >
          {{ f.label }} <span class="text-ink-muted">({{ count(f.key) }})</span>
        </button>
      </div>
    </div>

    <ol v-if="visible.length" class="grid gap-3" aria-live="polite">
      <li v-for="entry in visible" :key="entry.id" class="timeline-item">
        <div class="timeline-item__thumb">
          <img v-if="entry.photo" :src="entry.photo" alt="" width="72" height="72" loading="lazy" class="h-full w-full object-cover" />
          <PendingSlot v-else type="foto" ratio="1/1" :label="`Miniatura de ${entry.title}`" />
        </div>
        <div class="min-w-0">
          <p class="font-meta text-xs uppercase tracking-[0.14em] text-accent-soft">
            <ContentText :value="formatEventDate(entry.date)" label="fecha" type="dato" /> · {{ typeLabels[entry.type] }}
          </p>
          <p class="mt-1 font-bold text-ink-strong"><ContentText :value="entry.title" /></p>
          <p class="mt-0.5 text-sm text-ink-muted"><ContentText :value="entry.event" /> · <ContentText :value="entry.city" /></p>
        </div>
      </li>
    </ol>
    <p v-else class="rounded-card border border-dashed border-line p-6 text-ink-muted" aria-live="polite">
      Todavía no hay entradas de este tipo.
    </p>
  </div>
</template>

<style scoped>
.filter-chip {
  min-height: 2.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  background: var(--surface-2);
  padding: 0.4rem 0.95rem;
  color: var(--text-body);
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 180ms var(--ease-brand), background-color 180ms var(--ease-brand);
}

.filter-chip:hover { border-color: rgba(103, 232, 249, 0.45); }

.filter-chip[aria-pressed="true"] {
  border-color: var(--cyan);
  background: rgba(103, 232, 249, 0.12);
  color: var(--text-strong);
}

.timeline-item {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr);
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--gradient-glass);
  padding: 0.75rem;
}

.timeline-item__thumb {
  --pending-radius: var(--radius-card-sm);
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--radius-card-sm);
}
</style>
