<script setup lang="ts">
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github, Users } from 'lucide-vue-next'

const route = useRoute()
const { getProjectById } = useProjects()
const project = ref<any>(null)
const activeImage = ref(0)
const contentRef = ref<HTMLElement | null>(null)
let contentObserver: IntersectionObserver | null = null

onMounted(async () => {
  project.value = await getProjectById(route.params.id as string)
  if (!project.value) return

  useHead({
    title: `${project.value.title} | Proyecto de Joan Garfias`,
    meta: [
      { name: 'description', content: project.value.description },
      { property: 'og:title', content: `${project.value.title} | Joan Garfias` },
      { property: 'og:description', content: project.value.description },
      { property: 'og:image', content: project.value.images?.[0] || 'https://joangarfias.com/og-image.png' }
    ]
  })

  await nextTick()
  const blocks = contentRef.value?.querySelectorAll(':scope > h2, :scope > p, :scope > ul')
  if (!blocks?.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    blocks?.forEach(block => block.classList.add('is-visible'))
    return
  }
  contentObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      contentObserver?.unobserve(entry.target)
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' })
  blocks.forEach(block => contentObserver?.observe(block))
})

onBeforeUnmount(() => contentObserver?.disconnect())

const next = () => {
  if (project.value?.images?.length) activeImage.value = (activeImage.value + 1) % project.value.images.length
}
const prev = () => {
  if (project.value?.images?.length) activeImage.value = (activeImage.value - 1 + project.value.images.length) % project.value.images.length
}
const projectInfo = computed(() => project.value ? {
  Periodo: project.value.period,
  Equipo: project.value.team,
  Rol: project.value.role,
  Ubicación: project.value.location
} : null)
</script>

<template>
  <div v-if="project" class="min-h-screen bg-slate-950 px-4 pb-24 pt-28 sm:px-6 lg:pt-32">
    <div class="mx-auto max-w-7xl">
      <NuxtLink to="/proyectos" class="group mb-12 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-300 transition hover:text-cyan-200 lg:mb-16">
        <ArrowLeft class="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Proyectos
      </NuxtLink>

      <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14 xl:gap-20">
        <main class="space-y-16 lg:col-span-8 lg:space-y-20">
          <header class="space-y-7">
            <div class="flex flex-wrap items-center gap-4">
              <span class="eyebrow">Detalles del proyecto</span>
              <span class="hidden h-px flex-1 bg-white/10 sm:block"></span>
              <time class="text-xs font-bold uppercase tracking-[0.14em] text-slate-300">{{ project.period }}</time>
            </div>
            <h1 class="display-title uppercase">{{ project.title }}<span class="text-cyan-300/60">.</span></h1>
            <p class="max-w-3xl text-xl leading-8 text-slate-300 md:text-2xl md:leading-10">{{ project.description }}</p>
          </header>

          <section class="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl shadow-black/30" aria-label="Galería destacada del proyecto">
            <TransitionGroup name="carousel">
              <img v-for="(img, idx) in project.images" v-show="activeImage === idx" :key="img" :src="img" :alt="`Captura ${idx + 1} de ${project.title}`" class="absolute inset-0 h-full w-full object-cover" />
            </TransitionGroup>
            <div class="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-slate-950/80 to-transparent p-4 pt-16 sm:p-6">
              <div class="flex items-center gap-1.5" aria-hidden="true">
                <span v-for="(_, idx) in project.images" :key="idx" class="h-1.5 rounded-full transition-all duration-300" :class="activeImage === idx ? 'w-10 bg-cyan-200' : 'w-3 bg-white/45'"></span>
              </div>
              <div class="flex gap-2">
                <button type="button" @click="prev" class="carousel-control" aria-label="Imagen anterior"><ArrowLeft class="h-5 w-5" /></button>
                <button type="button" @click="next" class="carousel-control" aria-label="Imagen siguiente"><ArrowRight class="h-5 w-5" /></button>
              </div>
            </div>
          </section>

          <section>
            <span class="eyebrow mb-8">Caso de estudio</span>
            <div ref="contentRef" class="case-study prose prose-invert prose-lg max-w-none" v-html="project.content"></div>
          </section>

          <ScrollReveal v-if="project.images.length > 1" as="section">
            <div class="mb-8 flex items-center gap-5"><h2 class="text-sm font-black uppercase tracking-[0.2em] text-slate-200">Galería</h2><span class="h-px flex-1 bg-white/10"></span></div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <figure v-for="(img, idx) in project.images.slice(1)" :key="img" class="group aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                <img :src="img" :alt="`Detalle ${idx + 2} de ${project.title}`" loading="lazy" class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
              </figure>
            </div>
          </ScrollReveal>

          <section v-if="project.demo || project.github" class="flex flex-wrap gap-4 border-t border-white/10 pt-10">
            <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer" class="button-primary group">Ver demo en vivo <ExternalLink class="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer" class="button-secondary group">Ver repositorio <Github class="h-4 w-4 transition-transform group-hover:scale-110" /></a>
          </section>
        </main>

        <aside class="lg:col-span-4" aria-label="Metadatos del proyecto">
          <div class="space-y-6 lg:sticky lg:top-28">
            <div v-if="projectInfo" class="glass-panel rounded-3xl p-6 sm:p-8">
              <dl class="space-y-6">
                <div v-for="(value, key) in projectInfo" :key="key" class="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                  <dt class="mb-1.5 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">{{ key }}</dt>
                  <dd class="text-base font-semibold leading-6 text-slate-100">{{ value }}</dd>
                </div>
              </dl>

              <div class="mt-7 border-t border-white/10 pt-7">
                <h2 class="mb-4 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">Tecnologías</h2>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in project.technologies" :key="tech" class="rounded-full border border-slate-600 bg-slate-900/80 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100 hover:shadow-[0_0_18px_rgba(34,211,238,0.1)]">{{ tech }}</span>
                </div>
              </div>

              <details v-if="project.teamSize > 1" class="group mt-7 border-t border-white/10 pt-7">
                <summary class="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-sm font-bold text-slate-200 marker:hidden hover:text-cyan-200">
                  <span class="flex items-center gap-2"><Users class="h-4 w-4 text-cyan-300" /> Colaboradores</span>
                  <span class="text-xs text-slate-400">{{ project.teamSize }} personas</span>
                </summary>
                <ul v-if="project.collaborators" class="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-l border-cyan-300/30 pl-4">
                  <li v-for="collab in project.collaborators" :key="collab" class="text-sm text-slate-400">{{ collab }}</li>
                </ul>
              </details>
            </div>

            <div class="relative overflow-hidden rounded-3xl border border-cyan-300/25 bg-cyan-300/[0.07] p-7">
              <div aria-hidden="true" class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-300/15 blur-3xl"></div>
              <div class="relative">
                <h2 class="text-xl font-bold text-white">¿Tienes un proyecto similar?</h2>
                <p class="my-4 text-sm leading-6 text-slate-300">Conversemos sobre el problema, el alcance y la mejor forma de construirlo.</p>
                <NuxtLink to="/contacto" class="button-primary group w-full">Comencemos ahora <ArrowUpRight class="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></NuxtLink>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-enter-active, .carousel-leave-active { transition: opacity .45s ease, transform .55s cubic-bezier(.22,1,.36,1); }
.carousel-enter-from { opacity:0; transform:scale(1.02); }
.carousel-leave-to { opacity:0; }
.carousel-control { display:flex; width:3rem; height:3rem; align-items:center; justify-content:center; border-radius:999px; border:1px solid rgba(255,255,255,.25); background:rgba(2,6,23,.65); color:white; backdrop-filter:blur(12px); transition:background .2s,border-color .2s,color .2s,transform .2s; }
.carousel-control:hover { transform:translateY(-2px); border-color:rgba(103,232,249,.65); background:rgba(103,232,249,.95); color:#06202a; }
.case-study :deep(> *) { opacity:0; transform:translateY(20px); transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1); }
.case-study :deep(> *.is-visible) { opacity:1; transform:none; }
.case-study :deep(h2) { margin-top:4rem; margin-bottom:1.25rem; font-size:clamp(1.6rem,3vw,2.25rem); font-weight:800; letter-spacing:-.035em; text-transform:none; }
.case-study :deep(p), .case-study :deep(li) { color:#b9c5d3; font-size:1.0625rem; line-height:1.8; }
.case-study :deep(ul) { padding-left:1.2rem; }
.case-study :deep(li::marker) { color:#67e8f9; }
.case-study :deep(h2:nth-of-type(4)) { margin-bottom:0; border-left:3px solid #67e8f9; border-radius:1rem 1rem 0 0; background:linear-gradient(90deg,rgba(34,211,238,.11),rgba(34,211,238,.02)); padding:1.6rem 1.75rem .75rem; color:#a5f3fc; }
.case-study :deep(h2:nth-of-type(4) + p) { margin-top:0; border-left:3px solid #67e8f9; border-radius:0 0 1rem 1rem; background:linear-gradient(90deg,rgba(34,211,238,.11),rgba(34,211,238,.02)); padding:.5rem 1.75rem 1.75rem; color:#dbeafe; }
@media (prefers-reduced-motion: reduce) { .case-study :deep(> *) { opacity:1; transform:none; } }
</style>
