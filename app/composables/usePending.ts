/**
 * Control de placeholders de contenido pendiente.
 * NUXT_PUBLIC_SHOW_PENDING=false oculta los huecos (y usa fallback de marca en foto/video).
 */
export const usePending = () => {
  const showPending = computed(() => useRuntimeConfig().public.showPending !== false)

  // Un valor está pendiente si no existe o si aún es un marcador "[PENDIENTE…]"
  const isPendingValue = (value: unknown) =>
    value === null || value === undefined || value === '' ||
    (typeof value === 'string' && value.trim().startsWith('[PENDIENTE'))

  return { showPending, isPendingValue }
}
