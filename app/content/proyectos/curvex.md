---
id: curvex
period: Noviembre 2025 - Enero 2026
team: Colaborativo
teamSize: 5
collaborators: ["Joan Garfias", "Karla G.", "Jeremy O.", "Juan E.", "Gerardo T."]
location: Oaxaca de Juárez, México
---

## Contexto
Herramienta educativa desarrollada para el curso de Estadística y Probabilidad, orientada a estudiantes y profesionales que necesiten realizar análisis estadísticos rápidos.

## Problema
Las herramientas estadísticas suelen ser complejas (como SPSS/R) con curvas de aprendizaje altas, o demasiado simples (calculadoras web) que no ofrecen visualizaciones interactivas de las distribuciones de probabilidad.

## Solución
Decidimos construir una aplicación que combine un backend para cálculos matemáticos con un frontend reactivo que grafique distribuciones (Binomial, Normal, Poisson, etc.) al instante mientras el usuario cambia los parámetros.

## Qué hice yo
Implementé la lógica de las distribuciones en el backend con Laravel y desarrollé la interfaz interactiva utilizando Vue 3 y librerías de gráficos. Trabajé estrechamente con mis compañeros para asegurar la precisión matemática de los algoritmos. Así como también desplegué el sistema utilizando Heroku como PaaS para su entrega.

## Decisiones técnicas
*   **PHP Laravel:** Para manejar los cálculos y la lógica del servidor.
*   **Vue 3 + Inertia:** Por su reactividad, esencial para actualizar gráficos en tiempo real.
*   **Tailwind CSS:** Para una interfaz limpia y académica.

## Retos
La implementación precisa de las funciones de densidad de probabilidad y asegurar que las visualizaciones fueran legibles incluso con datos extremos.

## Resultado
Una herramienta funcional utilizada por compañeros de clase para validar sus ejercicios, facilitando el aprendizaje visual de la estadística.
