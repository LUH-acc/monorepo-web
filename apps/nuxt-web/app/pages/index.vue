<script setup lang="ts">
import { trackRoute } from 'vue-router/dist/experimental/index.js'
import FingerCanvasDemo from '~/components/fingerCanvasDemo.vue'

const title = ref('Hello World from index.vue')
const appConfig = useAppConfig()
const testData = appConfig.testData
const someAppConfig = useAppConfig().someAppConfig
const runtimeConfig = useRuntimeConfig()

const list = ref([1,2,3,4,5])
const add = () => {
  list.value.push(list.value.length + 1)
}
const remove = () => {
  if (list.value.length === 0) return
  const index = Math.floor(Math.random() * list.value.length)
  list.value.splice(index, 1)
}

const textStr = '遥遥领先，遥遥领先'
const text = ref('')

/** 首字最慢、越打越快：间隔 ms，随进度从 MAX 降到 MIN */
const MAX_DELAY_MS = 100
const MIN_DELAY_MS = 24

let timerId: ReturnType<typeof setTimeout> | null = null

function clearTypewriter() {
    if (timerId !== null) {
        clearTimeout(timerId)
        timerId = null
    }
}
function delayForIndex(charIndex: number) {
  const progress = charIndex / textStr.length
  return Math.max(MIN_DELAY_MS, (1 - progress) * MAX_DELAY_MS)
 }
function changeText() {
  clearTypewriter()
  let index = 0
  const tick = () => {
    if(index >= textStr.length) {
      clearTypewriter()
      return
    }
    index++
    text.value = textStr.slice(0, index)
    timerId = setTimeout(tick, delayForIndex(index))
  }
  timerId = setTimeout(tick,delayForIndex(0))
}

onMounted(() => {
    changeText()
})

onUnmounted(() => {
    clearTypewriter()
})

definePageMeta({
  title: 'index page',
})
</script>

<template>
  <!-- <div>
    <pre>myEnvVariable:{{ runtimeConfig.public.apiSecretToken }}</pre>
    <h2 :style="{ color: testData.color }">{{ title }} {{ appConfig.foo }}</h2>
    <pre>someAppConfig:{{ someAppConfig }}</pre>
    <div>{{ $route.meta.title }}</div>
    <NuxtLink to="/changeLayout">Go to changeLayout</NuxtLink>
    <NuxtLink to="/test.middleRouter?name=test">Go to test.middleRouter</NuxtLink>
    <br>
    <NuxtLink to="/users-admin">Go to users-admin</NuxtLink>
    <br>
    <NuxtLink to="/users-editor">Go to users-editor</NuxtLink>
    <br>
    <NuxtLink to="/testSlug">Go to testSlug</NuxtLink>
    <br>
    <NuxtLink to="/parent">Go to parent</NuxtLink>
    <br>
    <NuxtLink to="/parent/child">Go to parent/child</NuxtLink>
    <br>
    <NuxtLink to="/parent2">Go to parent2</NuxtLink>
    <br>
    <NuxtLink to="/parent2/child">Go to parent2/child</NuxtLink>
    <br>
    <NuxtLink to="/app-page">Go to app-page</NuxtLink>
    <br>
    <NuxtLink to="/testPlugin">Go to testPlugin</NuxtLink>
    <br>
    <NuxtLink to="/useAppConfig">Go to useAppConfig</NuxtLink>
    <br>
    <NuxtLink to="/serverData">Go to serverData</NuxtLink>
    <br>
    <NuxtLink to="/toolsPage">Go to toolsPage</NuxtLink>
    <br>
    <NuxtLink to="/stylePage">Go to stylePage</NuxtLink>
  </div> -->
  <home-page />
   <!-- <finger-canvas-demo /> -->
  <!-- <div class="mt-50">
    <button @click="add">add</button>
    <br>
    <button @click="remove">remove</button>
    <transition-group name="fade" tag="ul">
        <li v-for="i in list" :key="i">
          {{ i }}
        </li>
    </transition-group>
  </div> -->
  <!-- <div class="mt-50">
    {{ text }}
  </div> -->
  <!-- <cobe-earth /> -->
</template>
<style scoped> 
.fade-move, 
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-leave-active {
  position: absolute;
}
</style>