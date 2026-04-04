---
id: tiven
title: Tiven - Software como Servicio
description: Una plataforma SaaS que ofrece a los salones de belleza una solución integral para gestionar sus operaciones diarias, incluyendo reservas, inventario, marketing y seguimientos de clientes.
period: Octubre de 2025 - Actualidad
team: Equipo
teamSize: 6
collaborators: ["Joan Garfias", "Karla G.", "Jeremy O.", "Sadie B.", "Saul P.", "Jimmy V."]
role: Backend Developer
technologies: ["Astro", "PHP", "Laravel", "PostgreSQL", "Vue 3", "Docker"]
location: Oaxaca de Juárez, México
image: /projects/tiven/1.png
images:
  - /projects/tiven/1.png
  - /projects/tiven/2.png
  - /projects/tiven/3.png
demo: https://tiven.app
---

## Contexto
Tiven es una plataforma SaaS diseñada para ayudar a los salones de belleza a gestionar sus operaciones diarias de manera eficiente. El mercado de belleza a menudo carece de herramientas integradas que centralicen la administración comercial con la atención al cliente.

## Problema
Muchos salones de belleza operan de forma fragmentada, utilizando papel o múltiples Excel para reservas, inventario y fidelización. Esto causa pérdida de citas, falta de control sobre el stock de productos y una comunicación nula con el cliente después de su visita.

## Solución
Decidimos construir una solución integral que permita gestionar reservas, control de inventario, sistema de puntos y herramientas de marketing en un solo lugar. El objetivo es simplificar la vida del dueño del negocio y mejorar la retención de clientes.

## Qué hice yo
Desarrollé la API RESTful utilizando Laravel. Fui uno de los responsables del modelado de la base de datos en PostgreSQL y de la implementación de la lógica de negocio para los módulos de inventario, sistema de puntos, autentificación, registro de negocios, entre otros. Así como implementé diferentes interfaces visuales de la aplicación. También colaboré en el despliegue de la aplicación empleando distintos servicios PaaS.

## Decisiones técnicas
*   **Laravel/PHP:** Por su rapidez de desarrollo para APIs robustas.
*   **PostgreSQL:** Para garantizar integridad referencial en datos financieros y de inventario.
*   **Vue 3:** Para el frontend, buscando buen rendimiento e interactividad.
*   **AstroJS** Utilizado para el sitio web oficial del producto y captar diferentes leads.

## Retos
El mayor reto fue sincronizar el sistema de puntos en tiempo real con las transacciones de venta, asegurando que no hubiera duplicidad de beneficios ante fallos de red.

## Resultado
Una plataforma estable, logrando reducir el tiempo administrativo en un 30% para los usuarios activos.