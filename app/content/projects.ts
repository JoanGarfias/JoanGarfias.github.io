// Datos estructurados de los proyectos. El cuerpo del caso de estudio vive en content/proyectos/{slug}.md.
// draft: true → problem/decision/result/metric son borradores redactados a partir del .md y se marcan
// "[BORRADOR – VALIDAR]" mientras NUXT_PUBLIC_SHOW_PENDING esté activo. Cámbialo a false al validarlos.
// null → contenido pendiente (se muestra con PendingText / PendingSlot).

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
    summary: 'SaaS para que los salones de belleza gestionen reservas, inventario, puntos y marketing en un solo lugar.',
    year: '2025 – hoy',
    role: 'Backend Developer',
    featured: true,
    draft: true,
    problem: 'Los salones llevaban reservas, inventario y fidelización en papel o en varios Excel, y perdían citas y control del stock.',
    decision: 'Construí la API REST en Laravel sobre PostgreSQL para garantizar integridad en los datos de ventas, inventario y puntos.',
    result: 'Una plataforma estable que redujo el tiempo administrativo de los usuarios activos.',
    metric: '−30% tiempo administrativo',
    stack: ['Laravel', 'PHP', 'PostgreSQL', 'Docker', 'Vue.js', 'Astro'],
    cover: null,
    images: [
      { src: '/projects/tiven/1.png', width: 1876, height: 970, alt: 'Página principal de Tiven: “Tu salón de belleza en tu bolsillo, 24/7” con la app en una computadora' },
      { src: '/projects/tiven/2.png', width: 1586, height: 903, alt: 'Panel de Tiven con ingresos, citas de hoy, citas completadas y próximas citas del negocio' },
      { src: '/projects/tiven/3.png', width: 1574, height: 910, alt: 'Gráfica de ingresos por día de los últimos 30 días en Tiven' }
    ],
    links: { live: 'https://tiven.app', caseStudy: '/proyectos/tiven' }
  },
  {
    slug: 'civitas',
    number: '02',
    name: 'Civitas',
    summary: 'Aplicación web para gestionar la administración, la vida residencial y la seguridad de un condominio.',
    year: '2026',
    role: 'Fullstack Developer',
    featured: true,
    draft: true,
    problem: 'La seguridad del condominio era reactiva, y los reportes de incidentes, la comunicación y las finanzas eran lentos y poco transparentes.',
    decision: 'Backend en NestJS, Prisma y PostgreSQL con Docker en un VPS; armé el CI/CD con GitHub Actions y los entornos de prueba.',
    result: 'Entregamos por sprints los módulos de seguridad, incidentes y control de accesos, y estabilizamos el entorno de QA.',
    metric: null,
    stack: ['NestJS', 'PostgreSQL', 'Docker', 'GitHub Actions', 'Cloudflare R2', 'Next.js', 'React', 'Tailwind CSS'],
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
    slug: 'euphoria',
    number: '03',
    name: 'Salón de Belleza Euphoria',
    summary: 'Sitio con catálogo, agenda en línea y monedero de puntos para un salón de belleza, conectado a la API de Tiven.',
    year: '2026 – hoy',
    role: 'Fullstack (desarrollador único)',
    featured: true,
    draft: true,
    problem: 'El salón no tenía presencia en línea: para conocer servicios o agendar había que llamar, y no existía un programa de lealtad.',
    decision: 'Frontend en Nuxt con TypeScript que consume la API de Tiven para las citas y el monedero de puntos.',
    result: null,
    metric: null,
    stack: ['NuxtJS', 'Vue.js', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    cover: null,
    images: [
      { src: '/projects/euphoria/1.png', width: 1343, height: 963, alt: 'Portada del sitio de Euphoria con el botón para agendar una cita' },
      { src: '/projects/euphoria/2.png', width: 1343, height: 963, alt: 'Sección de servicios y equipo del salón Euphoria' },
      { src: '/projects/euphoria/3.png', width: 1343, height: 963, alt: 'Carrusel de testimonios de clientes en el sitio de Euphoria' },
      { src: '/projects/euphoria/4.png', width: 1151, height: 970, alt: 'Catálogo de servicios de Euphoria filtrado por categoría, con duración y precio' },
      { src: '/projects/euphoria/5.png', width: 1140, height: 970, alt: 'Flujo para personalizar una cita en Euphoria: calendario y hora' }
    ],
    links: { live: 'https://euphoria-web.pages.dev', caseStudy: '/proyectos/euphoria' }
  },
  {
    slug: 'unistmo-web',
    number: '04',
    name: 'Universidad del Istmo · Sitio web',
    summary: 'Nuevo sitio oficial de la Universidad del Istmo, con contenido que el personal administra sin tocar código.',
    year: '2026 – hoy',
    role: 'Fullstack Developer',
    featured: false,
    draft: true,
    problem: 'El sitio anterior no era responsivo y actualizar contenido dependía del equipo técnico, así que la información quedaba desactualizada.',
    decision: 'Astro (SSG) para velocidad y Strapi como CMS para que el personal publique sin código, desplegado con Docker Compose.',
    result: 'Una versión inicial con mejores tiempos de carga y uso móvil que el sitio anterior, a punto de publicarse como sitio oficial.',
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
    summary: 'Aplicación web para cálculos estadísticos y visualización interactiva de distribuciones de probabilidad.',
    year: '2025 – 2026',
    role: 'Fullstack Developer',
    featured: false,
    draft: true,
    problem: 'Las herramientas estadísticas son complejas (SPSS, R) o son calculadoras sin visualización interactiva de las distribuciones.',
    decision: 'Cálculos en Laravel y un frontend reactivo en Vue 3 con Inertia para redibujar las gráficas al cambiar los parámetros.',
    result: 'Compañeros de clase la usaron para validar sus ejercicios de estadística.',
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
    summary: 'Plataforma de pedidos para una pastelería local.',
    year: '2024 – 2025',
    role: 'Fullstack Developer · líder de equipo',
    featured: false,
    draft: true,
    problem: 'La pastelería tomaba pedidos a mano por WhatsApp o teléfono, con errores y sin seguimiento después de la venta.',
    decision: 'Un monolito en Laravel y Blade con MySQL para que un equipo de 10 colaborara rápido, coordinado con Kanban y GitFlow.',
    result: 'Una plataforma evaluada satisfactoriamente que permitió a la pastelería operar sus pedidos en línea.',
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
