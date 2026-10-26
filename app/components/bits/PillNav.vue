<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Download } from 'lucide-vue-next';

// Animaciones de hover y del menú móvil en CSS (antes GSAP): menos JS y respeta prefers-reduced-motion

type PillNavItem = {
  label: string;
  href?: string;
  ariaLabel?: string;
};

interface PillNavProps {
  logo: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  secondaryLink?: { label: string; href: string; download?: string; ariaLabel?: string };
}

const props = withDefaults(defineProps<PillNavProps>(), {
  className: '',
  baseColor: '#2563EB',
  pillColor: '#38BDF8',
  hoveredPillTextColor: '#38BDF8'
});

const isMobileMenuOpen = ref(false);

const cssVars = computed(() => ({
  '--base': props.baseColor,
  '--pill-bg': props.pillColor,
  '--hover-text': props.hoveredPillTextColor,
  '--pill-text': props.pillTextColor ?? props.baseColor,
  '--nav-h': '42px',
  '--pill-pad-x': '18px',
  '--pill-gap': '3px'
}));

const route = useRoute();
// activeHref viene del scroll-spy del Header; sin él se compara con la ruta
const isActive = (href?: string) => {
  if (!href) return false;
  if (props.activeHref !== undefined) return props.activeHref === href;
  return route.path === href;
};
</script>

<template>
  <div class="top-4 left-0 z-50 fixed w-full" :style="cssVars">
    <nav
      :class="['w-full flex items-center justify-between box-border px-4', className]"
      aria-label="Navegación principal"
    >
      <NuxtLink to="/" aria-label="Ir al inicio" class="logo inline-flex justify-center items-center p-2 rounded-full overflow-hidden">
        <img :src="logo" alt="" class="block w-full h-full object-cover" />
      </NuxtLink>

      <div class="hidden lg:flex items-center gap-3 ml-2">
        <div class="relative flex items-center rounded-full pills">
          <ul class="flex items-stretch m-0 p-[3px] h-full list-none" :style="{ gap: 'var(--pill-gap)' }">
            <li v-for="(item, i) in items" :key="item.href || `item-${i}`" class="flex h-full">
              <NuxtLink
                v-if="item.href"
                :to="item.href"
                class="pill inline-flex box-border relative justify-center items-center rounded-full h-full overflow-hidden font-semibold text-[16px] no-underline uppercase leading-[0] tracking-[0.2px] whitespace-nowrap cursor-pointer"
                :aria-label="item.ariaLabel"
                :aria-current="isActive(item.href) ? 'true' : undefined"
              >
                <span class="hover-circle" aria-hidden="true" />
                <span class="inline-block z-[2] relative leading-[1]">
                  <span class="inline-block z-[2] relative leading-[1] pill-label">{{ item.label }}</span>
                  <!-- Copia visual para el hover: el texto sale de CSS (data-label) para no duplicar el nombre -->
                  <span class="inline-block top-0 left-0 z-[3] absolute pill-label-hover" :data-label="item.label" aria-hidden="true" />
                </span>
                <span
                  v-if="isActive(item.href)"
                  class="-bottom-[6px] left-1/2 z-[4] absolute rounded-full w-3 h-3 -translate-x-1/2 bg-brand-blue-strong"
                  aria-hidden="true"
                />
              </NuxtLink>
            </li>
          </ul>
        </div>

        <a
          v-if="secondaryLink"
          :href="secondaryLink.href"
          :download="secondaryLink.download"
          :aria-label="secondaryLink.ariaLabel"
          class="nav-secondary inline-flex items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold uppercase tracking-[0.12em]"
        >
          <Download class="w-3.5 h-3.5" aria-hidden="true" />
          {{ secondaryLink.label }}
        </a>
      </div>

      <button
        type="button"
        :aria-label="isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="mobile-menu"
        class="hamburger lg:hidden relative flex flex-col justify-center items-center gap-1 p-0 border-0 rounded-full cursor-pointer"
        :class="{ 'is-open': isMobileMenuOpen }"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <span class="hamburger-line" />
        <span class="hamburger-line" />
      </button>
    </nav>

    <div
      id="mobile-menu"
      class="mobile-menu lg:hidden top-[3em] right-4 left-4 z-[998] absolute shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-[27px]"
      :class="{ 'is-open': isMobileMenuOpen }"
    >
      <ul class="flex flex-col gap-[3px] m-0 p-[3px] list-none">
        <li v-for="item in items" :key="item.href || `mobile-${item.label}`">
          <NuxtLink
            v-if="item.href"
            :to="item.href"
            class="mobile-link block px-4 py-3 rounded-[50px] font-medium text-[16px]"
            :aria-current="isActive(item.href) ? 'true' : undefined"
            @click="isMobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
        <li v-if="secondaryLink">
          <a
            :href="secondaryLink.href"
            :download="secondaryLink.download"
            class="flex items-center gap-2 px-4 py-3 rounded-[50px] font-medium text-[15px] text-ink-muted"
            @click="isMobileMenuOpen = false"
          >
            <Download class="w-4 h-4" aria-hidden="true" />
            {{ secondaryLink.ariaLabel || secondaryLink.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: var(--nav-h);
  height: var(--nav-h);
  background: var(--base);
}

.logo img { transition: rotate 200ms var(--ease-brand); }
.logo:hover img { rotate: 360deg; }

.pills {
  height: var(--nav-h);
  background: var(--base);
}

.pill {
  padding-inline: var(--pill-pad-x);
  background: var(--pill-bg);
  color: var(--pill-text);
}

/* Círculo que sube desde la base de la pastilla al pasar el cursor o enfocar */
.hover-circle {
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: 0;
  width: 140%;
  aspect-ratio: 1;
  border-radius: 999px;
  background: var(--base);
  pointer-events: none;
  transform: translate(-50%, 50%) scale(0);
  transition: transform 300ms var(--ease-brand);
}

.pill-label,
.pill-label-hover {
  transition: transform 300ms var(--ease-brand), opacity 300ms var(--ease-brand);
}

.pill-label-hover {
  color: var(--hover-text);
  opacity: 0;
  transform: translateY(150%);
}

.pill-label-hover::after {
  content: attr(data-label);
}

.pill:hover .hover-circle,
.pill:focus-visible .hover-circle { transform: translate(-50%, 50%) scale(1.2); }

.pill:hover .pill-label,
.pill:focus-visible .pill-label { transform: translateY(-150%); }

.pill:hover .pill-label-hover,
.pill:focus-visible .pill-label-hover { opacity: 1; transform: translateY(0); }

.nav-secondary {
  height: var(--nav-h);
  color: var(--text-muted);
  transition: color 180ms var(--ease-brand), background-color 180ms var(--ease-brand);
}

.nav-secondary:hover {
  background: var(--nav-pill);
  color: var(--cyan-soft);
}

.hamburger {
  width: var(--nav-h);
  height: var(--nav-h);
  background: var(--pill-bg);
}

.hamburger-line {
  width: 1rem;
  height: 2px;
  border-radius: 2px;
  background: var(--pill-text);
  transition: transform 300ms var(--ease-brand);
}

.hamburger.is-open .hamburger-line:first-child { transform: translateY(3px) rotate(45deg); }
.hamburger.is-open .hamburger-line:last-child { transform: translateY(-3px) rotate(-45deg); }

/* Cerrado: invisible y fuera del árbol de accesibilidad (visibility) */
.mobile-menu {
  background: var(--base);
  opacity: 0;
  transform: translateY(10px);
  visibility: hidden;
  transition: opacity 200ms var(--ease-brand), transform 200ms var(--ease-brand), visibility 0s linear 200ms;
}

.mobile-menu.is-open {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  transition: opacity 300ms var(--ease-brand), transform 300ms var(--ease-brand), visibility 0s;
}

.mobile-link {
  background: var(--pill-bg);
  color: var(--pill-text);
  transition: background-color 200ms var(--ease-brand), color 200ms var(--ease-brand);
}

.mobile-link:hover {
  background: var(--base);
  color: var(--hover-text);
}
</style>
