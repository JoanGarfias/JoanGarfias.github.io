<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Users } from 'lucide-vue-next'
import { getProject } from '~/content/projects'

const route = useRoute()
const { getCaseStudy } = useProjects()
const { siteUrl } = useRuntimeConfig().public
const { showPending } = usePending()

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
// → Arquitectura → Retos → Resultado → Aprendizaje
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
  <div class="px-0 pb-24 pt-28 lg:pt-32">
    <div class="site-container">
      <NuxtLink to="/#proyectos" class="group mb-12 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-bold uppercase tracking-[0.14em] text-ink-body transition hover:text-accent-soft lg:mb-16">
        <ArrowLeft class="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        Proyectos
      </NuxtLink>

      <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14 xl:gap-20">
        <article class="lg:col-span-8">
          <header class="space-y-7">
            <div class="flex flex-wrap items-center gap-4">
              <span class="eyebrow">Caso de estudio · {{ project.number }}</span>
              <span class="hidden h-px flex-1 bg-line sm:block"></span>
              <span class="font-meta text-xs font-bold uppercase tracking-[0.14em] text-ink-body">{{ project.year }}</span>
            </div>
            <h1 class="display-title uppercase">{{ project.name }}<span class="text-cyan-300/60">.</span></h1>
            <p class="max-w-3xl text-xl leading-8 text-ink-body md:text-2xl md:leading-10">{{ project.summary }}</p>
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

            <section v-if="showPending" aria-labelledby="arquitectura">
              <h2 id="arquitectura" class="case-h2">Arquitectura</h2>
              <PendingSlot
                type="foto"
                ratio="16/9"
                :label="`Diagrama de arquitectura de ${project.name}`"
                hint="SVG o PNG 1600×900px, fondo oscuro o transparente"
              />
            </section>

            <ScrollReveal v-for="s in after" :key="s.key" as="section" :class="{ 'result-block': s.key === 'resultado' }">
              <h2 class="case-h2">{{ s.title }}</h2>
              <div class="case-body" v-html="s.html"></div>
            </ScrollReveal>

            <ScrollReveal v-for="s in extra" :key="s.title" as="section">
              <h2 class="case-h2">{{ s.title }}</h2>
              <div class="case-body" v-html="s.html"></div>
            </ScrollReveal>

            <section v-if="showPending">
              <h2 class="case-h2">Aprendizaje</h2>
              <p class="case-body"><PendingText :label="`${project.name}: qué aprendí y qué haría distinto (2–3 frases)`" /></p>
            </section>

            <section v-if="project.video || showPending">
              <h2 class="case-h2">Demo</h2>
              <PendingSlot
                v-if="!project.video"
                type="video"
                ratio="16/9"
                :label="`Video demo de ${project.name} (opcional)`"
                hint="MP4/WebM o ID de YouTube, 30–90 s, 1920×1080"
              />
            </section>
          </div>

          <ScrollReveal v-if="project.images.length > 1" as="section" class="mt-20">
            <div class="mb-8 flex items-center gap-5"><h2 class="text-sm font-black uppercase tracking-[0.2em] text-ink-strong">Capturas</h2><span class="h-px flex-1 bg-line"></span></div>
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

        <aside class="lg:col-span-4" aria-label="Datos del proyecto">
          <div class="space-y-6 lg:sticky lg:top-28">
            <div class="glass-panel rounded-feature p-6 sm:p-8">
              <dl class="space-y-6">
                <template v-for="(value, key) in projectInfo" :key="key">
                  <div v-if="value" class="border-b border-line pb-5 last:border-0 last:pb-0">
                    <dt class="mb-1.5 text-xs font-black uppercase tracking-[0.16em] text-accent-soft">{{ key }}</dt>
                    <dd class="text-base font-semibold leading-6 text-ink-strong">{{ value }}</dd>
                  </div>
                </template>
              </dl>

              <div class="mt-7 border-t border-line pt-7">
                <h2 class="mb-4 text-xs font-black uppercase tracking-[0.16em] text-accent-soft">Stack</h2>
                <ul class="flex flex-wrap gap-2">
                  <li v-for="tech in project.stack" :key="tech" class="rounded-full border border-line bg-surface-1 px-3 py-1.5 text-xs font-bold text-ink-body">{{ tech }}</li>
                </ul>
              </div>

              <details v-if="meta?.collaborators?.length && (meta.teamSize ?? 0) > 1" class="group mt-7 border-t border-line pt-7">
                <summary class="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-sm font-bold text-ink-strong marker:hidden hover:text-accent-soft">
                  <span class="flex items-center gap-2"><Users class="h-4 w-4 text-accent" aria-hidden="true" /> Equipo</span>
                  <span class="text-xs text-ink-muted">{{ meta.teamSize }} personas</span>
                </summary>
                <ul class="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-l border-cyan-300/30 pl-4">
                  <li v-for="collab in meta.collaborators" :key="collab" class="text-sm text-ink-muted">{{ collab }}</li>
                </ul>
              </details>
            </div>

            <div class="relative overflow-hidden rounded-feature border border-cyan-300/25 bg-cyan-300/[0.07] p-7">
              <h2 class="text-xl font-bold text-ink-strong">¿Tienes un problema parecido?</h2>
              <p class="my-4 text-sm leading-6 text-ink-body">Conversemos sobre el problema, el alcance y la mejor forma de construirlo.</p>
              <NuxtLink to="/contacto" class="button-primary group w-full">Hablemos <ArrowUpRight class="h-4 w-4" aria-hidden="true" /></NuxtLink>
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
  background: rgba(103, 232, 249, 0.12);
  padding: 0.35rem 0.85rem;
  color: var(--cyan-soft);
  font-size: 0.9375rem;
  font-weight: 800;
}

.lead-media,
.shot__frame {
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-feature);
  background: var(--surface-1);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
}

.shot__frame {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-card);
}

.case-h2 {
  margin-bottom: 1rem;
  font-size: clamp(1.5rem, 3vw, 2.125rem);
  font-weight: 800;
  letter-spacing: -0.035em;
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
.case-body :deep(li::marker) { color: var(--cyan); }
.case-body :deep(strong) { color: var(--text-strong); }

.result-block {
  border-left: 3px solid var(--cyan);
  border-radius: var(--radius-card);
  background: linear-gradient(90deg, rgba(34, 211, 238, 0.11), rgba(34, 211, 238, 0.02));
  padding: 1.6rem 1.75rem;
}
</style>
