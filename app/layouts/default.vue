<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
    <Header />
    <main id="main-content" class="overflow-x-hidden" role="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
}
</style>
