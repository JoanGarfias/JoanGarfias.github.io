<script setup lang="ts">
import type { ProjectImage } from '~/content/projects'
import { imageWidths, optimizedSrc } from '~/utils/images'

defineOptions({ inheritAttrs: false })

// Captura con variantes WebP (scripts/optimize-images.mjs) y el original como respaldo
const props = withDefaults(defineProps<{
  image: ProjectImage
  sizes?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
}>(), {
  sizes: '100vw',
  loading: 'lazy',
  priority: false
})

const srcset = computed(() =>
  imageWidths(props.image.width).map(w => `${optimizedSrc(props.image.src, w)} ${w}w`).join(', ')
)
</script>

<template>
  <picture class="contents">
    <source type="image/webp" :srcset="srcset" :sizes="props.sizes" />
    <img
      :src="props.image.src"
      :width="props.image.width"
      :height="props.image.height"
      :alt="props.image.alt"
      :loading="props.priority ? 'eager' : props.loading"
      :fetchpriority="props.priority ? 'high' : undefined"
      decoding="async"
      v-bind="$attrs"
    />
  </picture>
</template>
