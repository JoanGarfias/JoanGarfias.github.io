<template>
  <section id="habilidades" class="section-space relative overflow-hidden">
    <div>
      <div class="mb-20 max-w-3xl">
        <span class="eyebrow mb-5">Capacidades</span>
        <h2 class="display-title mb-7 uppercase">
          Stack <span class="text-slate-400">tecnológico</span><span class="text-cyan-300/60">.</span>
        </h2>
        <p class="section-copy">
          Herramientas y lenguajes que utilizo para transformar ideas en productos digitales escalables y de alto rendimiento.
        </p>
      </div>

      <div class="space-y-24 md:space-y-32">
        <!-- Frontend Group -->
        <div>
          <div class="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <span class="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">01</span>
            <h3 class="text-xs md:text-sm font-black text-white tracking-[0.2em] md:tracking-[0.3em] uppercase">Frontend Architecture</h3>
            <div class="h-px grow bg-white/10"></div>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
            <div v-for="skill in frontend" :key="skill.name" 
              class="group relative flex flex-col items-center p-6 md:p-8 bg-slate-900/65 border border-slate-700/60 rounded-2xl hover:bg-slate-800/80 hover:border-cyan-300/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.09)] transition-all duration-300">
              <div class="w-11 h-11 md:w-13 md:h-13 mb-4 md:mb-5 flex items-center justify-center transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-110">
                <img v-if="skill.icon" :src="'/icons/' + skill.icon" :alt="skill.name" 
                  class="w-full h-full object-contain" />
              </div>
              <span class="text-xs font-bold text-slate-300 group-hover:text-white tracking-[0.08em] uppercase transition-colors duration-300 text-center">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Backend Group -->
        <div>
          <div class="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <span class="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">02</span>
            <h3 class="text-xs md:text-sm font-black text-white tracking-[0.2em] md:tracking-[0.3em] uppercase">Backend & Infrastructure</h3>
            <div class="h-px grow bg-white/10"></div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
            <div v-for="skill in backend" :key="skill.name" 
              class="group relative flex flex-col items-center p-6 md:p-8 bg-slate-900/65 border border-slate-700/60 rounded-2xl hover:bg-slate-800/80 hover:border-cyan-300/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.09)] transition-all duration-300">
              <div class="w-11 h-11 md:w-13 md:h-13 mb-4 md:mb-5 flex items-center justify-center transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-110">
                <img v-if="skill.icon" :src="'/icons/' + skill.icon" :alt="skill.name" 
                  class="w-full h-full object-contain" />
              </div>
              <span class="text-xs font-bold text-slate-300 group-hover:text-white tracking-[0.08em] uppercase transition-colors duration-300 text-center">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Certifications Group -->
        <div>
          <div class="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <span class="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">03</span>
            <h3 class="text-xs md:text-sm font-black text-white tracking-[0.2em] md:tracking-[0.3em] uppercase">Certificaciones</h3>
            <div class="h-px grow bg-white/10"></div>
          </div>

          <a
            href="https://www.credly.com/badges/05c0a6b5-8ec7-4329-8394-6e5a25947141/public_url"
            target="_blank"
            rel="noopener noreferrer"
            class="group block rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 p-6 md:p-8 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]"
          >
            <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div class="space-y-3 max-w-2xl">
                <p class="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">AWS Certified Cloud Practitioner</p>
                <h4 class="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">AWS CLF-C002</h4>
                <p class="text-sm md:text-base text-slate-300 leading-relaxed">
                  Certificación de fundamentos de AWS que valida conocimiento básico de nube, seguridad, arquitectura, precios y servicios principales.
                </p>
              </div>

              <div class="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 group-hover:text-white transition-colors">
                Ver credencial
                <LucideLink class="w-4 h-4" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ExternalLink as LucideLink } from 'lucide-vue-next';

const frontend = [
  { name: 'Vue.js', icon: 'vue.svg' },
  { name: 'NuxtJS', icon: 'nuxt.svg' },
  { name: 'TypeScript', icon: 'typescript.svg' },
  { name: 'Tailwind CSS', icon: 'tailwind.svg' },
  { name: 'JavaScript', icon: 'js.svg' },
  { name: 'Astro', icon: 'astro.svg' }
]

const backend = [
  { name: 'AWS', icon: 'aws.svg' },
  { name: 'Python', icon: 'python.svg' },
  { name: 'PostgreSQL', icon: 'postgresql.svg' },
  { name: 'MySQL', icon: 'mysql.svg' },
  { name: 'PHP', icon: 'php.svg' },
  { name: 'Laravel', icon: 'laravel.svg' }, 
  { name: 'NestJS', icon: 'nestjs.svg' }
]
</script>
