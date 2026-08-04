<template>
  <footer class="bg-slate-950 border-t border-white/5 py-12 relative overflow-hidden">
    <!-- Decoración de fondo -->
    <div class="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
      <div class="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-sky-500/10 blur-[120px] rounded-full"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Columna Marca -->
        <div class="space-y-6">
          <div class="flex items-center gap-2">
            <img src="/logo.svg" alt="" role="presentation" class="w-8 h-8">
            <span class="text-xl font-bold tracking-tight text-white italic">Joan Garfias</span>
          </div>
          <p class="text-slate-300 text-sm leading-relaxed max-w-xs">
            Desarrollador de software apasionado por crear experiencias digitales excepcionales y resolver problemas complejos mediante tecnología moderna.
          </p>
        </div>

        <!-- Columna Enlaces Rápidos (puedes añadir más tarde) -->
        <div class="hidden lg:block"></div>

        <!-- Columna Redes Sociales -->
        <div class="space-y-6 ml-auto md:col-start-2 lg:col-start-4">
          <h4 class="text-white font-semibold text-sm uppercase tracking-wider">Conectemos</h4>
          <div class="flex gap-4">
            <a 
              href="https://github.com/JoanGarfias" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-cyan-200 hover:border-cyan-300/50 hover:bg-cyan-400/10 transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github class="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="https://linkedin.com/in/joangarfias" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-cyan-200 hover:border-cyan-300/50 hover:bg-cyan-400/10 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin class="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="https://youtube.com/@joan_dev" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-cyan-200 hover:border-cyan-300/50 hover:bg-cyan-400/10 transition-all duration-300 group"
              aria-label="YouTube"
            >
              <Youtube class="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="mailto:joanpagarfk@gmail.com" 
              class="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-cyan-200 hover:border-cyan-300/50 hover:bg-cyan-400/10 transition-all duration-300 group"
              aria-label="Email"
            >
              <Mail class="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-slate-400 text-xs font-medium flex items-center gap-2">
          <span>© {{ new Date().getFullYear() }} Joan Garfias.</span>
          <span class="hidden md:inline text-slate-800">•</span>
          <span class="flex items-center gap-1 group">
            Hecho con <Heart class="heart-beat w-3 h-3 text-red-400" fill="currentColor" /> en Nuxt & Tailwind.
          </span>
        </div>
        
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Github, Linkedin, Youtube, Mail, Heart } from 'lucide-vue-next'
</script>

<style scoped>
/* Estilos adicionales si fueran necesarios */
</style>
