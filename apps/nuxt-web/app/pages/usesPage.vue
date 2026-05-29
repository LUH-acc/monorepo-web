<script setup lang="ts">
import usespagebg from '~/assets/images/uses-page/uses-page-bg.png'
import usesCard from '~/components/uses-page/uses-card.vue'
import seo from '~/assets/images/uses-page/seo.png'

const cardList= reactive([
    {
        title: 'Unbiased SERP Analysis & Rank Tracking',
        description: 'Personalized SERPs distort rank tracking and keyword analysis',
        content: 'RoxyBrowser creates clean, isolated browser profiles with fresh IPs to reveal accurate, unfiltered search results from any target location.',
        image: seo,
    },
    {
        title: 'Unbiased SERP Analysis & Rank Tracking',
        description: 'Personalized SERPs distort rank tracking and keyword analysis',
        content: 'RoxyBrowser creates clean, isolated browser profiles with fresh IPs to reveal accurate, unfiltered search results from any target location.',
        image: seo,
    },
])
</script>

<template>
    <div class="bg-cover bg-center " :style="{ backgroundImage: `url(${usespagebg})` }">
        <div class="lg:px-10 xl:max-w-[1440px] mx-auto  pt-20">
            <div class="bg-[#11A3FD]/60 grid grid-cols-2 rounded-2xl p-10 text-left ">
                <div class="flex flex-col items-center justify-center">
                    <h2 class="font-archivo font-bold text-[24px] lg:text-[44px]">Master SEO Content Marketing and SERP
                        Analysis</h2>
                    <p class="font-weight-400 font-size-[16px] lg:font-size-[20px] mt-5">Avoid IP bans and biased SERPs.
                        RoxyBrowser gives SEO pros clean profiles, geo-flexibility, and stealth for scalable, accurate
                        analysis.</p>
                    <div class="bg-white/10 rounded-md py-3 px-4 mt-5">Download for macOS</div>
                </div>
                <div class="flex items-center justify-center relative top-10 right--10 ">
                    <img src="~/assets/images/uses-page/uses-console.png" alt="uses-page-icon">
                </div>
            </div>
        </div>
        <div class="lg:px-10 xl:max-w-[1280px] mx-auto">
            <div class="xl:max-w-[1064px] mx-auto mt-20">
                <h3 class="text-h3 text-black">How RoxyBrowser Empowers SEO Content Marketing</h3>
                <p class="text-p mt-2">It's important for SEO specialists to analyze results, manage accounts, and scrape data without blocks or false info. RoxyBrowser lets SEO pros act as users worldwide all from one dashboard.</p>
            </div>

            <div class="mt-20">
                <usesCard v-for="cardItem in cardList" :key="cardItem.title" :cardItem="cardItem" />
            </div>
        </div>
    </div>
</template>