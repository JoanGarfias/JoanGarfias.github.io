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
    <BitsAnimatedContent
        :distance="100"
        direction="horizontal"
        :reverse="false"
        :duration="0.8"
        ease="power3.out"
        :initial-opacity="0"
        :animate-opacity="true"
        :scale="1"
        :threshold="0.1"
        :delay="0"
    >

        <Hero />
    
    </BitsAnimatedContent>
  </div>
</template>