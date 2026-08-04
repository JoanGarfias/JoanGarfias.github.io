<template>
  <section id="contacto" class="section-space bg-transparent relative overflow-hidden">
    <div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        <!-- Redes y Mensaje -->
        <div class="lg:col-span-12 mb-4">
           <span class="eyebrow mb-5">Contacto</span>
           <h2 class="display-title uppercase mb-8">
            Vamos a <br class="hidden lg:block"/> <span class="text-slate-400">colaborar.</span>
          </h2>
        </div>

        <div class="lg:col-span-5 space-y-12">
          <p class="text-lg md:text-xl text-slate-200 font-light leading-relaxed text-center lg:text-left">
            ¿Tienes una visión que necesita ejecución técnica o simplemente quieres charlar sobre tecnología? 
          </p>

          <div class="space-y-4 pt-10 border-t border-white/5">
            <div v-for="social in socials" :key="social.label" class="flex items-center justify-between gap-4 group py-4 border-b border-white/10">
              <div class="flex items-center gap-4">
                <component :is="social.icon" class="w-4 h-4 text-slate-300 group-hover:text-cyan-300 transition-colors" />
                <span class="text-xs uppercase tracking-widest text-slate-300 font-black">{{ social.label }}</span>
              </div>
              <a :href="social.link" target="_blank" rel="noopener noreferrer" class="text-sm text-slate-200 hover:text-white font-bold transition-all md:group-hover:translate-x-1">
                {{ social.value }}
              </a>
            </div>
          </div>
        </div>

        <!-- Formulario con mejor contraste -->
        <div class="lg:col-span-7 w-full max-w-full">
          <form @submit.prevent="handleSubmit" class="glass-panel relative space-y-8 md:space-y-10 p-6 md:p-10 rounded-3xl w-full">
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
                <label for="name" class="text-xs font-black uppercase tracking-widest text-slate-300 ml-1">Nombre completo</label>
                <input 
                  id="name"
                  v-model="form.name"
                  type="text" 
                  name="name"
                  autocomplete="name"
                  required
                  placeholder="Ej. Juan Pérez" 
                  class="w-full bg-transparent border-b-2 border-slate-500 focus:border-cyan-300 outline-none transition-all placeholder:text-slate-400 text-white font-semibold text-base md:text-lg py-3 md:py-4 disabled:opacity-50"
                  :disabled="isPending || isSuccess"
                />
              </div>
              <div class="space-y-2">
                <label for="email" class="text-xs font-black uppercase tracking-widest text-slate-300 ml-1">Correo electrónico</label>
                <input 
                  id="email"
                  v-model="form.email"
                  type="email" 
                  name="email"
                  autocomplete="email"
                  required
                  placeholder="tu@email.com" 
                  class="w-full bg-transparent border-b-2 border-slate-500 focus:border-cyan-300 outline-none transition-all placeholder:text-slate-400 text-white font-semibold text-base md:text-lg py-3 md:py-4 disabled:opacity-50"
                  :disabled="isPending || isSuccess"
                />
              </div>
            </div>
            <div class="space-y-4">
              <label for="message" class="text-xs font-black uppercase tracking-widest text-slate-300 ml-1">Tu mensaje</label>
              <textarea 
                id="message"
                v-model="form.message"
                name="message"
                required
                placeholder="Cuéntame sobre tu proyecto o idea..." 
                rows="4" 
                class="w-full bg-transparent border-b-2 border-slate-500 focus:border-cyan-300 outline-none transition-all resize-none placeholder:text-slate-400 text-white font-semibold text-base md:text-lg py-3 md:py-4 disabled:opacity-50"
                :disabled="isPending || isSuccess"
              ></textarea>
            </div>

            <!-- Honeypot/Lock field -->
            <input type="text" v-model="form.lock" name="lock" class="hidden" aria-hidden="true" />

            <button 
              type="submit" 
              :disabled="isPending || isSuccess"
              class="button-primary group w-full py-4 md:py-5 uppercase tracking-[0.16em] disabled:opacity-50 disabled:cursor-not-allowed"
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
                <LucideSend class="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </template>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Github as LucideGithub, Linkedin as LucideLinkedin, Mail as LucideMail, Send as LucideSend, LucideYoutube, LucideCheckCircle, LucideAlertCircle, LucideLoader2 } from 'lucide-vue-next'
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
