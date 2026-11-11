<script setup lang="ts">
import { now } from '~/content/now'

// Mini terminal decorativa: las líneas aparecen una tras otra al entrar en pantalla
const lines = [
  { cmd: 'whoami', out: 'Joan Garfias · backend & cloud' },
  { cmd: 'pwd', out: '~/oaxaca/mexico' },
  { cmd: 'cat ahora.txt', out: now.text }
]
</script>

<template>
  <figure class="terminal">
    <figcaption class="terminal__bar">
      <span class="terminal__dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>joan@oaxaca: ~</span>
    </figcaption>
    <div class="terminal__body">
      <template v-for="(line, i) in lines" :key="line.cmd">
        <p class="terminal__line" :style="{ '--i': i * 2 }"><span class="text-accent-ink">$</span> {{ line.cmd }}</p>
        <p class="terminal__line terminal__out" :style="{ '--i': i * 2 + 1 }">
          <template v-if="line.out">{{ line.out }}</template>
          <PendingText v-else label="qué estoy haciendo hoy (1 línea)" />
        </p>
      </template>
      <p class="terminal__line" :style="{ '--i': lines.length * 2 }"><span class="text-accent-ink">$</span> <span class="terminal__caret" aria-hidden="true"></span></p>
    </div>
  </figure>
</template>

<style scoped>
.terminal {
  width: 100%;
  max-width: 24rem;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--surface-1);
  box-shadow: var(--shadow-float);
  font-family: var(--font-meta);
  font-size: 0.8125rem;
}

.terminal__bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--surface-2);
  padding: 0.55rem 0.85rem;
  color: var(--text-muted);
  font-size: 0.75rem;
}

.terminal__dots { display: flex; gap: 0.35rem; }

.terminal__dots i {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  background: var(--border-strong);
}

.terminal__dots i:first-child { background: var(--accent); }

.terminal__body {
  display: grid;
  gap: 0.2rem;
  padding: 1rem 1.1rem 1.1rem;
  color: var(--text-strong);
  line-height: 1.6;
}

.terminal__out { margin-bottom: 0.45rem; color: var(--text-muted); }

/* Sin JS todo se ve; con JS cada línea aparece cuando el bloque se revela */
.js .terminal__line { opacity: 0; }

.is-visible .terminal__line {
  animation: term-line 380ms var(--ease-brand) forwards;
  animation-delay: calc(var(--i) * 260ms + 200ms);
}

@keyframes term-line {
  from { opacity: 0; transform: translateX(-6px); }
  to { opacity: 1; transform: none; }
}

.terminal__caret {
  display: inline-block;
  width: 0.55rem;
  height: 1em;
  background: var(--accent);
  vertical-align: -0.15em;
  animation: caret 1s steps(1) infinite;
}

@keyframes caret {
  50% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .js .terminal__line { opacity: 1; }
}
</style>
