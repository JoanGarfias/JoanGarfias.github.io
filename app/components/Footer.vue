<script setup>
import { Github, Linkedin, Mail, Youtube } from 'lucide-vue-next'

const links = [
  { label: 'GitHub', href: 'https://github.com/JoanGarfias', icon: Github, external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/joangarfias', icon: Linkedin, external: true },
  { label: 'YouTube', href: 'https://youtube.com/@joan_dev', icon: Youtube, external: true },
  { label: 'Email', href: 'mailto:joanpagarfk@gmail.com', icon: Mail, external: false }
]
</script>

<template>
  <footer class="site-container mt-10 border-t border-line py-8">
    <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <p class="text-sm text-ink-muted">
        © {{ new Date().getFullYear() }} Joan Garfias · Construyo software con propósito desde Oaxaca, México.
      </p>
      <ul class="flex gap-2">
        <li v-for="link in links" :key="link.label">
          <a
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            class="footer-link"
            :aria-label="link.external ? `${link.label} (abre en otra pestaña)` : link.label"
          >
            <component :is="link.icon" class="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  background: var(--surface-1);
  color: var(--text-strong);
  transition: background-color 200ms var(--ease-brand), color 200ms var(--ease-brand), transform 200ms var(--ease-brand);
}

.footer-link:hover {
  background: var(--accent);
  color: var(--on-accent);
  transform: translateY(-2px);
}
</style>
