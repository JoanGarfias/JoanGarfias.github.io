<script setup>
import { ArrowRight, Download, MapPin } from 'lucide-vue-next'
</script>

<template>
  <section class="relative flex min-h-[min(920px,100svh)] items-center overflow-hidden px-4 pb-20 pt-32 sm:px-6">
    <div aria-hidden="true" class="absolute inset-0 pointer-events-none">
      <div class="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-cyan-400/10 blur-[110px]"></div>
      <div class="absolute bottom-[8%] right-[4%] h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]"></div>
      <div class="hero-grid absolute inset-0 opacity-35"></div>
    </div>

    <div class="site-container relative grid items-end gap-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
      <div class="max-w-5xl">
        <div class="eyebrow mb-8">Construyo software con propósito</div>

        <h1 class="display-title max-w-5xl uppercase">
          Construyo<br>
          <span class="text-slate-400">software que resuelve</span><br>
          <span class="bg-linear-to-r from-cyan-200 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            problemas reales.
          </span>
        </h1>

        <p class="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl md:leading-9">
          Soy Joan, desarrollador de software especializado en backend, cloud e infraestructura.
          Diseño productos rápidos, mantenibles y preparados para crecer.
        </p>

        <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <NuxtLink to="/proyectos" class="button-primary group" aria-label="Ver proyectos de Joan Garfias">
            Ver proyectos
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </NuxtLink>
          <NuxtLink to="/contacto" class="button-secondary">Hablemos</NuxtLink>
          <a href="/cv.pdf" download="CV_Joan_Garfias.pdf" class="button-secondary group" aria-label="Descargar currículum de Joan Garfias en PDF">
            <Download class="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            Descargar CV
          </a>
        </div>
      </div>

      <aside class="hidden border-l border-white/15 pl-7 lg:block" aria-label="Disponibilidad profesional">
        <span class="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-300"></span>
          </span>
          Disponible para colaborar
        </span>
        <p class="text-sm leading-6 text-slate-400">Proyectos web, producto digital y oportunidades de desarrollo.</p>
        <p class="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-200"><MapPin class="h-4 w-4 text-cyan-300" /> Oaxaca, México</p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero-grid {
  background-image: linear-gradient(rgba(148,163,184,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.045) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 75%, transparent);
}
</style>
