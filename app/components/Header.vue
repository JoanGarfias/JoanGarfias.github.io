<template>
  <div class="w-full ">
  <BitsPillNav
    :logo="logo"
    logoAlt="Joan Garfias Logo"
    :items="menuItems"
    activeHref="/"
    class="custom-nav"
    ease="power2.easeOut"
    baseColor="#07111d"
    pillColor="#0d1b2a"
    hoveredPillTextColor="#ffffff"
    pillTextColor="#ffffff"
  />
  </div>

 <!--
  <div style="background: #1a1a1a;">
   <BitsStaggeredMenu
     position="right"
     :items="menuItems"
     :social-items="socialItems"
     :display-socials="true"
     :display-item-numbering="true"
     menu-button-color="#fff"
     open-menu-button-color="#fff"
     :change-menu-color-on-open="true"
     :colors="['#253E7E', '#1e3163']"
     logo-url="/joangarfias.svg"
     accent-color="var(--color-primary)"
     @menu-open="handleMenuOpen"
     @menu-close="handleMenuClose"
   />
 </div>
 --> 
</template>

<script setup>
import logo from '/logo.svg';

const menuItems = [
 { label: 'Inicio', ariaLabel: 'Ir a la página principal', href: '/' },
 { label: 'Proyectos', ariaLabel: 'Ver mis proyectos', href: '/proyectos' },
 { label: 'Habilidades', ariaLabel: 'Ver mis habilidades', href: '/habilidades' },
 { label: 'Sobre mí', ariaLabel: 'Conoce más sobre mí', href: '/sobre-mi' },
 { label: 'Contacto', ariaLabel: 'Contáctame', href: '/contacto' }
]

const socialItems = [
 { label: 'YouTube', link: 'https://youtube.com/@joan_dev' },
 { label: 'GitHub', link: 'https://github.com/JoanGarfias' },
 { label: 'LinkedIn', link: 'https://linkedin.com/in/joangarfias' }
]

const handleMenuOpen = () => console.log('Menu opened')
const handleMenuClose = () => console.log('Menu closed')

</script>
