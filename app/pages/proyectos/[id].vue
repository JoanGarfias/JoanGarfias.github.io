<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Users } from 'lucide-vue-next'
import { getProject } from '~/content/projects'

const route = useRoute()
const { getCaseStudy } = useProjects()
const { siteUrl } = useRuntimeConfig().public

const projectId = route.params.id as string
const project = getProject(projectId)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Proyecto no encontrado', fatal: true })
}

const { data: caseStudy } = await useAsyncData(`case-study-${projectId}`, () => getCaseStudy(projectId))

useSeoMeta({
  title: `${project.name} | Caso de estudio de Joan Garfias`,
  description: project.summary,
  ogTitle: `${project.name} | Joan Garfias`,
  ogDescription: project.summary,
  ogImage: `${siteUrl}${project.cover?.src ?? '/joan.jpeg'}`,
  twitterImage: `${siteUrl}${project.cover?.src ?? '/joan.jpeg'}`
})

const section = (key: string) => caseStudy.value?.sections.find(s => s.key === key)

// Orden del caso de estudio: Contexto → Problema → Solución → Mi rol → Decisiones técnicas
// → Arquitectura (si hay) → Retos → Resultado → Demo (si hay)
const before = computed(() => ['contexto', 'problema', 'solucion', 'rol', 'decisiones'].map(section).filter(Boolean))
const after = computed(() => ['retos', 'resultado'].map(section).filter(Boolean))
const extra = computed(() => caseStudy.value?.sections.filter(s => s.key === 'otro') ?? [])

const meta = computed(() => caseStudy.value?.meta)
const projectInfo = computed(() => ({
  Periodo: meta.value?.period,
  Equipo: meta.value?.teamSize && meta.value.teamSize > 1 ? `${meta.value.team} · ${meta.value.teamSize} personas` : meta.value?.team,
  Rol: project.role,
  Ubicación: meta.value?.location
}))
</script>

<template>
  <div class="pb-16 pt-6 lg:pt-10">
    <div>
      <NuxtLink to="/#proyectos" class="button-secondary group mb-10">
        <ArrowLeft class="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        Proyectos
      </NuxtLink>

      <div class="grid grid-cols-1 gap-16 2xl:grid-cols-12 2xl:gap-14">
        <article class="2xl:col-span-8">
          <header class="space-y-7">
            <div class="flex flex-wrap items-center gap-4">
              <SectionLabel :index="project.number" label="Caso de estudio" />
              <span class="hidden h-px flex-1 bg-line sm:block"></span>
              <span class="text-sm text-ink-muted">{{ project.year }}</span>
            </div>
            <h1 class="display-title">{{ project.name }}<span class="text-accent-word">.</span></h1>
            <p class="max-w-3xl text-xl leading-8 text-ink-body">{{ project.summary }}</p>
            <div v-if="project.metric" class="flex flex-wrap items-center gap-3">
              <span class="metric">{{ project.metric }}</span>
              <DraftTag v-if="project.draft" />
            </div>
          </header>

          <figure v-if="project.cover" class="lead-media mt-14">
            <ProjectImage
              :image="project.cover"
              sizes="(min-width: 1024px) 860px, 100vw"
              priority
              class="h-auto w-full"
            />
          </figure>

          <div class="case-study mt-16 space-y-14">
            <ScrollReveal v-for="s in before" :key="s.key" as="section">
              <h2 class="case-h2">{{ s.title }}</h2>
              <div class="case-body" v-html="s.html"></div>
            </ScrollReveal>

            <!-- Solo si el proyecto tiene diagrama -->
            <section v-if="project.arch" aria-labelledby="arquitectura">
              <h2 id="arquitectura" class="case-h2">Arquitectura</h2>
              <div class="shot">
                <div class="shot__frame">
                  <img
                    :src="project.arch"
                    :alt="`Diagrama de arquitectura de ${project.name}`"
                    loading="lazy"
                    class="h-auto w-full"
                  />
                </div>
              </div>
            </section>

            <ScrollReveal v-for="s in after" :key="s.key" as="section" :class="{ 'result-block': s.key === 'resultado' }">
              <h2 class="case-h2">{{ s.title }}</h2>
              <div class="case-body" v-html="s.html"></div>
            </ScrollReveal>

            <ScrollReveal v-for="s in extra" :key="s.title" as="section">
              <h2 class="case-h2">{{ s.title }}</h2>
              <div class="case-body" v-html="s.html"></div>
            </ScrollReveal>

            <!-- Solo si el proyecto tiene demo: archivo de video o ID de YouTube -->
            <section v-if="project.video">
              <h2 class="case-h2">Demo</h2>
              <video
                v-if="/\.(mp4|webm)$/i.test(project.video)"
                :src="project.video"
                controls
                preload="metadata"
                class="lead-media w-full"
              ></video>
              <YouTubeFacade v-else :video-id="project.video" :title="`Demo de ${project.name}`" />
            </section>
          </div>

          <ScrollReveal v-if="project.images.length > 1" as="section" class="mt-20">
            <div class="mb-8 flex items-center gap-5"><h2 class="case-h2 mb-0">Capturas</h2><span class="h-px flex-1 bg-line"></span></div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <figure v-for="img in project.images.slice(1)" :key="img.src" class="shot">
                <div class="shot__frame">
                  <ProjectImage
                    :image="img"
                    sizes="(min-width: 768px) 420px, 100vw"
                    class="h-full w-full object-cover object-top"
                  />
                </div>
                <figcaption class="mt-3 text-sm leading-relaxed text-ink-muted">{{ img.alt }}</figcaption>
              </figure>
            </div>
          </ScrollReveal>

          <section v-if="project.links.live || project.links.repo" class="mt-16 flex flex-wrap gap-4 border-t border-line pt-10" aria-label="Enlaces del proyecto">
            <a v-if="project.links.live" :href="project.links.live" target="_blank" rel="noopener noreferrer" class="button-secondary group">Ver sitio en vivo <ExternalLink class="h-4 w-4" aria-hidden="true" /><span class="sr-only">(abre en otra pestaña)</span></a>
            <a v-if="project.links.repo" :href="project.links.repo" target="_blank" rel="noopener noreferrer" class="button-secondary group">Ver repositorio <Github class="h-4 w-4" aria-hidden="true" /><span class="sr-only">(abre en otra pestaña)</span></a>
          </section>
        </article>

        <aside class="2xl:col-span-4" aria-label="Datos del proyecto">
          <div class="space-y-6 2xl:sticky 2xl:top-6">
            <div class="glass-panel rounded-feature p-6 sm:p-8">
              <dl class="space-y-6">
                <template v-for="(value, key) in projectInfo" :key="key">
                  <div v-if="value" class="border-b border-line pb-5 last:border-0 last:pb-0">
                    <dt class="mb-1 text-sm text-ink-muted">{{ key }}</dt>
                    <dd class="text-base font-medium leading-6 text-ink-strong">{{ value }}</dd>
                  </div>
                </template>
              </dl>

              <div class="mt-7 border-t border-line pt-7">
                <h2 class="mb-4 text-sm text-ink-muted">Stack</h2>
                <ul class="flex flex-wrap gap-2">
                  <li v-for="tech in project.stack" :key="tech" class="chip">{{ tech }}</li>
                </ul>
              </div>

              <details v-if="meta?.collaborators?.length && (meta.teamSize ?? 0) > 1" class="group mt-7 border-t border-line pt-7">
                <summary class="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-sm font-bold text-ink-strong marker:hidden hover:text-accent-ink">
                  <span class="flex items-center gap-2"><Users class="h-4 w-4 text-accent-ink" aria-hidden="true" /> Equipo</span>
                  <span class="text-xs text-ink-muted">{{ meta.teamSize }} personas</span>
                </summary>
                <ul class="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-l-2 border-accent pl-4">
                  <li v-for="collab in meta.collaborators" :key="collab" class="text-sm text-ink-muted">{{ collab }}</li>
                </ul>
              </details>
            </div>

            <div class="relative overflow-hidden rounded-feature bg-surface-inverse p-7 text-white">
              <h2 class="font-display text-2xl font-medium text-white">¿Tienes un problema parecido?</h2>
              <p class="my-4 text-sm leading-6 text-white/70">Conversemos sobre el problema, el alcance y la mejor forma de construirlo.</p>
              <NuxtLink to="/contacto" class="button-primary group w-full">Hablemos <ArrowUpRight class="arrow-swap h-4 w-4" aria-hidden="true" /></NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.metric {
  border-radius: 999px;
  background: var(--accent);
  padding: 0.35rem 0.85rem;
  color: var(--on-accent);
  font-size: 0.875rem;
  font-weight: 600;
}

.lead-media,
.shot__frame {
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-feature);
  background: var(--surface-1);
  box-shadow: var(--shadow-card);
}

.shot__frame {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-card);
}

.case-h2 {
  margin-bottom: 1rem;
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 500;
  letter-spacing: -0.03em;
}

.case-body :deep(p),
.case-body :deep(li),
.case-body {
  color: var(--text-body);
  font-size: 1.0625rem;
  line-height: 1.8;
}

.case-body :deep(p + p) { margin-top: 1rem; }
.case-body :deep(ul) { display: grid; gap: 0.5rem; padding-left: 1.2rem; list-style: disc; }
.case-body :deep(li::marker) { color: var(--accent); }
.case-body :deep(strong) { color: var(--text-strong); }

.result-block {
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-card);
  background: var(--surface-1);
  box-shadow: var(--shadow-card);
  padding: 1.6rem 1.75rem;
}
</style>
