<script setup lang="ts">
const props = withDefaults(defineProps<{
  delay?: number
  distance?: number
  as?: string
  disabled?: boolean // contenido visible al cargar (p. ej. la imagen LCP): sin reveal
}>(), {
  delay: 0,
  distance: 24,
  as: 'div',
  disabled: false
})

const element = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null
let fallbackTimer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  if (props.disabled) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    clearTimeout(fallbackTimer)
    // También revela lo que quedó arriba del viewport (scroll rápido, anclas, tecla Fin)
    if (!entry || (!entry.isIntersecting && entry.boundingClientRect.top > 0)) return
    visible.value = true
    observer?.disconnect()
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })

  if (element.value) observer.observe(element.value)
  else visible.value = true

  // El observer siempre responde al empezar a observar; si no lo hace, se muestra el contenido
  fallbackTimer = setTimeout(() => { visible.value = true }, 2000)
})

onBeforeUnmount(() => {
  clearTimeout(fallbackTimer)
  observer?.disconnect()
})
</script>

<template>
  <!-- Estilos en main.css: el estado oculto depende de la clase .js en <html> -->
  <component
    :is="props.as"
    ref="element"
    :class="props.disabled ? undefined : ['scroll-reveal', { 'is-visible': visible }]"
    :style="{ '--reveal-delay': `${props.delay}ms`, '--reveal-distance': `${props.distance}px` }"
  >
    <slot />
  </component>
</template>
