/**
 * Proyecto que la tarjeta de perfil muestra en lugar del perfil (slug o null).
 * Lo fija la lista de proyectos al pasar por cada uno (en un caso de estudio la tarjeta usa la ruta).
 */
export const useActiveProject = () => useState<string | null>('active-project', () => null)
