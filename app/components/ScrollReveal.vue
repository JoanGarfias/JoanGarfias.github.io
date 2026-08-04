<script setup lang="ts">
const props = withDefaults(defineProps<{
  delay?: number
  distance?: number
  as?: string
}>(), {
  delay: 0,
  distance: 24,
  as: 'div'
})

const element = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    visible.value = true
    observer?.disconnect()
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })

  if (element.value) observer.observe(element.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <component
    :is="props.as"
    ref="element"
    :class="['scroll-reveal', { 'is-visible': visible }]"
    :style="{ '--reveal-delay': `${props.delay}ms`, '--reveal-distance': `${props.distance}px` }"
  >
    <slot />
  </component>
</template>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: translateY(var(--reveal-distance));
  transition: opacity 700ms cubic-bezier(.22, 1, .36, 1), transform 700ms cubic-bezier(.22, 1, .36, 1);
  transition-delay: var(--reveal-delay);
}
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal { opacity: 1; transform: none; }
}
</style>
