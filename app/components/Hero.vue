<script setup>
import { Download as LucideDownload } from 'lucide-vue-next';
</script>

<template>
  <section class="min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 relative">
    <div class="absolute -top-40 -left-20 w-[500px] h-[500px] bg-sky/10 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-20 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-4xl mx-auto text-center space-y-8 relative">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky/20 bg-sky/5 text-sky text-xs font-semibold tracking-wider uppercase mb-4">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-sky"></span>
        </span>
        Construyendo productos y sistemas web
      </div>
      
      <h1 class="text-4xl sm:text-5xl md:text-8xl font-black mb-8 text-white tracking-tighter italic uppercase leading-none">
          Hola, soy <span class="bg-gradient-to-r from-sky to-cyan-400 bg-clip-text text-transparent">Joan Garfias</span>.
      </h1>

      <p class="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Soy un <span class="text-white font-medium">Desarrollador Full-stack</span>. Construyo aplicaciones web funcionales, desde el backend hasta la interfaz, enfocándome en que realmente resuelvan problemas.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
        <NuxtLink to="/proyectos" class="group relative w-full sm:w-auto px-10 py-4 bg-sky text-slate-950 font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-sky/30" aria-label="Ver mis proyectos destacados">
          <span class="relative z-10">Ver Proyectos</span>
          <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </NuxtLink>
        
        <NuxtLink to="/contacto" class="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-white font-bold rounded-2xl transition-all duration-300 backdrop-blur-sm" aria-label="Ir a la página de contacto">
          Contáctame
        </NuxtLink>
        
        <a href="/cv.pdf" 
           download="CV_Joan_Garfias.pdf"
           class="cursor-pointer group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 font-bold rounded-2xl hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300"
           aria-label="Descargar mi Currículum Vitae en PDF">
          <LucideDownload class="w-5 h-5 group-hover:animate-bounce" />
          <span>Descargar CV</span>
        </a>
      </div>
    </div>
  </section>
</template>