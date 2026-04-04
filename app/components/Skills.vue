<template>
  <section id="habilidades" class="py-32 bg-transparent relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-6">
      <div class="mb-24 text-center">
        <span class="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80 mb-4 block">Capacidades</span>
        <h2 class="text-4xl sm:text-5xl md:text-8xl font-black mb-8 text-white tracking-tighter italic uppercase leading-none">
          Stack <span class="text-slate-400">Tecnológico.</span>
        </h2>
        <p class="text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light">
          Herramientas y lenguajes que utilizo para transformar ideas en productos digitales escalables y de alto rendimiento.
        </p>
      </div>

      <div class="space-y-24 md:space-y-32">
        <!-- Frontend Group -->
        <div>
          <div class="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">01</span>
            <h3 class="text-xs md:text-sm font-black text-white tracking-[0.2em] md:tracking-[0.3em] uppercase">Frontend Architecture</h3>
            <div class="h-px flex-grow bg-white/10"></div>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
            <div v-for="skill in frontend" :key="skill.name" 
              class="group relative flex flex-col items-center p-6 md:p-8 bg-white/[0.04] border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500">
              <div class="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 flex items-center justify-center grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-500 opacity-100 md:opacity-50 md:group-hover:opacity-100">
                <img v-if="skill.icon" :src="'/icons/' + skill.icon" :alt="skill.name" 
                  class="w-full h-full object-contain" />
              </div>
              <span class="text-[10px] font-bold text-slate-200 md:text-slate-500 md:group-hover:text-white tracking-widest uppercase transition-colors duration-500 text-center">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Backend Group -->
        <div>
          <div class="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">02</span>
            <h3 class="text-xs md:text-sm font-black text-white tracking-[0.2em] md:tracking-[0.3em] uppercase">Backend & Infrastructure</h3>
            <div class="h-px flex-grow bg-white/10"></div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
            <div v-for="skill in backend" :key="skill.name" 
              class="group relative flex flex-col items-center p-6 md:p-8 bg-white/[0.04] border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500">
              <div class="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 flex items-center justify-center grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-500 opacity-100 md:opacity-50 md:group-hover:opacity-100">
                <img v-if="skill.icon" :src="'/icons/' + skill.icon" :alt="skill.name" 
                  class="w-full h-full object-contain" />
              </div>
              <span class="text-[10px] font-bold text-slate-200 md:text-slate-500 md:group-hover:text-white tracking-widest uppercase transition-colors duration-500 text-center">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Layers as LucideLayers, Database as LucideDatabase } from 'lucide-vue-next'

const frontend = [
  { name: 'Vue.js', icon: 'vue.svg' },
  { name: 'NuxtJS', icon: 'nuxt.svg' },
  { name: 'TypeScript', icon: 'typescript.svg' },
  { name: 'Tailwind CSS', icon: 'tailwind.svg' },
  { name: 'JavaScript', icon: 'js.svg' },
  { name: 'Astro', icon: 'astro.svg' }
]

const backend = [
  { name: 'Python', icon: 'python.svg' },
  { name: 'PostgreSQL', icon: 'postgresql.svg' },
  { name: 'MySQL', icon: 'mysql.svg' },
  { name: 'PHP', icon: 'php.svg' },
  { name: 'Laravel', icon: 'laravel.svg' }
]
</script>
