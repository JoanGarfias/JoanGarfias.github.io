// Envío del formulario a la API de correo (repo aparte en Vercel).
// La API recibe { name, email, message, lock }; el asunto viaja al inicio del mensaje
// hasta que la API acepte un campo `subject` (ver PENDIENTES.md).
export const CONTACT_ENDPOINT = 'https://portfolio-email-api-delta.vercel.app/api/contacto'
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

  const sendEmail = async ({ subject, ...form }: ContactForm) => {
    isPending.value = true
    isSuccess.value = false
    error.value = null

    const subjectLabel = contactSubjects.find(s => s.value === subject)?.label ?? 'Otro'

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ ...form, message: `[Asunto: ${subjectLabel}]\n\n${form.message}` })
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
