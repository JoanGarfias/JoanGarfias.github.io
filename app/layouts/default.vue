<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden">
    <Header />
    <main id="main-content" class="overflow-x-hidden" role="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
</script>
