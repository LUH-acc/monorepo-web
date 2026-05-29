<script setup lang="ts">
definePageMeta({
    layout: 'custom2',
})
</script>

<template>
    <div>parent2 page</div>
    <NuxtLink to="/parent2/child">Go to parent2/child</NuxtLink>
    <NuxtPage />
</template>