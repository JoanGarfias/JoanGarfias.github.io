/**
 * Devuelve el id de la sección que cruza la franja central del viewport.
 * Mantiene la última activa mientras ninguna cruza (huecos entre secciones).
 */
export const useScrollSpy = (ids: string[]) => {
  const activeId = ref<string | null>(ids[0] ?? null)
  let observer: IntersectionObserver | null = null

  const observe = () => {
    observer?.disconnect()
    if (!('IntersectionObserver' in window)) return

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activeId.value = entry.target.id
      })
    }, { rootMargin: '-40% 0px -55% 0px' })

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer?.observe(el)
    })
  }

  onMounted(() => nextTick(observe))
  onBeforeUnmount(() => observer?.disconnect())

  return { activeId, refresh: observe }
}
