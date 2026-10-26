// Tecnologías de la banda de stack. `name` debe coincidir con los valores de projects[].stack
// para resaltar los proyectos donde se usó.

export interface StackItem {
  name: string
  icon?: string
}

export const stackGroups: { title: string; items: StackItem[] }[] = [
  {
    title: 'Backend e infraestructura',
    items: [
      { name: 'AWS', icon: 'aws.svg' },
      { name: 'Docker' },
      { name: 'Laravel', icon: 'laravel.svg' },
      { name: 'PHP', icon: 'php.svg' },
      { name: 'NestJS', icon: 'nestjs.svg' },
      { name: 'PostgreSQL', icon: 'postgresql.svg' },
      { name: 'MySQL', icon: 'mysql.svg' },
      { name: 'Python', icon: 'python.svg' }
    ]
  },
  {
    title: 'Frontend',
    items: [
      { name: 'Vue.js', icon: 'vue.svg' },
      { name: 'NuxtJS', icon: 'nuxt.svg' },
      { name: 'TypeScript', icon: 'typescript.svg' },
      { name: 'JavaScript', icon: 'js.svg' },
      { name: 'Astro', icon: 'astro.svg' },
      { name: 'Tailwind CSS', icon: 'tailwind.svg' }
    ]
  }
]

export const certifications = [
  {
    issuer: 'AWS Certified Cloud Practitioner',
    code: 'AWS CLF-C002',
    description: 'Certificación de fundamentos de AWS que valida conocimiento básico de nube, seguridad, arquitectura, precios y servicios principales.',
    url: 'https://www.credly.com/badges/05c0a6b5-8ec7-4329-8394-6e5a25947141/public_url'
  }
]
