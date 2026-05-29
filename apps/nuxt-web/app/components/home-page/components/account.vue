<script setup lang="ts">
import { useScroll, useMotionValueEvent } from "motion-v"
const accountRef = ref<HTMLElement | null>(null)
const style = reactive({
    transform: `scale(1)`,
    opacity: 1,
    filter: `blur(0px)`,
})
onMounted(() => {
    const { scrollYProgress } = useScroll({ target: accountRef })
    useMotionValueEvent(scrollYProgress, "change", (__latest) => {
        let latest = __latest
        // if (clientHeight <= innerHeight) {
        //   latest = 1 - __latest
        // }
        style.transform = `scale(${1 - 0.15 * latest})`
        style.opacity = `${1 - 0.7 * latest}`
        style.filter = `blur(${15 * latest}px)`
    })
})
</script>

<template>
    <div class="test-container px-4">
        <div class="sticky top-10">
            <h2 class="rx-h2 mt-7 md:mt-20 text-black">All-in-One Account Management</h2>
            <p class="rx-p mt-2">
                Keep up with RoxyBrowser's latest research and exclusive insights on secure multi-account management
            </p>
        </div>

        <div class="mt-10" ref="accountRef">
            <div class="sticky top-[170px]" :style="style">
                <section
                    class="flex xs:flex-col md:flex-row gap-10 justify-center md:justify-between md:text-left px-2 py-5 pb-0 md:px-12.5 md:py-8 bg-white rounded-2xl mb-5">
                    <div class="flex flex-col items-center md:items-start md:gap-2 w-full lg:w-[413px] md:pt-15">
                        <div class="p-3.5 bg-[#F3F4F7] rounded-2xl w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                            <img src="~/assets/images/home-page/chrome.png" alt="account-card1" class="w-full h-full">
                        </div>
                        <h2 class="font-family-archivo-bold text-2xl text-black pt-5">
                            Before Using RoxyBrowser
                        </h2>
                        <p class="pt-3 md:pt-5 md:font-size-[20px] font-weight-400 text-center md:text-left text-black">
                            Websites aggressively trace your online surfing, triggering account bans and privacy leaks.
                        </p>
                    </div>
                    <div class="flex lg:flex-1 md:flex-shrink-0 gap-2 md:bg-[#FED7D7] rounded-2xl md:p-[40px] pb-0">
                        <div class="wh-full">
                            <img src="~/assets/images/home-page/Amazon.png" alt="account-card1" class="w-full h-full">
                        </div>
                        <div class="hidden wh-full xl:block">
                            <img src="~/assets/images/home-page/Amazon.png" alt="account-card1" class="w-full h-full">
                        </div>
                    </div>
                </section>
            </div>
            <div class="relative z-10">
                <section
                    class="flex xs:flex-col md:flex-row gap-10 justify-center md:justify-between md:text-left px-2 py-5 pb-0 md:px-12.5 md:py-8 bg-white rounded-2xl mt-10">
                    <div class="flex flex-col items-center md:items-start  md:gap-2 w-full lg:w-[413px]  md:pt-15">
                        <div class="p-3.5 bg-[#F3F4F7] rounded-2xl w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                            <img src="~/assets/images/home-page/chrome.png" alt="account-card1" class="w-full h-full">
                        </div>
                        <h2 class="font-family-archivo-bold text-2xl text-black pt-5">
                            Before Using RoxyBrowser
                        </h2>
                        <p class="pt-3 md:pt-5 md:font-size-[20px] font-weight-400 text-center md:text-left text-black">
                            Websites aggressively trace your online surfing, triggering account bans and privacy leaks.
                        </p>
                    </div>
                    <div class="flex lg:flex-1 md:flex-shrink-0 gap-2 md:bg-[#FED7D7] rounded-2xl md:p-[40px] pb-0">
                        <div class="wh-full">
                            <img src="~/assets/images/home-page/Amazon.png" alt="account-card1" class="w-full h-full">
                        </div>
                        <div class="hidden wh-full xl:block">
                            <img src="~/assets/images/home-page/Amazon.png" alt="account-card1" class="w-full h-full">
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
