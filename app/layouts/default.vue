<script setup lang="ts">
const route = useRoute()
// En móvil la tarjeta de perfil solo abre la home; en escritorio acompaña a todas las páginas
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="app-shell">
    <a href="#main-content" class="skip-link">Saltar al contenido</a>

    <TopBar class="app-shell__top" />
    <ProfileCard class="app-shell__card" :class="{ 'max-lg:hidden': !isHome }" />

    <div class="app-shell__main">
      <main id="main-content" class="site-container">
        <slot />
      </main>
      <Footer />
    </div>

    <RailNav class="app-shell__rail" />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100dvh;
  padding: 0 0.75rem 7rem;
}

.app-shell__main {
  min-width: 0;
  padding-inline: 0.5rem;
}

@media (min-width: 768px) {
  .app-shell { padding-inline: 1.5rem; }
}

/* Tres columnas: tarjeta fija · contenido · rail de navegación */
@media (min-width: 1024px) {
  .app-shell {
    display: grid;
    grid-template-areas:
      "card top  rail"
      "card main rail";
    grid-template-columns: minmax(18.5rem, 22rem) minmax(0, 1fr) 2.75rem;
    grid-template-rows: auto 1fr;
    column-gap: 2rem;
    padding: 1rem;
  }

  .app-shell__top { grid-area: top; }
  .app-shell__main { grid-area: main; padding-inline: 0; }
  .app-shell__rail { grid-area: rail; align-self: start; }

  .app-shell__card {
    grid-area: card;
    align-self: start;
    position: sticky;
    top: 1rem;
    height: calc(100dvh - 2rem);
  }
}

@media (min-width: 1280px) {
  .app-shell {
    grid-template-columns: 24rem minmax(0, 1fr) 2.75rem;
    column-gap: 3rem;
  }
}
</style>
