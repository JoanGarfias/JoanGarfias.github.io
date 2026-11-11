<script setup lang="ts">
// Etiqueta de sección estilo código: "01 ── Proyectos"
const props = defineProps<{ index: string; label: string }>()
</script>

<template>
  <p class="section-label">
    <span class="section-label__index">{{ props.index }}</span>
    <span class="section-label__rule" aria-hidden="true"></span>
    <span>{{ props.label }}</span>
  </p>
</template>

<style scoped>
.section-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-strong);
  font-family: var(--font-meta);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.section-label__index { color: var(--accent-ink); }

.section-label__rule {
  width: 2.5rem;
  height: 1px;
  background: var(--border-strong);
  transform-origin: left;
  animation: rule-grow 700ms var(--ease-brand) both;
}

@keyframes rule-grow {
  from { transform: scaleX(0); }
}
</style>
