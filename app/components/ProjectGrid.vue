<template>
  <section id="proyectos" class="py-20">
    <div class="mb-20 text-center">
      <h2 class="text-4xl sm:text-5xl md:text-8xl font-black mb-8 text-white tracking-tighter italic uppercase leading-none">Proyectos</h2>
      <p class="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
        Una selección de trabajos donde combino diseño, tecnología y resolución de problemas para crear experiencias digitales únicas.
      </p>
      <div class="h-1 w-12 bg-primary/40 mx-auto rounded-full"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      <div 
        v-for="(project, index) in projects" 
        :key="project.id" 
        class="group relative flex flex-col p-4 md:p-0 rounded-3xl bg-white/5 md:bg-transparent border border-white/5 md:border-none transition-all duration-500"
      >
        <!-- Project Card -->
        <NuxtLink 
          :to="`/proyectos/${project.id}`"
          class="block relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 border border-white/5 transition-all duration-500 group-hover:border-primary/30"
        >
          <img 
            :src="project.image" 
            :alt="project.title" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          <!-- Overlay on hover -->
          <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
            <div class="px-6 py-3 bg-white text-black rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              Ver Proyecto
            </div>
          </div>
        </NuxtLink>

        <!-- Project Info -->
        <div class="mt-8">
          <div class="flex items-center gap-4 mb-4">
            <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">0{{ index + 1 }}</span>
            <div class="h-[1px] w-8 bg-primary/20"></div>
            <div class="flex gap-3">
              <span 
                v-for="tech in project.technologies.slice(0, 3)" 
                :key="tech"
                class="text-[10px] font-bold uppercase tracking-wider text-slate-500"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <h3 class="text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
            {{ project.title }}
          </h3>
          
          <p class="text-slate-400 text-lg leading-relaxed mb-6 line-clamp-2 max-w-xl text-pretty">
            {{ project.description }}
          </p>

          <NuxtLink 
            :to="`/proyectos/${project.id}`" 
            class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-200 hover:text-primary transition-colors group/link"
          >
            Explorar caso de estudio 
            <LucideArrowRight class="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight as LucideArrowRight } from 'lucide-vue-next'
const { getAllProjects } = useProjects()
const projects = ref([])

onMounted(async () => {
  projects.value = await getAllProjects()
})
</script>
