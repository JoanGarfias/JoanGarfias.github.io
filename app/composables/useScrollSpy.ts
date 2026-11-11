/**
 * Devuelve el id de la sección que cruza la línea al 40% del viewport.
 * Si varias la cruzan (p. ej. #stack dentro de #proyectos) gana la última de la lista.
 */
export const useScrollSpy = (ids: string[]) => {
  const activeId = ref<string | null>(ids[0] ?? null)
  let frame = 0

  const update = () => {
    frame = 0
    const line = window.innerHeight * 0.4
    let current: string | null = null
    for (const id of ids) {
      const rect = document.getElementById(id)?.getBoundingClientRect()
      if (rect && rect.top <= line && rect.bottom > line) current = id
    }
    // Al final de la página la última sección puede no llegar a la línea
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = [...ids].reverse().find(id => document.getElementById(id)) ?? current
    }
    if (current) activeId.value = current
  }

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    nextTick(update)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    cancelAnimationFrame(frame)
  })

  return { activeId, refresh: () => nextTick(update) }
}
