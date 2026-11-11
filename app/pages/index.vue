<script setup>
// Título y descripción globales (nuxt.config.ts); aquí solo se fijan para la home
useSeoMeta({
  title: 'Joan Garfias | Desarrollador de Software · Backend & Cloud'
})
</script>

<template>
  <div>
    <Hero />
    <ProjectGrid />
    <ScrollReveal><AboutMe /></ScrollReveal>
    <CommunitySection />
    <ScrollReveal><Contact /></ScrollReveal>
  </div>
</template>
