// Comunidad: charlas, talleres, organización y eventos a los que asisto.
// placeholder: true → entrada de ejemplo para validar el diseño; se oculta con NUXT_PUBLIC_SHOW_PENDING=false.
// Reemplázalas por entradas reales (y borra placeholder). Solo las entradas reales generan JSON-LD Event.

export type CommunityType = 'charla' | 'taller' | 'organizacion' | 'asistente'
export type CommunityRole = 'ponente' | 'tallerista' | 'moderador' | 'organizador' | 'asistente'

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
  photo: string | null // foto principal (public/community/{evento}/)
  gallery?: string[] // resto de fotos del evento
  url?: string // página del encuentro
  partOf?: string // id del evento que la contiene: su audiencia ya está contada ahí
  featured?: boolean
  placeholder?: boolean
}

export const communityIntro: string| null = 'Un día una persona se tomó el tiempo de enseñarme algo llamado Algoritmos sin esperar nada a cambio, desde que me di cuenta que eso no fue suerte me esfuerzo por llevar experiencias como esas a más jóvenes.' // 1–2 frases: por qué te importa la comunidad tech en Oaxaca

export const communityEntries: CommunityEntry[] = [
  // Charlas y talleres impartidos con Nexis Oaxaca (fotos: nexisoaxaca.tech/eventos → Memorias)
  {
    id: 'compufest-26',
    type: 'organizacion',
    title: 'CompuFest 26 · Segundo foro regional de Computación',
    event: 'Universidad del Istmo · Ingeniería en Computación',
    city: 'Santo Domingo Tehuantepec',
    date: '2026-11-04',
    role: 'organizador',
    audience: '450 asistentes',
    takeaway: 'Tres días (4 al 6 de noviembre) con siete actividades de Nexis Oaxaca: una conferencia, cinco talleres y un panel sobre IA y el futuro del Istmo.',
    photo: '/community/compufest-26/1.jpg',
    gallery: ['/community/compufest-26/2.jpg', '/community/compufest-26/3.jpg'],
    url: 'https://nexisoaxaca.tech/eventos'
  },
  {
    id: 'ia-universidad-futuro-istmo',
    partOf: 'compufest-26',
    type: 'charla',
    title: 'Panel: La IA, la Universidad y el futuro del Istmo',
    event: 'CompuFest 26 · Universidad del Istmo',
    city: 'Santo Domingo Tehuantepec',
    date: '2026-11-05',
    audience: '70 personas',
    role: 'moderador',
    photo: '/community/panel-ia-istmo/1.jpg',
    url: 'https://nexisoaxaca.tech/eventos/ia-universidad-y-el-futuro-del-istmo'
  },
  {
    id: 'google-antigravity',
    partOf: 'compufest-26',
    type: 'taller',
    title: 'Desarrolla software con Google Antigravity',
    event: 'CompuFest 26 · Universidad del Istmo',
    city: 'Santo Domingo Tehuantepec',
    date: '2026-11-04',
    role: 'tallerista',
    audience: '15 personas',
    takeaway: 'Una introducción a cómo desarrollar software utilizando agentes de IA y cómo llevar su primer proyecto a producción con Cloudflare, a coste $0',
    resources: {},
    photo: '/community/google-antigravity/2.jpg',
    gallery: ['/community/google-antigravity/1.jpg', '/community/google-antigravity/3.jpg'],
    url: 'https://nexisoaxaca.tech/eventos/desarrolla-software-con-google-antigravity',
    featured: true
  },
  {
    id: 'gemini-copia-y-pega',
    type: 'charla',
    title: 'Más allá del «copia y pega»: cómo Gemini se vuelve tu mejor aliado',
    event: 'Semana Nacional de la Ciencia y la Tecnología · CETIS 168',
    audience: '30 personas',
    city: 'Ciudad Ixtepec',
    date: '2026-10-29',
    role: 'ponente',
    photo: '/community/gemini-copia-y-pega/3.jpg',
    gallery: ['/community/gemini-copia-y-pega/1.jpg', '/community/gemini-copia-y-pega/2.jpg'],
    url: 'https://nexisoaxaca.tech/eventos/mas-alla-del-copia-y-pega-como-gemini-se-vuelve-tu-mejor-aliado'
  },
  {
    id: 'ia-para-tu-negocio',
    type: 'taller',
    title: 'IA para tu negocio: haz más con las herramientas que ya tienes',
    event: 'Nexis Oaxaca · Casa Guietiqui',
    audience: '15 personas',
    city: 'Santo Domingo Tehuantepec',
    date: '2026-10-02',
    role: 'tallerista',
    photo: '/community/ia-para-tu-negocio/1.jpg',
    gallery: ['/community/ia-para-tu-negocio/2.jpg', '/community/ia-para-tu-negocio/3.jpg'],
    url: 'https://nexisoaxaca.tech/eventos/ia-para-tu-negocio'
  },
  {
    id: 'ia-no-hace-magia',
    type: 'charla',
    title: 'La IA no hace magia: aprende a usarla sin que piense por ti',
    event: 'IEBO Plantel 165 · con Oaxacaciberseguro',
    audience: '40 personas',
    city: 'En línea',
    date: '2026-09-17',
    role: 'ponente',
    resources: { video: 'https://youtu.be/u4b5Ixi7tAM' },
    photo: '/community/ia-no-hace-magia/2.jpg',
    gallery: ['/community/ia-no-hace-magia/1.jpg'],
    url: 'https://nexisoaxaca.tech/eventos/ia-aprende-usarla-pensamiento-critico'
  },
  {
    id: 'ia-emprendimiento',
    type: 'organizacion',
    title: 'Cómo usar la IA para crear tu emprendimiento y no morir en el intento',
    event: 'Nexis Oaxaca · Universidad del Istmo, con Lic. Joe Constantino (UDEV-IT)',
    city: 'Santo Domingo Tehuantepec',
    date: '2026-06-25',
    role: 'organizador',
    audience: '28 asistentes',
    photo: '/community/ia-emprendimiento/3.jpg',
    gallery: ['/community/ia-emprendimiento/1.jpg', '/community/ia-emprendimiento/2.jpg'],
    url: 'https://nexisoaxaca.tech/eventos/Como_usar_la_IA'
  },
  {
    id: 'programacion-desde-cero',
    type: 'charla',
    title: 'Cómo empezar en programación desde cero (sin dinero)',
    event: 'CECyTE Plantel 18 · charla compartida con el equipo de Nexis Oaxaca',
    city: 'Santo Domingo Tehuantepec',
    date: '2026-06-01',
    role: 'ponente',
    audience: '40 personas',
    photo: '/community/programacion-desde-cero/2.jpg',
    gallery: [1, 3, 4, 5, 6, 7, 8].map(n => `/community/programacion-desde-cero/${n}.jpg`),
    url: 'https://nexisoaxaca.tech/eventos/como-empezar-en-programacion'
  }
]

export const nexis = {
  name: 'Nexis Oaxaca',
  role: 'Cofundador',
  description: 'Comunidad de tecnología en el Istmo de Tehuantepec.',
  participation: 'Llevo la visión del proyecto y establezco esquemas de colaboración con instituciones, empresas y otras comunidades tech.' as string | null, // en qué has participado dentro de Nexis (1–2 frases)
  members: '65+' as string | null, // ej. "120+"
  events: '30+' as string | null, // ej. "8"
  url: 'https://nexisoaxaca.tech' as string | null,
  photo: 'nexis/foto_grupal.jpg' as string | null
}

// Eventos a los que asisto o me invitan (juez, invitado, asistente).
// Van en su propio bloque y NO se suman a los contadores (personas alcanzadas, charlas, etc.).
export interface AttendedEvent {
  title: string
  role: string // ej. "Asistente", "Juez de apoyo", "Invitado"
  city?: string
  date?: string // ISO "2026-04-21" o solo año "2026"
  url?: string
  photo?: string // ej. "/community/asistidos/talent-land.jpg" (horizontal); sin foto la tarjeta va sin imagen
}

export const eventsAttended: AttendedEvent[] = [
  { title: 'Robomatrix', role: 'Juez de apoyo' },
  { title: 'Talent Land 2026', role: 'Asistente' },
  { title: 'AWS Summit CDMX 2026', role: 'Asistente', city: 'Ciudad de México' }
]

// Otros roles en comunidad (se muestran junto a Nexis)
export const googleAmbassador = {
  name: 'Estudiantes Embajadores de Google',
  role: 'Embajador 2026 · Primera generación',
  description: 'Formo parte de la primera generación del programa de Estudiantes Embajadores de Google.',
  logo: '/icons/google.svg'
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
  moderador: 'Moderador',
  organizador: 'Organizador',
  asistente: 'Asistente'
}
