<template>
  <section id="contacto" class="section-space relative">
    <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
      <!-- "COLABORAR." ≈ 5.8em de ancho -->
      <div class="title-fit lg:col-span-5" style="--title-fit: 16.4cqi">
        <span class="eyebrow mb-5">Contacto</span>
        <component :is="titleTag" class="display-title mb-8 uppercase">
          Vamos a <br class="hidden lg:block"> <span class="text-ink-title-2">colaborar.</span>
        </component>
        <p class="text-lg leading-relaxed text-ink-body md:text-xl">
          ¿Tienes un proyecto, una vacante o un evento? Escríbeme y te respondo.
        </p>

        <ul class="mt-10 border-t border-line">
          <li v-for="channel in channels" :key="channel.label" class="border-b border-line">
            <a :href="channel.link" :target="channel.external ? '_blank' : undefined" :rel="channel.external ? 'noopener noreferrer' : undefined" class="channel group">
              <span class="flex items-center gap-4">
                <component :is="channel.icon" class="h-5 w-5 text-ink-muted transition-colors group-hover:text-accent" aria-hidden="true" />
                <span class="text-xs font-black uppercase tracking-widest text-ink-body">{{ channel.label }}</span>
              </span>
              <span class="text-sm font-bold text-ink-strong transition-transform group-hover:translate-x-1">
                {{ channel.value }}<span v-if="channel.external" class="sr-only"> (abre en otra pestaña)</span>
              </span>
            </a>
          </li>
        </ul>

        <a href="/cv.pdf" download="CV_Joan_Garfias.pdf" class="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-strong">
          <LucideDownload class="h-4 w-4" aria-hidden="true" />
          Descargar CV (PDF)
        </a>
      </div>

      <div class="w-full max-w-full lg:col-span-7">
        <form novalidate class="glass-panel relative w-full space-y-8 rounded-feature p-6 md:space-y-10 md:p-10" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            <div class="space-y-2">
              <label for="name" class="field-label">Nombre</label>
              <input
                id="name"
                ref="nameRef"
                v-model.trim="form.name"
                type="text"
                name="name"
                autocomplete="name"
                required
                placeholder="Ej. Juan Pérez"
                class="field"
                :aria-invalid="!!errors.name"
                :aria-describedby="errors.name ? 'name-error' : undefined"
                :disabled="isPending"
                @blur="touched && validate()"
              />
              <p v-if="errors.name" id="name-error" class="field-error">{{ errors.name }}</p>
            </div>
            <div class="space-y-2">
              <label for="email" class="field-label">Correo electrónico</label>
              <input
                id="email"
                ref="emailRef"
                v-model.trim="form.email"
                type="email"
                name="email"
                autocomplete="email"
                required
                placeholder="tu@email.com"
                class="field"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'email-error' : undefined"
                :disabled="isPending"
                @blur="touched && validate()"
              />
              <p v-if="errors.email" id="email-error" class="field-error">{{ errors.email }}</p>
            </div>
          </div>

          <div class="space-y-2">
            <label for="subject" class="field-label">Asunto</label>
            <select id="subject" v-model="form.subject" name="subject" class="field field-select" :disabled="isPending">
              <option v-for="s in contactSubjects" :key="s.value" :value="s.value">{{ s.label }}</option>
            </select>
          </div>

          <div class="space-y-2">
            <label for="message" class="field-label">Mensaje</label>
            <textarea
              id="message"
              ref="messageRef"
              v-model.trim="form.message"
              name="message"
              required
              rows="4"
              :placeholder="messagePlaceholder"
              class="field resize-none"
              :aria-invalid="!!errors.message"
              :aria-describedby="errors.message ? 'message-error' : undefined"
              :disabled="isPending"
              @blur="touched && validate()"
            ></textarea>
            <p v-if="errors.message" id="message-error" class="field-error">{{ errors.message }}</p>
          </div>

          <!-- Honeypot/Lock field -->
          <input v-model="form.lock" type="text" name="lock" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />

          <button
            type="submit"
            :disabled="isPending"
            class="button-primary group w-full py-4 uppercase tracking-[0.16em] disabled:cursor-not-allowed disabled:opacity-60 md:py-5"
          >
            <template v-if="isPending">
              Enviando…
              <LucideLoader2 class="h-4 w-4 animate-spin" aria-hidden="true" />
            </template>
            <template v-else>
              Enviar mensaje
              <LucideSend class="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </template>
          </button>

          <!-- Estados: éxito y error en línea, anunciados a lectores de pantalla -->
          <div id="form-status" role="status" aria-live="polite">
            <p v-if="isSuccess" class="status status--success">
              <LucideCheckCircle class="h-5 w-5 shrink-0" aria-hidden="true" />
              Listo, recibí tu mensaje. Te respondo pronto.
            </p>
          </div>
          <div role="alert">
            <p v-if="error" class="status status--error">
              <LucideAlertCircle class="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>
                {{ error }} Intenta de nuevo o escríbeme directo a
                <a :href="`mailto:${CONTACT_EMAIL}`" class="font-bold underline underline-offset-2">{{ CONTACT_EMAIL }}</a>.
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Download as LucideDownload, Linkedin as LucideLinkedin, Mail as LucideMail, Send as LucideSend, LucideCheckCircle, LucideAlertCircle, LucideLoader2 } from 'lucide-vue-next'
import { CONTACT_EMAIL, contactSubjects, useContact } from '../composables/useContact'

// En su página propia este título es el H1; en la home es H2
defineProps({ titleTag: { type: String, default: 'h2' } })

const { isPending, isSuccess, error, sendEmail, resetStatus } = useContact()
const router = useRouter()

const emptyForm = () => ({
  name: '',
  email: '',
  subject: 'proyecto',
  message: '',
  lock: 'this-is-a-valid-frontend-request' // Se enviará como cadena oculta
})

const form = ref(emptyForm())
const errors = ref({})
const touched = ref(false)
const nameRef = ref(null)
const emailRef = ref(null)
const messageRef = ref(null)

// ?asunto=evento (desde "Invítame a tu evento") preselecciona el asunto.
// Al hidratar una página prerenderizada la query llega después del montaje, así que se observa.
onMounted(() => {
  watch(() => router.currentRoute.value.query.asunto, (asunto) => {
    if (contactSubjects.some(s => s.value === asunto)) form.value.subject = asunto
  }, { immediate: true })
})

const messagePlaceholder = computed(() => ({
  proyecto: 'Cuéntame sobre tu proyecto o idea…',
  empleo: 'Cuéntame sobre el puesto y el equipo…',
  evento: 'Evento, fecha, ciudad y tema que te interesa…',
  otro: 'Escribe tu mensaje…'
})[form.value.subject])

const validate = () => {
  const next = {}
  if (!form.value.name) next.name = 'Escribe tu nombre.'
  if (!form.value.email) next.email = 'Escribe tu correo.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) next.email = 'Revisa el formato del correo, ej. tu@email.com.'
  if (!form.value.message) next.message = 'Escribe tu mensaje.'
  else if (form.value.message.length < 10) next.message = 'Cuéntame un poco más (mínimo 10 caracteres).'
  errors.value = next
  return next
}

const handleSubmit = async () => {
  touched.value = true
  resetStatus()
  const found = validate()
  const first = ['name', 'email', 'message'].find(key => found[key])
  if (first) {
    ({ name: nameRef, email: emailRef, message: messageRef })[first].value?.focus()
    return
  }

  await sendEmail({ ...form.value })

  if (isSuccess.value) {
    form.value = emptyForm()
    touched.value = false
  }
}

const channels = [
  { label: 'Email', value: CONTACT_EMAIL, link: `mailto:${CONTACT_EMAIL}`, icon: LucideMail, external: false },
  { label: 'LinkedIn', value: 'joangarfias', link: 'https://linkedin.com/in/joangarfias', icon: LucideLinkedin, external: true }
]
</script>

<style scoped>
.channel {
  display: flex;
  min-height: 3.75rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1rem;
}

.field-label {
  margin-left: 0.25rem;
  color: var(--text-body);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.field {
  width: 100%;
  border: 0;
  border-bottom: 2px solid #64748b;
  background: transparent;
  padding-block: 0.85rem;
  color: var(--text-strong);
  font-size: 1.0625rem;
  font-weight: 600;
  transition: border-color 180ms var(--ease-brand);
}

.field::placeholder { color: var(--text-muted); font-weight: 500; }
.field:focus { border-color: var(--cyan); }
.field:disabled { opacity: 0.6; }
.field[aria-invalid="true"] { border-color: #fca5a5; }

.field-select {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--cyan-soft) 50%), linear-gradient(135deg, var(--cyan-soft) 50%, transparent 50%);
  background-position: calc(100% - 14px) 50%, calc(100% - 8px) 50%;
  background-repeat: no-repeat;
  background-size: 6px 6px;
  cursor: pointer;
}

.field-select option { background: var(--surface-2); color: var(--text-strong); }

.field-error {
  margin-left: 0.25rem;
  color: #fca5a5;
  font-size: 0.875rem;
  font-weight: 600;
}

.status {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  border-radius: var(--radius-card-sm);
  padding: 1rem;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.5;
}

.status--success {
  border: 1px solid rgba(110, 231, 183, 0.35);
  background: rgba(110, 231, 183, 0.1);
  color: var(--green-status);
}

.status--error {
  border: 1px solid rgba(252, 165, 165, 0.35);
  background: rgba(252, 165, 165, 0.1);
  color: #fecaca;
}
</style>
