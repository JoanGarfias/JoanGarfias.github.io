// /blog/rss.xml: feed RSS 2.0 con los posts publicados (sin draft).
// Se prerenderiza en el build (nitro.prerender.routes), así que no corre en el worker.
import { queryCollection } from '@nuxt/content/server'

const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]!)

export default defineEventHandler(async (event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const posts = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'date', 'tags')
    .all()

  const items = posts.map((post) => {
    const url = `${siteUrl}${post.path}`
    return [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
      `      <description>${escapeXml(post.description)}</description>`,
      ...post.tags.map(tag => `      <category>${escapeXml(tag)}</category>`),
      '    </item>'
    ].join('\n')
  })

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog de Joan Garfias</title>
    <link>${siteUrl}/blog</link>
    <description>Notas sobre backend, cloud y lo que aprendo construyendo software desde Oaxaca.</description>
    <language>es-MX</language>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>\n` : ''}${items.join('\n')}
  </channel>
</rss>
`
})
