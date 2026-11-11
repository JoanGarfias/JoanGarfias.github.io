<script setup>
import { googleAmbassador, nexis } from '~/content/community'
import { projects } from '~/content/projects'
import { certifications } from '~/content/stack'

// Titular palabra por palabra; las marcadas van bajo el resaltado de marcador
const lead = ['El', 'software', 'no', 'termina']
const marked = ['en', 'el', 'código.']

// Cifras que salen de los datos del sitio (no se escriben a mano)
const { counters } = useCommunity()
const people = computed(() => counters.value.find(c => c.key === 'personas')?.value ?? 0)
const stats = computed(() => [
  { value: projects.length, suffix: '', label: 'Proyectos' },
  { value: people.value, suffix: '', label: 'Personas alcanzadas' },
  { value: certifications.length, suffix: 'x', label: 'AWS Certified' }
])

// Roles en comunidad, con su logo
const roles = [
  { label: `${nexis.role} · ${nexis.name}`, logo: '/nexis-green.svg', brand: 'nexis' },
  { label: googleAmbassador.name, logo: googleAmbassador.logo }
]
</script>

<template>
  <section id="inicio" class="pb-16 pt-6 lg:pt-10">
    <div class="flex items-center gap-3">
      <img src="/_optimized/joan-480.webp" alt="" width="48" height="48" class="h-12 w-12 rounded-xl border-2 border-surface-1 object-cover shadow-md" />
      <div>
        <p class="font-medium leading-tight text-ink-strong">Joan Garfias</p>
        <p class="font-meta text-[0.8125rem] text-ink-muted">backend · cloud · IA</p>
      </div>
    </div>

    <ul class="mt-5 flex flex-wrap gap-2" aria-label="Roles en comunidad">
      <li v-for="role in roles" :key="role.label" class="role-chip">
        <img :src="role.logo" alt="" width="18" height="18" class="h-[18px] w-[18px] object-contain" :class="{ 'role-chip__nexis': role.brand === 'nexis' }" />
        {{ role.label }}
      </li>
    </ul>

    <h1 class="display-title word-reveal mt-10 max-w-[13ch] md:mt-14">
      <template v-for="(word, i) in lead" :key="word">
        <span class="word" :style="{ '--i': i }">{{ word }}</span>{{ ' ' }}
      </template>
      <span class="marker">
        <template v-for="(word, i) in marked" :key="word">
          <span class="word" :style="{ '--i': lead.length + i }">{{ word }}</span>{{ i < marked.length - 1 ? ' ' : '' }}
        </template>
      </span>
    </h1>

    <ScrollReveal :delay="500">
      <p class="mt-8 max-w-2xl text-lg leading-8 text-ink-body">
        Soy Joan Garfias, desarrollador de software interesado en backend, cloud e inteligencia artificial. Me gusta aprender construyendo proyectos y descubrir cómo funcionan las cosas más allá del código.
      </p>
    </ScrollReveal>

    <div class="mt-14 grid items-end gap-10 md:mt-16 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <ScrollReveal :delay="650" as="dl" class="stats">
        <div v-for="stat in stats" :key="stat.label" class="stats__item">
          <dt class="font-meta text-xs uppercase tracking-[0.12em] text-ink-muted">{{ stat.label }}</dt>
          <dd class="mt-3 font-display text-5xl font-medium leading-none tracking-tight text-ink-strong md:text-6xl">
            <CountUp :value="stat.value" />{{ stat.suffix }}
          </dd>
        </div>
      </ScrollReveal>

      <ScrollReveal :delay="800">
        <TerminalCard />
      </ScrollReveal>
    </div>

    <ScrollReveal :delay="200" class="mt-16 md:mt-20">
      <StackMarquee />
    </ScrollReveal>
  </section>
</template>

<style scoped>
.role-chip {
  display: inline-flex;
  min-height: 2.25rem;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card-sm);
  background: var(--surface-1);
  padding: 0.35rem 0.75rem;
  color: var(--text-strong);
  font-size: 0.8125rem;
  font-weight: 500;
}

/* Verde de Nexis más claro en tema oscuro para que el ícono pequeño se lea */
:root[data-theme="dark"] .role-chip__nexis { filter: brightness(1.7); }

/* Cifras separadas por líneas verticales */
.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stats__item {
  border-left: 1px solid var(--border-strong);
  padding: 0.25rem 1rem 0.25rem 1.1rem;
}
</style>
