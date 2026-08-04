<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
const { getAllProjects } = useProjects()
const projects = ref([])
onMounted(async () => { projects.value = await getAllProjects() })
</script>

<template>
  <section id="proyectos" class="section-space">
    <header class="mb-14 grid gap-6 border-b border-white/10 pb-10 md:grid-cols-[1fr_26rem] md:items-end">
      <div>
        <span class="eyebrow mb-5">Trabajo seleccionado</span>
        <h2 class="display-title uppercase">Proyectos<span class="text-cyan-300/60">.</span></h2>
      </div>
      <p class="section-copy md:justify-self-end">Casos de estudio donde estrategia, código y experiencia de usuario se convierten en productos funcionales.</p>
    </header>

    <div class="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
      <ScrollReveal v-for="(project, index) in projects" :key="project.id" :delay="(index % 2) * 90">
        <article class="project-card group">
          <NuxtLink :to="`/proyectos/${project.id}`" class="project-media" :aria-label="`Ver caso de estudio: ${project.title}`">
            <img :src="project.image" :alt="`Vista de ${project.title}`" class="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]" />
            <div class="project-overlay">
              <span class="button-primary project-action">
                Ver proyecto
                <ArrowUpRight class="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:text-blue-700" />
              </span>
            </div>
            <span class="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1.5 text-xs font-bold tracking-wider text-slate-100 backdrop-blur-md">0{{ index + 1 }}</span>
          </NuxtLink>

          <div class="mt-6">
            <div class="mb-4 flex flex-wrap gap-2" aria-label="Tecnologías usadas">
              <span v-for="tech in project.technologies.slice(0, 4)" :key="tech" class="rounded-full border border-slate-600/60 bg-slate-900/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-slate-300">{{ tech }}</span>
            </div>
            <div class="flex items-start justify-between gap-5">
              <div>
                <h3 class="text-2xl font-bold tracking-tight transition-colors group-hover:text-cyan-200 md:text-3xl">{{ project.title }}</h3>
                <p class="mt-3 max-w-xl text-base leading-7 text-slate-400">{{ project.description }}</p>
              </div>
              <ArrowUpRight class="mt-1 hidden h-6 w-6 shrink-0 text-slate-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300 sm:block" />
            </div>
          </div>
        </article>
      </ScrollReveal>
    </div>
  </section>
</template>

<style scoped>
.project-media { position: relative; display: block; aspect-ratio: 16/10; overflow: hidden; border-radius: 1.25rem; border: 1px solid rgba(148,163,184,.2); background: #0f172a; box-shadow: 0 24px 65px rgba(0,0,0,.24); transition: border-color .3s, box-shadow .3s, transform .3s; }
.project-card:hover .project-media { border-color: rgba(103,232,249,.45); box-shadow: 0 28px 80px rgba(0,0,0,.3), 0 0 45px rgba(34,211,238,.08); transform: translateY(-3px); }
.project-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:linear-gradient(to top,rgba(2,6,23,.8),rgba(2,6,23,.18)); opacity:0; transition:opacity .35s; }
.project-card:hover .project-overlay, .project-media:focus-visible .project-overlay { opacity:1; }
.project-action { transform:translateY(12px); opacity:0; transition:transform .35s, opacity .35s; }
.project-card:hover .project-action, .project-media:focus-visible .project-action { transform:translateY(0); opacity:1; }
@media (hover:none) { .project-overlay { opacity:1; align-items:flex-end; justify-content:flex-end; padding:1rem; background:linear-gradient(to top,rgba(2,6,23,.7),transparent 50%); } .project-action { min-height:2.75rem; padding:.65rem 1rem; opacity:1; transform:none; } }
</style>
