<template>
  <div class="min-h-screen bg-surface-0 text-slate-100 overflow-x-hidden">
    <a href="#main-content" class="skip-link">Saltar al contenido</a>
    <Header />
    <main id="main-content" class="site-container py-24 lg:py-32" role="main">
        <slot />
    </main>
    <Footer />
  </div>
</template>
