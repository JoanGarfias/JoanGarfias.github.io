# Pendientes del portafolio

Contenido que debes aportar o validar. En el sitio, cada hueco se ve como `PENDIENTE · …` (PendingSlot), `[PENDIENTE: …]` (PendingText) o `[BORRADOR – VALIDAR]` (DraftTag).

**Ocultarlos en producción:** compila con `NUXT_PUBLIC_SHOW_PENDING=false`. Las fotos y videos pendientes se reemplazan por el monograma, y los bloques que solo tienen pendientes desaparecen. Ojo: hoy el proyecto `personal-website` de Cloudflare Pages no define esa variable, así que en producción **sí se verán** hasta que la agregues en Settings → Variables and Secrets.

Ordenado por prioridad: hero y comunidad primero.

## 1. Fotos, videos y datos

| Sección | Componente/archivo | Tipo | Qué falta | Especificación (ratio, tamaño, formato) |
|---|---|---|---|---|
| Hero | `app/content/now.ts` → `text` | dato | Línea "Ahora mismo": qué estoy haciendo hoy | 1 línea; actualiza también `updated` (AAAA-MM-DD) |
| Hero | `app/components/Hero.vue` → `portrait` | foto | Retrato principal definitivo (hoy se usa `/joan.jpeg`, cuadrado y recortado) | 4/5, fondo oscuro, luz lateral, mín. 1200×1500 px, JPG/WebP. Guárdalo en `public/` y actualiza `src`, `width` y `height` |
| SEO | `nuxt.config.ts` → `og:image` / `twitter:image` | foto | OG image con titular + retrato (hoy se usa `/joan.jpeg`) | 1200×630 px, PNG/JPG, menos de 1 MB, en `public/og-image.png` |
| Comunidad | `app/content/community.ts` → `communityEntries` | info | Charlas, talleres, organización y eventos reales; borra las 3 entradas `placeholder` | Por entrada: `title`, `event`, `city`, `date` (ISO), `role`. `audience` y `takeaway` solo si son reales. Las reales generan JSON-LD `Event` |
| Comunidad | `community.ts` → entrada `featured` → `photo` | foto | Foto de Joan impartiendo la charla o el taller destacado | 3/2 horizontal, que se vea el público o la pantalla, mín. 1600 px, JPG/WebP |
| Comunidad | `community.ts` → `photo` de cada entrada | foto | Miniaturas de la línea de tiempo (opcional) | 1/1, mín. 400×400 px |
| Comunidad | `community.ts` → `audience`, `takeaway`, `resources` | dato | Audiencia aprox., qué se llevó la gente y links a slides, repo, video o artículo | Texto corto; los botones sin URL no se muestran |
| Comunidad | `community.ts` → `communityIntro` | info | Por qué te importa la comunidad tech en Oaxaca | 1–2 frases |
| Comunidad · Nexis | `community.ts` → `nexis.photo` | foto | Foto grupal de un evento de Nexis | 16/9, mín. 1600×900 px, JPG/WebP |
| Comunidad · Nexis | `community.ts` → `nexis.participation` | info | En qué has participado dentro de Nexis | 1–2 frases |
| Comunidad · Nexis | `community.ts` → `nexis.members`, `nexis.events` | dato | Cifras de miembros y eventos | Texto corto, ej. `120+` |
| Comunidad · Nexis | `community.ts` → `nexis.url` | link | Link a la comunidad | URL completa |
| Comunidad · YouTube | `community.ts` → `youtube.videoId`, `videoTitle` | video | Video destacado del canal | ID de YouTube (lo que va después de `v=`) y su título. Se carga con facade (miniatura + play) |
| Proyectos | `app/content/projects.ts` → `euphoria.result` | dato | Resultado real de Euphoria (hoy solo hay "resultado esperado") | 1 frase, cuando esté publicado |
| Proyectos | `projects.ts` → `metric` | dato | Métricas reales del resto de proyectos (solo Tiven tiene una) | Solo si existen; no se inventan |
| Caso de estudio | `app/pages/proyectos/[id].vue` → Arquitectura (×6) | foto | Diagrama de arquitectura de cada proyecto | 16/9, SVG o PNG 1600×900 px, fondo oscuro o transparente. Falta agregar el campo en `projects.ts` |
| Caso de estudio | `[id].vue` → Aprendizaje (×6) | info | Qué aprendí y qué haría distinto | 2–3 frases por proyecto. Falta agregar el campo en `projects.ts` |
| Caso de estudio | `projects.ts` → `video` (×6, opcional) | video | Video demo | MP4/WebM o ID de YouTube, 30–90 s, 1920×1080 |
| Proyectos | `projects.ts` → `cover` (opcional) | foto | Portadas dedicadas (hoy se usa la primera captura) | 16/10, mín. 1600×1000 px, PNG/JPG |
| Sobre mí | `app/content/about.ts` → `aboutPhoto` | foto | Foto casual fuera de la oficina (beatbox, cancha, Oaxaca) | 4/5 vertical, mín. 1200×1500 px, JPG/WebP |

## 2. Textos por validar (`[BORRADOR – VALIDAR]`)

| Sección | Archivo | Qué validar | Cómo marcarlo como validado |
|---|---|---|---|
| Proyectos (×6) | `app/content/projects.ts` | `problem`, `decision`, `result`, `role`, `year` y la métrica de Tiven (−30% tiempo administrativo). Todo sale de tu `.md`, resumido a 1 frase | `draft: false` en cada proyecto |
| Sobre mí | `app/content/about.ts` | 3 párrafos reescritos (incluye "proyectos para negocios reales de mi región") y las 3 cards | `draft: false` en cada uno |
| Caso de estudio UNISTMO | `app/content/proyectos/unistmo-web.md` | Dice "rendimiento excepcional"; la guía de marca prohíbe "excepcional" | Edita la frase |
| Alt de capturas | `app/content/projects.ts` → `images[].alt` | Los alt se escribieron viendo cada captura | Revisa sobre todo `civitas/4.jpeg` (videollamada con tu equipo): ¿quieres publicarla? |

## 3. Técnico y configuración

| Tema | Dónde | Qué falta |
|---|---|---|
| Correo de contacto | `app/composables/useContact.ts` → `CONTACT_EMAIL` | Confirmar si es `joanpagarfk@gmail.com` (el que estaba en el sitio) u otro. Se usa en Contacto y como alternativa en el error del formulario. El ícono de email del footer (`Footer.vue`) tiene el correo escrito aparte |
| Formulario | `server/api/contacto.post.ts` (Pages Function en Cloudflare) | Configura los secretos `NUXT_RESEND_API_KEY` y `NUXT_CONTACT_EMAIL` en el proyecto `personal-website` de Cloudflare Pages (se despliega desde GitHub con `pnpm run build`; `generate` no incluye la función) |
| Dominio | DNS del dominio | Confirma que `joangarfias.me` (sin www) apunta a GitHub Pages para que redirija a `www.joangarfias.me`, que es el canonical |
| Pendientes en producción | Cloudflare Pages (`personal-website`) | Cuando todo esté listo, agrega la variable `NUXT_PUBLIC_SHOW_PENDING=false` y vuelve a desplegar |
| Fuente display | `app/app.config.ts` → `brandFonts` | Hoy en `false` (fuente del sistema). En `true` usa Space Grotesk + JetBrains Mono; habría que bajar el tracking del titular a unos −0.045em |
| Divisor de firma | `app/app.config.ts` → `signature` | Hoy en `true`. Pon `false` para quitar la onda de audio de Sobre mí |
| Certificaciones futuras | `app/content/stack.ts` → `certifications` | Agrega aquí nuevas certificaciones cuando las tengas |
| Limpieza opcional | `app/components/bits/AnimatedContent.vue`, `BlurText.vue`, `BorderGlow.vue`, `app/utils/cn.ts` | Ya no se usan (la navegación dejó GSAP por CSS). Si los borras, también puedes quitar `gsap` y `motion-v` de `package.json` |
