<template>
  <div class="w-full ">
  <BitsPillNav
    :logo="logo"
    :items="menuItems"
    :active-href="activeHref"
    :secondary-link="cvLink"
    class="custom-nav"
    baseColor="#07111d"
    pillColor="#0d1b2a"
    hoveredPillTextColor="#ffffff"
    pillTextColor="#ffffff"
  />
  </div>
</template>

<script setup>
import logo from '/logo.svg';

const menuItems = [
 { label: 'Inicio', href: '/' },
 { label: 'Proyectos', href: '/#proyectos' },
 { label: 'Comunidad', href: '/#comunidad' },
 { label: 'Sobre mí', href: '/#sobre-mi' },
 { label: 'Contacto', href: '/#contacto' }
]

const cvLink = { label: 'CV', ariaLabel: 'Descargar CV (PDF)', href: '/cv.pdf', download: 'CV_Joan_Garfias.pdf' }

// Sección de la home → ítem del menú (el stack vive junto a Proyectos)
const sectionToHref = {
 inicio: '/',
 proyectos: '/#proyectos',
 'sobre-mi': '/#sobre-mi',
 comunidad: '/#comunidad',
 contacto: '/#contacto'
}

// Rutas internas → ítem del menú
const routeToHref = [
 ['/proyectos', '/#proyectos'],
 ['/sobre-mi', '/#sobre-mi'],
 ['/comunidad', '/#comunidad'],
 ['/contacto', '/#contacto']
]

const route = useRoute()
const { activeId, refresh } = useScrollSpy(Object.keys(sectionToHref))
// El Header persiste entre rutas: al volver a la home hay que observar las secciones nuevas
useNuxtApp().hook('page:finish', () => nextTick(refresh))

const activeHref = computed(() => {
 if (route.path === '/') return sectionToHref[activeId.value] ?? '/'
 return routeToHref.find(([prefix]) => route.path.startsWith(prefix))?.[1] ?? ''
})
</script>
