<script setup>
import { aboutCards, aboutParagraphs, aboutPhoto, aboutQuote } from '~/content/about'

// En su página propia este título es el H1; en la home es H2
const props = defineProps({ titleTag: { type: String, default: 'h2' } })
const cardTag = computed(() => `h${Number(props.titleTag.slice(1)) + 1}`)
const appConfig = useAppConfig()
const hasDraftParagraphs = aboutParagraphs.some(p => p.draft)
</script>

<template>
  <section id="sobre-mi" class="section-space">
    <div class="site-container">
      <WaveDivider v-if="appConfig.signature" class="mb-16 md:mb-20" />

      <div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
        <div class="order-last lg:order-first lg:col-span-5">
          <div class="about-photo">
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

        <!-- "CONSTRUYENDO" ≈ 7.6em de ancho -->
        <div class="title-fit lg:col-span-7" style="--title-fit: 12.4cqi">
          <span class="eyebrow mb-6">Sobre mí</span>
          <component :is="props.titleTag" class="display-title uppercase">
            Construyendo<br>
            <span class="text-ink-title-2">con propósito.</span>
          </component>

          <blockquote class="pull-quote mt-12">
            <p>“{{ aboutQuote }}”</p>
          </blockquote>

          <div class="mt-10 max-w-2xl space-y-5 text-base leading-[1.8] text-ink-body md:text-lg">
            <p v-for="p in aboutParagraphs" :key="p.text">{{ p.text }}</p>
            <DraftTag v-if="hasDraftParagraphs" />
          </div>
        </div>
      </div>

      <ul class="mt-16 grid gap-5 md:grid-cols-3">
        <li v-for="card in aboutCards" :key="card.title" class="about-card">
          <component :is="cardTag" class="text-xl font-extrabold leading-tight tracking-tight">{{ card.title }}</component>
          <p class="mt-3 leading-relaxed text-ink-body">{{ card.text }}</p>
          <DraftTag v-if="card.draft" class="mt-4" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.about-photo {
  --pending-radius: var(--radius-feature);
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-feature);
  background: var(--surface-1);
}

.pull-quote {
  border-left: 3px solid var(--cyan);
  padding-left: 1.5rem;
  color: var(--text-strong);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.25;
  text-wrap: balance;
}

.about-card {
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--gradient-glass);
  padding: 1.75rem;
}
</style>
