<template>
  <section id="sobre-mi" class="py-32 px-6 bg-slate-950 overflow-hidden relative border-t border-white/5">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        <!-- Image Column -->
        <div class="lg:col-span-5 relative group order-last lg:order-first">
          <div class="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-900 border border-white/5">
            <img 
              src="/joan.jpeg" 
              class="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out"
              alt="Joan Garfias Portrait"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
          </div>
          <!-- Decorative element -->
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700"></div>
        </div>

        <!-- Text Column -->
        <div class="lg:col-span-7 space-y-12">
          <header class="space-y-6">
            <span class="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">Trayectoria & Enfoque</span>
            <h2 class="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] italic uppercase">
              Construyendo <br/> 
              <span class="text-slate-400">con propósito.</span>
            </h2>
          </header>

          <div class="space-y-8 max-w-xl">
            <p class="text-lg md:text-xl text-slate-200 leading-relaxed font-light italic">
              "Mi camino en la tecnología comenzó con la curiosidad de entender cómo funcionan las cosas, y evolucionó en la pasión por crear herramientas que resuelvan problemas reales."
            </p>

            <div class="space-y-6 text-slate-300 text-base md:text-lg leading-loose">
              <p>
                Soy un desarrollador que encuentra el equilibrio entre la estética y la funcionalidad. No creo en soluciones genéricas; creo en entender el contexto antes de escribir la primera línea de código.
              </p>
              <p>
                Cuando no estoy frente a la pantalla optimizando flujos de datos o refinando interfaces, me gusta explorar el ritmo a través del <span class="text-white font-bold underline decoration-primary/30 underline-offset-4">beatbox</span> o la estrategia en el fútbol. Creo firmemente que la creatividad fuera del código es lo que alimenta la innovación dentro de él.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-white/5">
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-[1px] bg-primary/40"></div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-200">Filosofía</h4>
              </div>
              <p class="text-sm text-slate-500 leading-relaxed">Priorizo la claridad, el rendimiento y la experiencia del usuario sobre las tendencias pasajeras.</p>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-[1px] bg-cyan-400/40"></div>
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-200">Intereses</h4>
              </div>
              <p class="text-sm text-slate-500 leading-relaxed">Amante de la música, el deporte y el aprendizaje continuo en entornos colaborativos.</p>
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
