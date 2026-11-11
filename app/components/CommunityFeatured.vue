<script setup lang="ts">
import { BookOpen, ExternalLink, Github, Presentation, Youtube } from 'lucide-vue-next'
import { roleLabels, typeLabels, type CommunityEntry } from '~/content/community'
import { formatEventDate } from '~/composables/useCommunity'

const props = defineProps<{ entry: CommunityEntry; titleTag?: string }>()

// Solo se muestran los recursos que tienen URL
const resources = computed(() => [
  { key: 'slides', label: 'Slides', icon: Presentation, url: props.entry.resources?.slides },
  { key: 'repo', label: 'Repositorio', icon: Github, url: props.entry.resources?.repo },
  { key: 'video', label: 'Video', icon: Youtube, url: props.entry.resources?.video },
  { key: 'post', label: 'Artículo', icon: BookOpen, url: props.entry.resources?.post },
  { key: 'event', label: 'Ver encuentro', icon: ExternalLink, url: props.entry.url }
].filter(r => r.url))
</script>

<template>
  <article class="featured-talk">
    <div class="featured-talk__media">
      <img
        v-if="entry.photo"
        :src="entry.photo"
        :alt="`Joan impartiendo ${entry.title} en ${entry.event}`"
        loading="lazy"
        class="h-full w-full object-cover"
      />
      <PendingSlot
        v-else
        type="foto"
        ratio="3/2"
        :label="`Foto de Joan impartiendo ${entry.placeholder ? 'la charla destacada' : entry.title}`"
        hint="Horizontal, que se vea el público o la pantalla, mín. 1600px"
      />
    </div>

    <div class="flex flex-col gap-5 p-6 sm:p-8">
      <p class="eyebrow">Destacado · {{ typeLabels[entry.type] }}</p>
      <component :is="props.titleTag ?? 'h3'" class="font-display text-2xl font-medium leading-tight tracking-tight md:text-3xl">
        <ContentText :value="entry.title" />
      </component>
      <p class="font-meta text-sm text-ink-muted">
        <ContentText :value="entry.event" /> · <ContentText :value="entry.city" /> ·
        <ContentText :value="formatEventDate(entry.date)" label="fecha" type="dato" />
      </p>

      <dl class="grid grid-cols-2 gap-4 text-[0.9375rem]">
        <div>
          <dt class="dl-term">Rol</dt>
          <dd class="text-ink-body">{{ roleLabels[entry.role] }}</dd>
        </div>
        <div>
          <dt class="dl-term">Audiencia</dt>
          <dd class="text-ink-body"><ContentText :value="entry.audience" label="audiencia aprox., ej. ~60 estudiantes" type="dato" /></dd>
        </div>
        <div class="col-span-2">
          <dt class="dl-term">Qué se llevó la gente</dt>
          <dd class="leading-relaxed text-ink-body"><ContentText :value="entry.takeaway" label="qué aprendió la gente / qué aprendí yo (1–2 frases)" /></dd>
        </div>
      </dl>

      <ul v-if="resources.length" class="flex flex-wrap gap-3">
        <li v-for="r in resources" :key="r.key">
          <a :href="r.url" target="_blank" rel="noopener noreferrer" class="button-secondary min-h-11 px-4 py-2">
            <component :is="r.icon" class="h-4 w-4" aria-hidden="true" />
            {{ r.label }}<span class="sr-only"> (abre en otra pestaña)</span>
          </a>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.featured-talk {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-feature);
  background: var(--surface-1);
  box-shadow: var(--shadow-card);
}

@media (min-width: 1024px) {
  .featured-talk { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); align-items: center; }
}

.featured-talk__media {
  --pending-radius: 0;
  height: 100%;
  background: var(--surface-2);
}

.dl-term {
  margin-bottom: 0.2rem;
  color: var(--text-strong);
  font-size: 0.8125rem;
  font-weight: 600;
}
</style>
