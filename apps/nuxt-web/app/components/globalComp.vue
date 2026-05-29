<script setup lang="ts">
import type { GlobeArc } from 'roxy-cobewebgl'
import RoxyCobewebgl from 'roxy-cobewebgl/vue';
const arcs = ref([
{ startLat: 39.9, startLng: 116.4, endLat: 35.6, endLng: 139.6, color: '#ff6633' },
{ startLat: 9.9, startLng: 78.4, endLat: 35.6, endLng: 139.6, color: '#ff6633' },
]);

const classObj = ref({
  class: 'absolute z-0 -right-3/7 -top-2/7 size-[1480px]',
  radius: 0.72
})
const { windowWidth } = useWindowSize()
watch(windowWidth, (newWidth) => {
  
  classObj.value = getGlobeClass(newWidth)
})

 const getGlobeClass = (witdh: number) => {
  switch (true) {
    case witdh < 640:
      return {
        class: 'absolute z-0 -right-6/5 top-0 size-[900px]',
        radius: 0.6
      }
    case witdh < 768:
      return {
        class: 'absolute z-0 -right-4/7 -top-1/7 size-[1200px]',
        radius: 0.6
      }
    case witdh < 1024:
      return {
        class: 'absolute z-0 -right-4/7 -top-1/7 size-[1200px]',
        radius: 0.8
      }
    case witdh < 1280:
      return {
        class: 'absolute z-0 -right-5/7 -top-2/7 size-[1280px]',
        radius: 0.72
      }
    case witdh < 1536:
      return {
        class: 'absolute z-0 -right-4/7 -top-2/5 size-[1480px]',
        radius: 0.72
      }
    default:
      return {
        class: 'absolute z-0 -right-3/7 -top-2/7 size-[1480px]',
        radius: 0.72
      }
  }
 }
 onMounted(() => {
 })


</script>

<template>
  <div :class="classObj.class">
    <RoxyCobewebgl
      :globe-radius="classObj.radius"
      :arcs="arcs"
      :glow-on="0"
      :auto-rotate="true"
      :rotation-speed="0.001"
      :dots="24000"
      :dot-size="0.005"
      @error="(e) => console.error(e)"
      @ready="() => {}"
    />
  </div>
</template>

<style scoped lang="scss">
</style>