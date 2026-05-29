<script setup lang="ts">
const changeLayout = (layout: string) => {
    setPageLayout(layout)
}
definePageMeta({
  layout: 'custom',
});
</script>

<template>
  <div>
    <div>changeLayout</div>
    <NuxtLink to="/">Go to index</NuxtLink>
    <br>
    <NuxtLink to="/test.middleRouter?name=test">Go to test.middleRouter</NuxtLink>
    <div>
        <button @click="changeLayout('custom')">Change to custom layout</button>
        <button @click="changeLayout('custom2')">Change to custom2 layout</button>
    </div>
  </div>
</template>