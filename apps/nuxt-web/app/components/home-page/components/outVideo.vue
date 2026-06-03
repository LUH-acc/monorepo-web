<script setup lang="ts">
const videoRef = ref<HTMLVideoElement | null>(null)
</script>

<template>
    <div class="md:px-15">
        <div class="web-container flex px-4 py-10 lg:py-20 lg:flex-row justify-between items-center flex-col lg:gap-[108px]">
       <div class="flex flex-col text-center lg:text-left lg:w-1/2">
        <h1 class="text-h3 text-[24px] lg:text-[48px]">🚀 Industry Recognition — RoxyBrowser Recommended by Leading Tech Creator RandomButCool</h1>
        <p class="mt-3 lg:mt-5 font-weight-400 text-[14px] lg:text-[18px] text-[#1D1E20]">
            Trusted by users worldwide, RoxyBrowser continues to gain recognition for delivering a fast, secure, and reliable browsing experience.
        </p>
        <div class="mt-3 lg:mt-10">
            <a class="text-[#11A3FD] font-weight-500 text-[14px] lg:text-[18px]" href="#">More videos on RoxyBrowser</a> 
        </div>
       </div>
       <div class="w-full h-391px lg:w-446px md:h-520px mt-10 lg:mt-0">
         <div class="w-full h-full border-7 border-white rounded-3">
            video
         </div>
       </div>
    </div>
    </div>

</template>

<style scoped>
</style>