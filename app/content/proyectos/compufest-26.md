---
id: compufest-26
period: Noviembre de 2026 · 2 días de desarrollo
team: Individual
teamSize: 1
location: Santo Domingo Tehuantepec, Oaxaca
---

## Contexto
El CompuFest 26 es el segundo foro regional de Computación, organizado por la carrera de Ingeniería en Computación de la Universidad del Istmo. Durante tres días (4, 5 y 6 de noviembre) reunió conferencias, talleres, exposición de proyectos estudiantiles, zona gamer y patrocinadores.

## Problema
A pocos días del evento no había un lugar único donde consultar la agenda, la sede, los talleres y los proyectos, ni una forma ágil de registrar y dar acceso a cientos de asistentes sin depender de listas en papel. Además, con varias actividades al mismo tiempo, la gente necesitaba saber de un vistazo qué estaba pasando en cada zona y qué venía después.

## Solución
Un sitio oficial con la agenda por día, el mapa de la sede, las conferencias, los talleres, los proyectos de los alumnos y los patrocinadores, conectado a un sistema de registro de punta a punta: un script genera los gafetes en PDF, cada uno con su código QR; el staff entra con un PIN que define su rol y su punto de escaneo, da de alta los gafetes y hace el check-in con la cámara del celular, y el equipo organizador sigue los registros en vivo desde un panel de administración. El sistema también permite que el asistente se dé de alta escaneando su propio gafete.

Para las pantallas del evento hice animaciones que se actualizaban en vivo con la información del foro: mostraban qué había y qué seguía en cada zona (auditorio, talleres, proyectos, zona gamer), junto con los proyectos de los alumnos y los logos de patrocinadores y aliados publicados en el sitio.

## Qué hice yo
Desarrollé todo el proyecto: el sitio público, el script que genera los gafetes, la plataforma de lectura de códigos QR, el flujo de check-in, el panel de administración y las animaciones en vivo para las pantallas del evento.

## Decisiones técnicas
*   **Nuxt:** un solo proyecto para el sitio público y el panel, con páginas rápidas de cargar.
*   **Cloudflare Functions:** la lógica de registro y check-in corre en funciones sin servidor, sin tener que administrar infraestructura.
*   **Supabase (PostgreSQL):** base de datos donde guardé todos los registros, con la confiabilidad de PostgreSQL sin tener que montar ni mantener un servidor.
*   **Script en Node.js para los gafetes:** genera los gafetes en PDF con su diseño y el código QR de cada asistente.
*   **Cloudflare R2:** almacenamiento de archivos dentro de la misma plataforma.
*   **Pantallas offline-first:** en lugar de un protocolo de tiempo real (WebSockets o similares), las animaciones precargaban la agenda y los recursos del sitio y calculaban con el reloj local qué estaba ocurriendo y qué seguía. Así podían funcionar aunque fallara el internet de la sede.
*   **Agentes de IA:** los usé para planear, generar y probar el código, lo que permitió terminarlo en 2 días.

## Resultado
El sitio, la lectura de QR, el check-in y las pantallas en vivo se usaron durante los tres días del CompuFest 26. El panel de administración registró 450 asistentes de 520 gafetes generados (86.5 %) y 699 escaneos en 5 puntos de check-in.
