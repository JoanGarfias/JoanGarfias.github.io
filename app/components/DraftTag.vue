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
  border: 1px dashed rgba(103, 232, 249, 0.45);
  border-radius: 0.375rem;
  background: rgba(103, 232, 249, 0.08);
  padding: 0.15rem 0.45rem;
  color: var(--cyan-soft);
  font-family: var(--font-meta);
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
