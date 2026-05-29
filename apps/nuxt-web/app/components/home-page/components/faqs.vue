<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'
const faqsList = reactive([
    {
        question: 'Does RoxyBrowser offer a free trial?',
        answer: 'Yes. We offer a 7-day  free trial where you can create up to 10 profiles and experience all the features of our product. After the trial, available profiles and functions will be limited. You can upgrade your experience by subscribing. Click here to learn more about our Pricing Plan.',
    },
    {
        question: 'What is a Browser Fingerprint?',
        answer: 'Yes. We offer a 7-day  free trial where you can create up to 10 profiles and experience all the features of our product. After the trial, available profiles and functions will be limited. You can upgrade your experience by subscribing. Click here to learn more about our Pricing Plan.',
    },
    {
        question: 'How Does An Anti-Detect Browser Help?',
        answer: 'Yes. We offer a 7-day  free trial where you can create up to 10 profiles and experience all the features of our product. After the trial, available profiles and functions will be limited. You can upgrade your experience by subscribing. Click here to learn more about our Pricing Plan.',
    },
    {
        question: 'What can RoxyBrowser be used for?',
        answer: 'Yes. We offer a 7-day  free trial where you can create up to 10 profiles and experience all the features of our product. After the trial, available profiles and functions will be limited. You can upgrade your experience by subscribing. Click here to learn more about our Pricing Plan.',
    },
    {
        question: "Will my data be deleted if I don't renew my subscription in time?",
        answer: 'Yes. We offer a 7-day  free trial where you can create up to 10 profiles and experience all the features of our product. After the trial, available profiles and functions will be limited. You can upgrade your experience by subscribing. Click here to learn more about our Pricing Plan.',
    },
    {
        question: 'How to get started?',
        answer: 'Yes. We offer a 7-day  free trial where you can create up to 10 profiles and experience all the features of our product. After the trial, available profiles and functions will be limited. You can upgrade your experience by subscribing. Click here to learn more about our Pricing Plan.',
    },
])
const showAnswer = ref(false)
const showAnswerIndex = ref(0)
const handleClick = (index: number) => {
    showAnswer.value = !showAnswer.value
    showAnswerIndex.value = index
    // console.log(index)
}
</script>

<template>
    <div class="test-container text-black mx-auto  lg:(grid grid-cols-1 lg:grid-cols-2 gap-10) text-left mt-20">
        <div class="flex flex-col gap-10">
            <div class="flex flex-col gap-2 justify-center items-center lg:items-start">
                <h2 class="font-archivo font-weight-700 font-bold text-[24px] lg:text-[40px]">FAQs</h2>
                <p class="font-inter font-weight-400 text-[14px] lg:text-[18px]">Have questions? We've got help.</p>
            </div>
            <div class="hidden lg:flex flex-col gap-2 mt-9">
                <h2 class="font-archivo font-weight-500 text-[24px] lg:text-[36px]">Online Support Available</h2>
                <div class="flex gap-2">
                    <div class="flex flex-col items-center gap-2 py-6 px-12 bg-[#E2E9EE] rounded-2xl">
                        <img src="~/assets/images/home-page/Telegram.png" alt="phone" class="w-56px h-56px">
                        <p>Telegram</p>
                    </div>
                    <div class="flex flex-col items-center gap-2 py-6 px-12 bg-[#E2E9EE] rounded-2xl">
                        <img src="~/assets/images/home-page/Live-chat.png" alt="phone" class="w-56px h-56px">
                        <p>Live Chat</p>
                    </div>
                </div>
            </div>
        </div>
        <div >
            <ul class="px-5">
                <motion.li v-for="(item,index) in faqsList" :key="item.question" class="py-7 border-b border-[#C7D1D6]">
                    <h3 class="font-archivo font-weight-500 text-[18px] lg:text-[26px] cursor-pointer" @click="handleClick(index)">{{ item.question }}</h3>
                    <AnimatePresence>
                        <motion.div
                            v-if="showAnswerIndex === index && showAnswer"
                            :initial="{ height: 0, opacity: 0 }"
                            :animate="{ height: 'auto', opacity: 1 }"
                            :exit="{ height: 0, opacity: 0 }"
                            :transition="{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }"
                            style="overflow: hidden;"
                        >
                            <div class="py-6 font-inter font-weight-400 text-[16px] lg:text-[18px] text-[#34393D]">{{ item.answer }}</div>
                        </motion.div>
                    </AnimatePresence>
                </motion.li>
            </ul>
        </div>
        <div class="block lg:hidden mx-auto">
            <div class="flex flex-col gap-2 mt-9 justify-center items-center">
                <h2 class="font-archivo font-weight-500 text-[16px]">Online Support Available</h2>
                <div class="grid grid-cols-2 gap-3">
                    <div class=" w-169px h-88px flex flex-col items-center gap-2 py-6 px-12 bg-white rounded-2xl">
                        <img src="~/assets/images/home-page/Telegram.png" alt="phone" class="w-32px h-32px">
                        <p>Telegram</p>
                    </div>
                    <div class="w-169px h-88px flex flex-col items-center gap-2 py-6 px-12 bg-white rounded-2xl">
                        <img src="~/assets/images/home-page/Live-chat.png" alt="phone" class="w-32px h-32px">
                        <p>Live Chat</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>