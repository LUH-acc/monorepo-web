<script setup lang="ts">
import userImg from '~/assets/images/home-page/userImg.png'
const communityList = reactive([
    {
        name: 'Kate Bryant1',
        title: 'CEO, E-Commerce',
        imgUrl: userImg,
        description: 'pretium in mi in, dapibus elementum nunc. Suspendisse in turpis vitae enim imperdiet posuere aelementum enim imperdi',
    },
    {
        name: 'Kate Bryant2',
        title: 'CEO, E-Commerce',
        imgUrl: userImg,
        description: 'pretium in mi in, dapibus elementum nunc. Suspendisse in turpis vitae enim imperdiet posuere aelementum enim imperdi',
    },
    {
        name: 'Kate Bryant3',
        title: 'CEO, E-Commerce',
        imgUrl: userImg,
        description: 'pretium in mi in, dapibus elementum nunc. Suspendisse in turpis vitae enim imperdiet posuere aelementum enim imperdi',
    },
    {
        name: 'Kate Bryant4',
        title: 'CEO, E-Commerce',
        imgUrl: userImg,
        description: 'pretium in mi in, dapibus elementum nunc. Suspendisse in turpis vitae enim imperdiet posuere aelementum enim imperdi',
    },
    {
        name: 'Kate Bryant5',
        title: 'CEO, E-Commerce',
        imgUrl: userImg,
        description: 'pretium in mi in, dapibus elementum nunc. Suspendisse in turpis vitae enim imperdiet posuere aelementum enim imperdi',
    },
    {
        name: 'Kate Bryant6',
        title: 'CEO, E-Commerce',
        imgUrl: userImg,
        description: 'pretium in mi in, dapibus elementum nunc. Suspendisse in turpis vitae enim imperdiet posuere aelementum enim imperdi',
    },

])
const communityListRef = ref<HTMLElement | null>(null)
const communityListRef2 = ref<HTMLElement | null>(null)
const SPEED = 2
let rafId = 0
let rafId2 = 0

/** 双份列表的可滚动半宽；不够宽则无法无缝循环 */
function getScrollHalf(el: HTMLElement) {
    const { scrollWidth, clientWidth } = el
    if (scrollWidth <= clientWidth + 1) return null
    return scrollWidth / 2
}

/** forward 从 0 往右；reverse 从 half 往左，避免一上来就触发跳变 */
function initMarqueeScroll(el: HTMLElement | null, mode: 'forward' | 'reverse') {
    if (!el) return
    const half = getScrollHalf(el)
    if (half === null) return
    el.scrollLeft = mode === 'reverse' ? half : 0
}

const tick = () => {
    if (!communityListRef.value) {
        rafId = requestAnimationFrame(tick)
        return
    }
    const { scrollWidth, clientWidth, scrollLeft } = communityListRef.value
    if (scrollWidth <= clientWidth + 1) {
        rafId = requestAnimationFrame(tick)
        return
    }
    const half = scrollWidth / 2
    let next = scrollLeft + SPEED
    if (next >= half) next -= half
    communityListRef.value.scrollLeft = next
    rafId = requestAnimationFrame(tick)
}
const tick2 = () => {
    if (!communityListRef2.value) {
        rafId2 = requestAnimationFrame(tick2)
        return
    }
    const { scrollWidth, clientWidth, scrollLeft } = communityListRef2.value
    if (scrollWidth <= clientWidth + 1) {
        rafId2 = requestAnimationFrame(tick2)
        return
    }
    const half = scrollWidth / 2
    let next = scrollLeft - SPEED
    if (next <= 0) next += half
    communityListRef2.value.scrollLeft = next
    rafId2 = requestAnimationFrame(tick2)
}

function startMarquee() {
    rafId = requestAnimationFrame(tick)
    if (communityListRef2.value) {
        const { scrollWidth } = communityListRef2.value
        // communityListRef2.value.scrollLeft = scrollWidth / 2 || 0
    }
    rafId2 = requestAnimationFrame(tick2)
}

onMounted(() => {
    // startMarquee()
})
onUnmounted(() => {
    cancelAnimationFrame(rafId)
    cancelAnimationFrame(rafId2)
})
const handleMouseEnter = () => {
    // cancelAnimationFrame(rafId)
    // cancelAnimationFrame(rafId2)
}
const handleMouseLeave = () => {
    // initMarqueeScroll(communityListRef2.value, 'reverse')
    // rafId = requestAnimationFrame(tick)
    // rafId2 = requestAnimationFrame(tick2)
}
</script>

<template>
    <div >
        <div>
            <h2 class="mt-10 font-archivo font-weight-700 font-bold text-[24px] lg:text-[48px]">Trusted by Community
            </h2>
        </div>
        <!-- <div class="w-full overflow-hidden mt-10">
        <ul class="community-list overflow-x-auto text-left flex gap-4 " ref="communityListRef"
            @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <template v-for="dep in 2" :key="dep">
                <li v-for="item in communityList" :key="item.name + dep"
                    class="flex-shrink-0 w-[360px] flex flex-col gap-5 bg-white rounded-2xl px-5 py-6">
                    <div class="flex items-center gap-2">
                        <img :src="item.imgUrl" alt="user-img" class="w-44px h-44px rounded-full">
                        <div class="flex flex-col">
                            <p class="font-archivo font-weight-500 text-[16px]">{{ item.name }}</p>
                            <p class="font-inter font-weight-400 text-[12px]">{{ item.title }}</p>
                        </div>

                    </div>
                    <div class="flex flex-col gap-5">
                        <p class="font-inter font-weight-400 text-[16px] leading-[1.5]">{{ item.description }}</p>
                        <div class="font-weight-400 text-[14px] color-[#11A3FD]">
                            View more >
                        </div>
                    </div>
                </li>
            </template>
</ul>
</div> -->
        <Marquee :reverse="true">
            <ul class="flex text-left gap-4">
                <li v-for="item in communityList" :key="item.name"
                    class="flex-shrink-0 w-[360px] flex flex-col gap-5 bg-white rounded-2xl px-5 py-6 border-1 border-black/10">
                    <div class="flex items-center gap-2">
                        <img :src="item.imgUrl" alt="user-img" class="w-44px h-44px rounded-full">
                        <div class="flex flex-col">
                            <p class="font-archivo font-weight-500 text-[16px]">{{ item.name }}</p>
                            <p class="font-inter font-weight-400 text-[12px]">{{ item.title }}</p>
                        </div>

                    </div>
                    <div class="flex flex-col gap-5">
                        <p class="font-inter font-weight-400 text-[16px] leading-[1.5]">{{ item.description }}</p>
                        <div class="font-weight-400 text-[14px] color-[#11A3FD] cursor-pointer">
                            View more >
                        </div>
                    </div>
                </li>
            </ul>
        </Marquee>
        <Marquee>
            <ul class="flex text-left gap-4">
                <li v-for="item in communityList" :key="item.name"
                    class="flex-shrink-0 w-[360px] flex flex-col gap-5 bg-white rounded-2xl px-5 py-6  border-1 border-black/10">
                    <div class="flex items-center gap-2">
                        <img :src="item.imgUrl" alt="user-img" class="w-44px h-44px rounded-full">
                        <div class="flex flex-col">
                            <p class="font-archivo font-weight-500 text-[16px]">{{ item.name }}</p>
                            <p class="font-inter font-weight-400 text-[12px]">{{ item.title }}</p>
                        </div>

                    </div>
                    <div class="flex flex-col gap-5">
                        <p class="font-inter font-weight-400 text-[16px] leading-[1.5]">{{ item.description }}</p>
                        <div class="font-weight-400 text-[14px] color-[#11A3FD] cursor-pointer">
                            View more >
                        </div>
                    </div>
                </li>
            </ul>
        </Marquee>
    </div>
</template>

<style scoped lang="scss">
.community-list {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.community-list::-webkit-scrollbar {
    display: none;
}
</style>