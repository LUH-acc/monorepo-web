<script setup lang="ts">
import { ref, onMounted } from '#imports'
const count = ref(0)
onMounted(() => {
    console.log('toolsPage mounted')
})
</script>

<template>
    <div>toolsPage</div>
    <br>
    <div>{{ $pluginFunction('toolsPage') }}</div>
</template>