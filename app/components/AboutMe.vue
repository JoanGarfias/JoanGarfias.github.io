<template>
  <section id="sobre-mi" class="section-space px-4 sm:px-6 bg-slate-950/55 overflow-hidden relative border-y border-white/10">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        <!-- Image Column -->
        <div class="lg:col-span-5 relative group order-last lg:order-first">
          <div class="relative aspect-4/5 overflow-hidden rounded-3xl bg-slate-900 border border-white/15 shadow-2xl shadow-black/30 transition duration-500 group-hover:border-cyan-300/35 group-hover:shadow-[0_25px_80px_rgba(34,211,238,0.12)]">
            <img 
              src="/joan.jpeg" 
              class="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out"
              alt="Retrato de Joan Garfias"
            />
            <div class="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent"></div>
          </div>

          <div class="hidden lg:block relative mt-6 overflow-hidden rounded-3xl border border-cyan-400/20 bg-linear-to-br from-cyan-400/15 via-slate-950 to-fuchsia-400/10 p-5 shadow-[0_0_50px_rgba(34,211,238,0.08)]">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.14),transparent_34%)]"></div>
            <div class="relative flex items-center gap-4">
              <div class="flex h-18 w-18 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 p-3 shadow-lg shadow-cyan-500/10 backdrop-blur">
                <img src="/nexis.svg" alt="Nexis Oaxaca Tech" class="h-full w-full object-contain drop-shadow-[0_10px_25px_rgba(34,211,238,0.25)]" />
              </div>
              <div class="space-y-1.5">
                <p class="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">Co-fundador de Nexis Oaxaca Tech</p>
                <p class="text-sm text-slate-300 leading-relaxed max-w-xs">
                  Comunidad para aprender, construir y crecer juntos.
                </p>
              </div>
            </div>
          </div>

          <!-- Decorative element -->
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700"></div>
        </div>

        <!-- Text Column -->
        <div class="lg:col-span-7 space-y-12">
          <header class="space-y-6">
            <span class="eyebrow">Trayectoria & Enfoque</span>
            <h2 class="display-title uppercase">
              Construyendo <br/> 
              <span class="text-slate-400">con propósito.</span>
            </h2>
          </header>

          <div class="space-y-8 max-w-xl">
            <p class="text-lg md:text-xl text-slate-200 leading-relaxed font-light italic">
              "Empecé en tecnología por curiosidad y terminé enfocándome en construir cosas útiles, con menos discurso y más trabajo real."
            </p>

            <div class="lg:hidden relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-linear-to-br from-cyan-400/15 via-slate-950 to-fuchsia-400/10 p-5 shadow-[0_0_50px_rgba(34,211,238,0.08)]">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.14),transparent_34%)]"></div>
              <div class="relative flex items-center gap-4">
                <div class="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 p-3 shadow-lg shadow-cyan-500/10 backdrop-blur">
                  <img src="/nexis.svg" alt="Nexis Oaxaca Tech" class="h-full w-full object-contain" />
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-black uppercase tracking-[0.15em] text-cyan-100">Co-fundador de Nexis Oaxaca Tech</p>
                  <p class="mt-1 text-sm text-slate-300 leading-relaxed">
                    Comunidad para aprender, construir y crecer juntos.
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-6 text-slate-300 text-base md:text-lg leading-[1.8]">
              <p>
                Actualmente estoy en la recta final de la carrera de <span class="text-white font-medium">Ingeniería en Computación</span> en la Universidad del Istmo, campus Tehuantepec. Cursar el octavo semestre me ha permitido pasar de la teoría académica a entender que el software no solo se trata de sintaxis, sino de arquitectura y resolución de problemas.
              </p>
              <p>
                Soy desarrollador y me importa tanto cómo se ve algo como cómo funciona. Antes de escribir código, prefiero entender bien el problema y el contexto; eso suele evitar soluciones innecesarias.
              </p>
              <p>
                He trabajado en proyectos reales (aunque pequeños), donde me ha tocado tanto construir desde cero como resolver errores y tomar decisiones sobre cómo organizar todo.
              </p>
              <p>
                Fuera del código, me gusta el <span class="text-white font-bold underline decoration-primary/30 underline-offset-4">beatbox</span> y el fútbol. Son cosas que, aunque no tengan que ver directamente con programar, me ayudan a mantener la cabeza fresca y a pensar diferente.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-white/5">
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-px bg-primary/40"></div>
                <h4 class="text-xs font-black uppercase tracking-widest text-slate-200">Filosofía</h4>
              </div>
              <p class="text-base text-slate-400 leading-relaxed">Prefiero hacer las cosas claras y bien hechas, antes que seguir tendencias solo porque sí.</p>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-px bg-cyan-400/40"></div>
                <h4 class="text-xs font-black uppercase tracking-widest text-slate-200">Intereses</h4>
              </div>
              <p class="text-base text-slate-400 leading-relaxed">Me gusta la música, especialmente el beatbox, y ver fútbol desde la parte táctica. También disfruto aprender y trabajar en equipo.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// No extra logic needed for this minimalist version
</script>
