<script setup>
import { ArrowRight, MapPin } from 'lucide-vue-next'
import { now } from '~/content/now'

// Retrato temporal: /joan.jpeg existe. Cambia a null para mostrar el PendingSlot.
const portrait = { src: '/joan.jpeg', width: 1440, height: 1440, alt: 'Retrato de Joan Garfias' }
</script>

<template>
  <section id="inicio" class="relative overflow-hidden pb-20 pt-32 lg:pt-40">
    <div aria-hidden="true" class="absolute inset-0 pointer-events-none">
      <div class="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-cyan-400/10 blur-[110px]"></div>
      <div class="absolute bottom-[8%] right-[4%] h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]"></div>
      <div class="hero-grid absolute inset-0 opacity-35"></div>
    </div>

    <div class="site-container relative grid grid-cols-4 gap-x-6 gap-y-12 lg:grid-cols-12 lg:items-end">
      <div class="col-span-4 lg:col-span-8">
        <p class="eyebrow mb-8">Backend &amp; Cloud · Desde Oaxaca, México</p>

        <h1 class="display-title uppercase">
          Construyo<br>
          <span class="text-ink-title-2">software que resuelve</span><br>
          <span class="text-gradient">problemas reales.</span>
        </h1>

        <p class="mt-8 max-w-2xl text-lg leading-8 text-ink-body md:text-xl md:leading-9">
          Soy Joan, desarrollador de software especializado en backend, cloud e infraestructura.
          Diseño productos rápidos, mantenibles y preparados para crecer.
        </p>

        <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <NuxtLink to="/#proyectos" class="button-primary group">
            Ver proyectos
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink to="/#contacto" class="button-secondary">Hablemos</NuxtLink>
        </div>

        <p v-if="now.text || $config.public.showPending" class="now-line mt-8">
          <span class="text-ink-title-2">Ahora mismo:</span>
          <span v-if="now.text" class="text-ink-body">{{ now.text }}</span>
          <PendingText v-else label="qué estoy haciendo hoy (1 línea)" />
        </p>
      </div>

      <figure class="col-span-4 mx-auto w-full max-w-sm sm:max-w-md lg:col-span-4 lg:max-w-none">
        <div class="portrait">
          <ProjectImage
            v-if="portrait"
            :image="portrait"
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 448px, 100vw"
            loading="eager"
            class="h-full w-full object-cover"
          />
          <PendingSlot
            v-else
            type="foto"
            ratio="4/5"
            label="Retrato principal de Joan (fondo oscuro, luz lateral)"
            hint="Mín. 1200×1500px, JPG/WebP"
          />
        </div>

        <figcaption class="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
          <span class="status-badge">
            <span class="relative flex h-2 w-2" aria-hidden="true">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-50"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-status"></span>
            </span>
            Disponible para colaborar
          </span>
          <span class="flex items-center gap-2 text-sm font-semibold text-ink-body">
            <MapPin class="h-4 w-4 text-accent" aria-hidden="true" /> Oaxaca, México
          </span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero-grid {
  background-image: linear-gradient(rgba(148,163,184,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.045) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 75%, transparent);
}

.portrait {
  --pending-radius: var(--radius-feature);
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-feature);
  background: var(--surface-1);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border: 1px solid rgba(110, 231, 183, 0.3);
  border-radius: 999px;
  background: rgba(110, 231, 183, 0.08);
  padding: 0.45rem 0.85rem;
  color: var(--green-status);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.now-line {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}
</style>
