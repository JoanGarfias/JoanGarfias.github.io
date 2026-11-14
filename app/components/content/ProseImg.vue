<script setup lang="ts">
// Imágenes dentro de los posts: AVIF/WebP responsivos con Nuxt Image y lazy loading.
// width/height los calcula el hook content:file:afterParse (nuxt.config.ts) para reservar el espacio.
const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}>(), {
  src: '',
  alt: '',
  width: undefined,
  height: undefined
})

// alt obligatorio: un post con una imagen sin descripción no se publica (el build falla)
if (!props.alt.trim()) {
  const message = `[blog] Imagen sin texto alternativo: ${props.src}. Escribe ![descripción](${props.src})`
  if (import.meta.prerender) throw new Error(message)
  if (import.meta.dev) console.warn(message)
}

// Las imágenes locales pasan por Nuxt Image; las externas se muestran tal cual
const isLocal = computed(() => props.src.startsWith('/') && !props.src.startsWith('//'))
// GIF y SVG no se convierten (perderían la animación o el vector)
const optimizable = computed(() => isLocal.value && !/\.(gif|svg)$/i.test(props.src))
</script>

<template>
  <NuxtPicture
    v-if="optimizable"
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    format="avif,webp"
    sizes="xs:100vw sm:100vw md:720px"
    loading="lazy"
    decoding="async"
    class="prose-img"
  />
  <img
    v-else
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    loading="lazy"
    decoding="async"
    class="prose-img"
  />
</template>
