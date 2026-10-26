<script setup lang="ts">
import { Play } from 'lucide-vue-next'

// Fachada: miniatura + botón; el iframe de YouTube solo carga tras el clic
const props = defineProps<{ videoId: string; title: string }>()
const playing = ref(false)
</script>

<template>
  <div class="yt-facade">
    <iframe
      v-if="playing"
      :src="`https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1`"
      :title="props.title"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="absolute inset-0 h-full w-full"
    ></iframe>
    <button v-else type="button" class="yt-facade__button group" @click="playing = true">
      <img
        :src="`https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`"
        alt=""
        width="480"
        height="360"
        loading="lazy"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <span class="yt-facade__play" aria-hidden="true"><Play class="h-7 w-7" fill="currentColor" /></span>
      <span class="sr-only">Reproducir video: {{ props.title }}</span>
    </button>
  </div>
</template>

<style scoped>
.yt-facade {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: var(--radius-card);
  background: var(--surface-1);
}

.yt-facade__button {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.yt-facade__play {
  position: relative;
  display: flex;
  width: 4.5rem;
  height: 4.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--cyan);
  color: var(--on-accent);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  transition: transform 180ms var(--ease-brand), background-color 180ms var(--ease-brand);
}

.yt-facade__button:hover .yt-facade__play { transform: scale(1.06); background: var(--cyan-strong); }
</style>
