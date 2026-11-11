<script setup lang="ts">
import { ArrowUpRight, FileDown, Github, Linkedin, Youtube } from 'lucide-vue-next'
import { projects } from '~/content/projects'

const portrait = { src: '/joan.jpeg', width: 1440, height: 1440, alt: 'Retrato de Joan Garfias' }

const socials = [
  { label: 'GitHub', href: 'https://github.com/JoanGarfias', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/joangarfias', icon: Linkedin },
  { label: 'YouTube', href: 'https://youtube.com/@joan-garfias', icon: Youtube }
]

// Al recorrer los proyectos la tarjeta muestra el proyecto en pantalla; en un caso de estudio, ese proyecto.
// Sale de la ruta (no de la página) porque el layout se renderiza antes que la página en SSR.
const route = useRoute()
const activeSlug = useActiveProject()
const routeSlug = computed(() => route.path.match(/^\/proyectos\/([^/]+)\/?$/)?.[1] ?? null)
const project = computed(() => projects.find(p => p.slug === (activeSlug.value ?? routeSlug.value)) ?? null)
const total = String(projects.length).padStart(2, '0')
const onCaseStudy = computed(() => !!project.value && project.value.slug === routeSlug.value)
</script>

<template>
  <aside class="profile-card" aria-label="Perfil">
    <!-- Modo perfil -->
    <Transition name="card-swap">
      <div v-if="!project" key="profile" class="profile-card__layer">
        <ProjectImage
          :image="portrait"
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 352px, 100vw"
          loading="eager"
          class="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
        />
        <div class="profile-card__shade" aria-hidden="true"></div>

        <div class="profile-card__body">
          <p class="profile-card__status">
            <span class="pulse-dot" aria-hidden="true"></span>
            Disponible para colaborar
          </p>
          <p class="profile-card__hello mt-4">
            Hola, soy <span class="text-white">Joan</span>
          </p>
          <p class="mt-3 max-w-[30ch] text-[0.9375rem] leading-relaxed text-white/75">
            Desarrollador de software interesado en backend, cloud e IA, desde Oaxaca, México.
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-3 border-t border-white/15 pt-5">
            <NuxtLink to="/#contacto" class="button-primary group">
              Hablemos <ArrowUpRight class="arrow-swap h-4 w-4" aria-hidden="true" />
            </NuxtLink>
            <a href="/cv.pdf" download="CV_Joan_Garfias.pdf" class="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-medium text-white/80 transition-colors hover:text-white">
              <FileDown class="h-4 w-4" aria-hidden="true" /> Descargar CV
            </a>
          </div>
        </div>
      </div>

      <!-- Modo proyecto -->
      <div v-else :key="project.slug" class="profile-card__layer profile-card__layer--project">
        <ProjectImage
          v-if="project.cover"
          :image="project.cover"
          sizes="400px"
          class="absolute -inset-[10%] h-[120%] w-[120%] max-w-none object-cover opacity-55 blur-[22px] saturate-[1.2]"
          aria-hidden="true"
        />
        <div class="profile-card__shade profile-card__shade--solid" aria-hidden="true"></div>

        <div class="profile-card__project">
          <p class="font-meta text-xs uppercase tracking-[0.16em] text-accent">Caso de estudio</p>
          <p class="mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-white xl:text-4xl">{{ project.name }}</p>
          <p class="mt-3 text-[0.9375rem] leading-relaxed text-white/70">{{ project.summary }}</p>

          <dl class="mt-8 grid gap-5">
            <div>
              <dt class="text-xs text-white/55">Año</dt>
              <dd class="mt-1 text-lg font-medium text-white">{{ project.year }}</dd>
            </div>
            <div>
              <dt class="text-xs text-white/55">Rol</dt>
              <dd class="mt-1 text-lg font-medium text-white">{{ project.role }}</dd>
            </div>
          </dl>

          <ul class="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías">
            <li v-for="tech in project.stack.slice(0, 5)" :key="tech" class="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/85">{{ tech }}</li>
          </ul>

          <div class="mt-auto flex items-center justify-between gap-3 pt-8">
            <a
              v-if="onCaseStudy && project.links.live"
              :href="project.links.live"
              target="_blank"
              rel="noopener noreferrer"
              class="button-light group"
            >
              Ver en vivo<span class="sr-only"> (abre en otra pestaña)</span> <ArrowUpRight class="arrow-swap h-4 w-4" aria-hidden="true" />
            </a>
            <NuxtLink v-else-if="onCaseStudy" to="/#contacto" class="button-light group">
              Hablemos <ArrowUpRight class="arrow-swap h-4 w-4" aria-hidden="true" />
            </NuxtLink>
            <NuxtLink v-else :to="project.links.caseStudy" class="button-light group">
              Ver caso<span class="sr-only"> de {{ project.name }}</span> <ArrowUpRight class="arrow-swap h-4 w-4" aria-hidden="true" />
            </NuxtLink>
            <p class="font-meta text-sm text-white/55"><span class="text-white">{{ project.number }}</span> / {{ total }}</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Siempre visibles: logo y redes -->
    <div class="profile-card__top">
      <NuxtLink to="/" class="profile-card__logo" aria-label="Inicio">
        <img src="/logo.svg" alt="" width="1340" height="1012" class="h-7 w-auto" />
      </NuxtLink>
      <ul class="flex gap-2">
        <li v-for="s in socials" :key="s.label">
          <a :href="s.href" target="_blank" rel="noopener noreferrer" class="profile-card__social" :aria-label="`${s.label} (abre en otra pestaña)`">
            <component :is="s.icon" class="h-4 w-4" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>

  </aside>
</template>

<style scoped>
.profile-card {
  position: relative;
  isolation: isolate;
  height: min(88svh, 46rem);
  min-height: 34rem;
  overflow: hidden;
  border-radius: var(--radius-feature);
  background: #0b0b0b;
  box-shadow: var(--shadow-float);
}

@media (min-width: 1024px) {
  .profile-card { height: auto; min-height: 0; }
}

.profile-card__layer {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.profile-card__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, transparent 25%, transparent 42%, rgba(0, 0, 0, 0.85) 75%, #000 100%);
}

.profile-card__shade--solid {
  background: linear-gradient(160deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.92));
}

.profile-card__body {
  position: relative;
  padding: 1.75rem;
}

.profile-card__status {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.35rem 0.8rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(8px);
}

.profile-card__hello {
  color: rgba(255, 255, 255, 0.92);
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 2.4vw, 2.125rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.profile-card__project {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 5.5rem 1.75rem 1.75rem;
}

.profile-card__top {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  left: 1.5rem;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.profile-card__logo {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
}

.profile-card__social {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border-radius: var(--radius-card-sm);
  background: rgba(255, 255, 255, 0.9);
  color: #0b0b0b;
  transition: transform 200ms var(--ease-brand), background-color 200ms var(--ease-brand);
}

.profile-card__social:hover {
  background: var(--accent);
  transform: scale(1.08);
}

/* Cambio perfil ↔ proyecto: fundido con un leve desplazamiento */
.card-swap-enter-active,
.card-swap-leave-active {
  transition: opacity 450ms var(--ease-brand), transform 550ms var(--ease-brand);
}

.card-swap-enter-from {
  opacity: 0;
  transform: scale(1.04);
}

.card-swap-leave-to {
  opacity: 0;
}
</style>
