// Datos estructurados de los proyectos. El cuerpo del caso de estudio vive en content/proyectos/{slug}.md.
// draft: true → marca problem/decision/result/metric como "[BORRADOR – VALIDAR]" (hoy todos están validados).
// arch / video: solo se muestran en el caso de estudio si existen.

export interface ProjectImage {
  src: string
  width: number
  height: number
  alt: string
}

export interface Project {
  slug: string
  number: string
  name: string
  summary: string
  year: string
  role: string
  featured: boolean
  draft: boolean
  problem: string | null
  decision: string | null
  result: string | null
  arch?: string | null
  metric?: string | null
  stack: string[]
  cover: ProjectImage | null
  images: ProjectImage[]
  video?: string | null
  links: { live?: string; repo?: string; caseStudy: string }
}

export const projects: Project[] = [
  {
    slug: 'tiven',
    number: '01',
    name: 'Tiven',
    summary: 'Plataforma SaaS para salones de belleza: reservas en línea, inventario, programa de puntos y marketing en un solo sistema.',
    year: '2025 – hoy',
    role: 'Backend Developer',
    featured: true,
    draft: false,
    problem: 'Los salones llevaban citas, inventario y clientes frecuentes en papel o en varios Excel: se perdían citas, no había control del stock ni seguimiento al cliente después de su visita.',
    decision: 'Desarrollé la API en Laravel sobre PostgreSQL, una base de datos que protege la integridad de ventas, inventario y puntos. Participé en el modelado de datos, los módulos de negocio y el despliegue.',
    result: 'Una plataforma estable en producción que redujo 30% el tiempo administrativo de los salones que la usan.',
    metric: '−30% tiempo administrativo',
    stack: ['Laravel', 'PHP', 'PostgreSQL', 'Docker', 'AWS', 'Vue.js', 'Astro'],
    cover: null,
    images: [
      { src: '/projects/tiven/1.png', width: 1270, height: 936, alt: 'Portada de Tiven: “No pierdas citas por no poder contestar”, con el flujo de reserva en un celular' },
      { src: '/projects/tiven/2.png', width: 1113, height: 682, alt: 'Enlace de reservas de Tiven para compartir en WhatsApp, Instagram, Facebook, Google o con un código QR' },
      { src: '/projects/tiven/3.png', width: 1498, height: 830, alt: 'Módulo de finanzas en móvil: movimientos, histórico de cortes y resultado financiero con comisiones por empleado' }
    ],
    links: { live: 'https://tiven.app', caseStudy: '/proyectos/tiven' }
  },
  {
    slug: 'civitas',
    number: '02',
    name: 'Civitas',
    summary: 'Sistema web para condominios que conecta a residentes, administración y seguridad: accesos con código QR, reportes de incidentes, cobranza y áreas comunes.',
    year: '2026',
    role: 'Fullstack Developer',
    featured: true,
    draft: false,
    problem: 'La seguridad reaccionaba después de los incidentes, y los reportes, la comunicación y las finanzas eran lentos y poco transparentes para los residentes.',
    decision: 'Proyecto ágil de 23 personas. Participé en el diseño de la base de datos y de la arquitectura (modelo C4), monté los entornos de prueba con Docker y la integración continua con GitHub Actions, y programé el módulo de empleados domésticos.',
    result: 'Entregamos por sprints los módulos de seguridad, incidentes y control de accesos, con un entorno de pruebas estable y la deuda técnica bajo control.',
    metric: null,
    arch: '/projects/civitas/arquitectura.png',
    stack: ['NestJS', 'PostgreSQL', 'Docker', 'GitHub Actions', 'Cloudflare R2', 'Stripe', 'Next.js', 'React', 'Tailwind CSS'],
    cover: null,
    images: [
      { src: '/projects/civitas/1.jpeg', width: 1280, height: 665, alt: 'Pantalla de inicio de sesión de Civitas con la marca UDEV' },
      { src: '/projects/civitas/2.jpeg', width: 1280, height: 665, alt: 'Módulo de empleados domésticos de Civitas: lista con tipo, estado, destino y horario autorizado' },
      { src: '/projects/civitas/3.jpeg', width: 1280, height: 665, alt: 'Civitas generando el código QR de acceso para un visitante registrado' },
      { src: '/projects/civitas/4.jpeg', width: 1280, height: 639, alt: 'Videollamada con el equipo de desarrollo de Civitas' }
    ],
    links: { repo: 'https://github.com/UDEVIXT/civitas-', caseStudy: '/proyectos/civitas' }
  },
  {
    slug: 'compufest-26',
    number: '03',
    name: 'CompuFest 26 · Sitio y check-in',
    summary: 'Sitio oficial del foro CompuFest 26 con registro por QR de punta a punta: gafetes generados en PDF, alta y check-in por escaneo, panel de administración en vivo y pantallas que mostraban qué pasaba en cada zona.',
    year: '2026',
    role: 'Fullstack Developer (único desarrollador)',
    featured: true,
    draft: false,
    problem: 'El foro necesitaba en pocos días un sitio con agenda, sede, talleres y proyectos, una forma de registrar a cientos de asistentes sin listas en papel y una manera de orientar a la gente entre actividades simultáneas.',
    decision: 'Lo construí en 2 días con apoyo de agentes de IA: Nuxt y Cloudflare Functions para el sitio y el registro, Supabase (PostgreSQL) para guardar los registros y un script en Node.js que generaba los gafetes en PDF con su QR. Las pantallas funcionaban offline con datos precargados.',
    result: 'Se usó durante los tres días del evento: 450 asistentes registrados de 520 gafetes generados y 699 escaneos en 5 puntos de check-in.',
    metric: 'Construido en 2 días',
    stack: ['NuxtJS', 'Cloudflare Functions', 'Supabase', 'PostgreSQL', 'Node.js', 'Cloudflare R2'],
    cover: null,
    images: [
      { src: '/projects/compufest/1.png', width: 1884, height: 932, alt: 'Portada del sitio oficial del CompuFest 26: “Tecnología que nos conecta.”, con fechas y sede del foro' },
      { src: '/projects/compufest/2.png', width: 1910, height: 933, alt: 'Acceso del staff con PIN: el PIN define el rol y el punto donde se escanea' },
      { src: '/projects/compufest/3.png', width: 1910, height: 933, alt: 'Punto de check-in con las opciones de escanear gafetes o dar de alta un gafete' },
      { src: '/projects/compufest/4.png', width: 1884, height: 932, alt: 'Escaneo del código QR de un gafete con la cámara durante el check-in' },
      { src: '/projects/compufest/5.png', width: 1884, height: 932, alt: 'Confirmación de un gafete leído y ya registrado en el check-in' },
      { src: '/projects/compufest/6.png', width: 1388, height: 778, alt: 'Panel de administración en vivo: 450 asistentes, 450 de 520 gafetes registrados y 699 escaneos en 5 puntos' },
      { src: '/projects/compufest/7.jpeg', width: 1280, height: 1076, alt: 'Pantalla en vivo en el Espacio Industrial: qué ocurre y qué sigue en cada zona (auditorio, talleres, zona gamer), con QR al programa' },
      { src: '/projects/compufest/8.jpeg', width: 2048, height: 1152, alt: 'Pantalla del auditorio anunciando la charla que comienza, sincronizada con la agenda del evento' },
      { src: '/projects/compufest/9.JPG', width: 2048, height: 1152, alt: 'Pantalla del auditorio anunciando la charla que comienza, sincronizada con la agenda del evento' },
      { src: '/projects/compufest/10.JPG', width: 2048, height: 1152, alt: 'Pantalla del auditorio anunciando la charla que comienza, sincronizada con la agenda del evento' },
      { src: '/projects/compufest/11.JPG', width: 2048, height: 1152, alt: 'Pantalla del auditorio anunciando la charla que comienza, sincronizada con la agenda del evento' },
      { src: '/projects/compufest/12.JPG', width: 2048, height: 1152, alt: 'Personal del Compufest haciendo uso de la plataforma' }
    ],
    links: { live: 'https://compufest.pages.dev', caseStudy: '/proyectos/compufest-26' }
  },
  // Euphoria: oculto por ahora. Para volver a mostrarlo, descomenta el bloque (y renumera).
  // {
  //   slug: 'euphoria',
  //   number: '03',
  //   name: 'Salón de Belleza Euphoria',
  //   summary: 'Sitio con catálogo, agenda en línea y monedero de puntos para un salón de belleza, conectado a la API de Tiven.',
  //   year: '2026 – hoy',
  //   role: 'Fullstack (desarrollador único)',
  //   featured: true,
  //   draft: false,
  //   problem: 'El salón no tenía presencia en línea: para conocer servicios o agendar había que llamar, y no existía un programa de lealtad.',
  //   decision: 'Frontend en Nuxt con TypeScript que consume la API de Tiven para las citas y el monedero de puntos.',
  //   result: null,
  //   metric: null,
  //   stack: ['NuxtJS', 'Vue.js', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  //   cover: null,
  //   images: [
  //     { src: '/projects/euphoria/1.png', width: 1343, height: 963, alt: 'Portada del sitio de Euphoria con el botón para agendar una cita' },
  //     { src: '/projects/euphoria/2.png', width: 1343, height: 963, alt: 'Sección de servicios y equipo del salón Euphoria' },
  //     { src: '/projects/euphoria/3.png', width: 1343, height: 963, alt: 'Carrusel de testimonios de clientes en el sitio de Euphoria' },
  //     { src: '/projects/euphoria/4.png', width: 1151, height: 970, alt: 'Catálogo de servicios de Euphoria filtrado por categoría, con duración y precio' },
  //     { src: '/projects/euphoria/5.png', width: 1140, height: 970, alt: 'Flujo para personalizar una cita en Euphoria: calendario y hora' }
  //   ],
  //   links: { live: 'https://euphoria-web.pages.dev', caseStudy: '/proyectos/euphoria' }
  // },
  {
    slug: 'unistmo-web',
    number: '04',
    name: 'Universidad del Istmo · Sitio web',
    summary: 'Nuevo sitio oficial de la Universidad del Istmo: rápido, adaptado a celular y con contenido que el personal publica sin depender del equipo técnico.',
    year: '2026 – hoy',
    role: 'Fullstack Developer',
    featured: false,
    draft: false,
    problem: 'El sitio anterior era difícil de navegar, no se adaptaba a celulares y cada cambio pasaba por el equipo técnico, así que la información para aspirantes y estudiantes quedaba desactualizada.',
    decision: 'Astro para generar páginas de carga rápida y Strapi como gestor de contenidos para que el personal publique noticias y eventos; despliegue automatizado con Docker Compose y GitHub Actions.',
    result: 'Una primera versión que carga más rápido y funciona mejor en celular que el sitio anterior, en preparación para publicarse como sitio oficial.',
    metric: null,
    stack: ['Strapi', 'PostgreSQL', 'Docker', 'Astro', 'Tailwind CSS'],
    cover: null,
    images: [
      { src: '/projects/unistmo/1.png', width: 1876, height: 970, alt: 'Portada del sitio de la Universidad del Istmo con el banner de sus tres campus' },
      { src: '/projects/unistmo/2.png', width: 1876, height: 970, alt: 'Página “¿Qué es la UNISTMO?” con campus, funciones y modelo educativo' },
      { src: '/projects/unistmo/3.png', width: 1876, height: 970, alt: 'Buscador de licenciaturas de la Universidad del Istmo' },
      { src: '/projects/unistmo/4.png', width: 1876, height: 970, alt: 'Página de becas y apoyos de la Universidad del Istmo' },
      { src: '/projects/unistmo/5.png', width: 1876, height: 970, alt: 'Sección de servicios escolares para aspirantes en el sitio de la UNISTMO' },
      { src: '/projects/unistmo/6.png', width: 1876, height: 970, alt: 'Directorio de contacto del personal de la Universidad del Istmo' }
    ],
    links: { live: 'https://www2.unistmo.edu.mx', caseStudy: '/proyectos/unistmo-web' }
  },
  {
    slug: 'curvex',
    number: '05',
    name: 'Curvex',
    summary: 'Herramienta web de estadística: pruebas de hipótesis, regresiones y distribuciones de probabilidad con resultados y gráficas al instante.',
    year: '2025 – 2026',
    role: 'Fullstack Developer',
    featured: false,
    draft: false,
    problem: 'Las opciones disponibles son demasiado complejas para un curso (SPSS, R) o son calculadoras que no muestran visualmente qué pasa con los datos.',
    decision: 'Cálculos en un backend Laravel y una interfaz reactiva en Vue 3 con Inertia que actualiza el modelo, sus métricas y sus gráficas al cambiar los datos; desplegada en Heroku.',
    result: 'Compañeros del curso de Estadística la usaron para comprobar sus ejercicios y entender los resultados de forma visual.',
    metric: null,
    stack: ['Laravel', 'PHP', 'Vue.js', 'Tailwind CSS'],
    cover: null,
    images: [
      { src: '/projects/curvex/1.jpeg', width: 1055, height: 792, alt: 'Prueba de proporción Z en Curvex con el resultado de la hipótesis' },
      { src: '/projects/curvex/2.jpeg', width: 1600, height: 693, alt: 'Regresión cuadrática en Curvex con el modelo resultante y el coeficiente de determinación' },
      { src: '/projects/curvex/3.jpeg', width: 883, height: 935, alt: 'Regresión exponencial en Curvex en modo oscuro' },
      { src: '/projects/curvex/4.jpeg', width: 1430, height: 980, alt: 'Curvex comparado con una hoja de cálculo para validar una regresión múltiple' }
    ],
    links: { repo: 'https://github.com/JoanGarfias/curvex', caseStudy: '/proyectos/curvex' }
  },
  {
    slug: 'hecho-en-casa',
    number: '06',
    name: 'Hecho en Casa',
    summary: 'Plataforma de pedidos en línea para una pastelería local: catálogo, calendario de disponibilidad, pedidos personalizados e historial del cliente.',
    year: '2024 – 2025',
    role: 'Fullstack Developer · líder de equipo',
    featured: false,
    draft: false,
    problem: 'Los pedidos llegaban a mano por WhatsApp o teléfono, con errores frecuentes y sin seguimiento después de la venta.',
    decision: 'Lideré a un equipo de 10 personas. Elegimos una sola aplicación en Laravel y Blade con MySQL para avanzar rápido con un equipo grande, coordinado con Kanban y GitFlow, y con avisos automáticos por correo al cliente.',
    result: 'La pastelería pasó a recibir y dar seguimiento a sus pedidos en línea; el proyecto fue evaluado satisfactoriamente.',
    metric: null,
    stack: ['Laravel', 'PHP', 'MySQL', 'Docker', 'Blade', 'JavaScript'],
    cover: null,
    images: [
      { src: '/projects/hc/1.png', width: 655, height: 593, alt: 'Portada de Hecho en Casa con diseños personalizados y postres del día' },
      { src: '/projects/hc/2.png', width: 935, height: 878, alt: 'Historial de pedidos de un cliente en Hecho en Casa' },
      { src: '/projects/hc/3.png', width: 661, height: 620, alt: 'Secciones de temporada y pasteles en Hecho en Casa' },
      { src: '/projects/hc/4.png', width: 862, height: 752, alt: 'Calendario de disponibilidad de fechas para pedidos en Hecho en Casa' },
      { src: '/projects/hc/5.png', width: 727, height: 719, alt: 'Catálogo de postres por categoría en Hecho en Casa' },
      { src: '/projects/hc/6.png', width: 908, height: 605, alt: 'Formulario de pedido de temporada con cantidad, entrega y precio estimado' },
      { src: '/projects/hc/7.png', width: 760, height: 783, alt: 'Resumen del pedido con folio, contacto y detalles de entrega' }
    ],
    links: { caseStudy: '/proyectos/hecho-en-casa' }
  }
]

// La portada es la primera captura mientras no haya una imagen de portada dedicada
for (const project of projects) project.cover ??= project.images[0] ?? null

export const featuredProjects = projects.filter(p => p.featured)
export const otherProjects = projects.filter(p => !p.featured)
export const getProject = (slug: string) => projects.find(p => p.slug === slug) ?? null
export const projectsUsing = (tech: string) => projects.filter(p => p.stack.includes(tech))
