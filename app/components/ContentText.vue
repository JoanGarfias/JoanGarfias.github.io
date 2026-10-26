<script setup lang="ts">
// Muestra un valor de contenido o, si falta ("[PENDIENTE: …]" o null), su PendingText
const props = defineProps<{
  value: string | null | undefined
  label?: string
  type?: 'info' | 'dato' | 'link'
}>()

const { isPendingValue } = usePending()
const pendingLabel = computed(() =>
  props.value?.match(/^\[PENDIENTE:\s*(.*)\]$/)?.[1] ?? props.label ?? 'dato'
)
</script>

<template>
  <PendingText v-if="isPendingValue(props.value)" :label="pendingLabel" :type="props.type" />
  <template v-else>{{ props.value }}</template>
</template>
