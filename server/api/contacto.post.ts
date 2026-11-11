// Formulario de contacto: envía el mensaje con Resend.
// En Cloudflare Pages esta ruta se compila a una Pages Function (_worker.js); el resto del sitio sigue prerenderizado.
// Secretos (Cloudflare Pages → Settings → Variables and Secrets, o .env en local):
//   NUXT_RESEND_API_KEY  API key de Resend
//   NUXT_CONTACT_EMAIL   buzón que recibe los mensajes
const SUBJECTS: Record<string, string> = {
  proyecto: 'Proyecto',
  empleo: 'Empleo',
  evento: 'Invitación a evento',
  otro: 'Otro'
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => null)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Datos incompletos' })
  }

  // Honeypot: el campo oculto viaja vacío desde el formulario; si trae algo es un bot.
  // Se responde ok para no darle pistas.
  if (body.lock) return { ok: true }

  const name = text(body.name, 100)
  const email = text(body.email, 200)
  const message = text(body.message, 5000)
  const subject = SUBJECTS[body.subject] ?? SUBJECTS.otro

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    throw createError({ statusCode: 400, statusMessage: 'Datos incompletos' })
  }

  const { resendApiKey, contactEmail } = useRuntimeConfig(event)
  if (!resendApiKey || !contactEmail) {
    console.error('Faltan NUXT_RESEND_API_KEY o NUXT_CONTACT_EMAIL')
    throw createError({ statusCode: 500, statusMessage: 'Error interno' })
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Portfolio <contacto@joangarfias.me>',
      to: [contactEmail],
      // Responder desde el buzón contesta directo a quien escribió
      reply_to: email,
      subject: `[${subject}] Nuevo mensaje de ${name}`,
      html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>`
        + `<p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>`
        + `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      text: `${name} <${email}>\nAsunto: ${subject}\n\n${message}`
    })
  })

  if (!response.ok) {
    console.error('Resend', response.status, await response.text())
    throw createError({ statusCode: 502, statusMessage: 'No se pudo enviar' })
  }

  return { ok: true }
})
