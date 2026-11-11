<script setup lang="ts">
import { ArrowRight, ExternalLink } from 'lucide-vue-next'
import { communityIntro, eventsAttended, googleAmbassador, nexis } from '~/content/community'
import { communityEventsJsonLd } from '~/composables/useCommunity'

const { showPending } = usePending()
const { given, featured, counters, real } = useCommunity()

// Solo las charlas/talleres reales generan datos estructurados de evento
const { siteUrl } = useRuntimeConfig().public
const events = communityEventsJsonLd(real.value, siteUrl)
if (events.length) {
  useHead({ script: events.map(e => ({ type: 'application/ld+json', innerHTML: JSON.stringify(e) })) })
}
</script>

<template>
  <section id="comunidad" class="section-space">
    <header class="mb-12">
      <SectionLabel index="04" label="Comunidad" />
      <h2 class="section-title mt-6">
        Aprender. Construir. <span class="text-accent-word">Compartir.</span>
      </h2>
      <p v-if="communityIntro || showPending" class="section-copy mt-4">
        <ContentText :value="communityIntro" label="por qué me importa la comunidad tech en Oaxaca (1–2 frases)" />
      </p>
    </header>

    <!-- 1. Contadores -->
    <dl v-if="counters.length && (showPending || counters.some(c => c.value !== null))" class="counters">
      <div v-for="c in counters" :key="c.key" class="counter">
        <dt class="text-sm font-semibold text-ink-muted">{{ c.label }}</dt>
        <dd class="mt-2" :class="c.value !== null ? 'font-display text-5xl font-medium tracking-tight text-ink-strong' : 'text-sm'">
          <template v-if="c.value !== null">{{ c.approx ? '~' : '' }}<CountUp :value="c.value" /></template>
          <PendingText v-else :label="c.label.toLowerCase()" type="dato" />
        </dd>
      </div>
    </dl>
    <p v-if="counters.some(c => c.value !== null)" class="mt-3 text-sm text-ink-muted">
      Solo cuentan los eventos donde fui ponente, tallerista, moderador u organizador.
    </p>

    <!-- 2. Destacado -->
    <ScrollReveal v-if="featured" class="mt-12">
      <CommunityFeatured :entry="featured" />
    </ScrollReveal>

    <!-- 3. Línea de tiempo -->
    <ScrollReveal v-if="given.length" class="mt-16">
      <CommunityTimeline :entries="given" />
    </ScrollReveal>

    <!-- 3b. Eventos a los que asisto (fuera de las cifras) -->
    <ScrollReveal v-if="eventsAttended.length" class="mt-16">
      <CommunityAttended :events="eventsAttended" />
    </ScrollReveal>

    <!-- 4. Nexis Oaxaca Tech -->
    <ScrollReveal class="mt-20">
      <article class="nexis">
        <div class="nexis__media">
          <img v-if="nexis.photo" :src="nexis.photo" alt="Foto grupal de un evento de Nexis Oaxaca Tech" loading="lazy" class="h-full w-full object-cover" />
          <PendingSlot v-else type="foto" ratio="16/9" label="Foto grupal de un evento de Nexis" hint="Horizontal, mín. 1600×900px, JPG/WebP" />
        </div>
        <div class="flex flex-col gap-5 p-6 sm:p-8">
          <img src="/nexis-green.svg" alt="Nexis Oaxaca Tech" width="56" height="56" class="nexis__logo" />
          <div>
            <p class="eyebrow">{{ nexis.role }}</p>
            <h3 class="mt-3 font-display text-3xl font-medium tracking-tight">{{ nexis.name }}</h3>
          </div>
          <p class="text-lg leading-relaxed text-ink-body">{{ nexis.description }}</p>
          <p v-if="nexis.participation || showPending" class="leading-relaxed text-ink-body">
            <ContentText :value="nexis.participation" label="en qué he participado dentro de Nexis (1–2 frases)" />
          </p>
          <dl v-if="nexis.members || nexis.events || showPending" class="grid grid-cols-2 gap-4">
            <div>
              <dt class="text-sm text-ink-muted">Miembros</dt>
              <dd class="font-display text-3xl font-medium text-ink-strong"><ContentText :value="nexis.members" label="miembros" type="dato" /></dd>
            </div>
            <div>
              <dt class="text-sm text-ink-muted">Eventos</dt>
              <dd class="font-display text-3xl font-medium text-ink-strong"><ContentText :value="nexis.events" label="eventos" type="dato" /></dd>
            </div>
          </dl>
          <a v-if="nexis.url" :href="nexis.url" target="_blank" rel="noopener noreferrer" class="text-link">
            Conoce la comunidad <ExternalLink class="h-4 w-4" aria-hidden="true" /><span class="sr-only">(abre en otra pestaña)</span>
          </a>
          <p v-else-if="showPending"><PendingText label="link a Nexis Oaxaca Tech" type="link" /></p>
        </div>
      </article>
    </ScrollReveal>

    <!-- 5. Estudiantes Embajadores de Google -->
    <ScrollReveal class="mt-6">
      <article class="ambassador">
        <span class="ambassador__logo"><img :src="googleAmbassador.logo" alt="Google" width="32" height="32" class="h-8 w-8" /></span>
        <div class="min-w-0">
          <p class="eyebrow">{{ googleAmbassador.role }}</p>
          <h3 class="mt-2 font-display text-2xl font-medium tracking-tight">{{ googleAmbassador.name }}</h3>
          <p class="mt-2 leading-relaxed text-ink-body">{{ googleAmbassador.description }}</p>
        </div>
      </article>
    </ScrollReveal>

    <!-- 6. CTA secundario -->
    <div class="mt-16 flex flex-wrap items-center gap-4 border-t border-line pt-10">
      <p class="text-lg text-ink-body">¿Organizas un meetup, una clase o un hackathon?</p>
      <NuxtLink to="/contacto?asunto=evento" class="button-dark group">
        Invítame a tu evento
        <ArrowRight class="arrow-swap h-4 w-4" aria-hidden="true" />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.counters {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 1024px) {
  .counters { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

.counter {
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--surface-1);
  box-shadow: var(--shadow-card);
  padding: 1.25rem 1.5rem;
}

.nexis {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-feature);
  background: var(--surface-1);
  box-shadow: var(--shadow-card);
}

@media (min-width: 1024px) {
  .nexis { grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); align-items: center; }
}

.nexis__media {
  --pending-radius: 0;
  background: var(--surface-2);
}

/* Logo en el verde de Nexis (#2D8380); en tema oscuro, el mismo verde más claro */
.nexis__logo {
  width: 3.5rem;
  height: 3.5rem;
}

:root[data-theme="dark"] .nexis__logo { filter: brightness(1.7); }

.ambassador {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 1.25rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-feature);
  background: var(--surface-1);
  box-shadow: var(--shadow-card);
  padding: 1.5rem;
}

/* El logo de Google va sobre blanco en ambos temas para conservar sus colores */
.ambassador__logo {
  display: grid;
  width: 4rem;
  height: 4rem;
  place-items: center;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: #fff;
}

.text-link {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-strong);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}

.text-link:hover { color: var(--accent-ink); }
</style>
