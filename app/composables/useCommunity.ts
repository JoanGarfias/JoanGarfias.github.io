import { communityEntries, type CommunityEntry } from '~/content/community'

const dateFormat = new Intl.DateTimeFormat('es-MX', { month: 'short', year: 'numeric', timeZone: 'UTC' })

export const formatEventDate = (iso: string | null) => (iso ? dateFormat.format(new Date(iso)) : null)

// "~60 estudiantes" → 60
const audienceNumber = (audience?: string) => {
  const match = audience?.replace(/[.,]/g, '').match(/\d+/)
  return match ? Number(match[0]) : null
}

export const useCommunity = () => {
  const { showPending } = usePending()

  // Con los pendientes apagados, las entradas de ejemplo desaparecen
  const entries = computed(() =>
    communityEntries
      .filter(e => showPending.value || !e.placeholder)
      .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  )
  const real = computed(() => communityEntries.filter(e => !e.placeholder))

  const given = computed(() => entries.value.filter(e => e.type !== 'asistente'))
  const attended = computed(() => entries.value.filter(e => e.type === 'asistente'))
  const featured = computed(() => given.value.find(e => e.featured) ?? null)

  // Contadores solo con datos reales; null = aún no hay datos (se muestra PendingText)
  const counters = computed(() => {
    const items = real.value
    // Las actividades dentro de otro evento (partOf) no se suman dos veces
    const people = items.filter(e => e.type !== 'asistente' && !e.partOf).map(e => audienceNumber(e.audience))
    const knownPeople = people.filter((n): n is number => n !== null)
    const list = [
      { key: 'charlas', label: 'Charlas', value: items.filter(e => e.type === 'charla').length },
      { key: 'talleres', label: 'Talleres', value: items.filter(e => e.type === 'taller').length },
      // "~" solo si alguna audiencia viene aproximada (ej. "~60 estudiantes")
      { key: 'personas', label: 'Personas alcanzadas', value: knownPeople.reduce((sum, n) => sum + n, 0), approx: items.some(e => e.audience?.trim().startsWith('~')) },
      { key: 'organizados', label: 'Eventos organizados', value: items.filter(e => e.type === 'organizacion').length }
    ]
    return items.length ? list.filter(c => c.value > 0) : list.map(c => ({ ...c, value: null }))
  })

  return { entries, given, attended, featured, counters, real }
}

// JSON-LD Event para cada charla/taller real con fecha, evento y ciudad
export const communityEventsJsonLd = (entries: CommunityEntry[], siteUrl = '') =>
  entries
    .filter(e => !e.placeholder && e.type !== 'asistente' && e.date && e.event && e.city)
    .map(e => ({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `${e.title} · ${e.event}`,
      startDate: e.date,
      ...(e.city === 'En línea'
        ? { eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode', location: { '@type': 'VirtualLocation', url: e.url ?? siteUrl } }
        : {
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: { '@type': 'Place', name: e.event, address: { '@type': 'PostalAddress', addressLocality: e.city, addressCountry: 'MX' } }
          }),
      performer: { '@type': 'Person', name: 'Joan Garfias' },
      ...(e.url ? { url: e.url } : {}),
      ...(e.photo ? { image: `${siteUrl}${e.photo}` } : {})
    }))
