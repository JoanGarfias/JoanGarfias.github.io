<script setup lang="ts">
import { stackGroups } from '~/content/stack'

// Cinta infinita con las tecnologías del stack (decorativa; la lista accesible va aparte)
const items = stackGroups.flatMap(g => g.items)
</script>

<template>
  <div class="marquee-block">
    <p class="mb-5 font-meta text-[0.8125rem] text-ink-muted">
      <span class="text-accent-ink">$</span> ls ~/stack
    </p>
    <p class="sr-only">{{ items.map(i => i.name).join(', ') }}</p>
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <ul v-for="copy in 2" :key="copy" class="marquee__list">
          <li v-for="item in items" :key="item.name" class="marquee__item">
            <img v-if="item.icon" :src="`/icons/${item.icon}`" alt="" width="22" height="22" class="h-[22px] w-[22px] object-contain" loading="lazy" />
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee 38s linear infinite;
}

.marquee:hover .marquee__track { animation-play-state: paused; }

.marquee__list {
  display: flex;
  gap: 2.5rem;
  padding-right: 2.5rem;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-strong);
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 500;
  opacity: 0.75;
  white-space: nowrap;
  transition: opacity 200ms var(--ease-brand);
}

.marquee__item:hover { opacity: 1; }

@keyframes marquee {
  to { transform: translateX(-50%); }
}
</style>
