<script setup lang="ts">
const nuxtApp = useNuxtApp()
console.log('nuxtApp',nuxtApp.$title)
</script>

<template>
    <div>testPlugin pluginB:{{ $testPluginB }}</div>
</template>