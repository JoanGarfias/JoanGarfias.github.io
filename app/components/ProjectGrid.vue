<script setup>
import { featuredProjects, otherProjects } from '~/content/projects'

// En /proyectos este título es el H1 de la página; en la home es H2
const props = defineProps({ titleTag: { type: String, default: 'h2' } })
const level = computed(() => Number(props.titleTag.slice(1)) + 1)
const isPage = computed(() => props.titleTag === 'h1')

// Tecnología elegida en la banda de stack: resalta los proyectos que la usan
const activeTech = ref(null)
const usesTech = project => project.stack.includes(activeTech.value)
const dimmed = project => !!activeTech.value && !usesTech(project)
const highlighted = project => !!activeTech.value && usesTech(project)
</script>

<template>
  <section id="proyectos" class="section-space">
    <header class="mb-14 grid gap-6 border-b border-line pb-10 md:grid-cols-[1fr_26rem] md:items-end">
      <div>
        <span class="eyebrow mb-5">Trabajo seleccionado</span>
        <component :is="props.titleTag" class="display-title uppercase">Proyectos<span class="text-cyan-300/60">.</span></component>
      </div>
      <p class="section-copy md:justify-self-end">Casos de estudio: qué dolía, qué decidí y qué cambió.</p>
    </header>

    <div class="grid gap-10">
      <!-- En /proyectos la primera card está en pantalla al cargar: sin reveal y con prioridad -->
      <ScrollReveal v-for="(project, i) in featuredProjects" :key="project.slug" :disabled="isPage && i === 0">
        <ProjectFeaturedCard
          :project="project"
          :priority="isPage && i === 0"
          :title-tag="`h${level}`"
          :dimmed="dimmed(project)"
          :highlighted="highlighted(project)"
        />
      </ScrollReveal>
    </div>

    <div class="mt-16">
      <component :is="`h${level}`" class="mb-2 text-sm font-black uppercase tracking-[0.18em] text-ink-strong">Más proyectos</component>
      <ul class="border-t border-line">
        <li v-for="project in otherProjects" :key="project.slug">
          <ProjectRow :project="project" :dimmed="dimmed(project)" :highlighted="highlighted(project)" />
        </li>
      </ul>
    </div>

    <StackBand v-model="activeTech" :level="level" />
  </section>
</template>
