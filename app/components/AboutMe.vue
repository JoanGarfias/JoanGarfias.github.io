<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
import { aboutCards, aboutCredentials, aboutParagraphs, aboutPhoto, aboutQuote, aboutTitle } from '~/content/about'

// En su página propia este título es el H1; en la home es H2
const props = defineProps({ titleTag: { type: String, default: 'h2' } })
const cardTag = computed(() => `h${Number(props.titleTag.slice(1)) + 1}`)
const appConfig = useAppConfig()
const { showPending } = usePending()
const hasDraftParagraphs = aboutParagraphs.some(p => p.draft)
</script>

<template>
  <section id="sobre-mi" class="section-space">
    <SectionLabel index="03" label="Sobre mí" />

    <component :is="props.titleTag" class="section-title mt-6 max-w-[22ch]">
      {{ aboutTitle.lead }} <span class="text-soft">{{ aboutTitle.soft }}</span>
    </component>

    <div class="mt-10 grid gap-10" :class="{ 'md:grid-cols-[minmax(0,1fr)_16rem]': aboutPhoto || showPending }">
      <div>
        <blockquote class="pull-quote">
          <p>“{{ aboutQuote }}”</p>
        </blockquote>
        <div class="mt-8 max-w-2xl space-y-4 leading-[1.75] text-ink-body">
          <p v-for="p in aboutParagraphs" :key="p.text">{{ p.text }}</p>
          <DraftTag v-if="hasDraftParagraphs" />
        </div>

        <ul class="mt-8 flex flex-wrap gap-2" aria-label="Credenciales">
          <li v-for="c in aboutCredentials" :key="c.label" class="credential">
            <span v-if="c.icon && c.wide" class="credential__logo">
              <img :src="`/icons/${c.icon}`" :alt="c.iconAlt ?? ''" width="73" height="20" class="h-5 w-auto" />
            </span>
            <img v-else-if="c.icon" :src="`/icons/${c.icon}`" alt="" width="18" height="18" class="h-[18px] w-[18px] object-contain" />
            {{ c.label }}
          </li>
        </ul>

        <NuxtLink to="/#contacto" class="button-dark group mt-8">
          Escríbeme <ArrowUpRight class="arrow-swap h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>

      <div v-if="aboutPhoto || showPending" class="about-photo">
        <img
          v-if="aboutPhoto"
          :src="aboutPhoto.src"
          :width="aboutPhoto.width"
          :height="aboutPhoto.height"
          :alt="aboutPhoto.alt"
          loading="lazy"
          class="h-full w-full object-cover"
        />
        <PendingSlot
          v-else
          type="foto"
          ratio="4/5"
          label="Foto casual de Joan (fuera de la oficina: beatbox, cancha, Oaxaca)"
          hint="Vertical 4/5, mín. 1200×1500px, JPG/WebP"
        />
      </div>
    </div>

    <WaveDivider v-if="appConfig.signature" class="my-14" />

    <ul class="border-t border-line">
      <ScrollReveal v-for="(card, i) in aboutCards" :key="card.title" as="li" :delay="i * 90" class="about-row">
        <span class="font-meta text-sm text-ink-muted">0{{ i + 1 }}</span>
        <div>
          <component :is="cardTag" class="font-display text-xl font-medium tracking-tight md:text-2xl">{{ card.title }}</component>
          <p class="mt-2 max-w-2xl leading-relaxed text-ink-body">{{ card.text }}</p>
          <DraftTag v-if="card.draft" class="mt-3" />
        </div>
      </ScrollReveal>
    </ul>
  </section>
</template>

<style scoped>
.about-photo {
  --pending-radius: var(--radius-feature);
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: var(--radius-feature);
  background: var(--surface-1);
}

.credential {
  display: inline-flex;
  min-height: 2.25rem;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card-sm);
  background: var(--surface-1);
  padding: 0.35rem 0.75rem;
  color: var(--text-strong);
  font-size: 0.8125rem;
  font-weight: 500;
}

/* Logotipos horizontales: sobre blanco para que se lean en ambos temas */
.credential__logo {
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  background: #fff;
  padding: 0.2rem 0.4rem;
}

.pull-quote {
  border-left: 3px solid var(--accent);
  padding-left: 1.25rem;
  color: var(--text-strong);
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 2.2vw, 1.625rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.35;
}

.about-row {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: 1.25rem;
  border-bottom: 1px solid var(--border-subtle);
  padding: 1.75rem 0.5rem;
}
</style>
