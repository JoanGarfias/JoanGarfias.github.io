export const useContact = () => {
  const isPending = ref(false)
  const isSuccess = ref(false)
  const error = ref<string | null>(null)

  interface ContactForm {
    name: string
    email: string
    message: string
    lock: string
  }

  const sendEmail = async (formData: ContactForm) => {
    isPending.value = true
    isSuccess.value = false
    error.value = null

    try {
      const response = await fetch('https://portfolio-email-api-delta.vercel.app/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.')
      }

      isSuccess.value = true
    } catch (err: any) {
      error.value = err.message || 'Error inesperado'
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
