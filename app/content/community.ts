// Comunidad: charlas, talleres, organización y eventos a los que asisto.
// placeholder: true → entrada de ejemplo para validar el diseño; se oculta con NUXT_PUBLIC_SHOW_PENDING=false.
// Reemplázalas por entradas reales (y borra placeholder). Solo las entradas reales generan JSON-LD Event.

export type CommunityType = 'charla' | 'taller' | 'organizacion' | 'asistente'
export type CommunityRole = 'ponente' | 'tallerista' | 'organizador' | 'asistente'

export interface CommunityEntry {
  id: string
  type: CommunityType
  title: string
  event: string
  city: string
  date: string | null // ISO, ej. "2026-03-14"
  role: CommunityRole
  audience?: string // ej. "~60 estudiantes"; no inventar
  takeaway?: string
  resources?: { slides?: string; repo?: string; video?: string; post?: string }
  photo: string | null
  featured?: boolean
  placeholder?: boolean
}

export const communityIntro: string | null = null // 1–2 frases: por qué te importa la comunidad tech en Oaxaca

export const communityEntries: CommunityEntry[] = [
  {
    id: 'ejemplo-charla',
    type: 'charla',
    title: '[PENDIENTE: título de charla]',
    event: '[PENDIENTE: evento]',
    city: '[PENDIENTE: ciudad]',
    date: null,
    role: 'ponente',
    audience: undefined,
    takeaway: undefined,
    resources: {},
    photo: null,
    featured: true,
    placeholder: true
  },
  {
    id: 'ejemplo-taller',
    type: 'taller',
    title: '[PENDIENTE: título de taller]',
    event: '[PENDIENTE: evento]',
    city: '[PENDIENTE: ciudad]',
    date: null,
    role: 'tallerista',
    photo: null,
    placeholder: true
  },
  {
    id: 'ejemplo-asistente',
    type: 'asistente',
    title: '[PENDIENTE: nombre del evento al que asististe]',
    event: '[PENDIENTE: organizador]',
    city: '[PENDIENTE: ciudad]',
    date: null,
    role: 'asistente',
    photo: null,
    placeholder: true
  }
]

export const nexis = {
  name: 'Nexis Oaxaca Tech',
  role: 'Cofundador',
  description: 'Comunidad para aprender, construir y crecer juntos.',
  participation: null as string | null, // en qué has participado dentro de Nexis (1–2 frases)
  members: null as string | null, // ej. "120+"
  events: null as string | null, // ej. "8"
  url: null as string | null,
  photo: null as string | null
}

export const youtube = {
  channel: 'https://youtube.com/@joan_dev',
  handle: '@joan_dev',
  videoId: null as string | null, // ID del video destacado, ej. "dQw4w9WgXcQ"
  videoTitle: null as string | null
}

export const typeLabels: Record<CommunityType, string> = {
  charla: 'Charla',
  taller: 'Taller',
  organizacion: 'Organización',
  asistente: 'Asistente'
}

export const roleLabels: Record<CommunityRole, string> = {
  ponente: 'Ponente',
  tallerista: 'Tallerista',
  organizador: 'Organizador',
  asistente: 'Asistente'
}
