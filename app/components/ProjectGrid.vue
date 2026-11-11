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

// La tarjeta de perfil muestra el proyecto que cruza el centro del viewport
const activeProject = useActiveProject()
const cards = ref([])
let observer = null
const inView = new Set()

onMounted(() => {
  if (!('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const slug = entry.target.dataset.slug
      entry.isIntersecting ? inView.add(slug) : inView.delete(slug)
    }
    activeProject.value = [...inView].at(-1) ?? null
  }, { rootMargin: '-45% 0px -45% 0px' })
  cards.value.forEach(el => observer.observe(el))
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (inView.has(activeProject.value)) activeProject.value = null
})
</script>

<template>
  <section id="proyectos" class="section-space">
    <header class="mb-12">
      <SectionLabel index="01" label="Proyectos destacados" />
      <component :is="props.titleTag" class="section-title mt-6 max-w-[22ch]">
        Casos de estudio: <span class="text-soft">qué dolía, qué decidí y qué cambió.</span>
      </component>
    </header>

    <div class="grid gap-16">
      <!-- En /proyectos la primera card está en pantalla al cargar: sin reveal y con prioridad -->
      <div v-for="(project, i) in featuredProjects" :key="project.slug" ref="cards" :data-slug="project.slug">
        <ScrollReveal :disabled="isPage && i === 0">
          <ProjectFeaturedCard
            :project="project"
            :priority="isPage && i === 0"
            :title-tag="`h${level}`"
            :dimmed="dimmed(project)"
            :highlighted="highlighted(project)"
          />
        </ScrollReveal>
      </div>
    </div>

    <div class="mt-20">
      <component :is="`h${level}`" class="mb-4 font-display text-2xl font-medium tracking-tight">Más proyectos</component>
      <ul class="border-t border-line">
        <li v-for="project in otherProjects" :key="project.slug">
          <ProjectRow :project="project" :dimmed="dimmed(project)" :highlighted="highlighted(project)" />
        </li>
      </ul>
    </div>

    <StackBand v-model="activeTech" :level="level" />
  </section>
</template>
