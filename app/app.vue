<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const { siteUrl } = useRuntimeConfig().public

// Canonical y og:url por ruta, siempre sobre el dominio principal
const canonicalUrl = computed(() => `${siteUrl}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`)

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  meta: [
    { property: 'og:url', content: canonicalUrl },
    { name: 'twitter:url', content: canonicalUrl }
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: appConfig.person.name,
      jobTitle: appConfig.person.jobTitle,
      url: `${siteUrl}/`,
      image: `${siteUrl}/joan.jpeg`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: appConfig.person.locality,
        addressCountry: appConfig.person.country
      },
      sameAs: appConfig.person.sameAs
    })
  }]
})
</script>
