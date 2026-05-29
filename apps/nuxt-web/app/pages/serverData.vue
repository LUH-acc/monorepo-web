<script setup lang="ts">
const { data } = await useFetch('/api/test2')
// const { data } = await useFetch('/apiTest')
const { data: data3 } = await useFetch('/test3')
const { data: data4 } = await useFetch('/api/hello/nuxt')
console.log('data',data.value)
</script>

<template>
    <pre>serverData:{{ data }}</pre>
    <pre>serverData3:{{ data3 }}</pre>
    <pre>serverData4:{{ data4 }}</pre>
</template>