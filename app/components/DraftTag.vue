<script setup lang="ts">
// Marca visible para texto redactado a partir de tu contenido que falta validar
const { showPending } = usePending()
</script>

<template>
  <span v-if="showPending" class="draft-tag">[Borrador – validar]</span>
</template>

<style scoped>
.draft-tag {
  display: inline-block;
  border: 1px dashed color-mix(in srgb, var(--accent) 45%, transparent);
  border-radius: 0.375rem;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  padding: 0.15rem 0.45rem;
  color: var(--accent-ink);
  font-family: var(--font-meta);
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
