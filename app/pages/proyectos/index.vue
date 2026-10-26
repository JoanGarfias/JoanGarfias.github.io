<script setup>
definePageMeta({
  layout: 'content'
})

useHead({
  title: 'Proyectos | Joan Garfias',
  meta: [
    { name: 'description', content: 'Casos de estudio de software que he construido: backend, cloud y producto web para negocios reales.' }
  ]
})
</script>

<template>
    <ProjectGrid title-tag="h1" />
</template>