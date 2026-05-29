<template>
  <NuxtLayout>
    <!-- <template #header> -->
      <appHeader />
    <!-- </template> -->
    <NuxtPage />
    <template #footer>
      <appFooter v-model:testProps="testProps" />
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
const testProps = ref('testProps')
watch(testProps, (newVal) => {
  console.log('new testProps',newVal)
})
</script>