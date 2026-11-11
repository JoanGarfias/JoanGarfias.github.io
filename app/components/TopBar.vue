<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const { theme, toggle } = useTheme()

// Hora local de Oaxaca. Solo en cliente: el HTML prerenderizado no puede saber la hora
const clock = ref<{ date: string; time: string } | null>(null)
const dateFormat = new Intl.DateTimeFormat('es-MX', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'America/Mexico_City' })
const timeFormat = new Intl.DateTimeFormat('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Mexico_City' })
let timer: ReturnType<typeof setInterval> | undefined

const tick = () => {
  const now = new Date()
  clock.value = { date: dateFormat.format(now), time: timeFormat.format(now) }
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 15_000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="top-bar">
    <NuxtLink to="/" class="top-bar__brand">
      <img src="/logo.svg" alt="" width="1340" height="1012" class="top-bar__logo h-6 w-auto" />
      <span class="font-display text-base font-medium tracking-tight text-ink-strong">Joan Garfias</span>
    </NuxtLink>

    <p class="top-bar__clock" aria-label="Hora local en Oaxaca">
      <template v-if="clock">
        <span class="capitalize">{{ clock.date }}</span>
        <span class="tabular-nums">{{ clock.time }} <span class="text-ink-title-2">Oaxaca</span></span>
      </template>
    </p>

    <button
      type="button"
      class="top-bar__theme"
      :aria-label="theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
      @click="toggle"
    >
      <Sun v-if="theme === 'dark'" class="h-[18px] w-[18px]" aria-hidden="true" />
      <Moon v-else class="h-[18px] w-[18px]" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.top-bar {
  display: flex;
  min-height: 3rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1rem 0.5rem;
}

.top-bar__brand {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.6rem;
}

/* El logo es blanco: en tema claro se invierte */
.top-bar__logo { filter: invert(1); }
:root[data-theme="dark"] .top-bar__logo { filter: none; }

.top-bar__clock {
  display: none;
  min-width: 7.5rem;
  margin-left: auto;
  flex-direction: column;
  align-items: flex-end;
  color: var(--text-muted);
  font-size: 0.8125rem;
  line-height: 1.35;
}

.top-bar__theme {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  background: var(--surface-1);
  color: var(--text-strong);
  cursor: pointer;
}

@media (min-width: 640px) {
  .top-bar__clock { display: flex; }
  .top-bar__theme { margin-left: 0; }
}

/* En escritorio la marca vive en la tarjeta y el tema en el rail */
@media (min-width: 1024px) {
  .top-bar { justify-content: flex-end; }
  .top-bar__brand,
  .top-bar__theme { display: none; }
}
</style>
