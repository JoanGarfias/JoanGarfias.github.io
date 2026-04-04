<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// El punto de entrada principal para Nuxt 3
</script>

<style>
@import "tailwindcss";

:root {
  --bg-dark: #070708; /* Un negro neutro profundo, evita el azulado para mayor contraste */
  --text-main: #f1f1f1;
  --text-muted: #888888;
}

body {
  background-color: var(--bg-dark); 
  color: var(--text-main);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
}

/* Selección personalizada para mejorar el contraste visual */
::selection {
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
}

/* Mejora de renderizado de texto para tipografías grandes */
h1, h2, h3 {
  text-wrap: balance;
  letter-spacing: -0.02em;
}
</style>

