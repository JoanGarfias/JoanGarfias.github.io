<template>
  <section id="contacto" class="py-16 px-6 bg-transparent relative overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        <!-- Redes y Mensaje -->
        <div class="lg:col-span-12 mb-4">
           <span class="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80 mb-4 block text-center lg:text-left">Contacto</span>
           <h2 class="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none text-center lg:text-left mb-8">
            Vamos a <br class="hidden lg:block"/> <span class="text-slate-500">colaborar.</span>
          </h2>
        </div>

        <div class="lg:col-span-5 space-y-12">
          <p class="text-xl text-slate-300 font-light leading-relaxed">
            ¿Tienes una visión que necesita ejecución técnica o simplemente quieres charlar sobre tecnología? 
          </p>

          <div class="space-y-4 pt-10 border-t border-white/5">
            <div v-for="social in socials" :key="social.label" class="flex items-center justify-between group py-4 border-b border-white/[0.03]">
              <div class="flex items-center gap-4">
                <component :is="social.icon" class="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                <span class="text-[10px] uppercase tracking-widest text-slate-500 font-black">{{ social.label }}</span>
              </div>
              <a :href="social.link" target="_blank" class="text-sm text-slate-300 hover:text-white font-bold transition-all group-hover:translate-x-1">
                {{ social.value }}
              </a>
            </div>
          </div>
        </div>

        <!-- Formulario con mejor contraste -->
        <div class="lg:col-span-7">
          <form @submit.prevent class="space-y-12 p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="space-y-4">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nombre completo</label>
                <input 
                  type="text" 
                  placeholder="Ej. Juan Pérez" 
                  class="w-full bg-transparent border-b-2 border-slate-100 px-0 py-4 focus:border-primary outline-none transition-all placeholder:text-slate-300 text-white font-bold text-lg" 
                />
              </div>
              <div class="space-y-4">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Correo electrónico</label>
                <input 
                  type="email" 
                  placeholder="tu@email.com" 
                  class="w-full bg-transparent border-b-2 border-slate-100 px-0 py-4 focus:border-primary outline-none transition-all placeholder:text-slate-300 text-white font-bold text-lg" 
                />
              </div>
            </div>
            <div class="space-y-4">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tu mensaje</label>
              <textarea 
                placeholder="Cuéntame sobre tu proyecto o idea..." 
                rows="4" 
                class="w-full bg-transparent border-b-2 border-slate-100 px-0 py-4 focus:border-primary outline-none transition-all resize-none placeholder:text-slate-300 text-white font-bold text-lg"
              ></textarea>
            </div>
            <button class="group flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary transition-all duration-300 shadow-xl">
              Enviar Propuesta
              <LucideMail class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Github as LucideGithub, Linkedin as LucideLinkedin, Twitter as LucideTwitter, Mail as LucideMail } from 'lucide-vue-next'

const socials = [
  { label: 'LinkedIn', value: 'joangarfias', link: 'https://linkedin.com/in/joangarfias', icon: LucideLinkedin, color: 'text-blue-400' },
  { label: 'Github', value: 'JoanGarfias', link: 'https://github.com/JoanGarfias', icon: LucideGithub, color: 'text-slate-400' },
  { label: 'YouTube', value: 'joan_dev', link: 'https://youtube.com/@joan_dev', icon: LucideTwitter, color: 'text-sky-400' },
  { label: 'Email', value: 'Escríbeme un correo', link: 'mailto:joanpagarfk@gmail.com', icon: LucideMail, color: 'text-emerald-400' }
]
</script>
