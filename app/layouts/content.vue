<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
    <Header />
    <main id="main-content" class="site-container py-24 lg:py-32" role="main">
        <slot />
    </main>
    <Footer />
  </div>
</template>
