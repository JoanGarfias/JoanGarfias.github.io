---
title: Hola, mundo
cover: /images/blog/hola-mundo/portada.png
coverAlt: Terminal con el texto “Hola, mundo.” en blanco sobre fondo oscuro y un subrayado cyan
date: '2026-11-14'
description: Estreno el blog del portafolio. Cuento cómo está hecho, sin base de datos ni backend propio, y qué voy a publicar aquí.
draft: false
tags:
  - nuxt
  - cloudflare
  - notas
---

Este es el primer post del blog. La idea es tener un lugar para escribir con más calma lo que aprendo construyendo software: decisiones de backend, cloud y lo que sale bien (y mal) en proyectos reales.

## Cómo está hecho

El blog vive dentro del mismo portafolio, en `/blog`. No hay base de datos ni un servidor aparte: cada post es un archivo Markdown en el repositorio.

- **Nuxt Content** lee los archivos de `content/blog/` y valida el frontmatter con un esquema.
- **Nuxt Image** genera versiones AVIF y WebP de cada imagen durante el build.
- **Cloudflare Pages** publica todo como HTML estático; solo el formulario de contacto corre como función.
- **Nuxt Studio** permite editar y publicar desde el navegador: cada publicación es un commit.

![Gráfica de barras que crece de izquierda a derecha bajo el título “Nuxt Content → HTML estático”](/images/blog/hola-mundo/build.png){height="1000" width="1600"}

## Un post por dentro

Cada archivo empieza con un bloque de metadatos. Los campos se validan en el build, así que un post sin título o sin fecha no llega a producción:

```yaml
title: Hola, mundo
description: Una frase que resume el post.
date: 2026-11-14
cover: /images/blog/hola-mundo/portada.png
coverAlt: Qué se ve en la portada
tags: [nuxt, cloudflare]
draft: false
```

Y para consultarlos desde una página basta con:

```ts
const posts = await queryCollection('blog')
  .where('draft', '=', false)
  .order('date', 'DESC')
  .all()
```

## Qué viene

Quiero escribir sobre:

1. Lo que aprendí llevando Tiven a producción.
2. Cómo organizo proyectos con Laravel y PostgreSQL.
3. Notas de las charlas y talleres que doy en Oaxaca.

Si algo de esto te sirve o quieres que escriba sobre un tema en particular, escríbeme.
