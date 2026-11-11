type Theme = 'light' | 'dark'

/**
 * Tema claro/oscuro. El script en <head> (nuxt.config.ts) aplica el guardado antes del primer pintado;
 * aquí solo se sincroniza el estado tras montar para no romper la hidratación.
 */
export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'light')

  onMounted(() => {
    theme.value = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  })

  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = theme.value
    try {
      localStorage.setItem('theme', theme.value)
    } catch {}
  }

  return { theme, toggle }
}
