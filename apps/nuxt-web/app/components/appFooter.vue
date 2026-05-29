<script setup lang="ts">
const footerList = useFooter()
const testProps = defineModel('testProps',{type: String})
const langsList = [
  {
    value: 'english',
    label: 'English',
  },
  {
    value: 'chinese',
    label: 'Chinese',
  },
  {
    value: 'spanish',
    label: 'Spanish',
  },
]
const selectedLang = ref('english')
</script>

<template>
  <div class="flex xs:flex-col md:flex-row justify-around p-6 md:py-12 md:px-30 text-left rounded-t-2xl text-white bg-[#1E1C31]">
    <div class="md:w-[440px]">
      <div class="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" class="w-8 h-8">
        <h2 class="font-family-archivo-bold font-weight-700 font-size-[24px]">RoxyBrowser</h2>
      </div>
      <p class="text-white/60 mt-5 font-weight-400 text-left">With RoxyBrowser, managing multiple accounts becomes easy.
        Stay safe, anonymous, and organized online.</p>
      <div class="flex flex-col items-start gap-2 mt-24">
        <!-- <select name="language" id="language" @change="changeLanguage($event)" class="py-3 px-4 rounded-md w-[220px] outline-none bg-white/10">
          <option class="bg-white/10" value="en" selected>English</option>
          <option class="bg-white/10" value="zh">Chinese</option>
        </select> -->
        <selectComp :options="langsList" v-model="selectedLang" />
        <div>
          <div class="font-weight-400 font-size-[14px]">support@roxybrowser.com</div>
          <div class="font-weight-400 font-size-[14px] mt-1">+4 47745818521</div>
        </div>
        <div>
        </div>
      </div>
    </div>
    <div class="flex gap-20 xs:mt-15 md:mt-0">
      <div v-for="item in footerList" :key="item.title">
        <h2 class="font-weight-700 font-bold  font-size-[20px]">{{ item.title }}</h2>
        <ul class="mt-6">
          <li v-for="list in item.list" :key="list.title" class="mt-4 font-weight-400 font-size-[14px]">
            <NuxtLink :to="list.href">{{ list.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>