---
id: civitas
period: Mayo 2026 - Junio 2026
team: Colaborativo
teamSize: 23
collaborators: [
    "Joan Garfias",
    "Guadalupe T.",
    "Joe E.",
    "Rodrigo M.",
    "Karla G.",
    "Jeremy O.",
    "Juan E.",
    "Gerardo T.",
    "Victor A.",
    "Joshua A.",
    "Orlando C.",
    "Sadie B.",
    "Ángel D.",
    "Isacar C.",
    "Jared L.",
    "Jairo H.",
    "Valery R.",
    "Jeycson G.",
    "Jeovani P.",
    "Mariana P.",
    "Christian M.",
    "Alexis R.",
    "Gerson A.",
]
location: Oaxaca de Juárez
---

## Contexto del proyecto
Desarrollo de un ecosistema digital integral para la gestión residencial de condominios. Busca resolver la fricción operativa y automatizar la convivencia diaria entre los residentes, la administración y el personal de seguridad. Este proyecto fue desarrollado como parte de la materia de Desarrollo Ágil de Software.

## Problema
Los condominios enfrentan procesos de seguridad puramente reactivos y deficiencias en la gestión de capital humano. También hay dificultades de comunicación, lentitud en los reportes de incidentes y falta de transparencia financiera.

## Solución
Implementación de un sistema web centralizado que permite un control de acceso preventivo mediante códigos QR. Se integran módulos en tiempo real para autorizar visitas, reportar incidencias, manejar cobranzas y gestionar áreas comunes.

## Qué hice yo
Contribuí al diseño de la base de datos y la arquitectura del sistema mediante el modelo C4 (nivel 1 y 2). Configuré los entornos de prueba en el VPS con Docker, armé el CI/CD con GitHub Actions y programé todo el módulo de empleados domésticos.

## Decisiones técnicas
El sistema fue estructurado dividiendo el frontend con Next.js, React y Tailwind CSS para un despliegue rápido en Vercel. El backend se implementó usando NestJS, Prisma ORM y PostgreSQL orquestado mediante contenedores de Docker en un Servidor VPS.

## Retos:
Existió una marcada curva de aprendizaje con tecnologías como NestJS y Docker, junto con importantes problemas de integración de versiones que sobreescribieron archivos base. Esto se sumó a dificultades iniciales de comunicación y sincronización entre los equipos de desarrollo.

## Resultados
Se lograron entregar e iterar módulos funcionales clave para la seguridad, gestión de incidentes y control de accesos a lo largo de los sprints. Además, se estabilizó exitosamente el entorno de QA y se mitigó de forma efectiva la deuda técnica acumulada.