<script setup>
definePageMeta({
  layout: 'content'
})

useHead({
  title: 'Proyectos | Joan Garfias',
  meta: [
    { name: 'description', content: 'Explora mi portafolio de proyectos de desarrollo web, desde aplicaciones full-stack hasta interfaces interactivas.' }
  ]
})
</script>

<template>
    <ProjectGrid />
</template>