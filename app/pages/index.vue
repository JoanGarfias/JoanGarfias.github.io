<template>
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
</template>