<script setup lang="ts">
const headerTitle = ref('Hello World from layouts header')
const testProps = ref('testProps')
</script>

<template>
    <div class="bg-[linear-gradient(180deg,#F3F4F7_0%,#FFFFFF_110%)]">
      <header>
        <slot name="header">
          <!-- <h1>{{ headerTitle }}</h1> -->
        </slot>
      </header>
      <main>
        <slot />
      </main>
      <footer class="mt-10">
        <slot name="footer" :testProps="testProps">
        </slot>
      </footer>
    </div>
  </template>
  