<script setup lang="ts">

</script>

<template>
    <div class="bg-[#050F1E] text-white min-h-100vh flex items-center  ">
        <div
            class="flex flex-col w-full  xl:web-container  xl:justify-center xl:items-center xl:flex-row gap-10 py-15 px-4 lg:px-15">
            <div class="lg:w-[558px] lg:h-[679px] w-[302px] h-[343px] mx-auto xl:mx-0">
                <img src="~/assets/images/home-page/fingerprint.png" alt="fingerprint" class="w-full h-full">
            </div>
            <div class="flex flex-col lg:items-start">
                <h1 class="font-chivo-mono font-weight-400 font-size-[24px]">Why you can trust RoxyBrowser</h1>
                <p class="mt-3 font-weight-400 font-size-[20px] text-white/60">We protect your online data through
                    multiple security measures.</p>
                <ul class="mt-10 w-full">
                    <li v-for="item in 3" :key="item"
                        class="flex py-9">
                        <div class="mt-[5px] shrink-0 mr-3 mt-[5px]">
                            <img src="~/assets/images/home-page/Rectangle.png" alt="" class="h-[16px]">
                        </div>
                        <div class="flex flex-col xl:flex-row items-start xl:justify-between gap-5.5 relative first:pt-0 fingerprint-item last:after:hidden">
                            <div class="flex flex-col items-start">
                                <h2 class="font-chivo-mono font-weight-400 font-size-[20px] flex align-center">
                                    <span>Account Protection_</span>
                                </h2>
                                <p
                                    class="w-full lg:px-0 xl:w-[320px] mt-5 font-weight-400 font-size-[14px] text-white/80 text-left">
                                    Duis nisi tellus, auctor et
                                    cursus id, mollis non neque. Donec vel placerat nisi, vitae molestie ligula. Nam nec
                                    metus efficitur, tempor ante at, ornare erat.</p>
                            </div>
                            <div class="w-[240px] h-[120px] lg:px-0 shrink-0">
                                <img src="~/assets/images/home-page/Frame.png" alt="" class="w-full h-full">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fingerprint-item {}

.fingerprint-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 100%);
    opacity: 0.2;
    pointer-events: none;
}
</style>