// Utilidades del blog (listado, post y RSS)

const dateFormat = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

// Las fechas del frontmatter llegan como ISO (medianoche UTC): se formatean en UTC para no restar un día
export const formatPostDate = (date: string | Date) => dateFormat.format(new Date(date))

export const isoDate = (date: string | Date) => new Date(date).toISOString().slice(0, 10)

export const absoluteUrl = (siteUrl: string, path: string) =>
  /^https?:\/\//.test(path) ? path : `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`

// Portada por defecto para OG y RSS cuando el post no tiene una (1200×630)
export const DEFAULT_BLOG_OG = '/images/blog/og-default.png'
