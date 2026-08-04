<script setup>
useHead({
  title: 'Joan Garfias | Desarrollador de Software & Full-stack',
  meta: [
    { name: 'description', content: 'Desarrollador Full-stack especializado en crear aplicaciones web modernas, interfaces intuitivas y soluciones tecnológicas eficientes.' }
  ]
})
</script>

<template>
  <div class="overflow-x-hidden">
    <Hero />
    <div class="site-container">
      <ScrollReveal><ProjectGrid /></ScrollReveal>
      <ScrollReveal><Skills /></ScrollReveal>
    </div>
    <ScrollReveal><AboutMe /></ScrollReveal>
    <div class="site-container"><ScrollReveal><Contact /></ScrollReveal></div>
  </div>
</template>
