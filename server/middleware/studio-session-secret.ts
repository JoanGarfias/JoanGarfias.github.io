// Nuxt Studio cifra su sesión con runtimeConfig.studio.auth.sessionSecret. Si falta, su middleware lo deriva
// con createHash de node:crypto, que en Cloudflare (sin nodejs_compat) lanza "not implemented" en CADA
// petición al worker, incluida /api/contacto. Aquí se deriva antes con Web Crypto para que eso no ocurra.
// Lo ideal es definir NUXT_STUDIO_AUTH_SESSION_SECRET (32+ caracteres aleatorios) en Cloudflare.
export default defineEventHandler(async (event) => {
  const auth = useRuntimeConfig(event).studio?.auth as { sessionSecret?: string, github?: { clientId?: string, clientSecret?: string } } | undefined
  if (!auth || auth.sessionSecret) return
  const { clientId, clientSecret } = auth.github ?? {}
  if (!clientId || !clientSecret) return

  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${clientId}${clientSecret}`))
  auth.sessionSecret = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('')
})
