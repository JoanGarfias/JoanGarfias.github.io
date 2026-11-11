// Envío del formulario a la ruta del propio sitio (server/api/contacto.post.ts, Pages Function en Cloudflare).
// Recibe { name, email, subject, message, lock }.
export const CONTACT_ENDPOINT = '/api/contacto'
export const CONTACT_EMAIL = 'joanpagarfpf@gmail.com'

export const contactSubjects = [
  { value: 'proyecto', label: 'Proyecto' },
  { value: 'empleo', label: 'Empleo' },
  { value: 'evento', label: 'Invitación a evento' },
  { value: 'otro', label: 'Otro' }
] as const

export type ContactSubject = typeof contactSubjects[number]['value']

export interface ContactForm {
  name: string
  email: string
  subject: ContactSubject
  message: string
  lock: string
}

export const useContact = () => {
  const isPending = ref(false)
  const isSuccess = ref(false)
  const error = ref<string | null>(null)

  const sendEmail = async (form: ContactForm) => {
    isPending.value = true
    isSuccess.value = false
    error.value = null

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      isSuccess.value = true
    } catch {
      // Error de red o de la API: mensaje propio, no el del navegador ("Failed to fetch")
      error.value = 'No pude enviar tu mensaje.'
    } finally {
      isPending.value = false
    }
  }

  const resetStatus = () => {
    isSuccess.value = false
    error.value = null
  }

  return {
    isPending,
    isSuccess,
    error,
    sendEmail,
    resetStatus
  }
}
