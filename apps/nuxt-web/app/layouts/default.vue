<script setup lang="ts">
const headerTitle = ref('Hello World from layouts header')
const testProps = ref('testProps')
</script>

<template>
    <div class="bg-[#F3F4F7]">
      <header>
        <slot name="header">
          <!-- <h1>{{ headerTitle }}</h1> -->
        </slot>
      </header>
      <main>
        <slot />
      </main>
      <footer>
        <slot name="footer" :testProps="testProps">
        </slot>
      </footer>
    </div>
  </template>
  