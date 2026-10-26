<script setup lang="ts">
const props = defineProps<{
  label: string
  type?: 'info' | 'dato' | 'link'
}>()

const { showPending } = usePending()
</script>

<template>
  <span v-if="showPending" class="pending-text" :data-type="props.type">[PENDIENTE: {{ props.label }}]</span>
</template>

<style scoped>
.pending-text {
  border-bottom: 1px dotted var(--cyan-soft);
  border-radius: 0.25rem 0.25rem 0 0;
  background: rgba(103, 232, 249, 0.12);
  padding: 0.05em 0.3em;
  color: var(--cyan-soft);
  font-family: var(--font-meta);
  font-size: 0.92em;
  font-style: normal;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
</style>
