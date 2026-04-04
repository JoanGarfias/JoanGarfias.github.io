<template>
  <section id="contacto" class="py-16 px-4 md:px-6 bg-transparent relative overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        <!-- Redes y Mensaje -->
        <div class="lg:col-span-12 mb-4">
           <span class="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80 mb-4 block text-center lg:text-left">Contacto</span>
           <h2 class="text-4xl sm:text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none text-center lg:text-left mb-8">
            Vamos a <br class="hidden lg:block"/> <span class="text-slate-400">colaborar.</span>
          </h2>
        </div>

        <div class="lg:col-span-5 space-y-12">
          <p class="text-lg md:text-xl text-slate-200 font-light leading-relaxed text-center lg:text-left">
            ¿Tienes una visión que necesita ejecución técnica o simplemente quieres charlar sobre tecnología? 
          </p>

          <div class="space-y-4 pt-10 border-t border-white/5">
            <div v-for="social in socials" :key="social.label" class="flex items-center justify-between group py-4 border-b border-white/[0.03]">
              <div class="flex items-center gap-4">
                <component :is="social.icon" class="w-4 h-4 text-slate-400 md:text-slate-500 md:group-hover:text-primary transition-colors" />
                <span class="text-[10px] uppercase tracking-widest text-slate-400 md:text-slate-500 font-black">{{ social.label }}</span>
              </div>
              <a :href="social.link" target="_blank" class="text-sm text-slate-200 hover:text-white font-bold transition-all md:group-hover:translate-x-1">
                {{ social.value }}
              </a>
            </div>
          </div>
        </div>

        <!-- Formulario con mejor contraste -->
        <div class="lg:col-span-7 w-full max-w-full">
          <form @submit.prevent="handleSubmit" class="relative space-y-8 md:space-y-12 p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl bg-white/[0.02] border border-white/5 w-full">
            <!-- Mensajes de Estado -->
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 transform -translate-y-4"
              enter-to-class="opacity-100 transform translate-y-0"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 transform translate-y-0"
              leave-to-class="opacity-0 transform -translate-y-4"
            >
              <div v-if="isSuccess" class="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 p-4 rounded-xl text-sm font-bold flex items-center gap-3 shadow-lg shadow-emerald-500/10">
                <LucideCheckCircle class="w-5 h-5 text-emerald-400" />
                ¡Mensaje enviado con éxito! Me pondré en contacto pronto.
              </div>
              <div v-else-if="error" class="bg-red-500/20 border border-red-500/30 text-red-300 p-4 rounded-xl text-sm font-bold flex items-center gap-3 shadow-lg shadow-red-500/10">
                <LucideAlertCircle class="w-5 h-5 text-red-400" />
                {{ error }}
              </div>
            </Transition>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div class="space-y-2">
                <label for="name" class="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Nombre completo</label>
                <input 
                  id="name"
                  v-model="form.name"
                  type="text" 
                  name="name"
                  autocomplete="name"
                  required
                  placeholder="Ej. Juan Pérez" 
                  class="w-full bg-transparent border-b-2 border-slate-600 focus:border-primary outline-none transition-all placeholder:text-slate-500 text-white font-bold text-base md:text-lg py-3 md:py-4 disabled:opacity-50"
                  :disabled="isPending || isSuccess"
                />
              </div>
              <div class="space-y-2">
                <label for="email" class="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Correo electrónico</label>
                <input 
                  id="email"
                  v-model="form.email"
                  type="email" 
                  name="email"
                  autocomplete="email"
                  required
                  placeholder="tu@email.com" 
                  class="w-full bg-transparent border-b-2 border-slate-600 focus:border-primary outline-none transition-all placeholder:text-slate-500 text-white font-bold text-base md:text-lg py-3 md:py-4 disabled:opacity-50" 
                  :disabled="isPending || isSuccess"
                />
              </div>
            </div>
            <div class="space-y-4">
              <label for="message" class="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Tu mensaje</label>
              <textarea 
                id="message"
                v-model="form.message"
                name="message"
                required
                placeholder="Cuéntame sobre tu proyecto o idea..." 
                rows="4" 
                class="w-full bg-transparent border-b-2 border-slate-600 focus:border-primary outline-none transition-all resize-none placeholder:text-slate-500 text-white font-bold text-base md:text-lg py-3 md:py-4 disabled:opacity-50"
                :disabled="isPending || isSuccess"
              ></textarea>
            </div>

            <!-- Honeypot/Lock field -->
            <input type="text" v-model="form.lock" name="lock" class="hidden" aria-hidden="true" />

            <button 
              type="submit" 
              :disabled="isPending || isSuccess"
              class="group flex items-center justify-center gap-3 w-full py-4 md:py-5 bg-slate-100 text-slate-950 md:bg-slate-900 md:text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl md:hover:bg-primary md:hover:text-white transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed" 
              aria-label="Enviar mensaje de contacto"
            >
              <template v-if="isPending">
                Enviando...
                <LucideLoader2 class="w-4 h-4 animate-spin" />
              </template>
              <template v-else-if="isSuccess">
                ¡Enviado!
                <LucideCheckCircle class="w-4 h-4 text-emerald-500" />
              </template>
              <template v-else>
                Enviar Propuesta
                <LucideMail class="w-4 h-4 transition-transform md:group-hover:translate-x-1" />
              </template>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Github as LucideGithub, Linkedin as LucideLinkedin, Twitter as LucideTwitter, Mail as LucideMail, LucideYoutube, LucideCheckCircle, LucideAlertCircle, LucideLoader2 } from 'lucide-vue-next'
import { useContact } from '../composables/useContact'

const { isPending, isSuccess, error, sendEmail, resetStatus } = useContact()

const form = ref({
  name: '',
  email: '',
  message: '',
  lock: 'this-is-a-valid-frontend-request' // Se enviará como cadena oculta
})

const handleSubmit = async () => {
  // Validación básica adicional de email antes de enviar
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    return
  }

  await sendEmail({ ...form.value })

  if (isSuccess.value) {
    // Limpiar formulario tras éxito después de unos segundos o mantenerlo bloqueado
    setTimeout(() => {
      form.value = {
        name: '',
        email: '',
        message: '',
        lock: 'this-is-a-valid-frontend-request'
      }
      resetStatus()
    }, 5000)
  }
}

const socials = [
  { label: 'LinkedIn', value: 'joangarfias', link: 'https://linkedin.com/in/joangarfias', icon: LucideLinkedin, color: 'text-blue-400' },
  { label: 'Github', value: 'JoanGarfias', link: 'https://github.com/JoanGarfias', icon: LucideGithub, color: 'text-slate-400' },
  { label: 'YouTube', value: 'joan_dev', link: 'https://youtube.com/@joan_dev', icon: LucideYoutube, color: 'text-sky-400' },
  { label: 'Email', value: 'Escríbeme un correo', link: 'mailto:joanpagarfk@gmail.com', icon: LucideMail, color: 'text-emerald-400' }
]
</script>
