---
id: unistmo-web
title: Universidad del Istmo - Sitio web
description: Sitio web de la Universidad del Istmo.
period: Enero de 2026 - Actualidad
team: Colaborativo
teamSize: 7
collaborators: ["Joan Garfias", "Karla G.", "Jeremy O.", "Juan E.", "Sadie B.", "Joshua H.", "Orlando C."]
role: Fullstack Developer
technologies: ["AstroJS", "Tailwind CSS", "PostgreSQL", "Strapi CMS", "Docker", "Docker Compose"]
location: Oaxaca de Juárez, México
image: /projects/unistmo/1.png
images:
  - /projects/unistmo/1.png
  - /projects/unistmo/2.png
  - /projects/unistmo/3.png
  - /projects/unistmo/4.png
  - /projects/unistmo/5.png
  - /projects/unistmo/6.png
demo: https://www2.unistmo.edu.mx
---

## Contexto
Desarrollo del sitio web oficial de la Universidad del Istmo, una institución educativa reconocida en México que necesitaba renovar su presencia digital.

## Problema
El sitio web anterior era difícil de navegar, no era responsivo y la actualización de contenidos era un proceso lento que dependía directamente del equipo técnico, lo que causaba que la información para estudiantes y profesores estuviera desactualizada.

## Solución
Se propuso una plataforma moderna utilizando Astro para máxima velocidad (SSG) y Strapi como CMS. Esto permite que el personal administrativo actualice noticias y eventos sin tocar código, mientras se mantiene un rendimiento excepcional.

## Qué hice yo
Participé desde el análisis de requerimientos. Implementé componentes clave del frontend con Astro y Tailwind CSS, y configuré el backend con Strapi, incluyendo el modelado de tipos de contenido y la integración de CI/CD con GitHub Actions y Docker Compose para el despliegue.

## Decisiones técnicas
*   **AstroJS:** Elegido por su enfoque de "Islas" y SSG, ideal para un sitio educativo con mucho contenido estático.
*   **Strapi CMS:** Para dar autonomía al equipo de la universidad en la gestión de contenidos.
*   **Docker Compose:** Para facilitar la replicación del entorno de desarrollo y producción.

## Retos
Migrar la gran cantidad de datos históricos de la universidad a la nueva estructura del CMS asegurando que no se perdiera información crítica.

## Resultado
Una versión inicial funcional que ha mejorado significativamente los tiempos de carga y la facilidad de uso móvil en comparación con el sitio anterior. Actualmente se encuentra en mejora constante y está por publicarse como sitio web oficial.
