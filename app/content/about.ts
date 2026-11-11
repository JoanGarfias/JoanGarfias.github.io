// Sobre mí. draft: true marca un texto como "[BORRADOR – VALIDAR]" (hoy todos están validados).

export const aboutTitle = { lead: 'Construyo software', soft: 'y construyo comunidad.' }

export const aboutQuote =
  'Para mí son parte de lo mismo: crear las condiciones para que otros puedan llegar más lejos.'

export const aboutParagraphs: { text: string; draft?: boolean }[] = [
  {
    text: 'Soy desarrollador backend y cloud (Laravel, PHP, Vue, Docker, AWS) y he trabajado en sistemas para salud, construcción, hotelería y transporte. Disfruto entender un problema a fondo, diseñar la solución y llevarla a producción, cada vez más con agentes de IA como parte de mi forma de trabajar.'
  },
  {
    text: 'Me interesan los roles donde la tecnología y las personas se cruzan: ingeniería de software, developer relations, soluciones técnicas y producto.'
  },
  {
    text: 'Estoy en el último año de Ingeniería en Computación en la UNISTMO. Si estás construyendo algo en el sur de México o quieres conectar con su talento, escríbeme.'
  }
]

// Credenciales bajo los párrafos (icon: archivo en /public/icons, opcional; wide: logotipo horizontal sobre fondo blanco)
export const aboutCredentials: { label: string; icon?: string; iconAlt?: string; wide?: boolean }[] = [
  { label: 'AWS Certified Cloud Practitioner', icon: 'aws.svg' },
  { label: 'Estudiante Embajador de Google 2026', icon: 'google.svg' },
  { label: 'INROADER', icon: 'inroads-mexico.png', iconAlt: 'INROADS México', wide: true }
]

export const aboutCards: { title: string; text: string; draft: boolean }[] = [
  {
    title: 'Leo el juego antes de mover',
    text: 'Veo el fútbol desde la parte táctica. En el código hago lo mismo: antes de escribir, entiendo el problema y el contexto. Eso suele evitar soluciones innecesarias.',
    draft: false
  },
  {
    title: 'Ritmo con piezas simples',
    text: 'Hago beatbox: sonidos simples que, con buen timing, arman algo complejo. Me mantiene la cabeza fresca y me ayuda a pensar diferente.',
    draft: false
  },
  {
    title: 'Agentes de IA en mi flujo',
    text: 'Planeo, delego código y pruebas a agentes de IA y reviso lo que entregan. Lo compartí en el taller de Google Antigravity del CompuFest 26.',
    draft: false
  }
]

// Foto casual (fuera de la oficina). null → PendingSlot
export const aboutPhoto: { src: string; width: number; height: number; alt: string } | null = {
  src: '/foto_casual.jpeg',
  width: 1200,
  height: 1500,
  alt: 'Joan haciendo beatbox en un evento en Tehuantepec'
}
