// Sobre mí. Los textos con draft: true están redactados a partir de tu texto original
// (sin hechos nuevos) y se marcan "[BORRADOR – VALIDAR]". Cambia draft a false al validarlos.

export const aboutQuote =
  'Empecé en tecnología por curiosidad y terminé enfocándome en construir cosas útiles, con menos discurso y más trabajo real.'

export const aboutParagraphs: { text: string; draft?: boolean }[] = [
  {
    text: 'Estoy en la recta final de Ingeniería en Computación en la Universidad del Istmo, campus Tehuantepec. El octavo semestre me llevó de la teoría a entender que el software no se trata solo de sintaxis, sino de arquitectura y resolución de problemas.',
    draft: true
  },
  {
    text: 'Me importa tanto cómo se ve algo como cómo funciona. Prefiero hacer las cosas claras y bien hechas antes que seguir tendencias solo porque sí.',
    draft: true
  },
  {
    text: 'He trabajado en proyectos para negocios reales de mi región, donde me ha tocado construir desde cero, resolver errores y decidir cómo organizar todo.',
    draft: true
  }
]

export const aboutCards: { title: string; text: string; draft: boolean }[] = [
  {
    title: 'Leo el juego antes de mover',
    text: 'Veo el fútbol desde la parte táctica. En el código hago lo mismo: antes de escribir, entiendo el problema y el contexto. Eso suele evitar soluciones innecesarias.',
    draft: true
  },
  {
    title: 'Ritmo con piezas simples',
    text: 'Hago beatbox: sonidos simples que, con buen timing, arman algo complejo. Me mantiene la cabeza fresca y me ayuda a pensar diferente.',
    draft: true
  },
  {
    title: 'Construyo desde Oaxaca',
    text: 'Estudio en la Universidad del Istmo, en Tehuantepec, y soy cofundador de Nexis Oaxaca Tech, una comunidad para aprender, construir y crecer juntos.',
    draft: true
  }
]

// Foto casual (fuera de la oficina). null → PendingSlot
export const aboutPhoto: { src: string; width: number; height: number; alt: string } | null = null
