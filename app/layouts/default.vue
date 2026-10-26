<template>
  <div class="min-h-screen bg-surface-0 text-slate-100 font-sans overflow-x-hidden">
    <a href="#main-content" class="skip-link">Saltar al contenido</a>
    <Header />
    <main id="main-content" class="overflow-x-hidden" role="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
</script>
