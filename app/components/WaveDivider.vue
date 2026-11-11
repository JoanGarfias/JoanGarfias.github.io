<script setup lang="ts">
// Divisor de firma: forma de onda de audio (beatbox). Estático: no anima nada.
const BARS = 72
const bars = Array.from({ length: BARS }, (_, i) => {
  const t = i / (BARS - 1)
  // Envolvente suave con picos irregulares, determinista para que SSR y cliente coincidan
  const envelope = Math.sin(Math.PI * t) ** 0.6
  const detail = 0.55 + 0.45 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.43))
  return Math.max(0.08, envelope * detail)
})
const accentStart = Math.floor(BARS * 0.42)
const accentEnd = Math.floor(BARS * 0.58)
</script>

<template>
  <svg
    class="wave-divider"
    :viewBox="`0 0 ${BARS * 10} 48`"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      v-for="(h, i) in bars"
      :key="i"
      :x="i * 10 + 3"
      :y="24 - h * 22"
      width="4"
      :height="h * 44"
      rx="2"
      :class="i >= accentStart && i <= accentEnd ? 'wave-divider__accent' : 'wave-divider__bar'"
    />
  </svg>
</template>

<style scoped>
.wave-divider {
  display: block;
  width: 100%;
  height: 3rem;
}

.wave-divider__bar { fill: var(--border-strong); }
.wave-divider__accent { fill: var(--accent); }
</style>
