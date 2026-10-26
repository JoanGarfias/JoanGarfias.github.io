<script setup>
// Título y descripción globales (nuxt.config.ts); aquí solo se fijan para la home
useSeoMeta({
  title: 'Joan Garfias | Desarrollador de Software · Backend & Cloud'
})
</script>

<template>
  <div class="overflow-x-hidden">
    <Hero />
    <div class="site-container">
      <ScrollReveal><ProjectGrid /></ScrollReveal>
    </div>
    <ScrollReveal><AboutMe /></ScrollReveal>
    <div class="site-container"><CommunitySection /></div>
    <div class="site-container"><ScrollReveal><Contact /></ScrollReveal></div>
  </div>
</template>
