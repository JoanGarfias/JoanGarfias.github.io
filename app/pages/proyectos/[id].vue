<template>
  <div v-if="project" class="bg-slate-950 pt-32 pb-24 px-6 min-h-screen selection:bg-primary selection:text-white">
    <div class="max-w-6xl mx-auto">
      <NuxtLink to="/proyectos" class="group inline-flex items-center gap-2 text-slate-500 hover:text-white font-bold text-xs uppercase tracking-widest mb-16 transition-all">
        <LucideArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Proyectos
      </NuxtLink>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <!-- Main Content -->
        <div class="lg:col-span-8 space-y-20">
          <header class="space-y-8">
            <div class="flex items-center gap-4">
              <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary">0{{ projects.findIndex(p => p.id === project.id) + 1 }}</span>
              <div class="h-[1px] flex-grow bg-white/5"></div>
              <span class="text-[10px] font-bold uppercase tracking-widest text-slate-500">{{ project.period }}</span>
            </div>
            <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase">{{ project.title }}</h1>
            <p class="text-2xl text-slate-300 font-light leading-relaxed text-pretty">{{ project.description }}</p>
          </header>

          <!-- Featured Image / Carousel -->
          <div class="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/5 group">
            <div v-for="(img, idx) in project.images" :key="idx" 
              v-show="activeImage === idx"
              class="absolute inset-0 transition-opacity duration-1000">
              <img :src="img" class="w-full h-full object-cover" />
            </div>
            
            <div class="absolute bottom-8 right-8 flex gap-3">
              <button @click="prev" class="p-4 rounded-full bg-black/40 border border-white/10 hover:bg-white hover:text-black transition-all backdrop-blur-md">
                <LucideArrowLeft class="w-5 h-5" />
              </button>
              <button @click="next" class="p-4 rounded-full bg-black/40 border border-white/10 hover:bg-white hover:text-black transition-all backdrop-blur-md">
                <LucideArrowRight class="w-5 h-5" />
              </button>
            </div>

            <div class="absolute bottom-8 left-8 flex gap-1.5 items-center">
              <div v-for="(_, idx) in project.images" :key="idx"
                class="h-1 rounded-full bg-white/20 transition-all duration-500"
                :class="activeImage === idx ? 'w-12 bg-white' : 'w-4'">
              </div>
            </div>
          </div>

          <section class="space-y-10">
            <h2 class="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Sobre el proyecto</h2>
            <div class="prose prose-invert prose-lg max-w-none">
              <p class="text-slate-400 leading-loose text-lg">{{ project.fullDescription }}</p>
            </div>
          </section>

          <section v-if="project.images.length > 1" class="space-y-12">
            <h2 class="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Galería de Proceso</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div v-for="(img, idx) in project.images.slice(1)" :key="idx" 
                class="aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-slate-900 shadow-2xl">
                <img :src="img" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar / Metadata -->
        <aside class="lg:col-span-4 space-y-16">
          <div class="sticky top-32 space-y-12">
            <div class="space-y-8 p-10 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div v-for="(val, key) in projectInfo" :key="key" class="space-y-1">
                <span class="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-black">{{ key }}</span>
                <span class="text-lg text-slate-100 font-bold block">{{ val }}</span>
              </div>

              <div class="pt-8 border-t border-white/10 space-y-6">
                <span class="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-black block">Tecnologías</span>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in project.technologies" :key="tech"
                    class="px-4 py-2 bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:border-primary/50 hover:text-white transition-all cursor-default">
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Team -->
              <div v-if="project.teamSize > 1" class="pt-8 border-t border-white/10 space-y-6">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-black">Colaboradores</span>
                  <span class="text-xs font-bold text-slate-400">{{ project.teamSize }} per.</span>
                </div>
                
                <div v-if="project.collaborators" class="flex flex-wrap gap-x-4 gap-y-2">
                  <span v-for="collab in project.collaborators" :key="collab" class="text-xs text-slate-400 font-medium border-b border-white/10 pb-0.5">
                    {{ collab }}
                  </span>
                </div>
              </div>
              
              <div v-if="project.link" class="pt-8">
                <a :href="project.link" target="_blank" class="flex items-center justify-center gap-2 w-full py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all shadow-xl shadow-black/20">
                  Visitar sitio <LucideArrowRight class="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div class="px-10 py-8 bg-primary/10 rounded-2xl border border-primary/20">
              <h4 class="text-sm font-bold mb-2">¿Tienes un proyecto similar?</h4>
              <p class="text-xs text-slate-400 mb-6 leading-relaxed">Me encantaría charlar sobre cómo puedo ayudarte a construir tu próxima visión digital.</p>
              <NuxtLink to="/contacto" class="text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors underline decoration-2 underline-offset-8">
                Comencemos ahora
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ArrowLeft as LucideArrowLeft,
  ArrowRight as LucideArrowRight,
  ChevronLeft as LucideChevronLeft,
  ChevronRight as LucideChevronRight,
  User as LucideUser
} from 'lucide-vue-next'

const route = useRoute()
const { getProjectById, projects } = useProjects()
const project = getProjectById(route.params.id)

if (project) {
  useHead({
    title: `${project.title} | Proyecto de Joan Garfias`,
    meta: [
      { name: 'description', content: project.description },
      // Open Graph
      { property: 'og:title', content: `${project.title} | Joan Garfias` },
      { property: 'og:description', content: project.description },
      { property: 'og:image', content: project.images && project.images.length > 0 ? project.images[0] : 'https://joangarfias.com/og-image.png' },
      // Twitter
      { property: 'twitter:title', content: `${project.title} | Joan Garfias` },
      { property: 'twitter:description', content: project.description },
    ]
  })
}

const activeImage = ref(0)
const next = () => activeImage.value = (activeImage.value + 1) % project.images.length
const prev = () => activeImage.value = (activeImage.value - 1 + project.images.length) % project.images.length

const projectInfo = computed(() => ({
  'Periodo': project.period,
  'Equipo': project.team,
  'Rol': project.role,
  'Ubicación': project.location
}))
</script>
