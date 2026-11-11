<script setup lang="ts">
// Número que cuenta desde 0 al entrar en pantalla. El HTML prerenderizado ya trae el valor final.
const props = withDefaults(defineProps<{ value: number; duration?: number }>(), { duration: 1400 })

const el = ref<HTMLElement | null>(null)
const shown = ref(props.value)
let observer: IntersectionObserver | null = null
let frame = 0

const run = () => {
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / props.duration)
    shown.value = Math.round(props.value * (1 - (1 - t) ** 3))
    if (t < 1) frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
  shown.value = 0
  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    observer?.disconnect()
    run()
  }, { threshold: 0.6 })
  if (el.value) observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<template>
  <span ref="el" class="tabular-nums">
    <span aria-hidden="true">{{ shown }}</span><span class="sr-only">{{ props.value }}</span>
  </span>
</template>
