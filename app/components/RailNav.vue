<script setup lang="ts">
import { ArrowUp, FileDown, FolderKanban, House, Layers, Moon, Newspaper, Send, Sun, User, Users } from 'lucide-vue-next'

// Mismo orden que las secciones de la home (Blog es una página aparte). mobile: false → solo en el rail de escritorio
const items = [
  { id: 'inicio', label: 'Inicio', href: '/', icon: House },
  { id: 'proyectos', label: 'Proyectos', href: '/#proyectos', icon: FolderKanban },
  { id: 'stack', label: 'Stack', href: '/#stack', icon: Layers, mobile: false },
  { id: 'sobre-mi', label: 'Sobre mí', href: '/#sobre-mi', icon: User },
  { id: 'comunidad', label: 'Comunidad', href: '/#comunidad', icon: Users },
  { id: 'contacto', label: 'Contacto', href: '/#contacto', icon: Send }
]

// Rutas internas → ítem del menú
const routeToId: [string, string][] = [
  ['/proyectos', 'proyectos'],
  ['/sobre-mi', 'sobre-mi'],
  ['/blog', 'blog'],
  ['/contacto', 'contacto']
]

const route = useRoute()
const { theme, toggle } = useTheme()
const { activeId, refresh } = useScrollSpy(items.map(i => i.id))
// El rail persiste entre rutas: al volver a la home hay que medir las secciones nuevas
useNuxtApp().hook('page:finish', refresh)

const current = computed(() => {
  if (route.path === '/') return activeId.value ?? 'inicio'
  return routeToId.find(([prefix]) => route.path.startsWith(prefix))?.[1] ?? null
})

// Progreso de lectura (barra vertical junto al rail)
const progress = ref(0)
let frame = 0
const measure = () => {
  frame = 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}
const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(frame)
})

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

// Indicador que se desliza hasta el ítem activo (medido en el DOM; antes de montar el activo se pinta solo)
const itemEls: (HTMLElement | null)[] = []
const indicator = ref<{ x: number; y: number; w: number; h: number } | null>(null)

const place = () => {
  let index = items.findIndex(i => i.id === current.value)
  // Ítems ocultos en móvil (Stack) → el anterior visible
  while (index > 0 && !itemEls[index]?.offsetWidth) index--
  const el = index >= 0 ? itemEls[index] : null
  indicator.value = el?.offsetWidth ? { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight } : null
}

watch(current, () => nextTick(place))
onMounted(() => {
  nextTick(place)
  window.addEventListener('resize', place, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('resize', place))
</script>

<template>
  <nav class="rail" aria-label="Principal">
    <div class="rail__inner">
      <button
        type="button"
        class="rail__btn rail__desktop"
        :aria-label="theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
        @click="toggle"
      >
        <Transition name="rail-icon" mode="out-in">
          <Sun v-if="theme === 'dark'" key="sun" class="rail__icon" aria-hidden="true" />
          <Moon v-else key="moon" class="rail__icon" aria-hidden="true" />
        </Transition>
        <span class="rail__tip" aria-hidden="true">{{ theme === 'dark' ? 'Tema claro' : 'Tema oscuro' }}</span>
      </button>

      <ul class="rail__group" :class="{ 'has-indicator': indicator }">
        <span
          v-if="indicator"
          class="rail__indicator"
          aria-hidden="true"
          :style="{ width: `${indicator.w}px`, height: `${indicator.h}px`, transform: `translate(${indicator.x}px, ${indicator.y}px)` }"
        ></span>
        <li
          v-for="(item, i) in items"
          :key="item.id"
          :ref="el => (itemEls[i] = el as HTMLElement | null)"
          :class="{ rail__desktop: item.mobile === false }"
        >
          <NuxtLink
            :to="item.href"
            class="rail__btn"
            :class="{ 'is-active': current === item.id }"
            :aria-current="current === item.id ? 'location' : undefined"
            :aria-label="item.label"
          >
            <component :is="item.icon" class="rail__icon" aria-hidden="true" />
            <span class="rail__label" aria-hidden="true">{{ item.label }}</span>
            <span class="rail__tip" aria-hidden="true">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>

      <a href="/cv.pdf" download="CV_Joan_Garfias.pdf" class="rail__btn rail__desktop" aria-label="Descargar CV (PDF)">
        <FileDown class="rail__icon" aria-hidden="true" />
        <span class="rail__tip" aria-hidden="true">Descargar CV</span>
      </a>

      <button type="button" class="rail__btn rail__desktop" aria-label="Mi blog">
        <nuxt-link to="/blog">
          <Newspaper class="rail__icon" aria-hidden="true" />
          <span class="rail__tip" aria-hidden="true">Blog</span>
        </nuxt-link>
      </button>

      <button type="button" class="rail__btn rail__desktop" aria-label="Volver arriba" @click="toTop">
        <ArrowUp class="rail__icon" aria-hidden="true" />
        <span class="rail__tip" aria-hidden="true">Arriba</span>
      </button>
    </div>

    <div class="rail__progress rail__desktop" aria-hidden="true">
      <span :style="{ transform: `scaleY(${progress})` }"></span>
    </div>
  </nav>
</template>

<style scoped>
/* Móvil: barra inferior flotante con icono + etiqueta */
.rail {
  position: fixed;
  right: 0.75rem;
  bottom: max(0.75rem, env(safe-area-inset-bottom));
  left: 0.75rem;
  z-index: 40;
}

.rail__inner {
  margin-inline: auto;
  max-width: 28rem;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface-1) 88%, transparent);
  box-shadow: var(--shadow-float);
  padding: 0.35rem;
  backdrop-filter: blur(14px);
}

.rail__group {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
}

.rail__btn {
  position: relative;
  display: flex;
  min-height: 3rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  border-radius: 999px;
  color: var(--text-muted);
  cursor: pointer;
  transition: background-color 200ms var(--ease-brand), color 200ms var(--ease-brand);
}

.rail__btn:hover { color: var(--text-strong); }

.rail__btn.is-active {
  background: var(--accent);
  color: var(--on-accent);
}

/* Con el indicador medido, el fondo lo pone él y se desliza entre ítems */
.has-indicator .rail__btn.is-active { background: transparent; }

.rail__indicator {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 999px;
  background: var(--accent);
  transition: transform 450ms var(--ease-brand), width 450ms var(--ease-brand), height 450ms var(--ease-brand);
}

.rail__icon {
  width: 1.125rem;
  height: 1.125rem;
}

.rail__label {
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1;
}

.rail__tip { display: none; }

@media (max-width: 1023.98px) {
  .rail__desktop { display: none; }
}

/* Escritorio: rail vertical de iconos con tooltip a la izquierda */
@media (min-width: 1024px) {
  .rail {
    position: sticky;
    top: 1rem;
    right: auto;
    bottom: auto;
    left: auto;
    display: flex;
    height: calc(100dvh - 2rem);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .rail__inner {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border-radius: 999px;
    padding: 0.3rem;
  }

  .rail__group {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    border-block: 1px solid var(--border-subtle);
    padding-block: 0.4rem;
  }

  .rail__btn {
    width: 2.25rem;
    min-height: 2.25rem;
  }

  .rail__label { display: none; }

  .rail__tip {
    position: absolute;
    top: 50%;
    right: calc(100% + 0.75rem);
    display: block;
    border-radius: 0.5rem;
    background: var(--text-strong);
    padding: 0.35rem 0.6rem;
    color: var(--surface-0);
    font-size: 0.75rem;
    font-weight: 600;
    opacity: 0;
    pointer-events: none;
    transform: translate(6px, -50%);
    transition: opacity 160ms var(--ease-brand), transform 160ms var(--ease-brand);
    white-space: nowrap;
  }

  .rail__btn:hover .rail__tip,
  .rail__btn:focus-visible .rail__tip {
    opacity: 1;
    transform: translate(0, -50%);
  }

  .rail__progress {
    width: 3px;
    height: 4.5rem;
    overflow: hidden;
    border-radius: 999px;
    background: var(--border-subtle);
  }

  .rail__progress span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--accent);
    transform-origin: top;
  }
}

.rail-icon-enter-active,
.rail-icon-leave-active { transition: opacity 160ms var(--ease-brand), transform 200ms var(--ease-brand); }
.rail-icon-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.6); }
.rail-icon-leave-to { opacity: 0; transform: rotate(90deg) scale(0.6); }
</style>
