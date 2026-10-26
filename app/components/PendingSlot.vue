<script setup lang="ts">
import { Camera, Hash, Link2, Play, Type } from 'lucide-vue-next'

type PendingType = 'foto' | 'video' | 'info' | 'dato' | 'link'

const props = withDefaults(defineProps<{
  type: PendingType
  label: string
  ratio?: string
  hint?: string
}>(), {
  ratio: '16/9'
})

const { showPending } = usePending()

const icons = { foto: Camera, video: Play, info: Type, dato: Hash, link: Link2 }
const isMedia = computed(() => props.type === 'foto' || props.type === 'video')
</script>

<template>
  <!-- Hueco visible mientras falte el contenido -->
  <div
    v-if="showPending"
    class="pending-slot"
    :style="{ aspectRatio: props.ratio }"
    role="img"
    :aria-label="`Contenido pendiente: ${props.label}`"
  >
    <div class="pending-slot__inner" aria-hidden="true">
      <component :is="icons[props.type]" class="h-7 w-7 text-accent-soft" :stroke-width="1.5" />
      <span class="pending-slot__tag">Pendiente · {{ props.type }}</span>
      <span class="pending-slot__label">{{ props.label }}</span>
      <span v-if="props.hint" class="pending-slot__hint">{{ props.hint }}</span>
    </div>
  </div>

  <!-- Producción sin pendientes: fallback de marca solo para foto/video -->
  <div
    v-else-if="isMedia"
    class="pending-fallback"
    :style="{ aspectRatio: props.ratio }"
    aria-hidden="true"
  >
    <img src="/logo.svg" alt="" width="1340" height="1012" class="pending-fallback__mark" />
  </div>
</template>

<style scoped>
.pending-slot,
.pending-fallback {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--pending-radius, var(--radius-card));
}

.pending-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(103, 232, 249, 0.45);
  background: var(--surface-1);
  container-type: inline-size;
}

.pending-slot__inner {
  display: flex;
  max-width: 34ch;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem;
  text-align: center;
}

.pending-slot__tag {
  color: var(--cyan-soft);
  font-family: var(--font-meta);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.pending-slot__label {
  color: var(--text-body);
  font-size: 0.9375rem;
  line-height: 1.45;
}

.pending-slot__hint {
  color: var(--text-muted);
  font-size: 0.75rem;
  line-height: 1.4;
}

.pending-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-subtle);
  background:
    radial-gradient(circle at 30% 20%, rgba(34, 211, 238, 0.14), transparent 55%),
    radial-gradient(circle at 80% 90%, rgba(37, 99, 235, 0.14), transparent 50%),
    var(--surface-1);
}

.pending-fallback__mark {
  width: 28%;
  max-width: 9rem;
  height: auto;
  opacity: 0.35;
}

/* En contenedores muy pequeños (miniaturas 1/1) solo se ve el icono y la etiqueta */
@container (max-width: 160px) {
  .pending-slot__label,
  .pending-slot__hint { display: none; }
}

/* Miniaturas: solo el icono */
@container (max-width: 96px) {
  .pending-slot__tag { display: none; }
  .pending-slot__inner { padding: 0.25rem; }
}
</style>
