<script setup lang="ts">
import { useScroll, useMotionValueEvent, motion } from "motion-v"
import { cn } from "~/utils/cn"
import BrowserScanLines from "./browser-scan-lines.vue"
const platforms = ['AliExpress', 'Amazon', 'eBay', 'Facebook', 'Esty', 'Amazon'] as const
const platforms2 = ['AliExpress2', 'Amazon2', 'eBay2', 'Facebook2', 'Esty2', 'Amazon2'] as const

const browserRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const { scrollYProgress } = useScroll()
const style = reactive({
    deg: 35
})

/** 单颗星星的状态 */
interface Star {
    x: number
    y: number
    radius: number
    alpha: number
    /** 向上移动速度（px / frame） */
    speed: number
}

let stars: Star[] = []
let starRafId = 0
let starAnimationActive = false
let canvasW = 0
let canvasH = 0

/** 初始化星星位置（只执行一次，避免每帧 random 导致闪烁） */
function initStars(width: number, height: number, count = 120) {
    stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.1 + 0.2,
        alpha: 1,
        speed: Math.random() * 0.12 + 0.04,
    }))
}

/** 更新位置并绘制：超出顶部后从底部重新进入 */
function renderStars(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.clearRect(0, 0, width, height)

    for (const star of stars) {
        star.y -= star.speed
        if (star.y < -star.radius) {
            star.y = height + star.radius
            star.x = Math.random() * width
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
        ctx.fill()
    }
}

function animateStars() {
    if (!starAnimationActive) return

    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    renderStars(ctx, canvasW, canvasH)
    starRafId = requestAnimationFrame(animateStars)
}

const createCanvas = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    // ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    canvasW = rect.width
    canvasH = rect.height

    initStars(canvasW, canvasH, 120)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
        renderStars(ctx, canvasW, canvasH)
        return
    }

    starAnimationActive = true
    starRafId = requestAnimationFrame(animateStars)
}

onMounted(() => {
    createCanvas()
    useMotionValueEvent(scrollYProgress, "change", () => {
        const el = browserRef.value
        if (!el)
            return
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const flipRange = vh * 0.95
        // 通过元素相对于视口的位置，计算出元素的翻转角度 top越小，翻转角度越大
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / flipRange))
        style.deg = 35 * (1 - progress)
    })
})

const platformScrollerEl = ref<HTMLElement | null>(null)
let rafId = 0
let marqueeActive = true

let timeId = 0
const animationShow = ref(true)
/** px / frame（约 60fps 时约 33px/s） */
const SCROLL_SPEED = 0.55

/** 左/右侧共 5 层扫描线：竖向按 1/6～5/6 均分，倾角居中对称递减 */
const SCAN_LINE_LAYER_STYLES = [
    { top: "top-[16.667%]", rotate: "rotate-[2deg]" },
    { top: "top-[33.333%]", rotate: "rotate-[1deg]" },
    { top: "top-1/2", rotate: "rotate-0" },
    { top: "top-[66.667%]", rotate: "-rotate-[1deg]" },
    { top: "top-[83.333%]", rotate: "-rotate-[2deg]" },
] as const

function scanLineLayerClass(side: "left" | "right", layer: (typeof SCAN_LINE_LAYER_STYLES)[number]) {
    return cn("absolute", side === "left" ? "left-0" : "right-0", layer.top, layer.rotate)
}

function tick() {
    if (!marqueeActive) return

    const el = platformScrollerEl.value
    if (!el) {
        rafId = requestAnimationFrame(tick)
        return
    }

    const { scrollWidth, clientWidth, scrollLeft } = el
    if (scrollWidth <= clientWidth + 1) {
        rafId = requestAnimationFrame(tick)
        return
    }

    const half = scrollWidth / 2
    let next = scrollLeft + SCROLL_SPEED
    if (next >= half) next -= half
    el.scrollLeft = next

    rafId = requestAnimationFrame(tick)
}

onMounted(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    marqueeActive = true
    rafId = requestAnimationFrame(tick)
    timeId = setInterval(() => {
        if (animationShow.value) {
            animationShow.value = false
        } else {
            animationShow.value = true
        }
    }, 2000)
})

onUnmounted(() => {
    marqueeActive = false
    starAnimationActive = false
    cancelAnimationFrame(rafId)
    cancelAnimationFrame(starRafId)
    clearInterval(timeId)
})
</script>

<template>
    <div class="relative py-15 h-full overflow-hidden text-white bg-gradient-to-b from-[#042144] to-[#726a6d]">
        <div class="w-full mx-auto absolute z-0 top-0 left-0 right-0 h-full">
            <canvas ref="canvasRef" class="w-full h-[300px]" id="canvas">

            </canvas>
            <!-- <img src="~/assets/images/home-page/browser-bg.png" alt="browser-bg" class="w-full h-full"> -->
        </div>
        <div class="relative z-10 mx-auto test-container px-4">
            <div class="xs:w-[300px] md:w-[424px] mx-auto">
                <img src="~/assets/images/home-page/Reviews.png" alt="browser-icon" class="w-full">
            </div>
            <h2
                class="font-family-archivo-bold lg:font-size-[48px] font-size-[32px] mx-auto leading-[1.5] whitespace-pre-line">
                Premier Antidetect Browser <br>
                <div class="flex justify-center items-center gap-2">
                    <div class="Streamline ">
                        <span class=" relative ">Streamline
                            <svg class="position-x-center absolute -bottom-2" width="100%"
                                xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 518 15" fill="none">
                                <path class="path animate"
                                    d="M2 12.5C2 12.5 131.5 2.5 259 2.5C386.5 2.5 516 12.5 516 12.5"
                                    stroke="url(#paint0_linear_19351_59773)" stroke-width="6" stroke-linecap="round">
                                </path>
                                <defs>
                                    <linearGradient id="paint0_linear_19351_59773" x1="2" y1="2" x2="288.048"
                                        y2="30.9544" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.3" stop-color="#EAA0F7"></stop>
                                        <stop offset="0.9" stop-color="#3193FF"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>

                        <!-- <svg class="Streamline-arc" viewBox="0 0 300 8" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="streamline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#F9B3B4" />
                                    <stop offset="100%" stop-color="#38bdf8" />
                                </linearGradient>
                            </defs>
                            <path d="M0,4 Q100,0 300,4" stroke="url(#streamline-grad)" stroke-width="3" fill="none"
                                stroke-linecap="round" />
                        </svg> -->

                        <span>Your Workflow Effortlessly</span>
                    </div>

                </div>
            </h2>

            <div class="flex gap-2 justify-center mt-6">
                <motion.button :initial="{ backgroundImage: 'linear-gradient(120deg, #238AFF 70%, #F9B3B4 100%)' }"
                    :whileHover="{ backgroundImage: 'linear-gradient(120deg, #238AFF 20%, #F9B3B4 100%)' }"
                    :transition="{ duration: 0.3, ease: 'easeInOut' }" class="rounded-[8px] font-500 py-3 px-6 ">
                    Try it Free
                </motion.button>
                <button class="hidden lg:block w-[148px] h-[48px]  rounded-[8px] py-3 px-6 bg-white/10 text-white">
                    Contact us
                </button>
            </div>

            <div class="text-center md:font-size-[20px] font-size-[16px] font-weight-400 text-white/60 mt-6">
                Elevate your web journey with RoxyBrowser: Light, Secure, Limitless
            </div>

            <div class="mt-16 relative perspective-wrapper" ref="browserRef">
                <!-- <ul class="w-full h-full">
                    <li
                        v-for="(layer, i) in SCAN_LINE_LAYER_STYLES"
                        :key="`scan-left-${i}`"
                        :class="scanLineLayerClass('left', layer)"
                    >
                        <BrowserScanLines />
                    </li>
                </ul>
                <ul class="w-full h-full absolute left-0">
                    <li
                        v-for="(layer, i) in SCAN_LINE_LAYER_STYLES"
                        :key="`scan-right-${i}`"
                        :class="scanLineLayerClass('right', layer)"
                    >
                        <BrowserScanLines />
                    </li>
                </ul> -->
                <div class="hidden lg:block">
                    <BrowserScanLines />
                </div>
                <div
                    class=" z-1 w-full pb-3 lg:pb-0 flex justify-center items-center absolute left-1/2 top-[-3px]  -translate-x-1/2 -translate-y-1/2  gap-4 font-size-4 ">
                    <div class="flex justify-center items-center flex-wrap gap-[4px_20px] lg:flex-nowrap wrap lg:gap-6 py-1 pl-3 pr-4 rounded-full lg:bg-[linear-gradient(90deg,#3B84FA_0%,#7B75F0_50%,#FF846B_100%)]">
                        <p class="text-white leading-24px font-size-4 whitespace-nowrap">20% OFF First Purchase</p>
                        <p class="text-white leading-24px font-size-4 whitespace-nowrap">Free Proxy IPs</p>
                        <p class="text-white leading-24px font-size-4 whitespace-nowrap">No Payment Fees</p>
                    </div>


                </div>
                <div class="w-full pt-5 lg:pt-0" :style="{ transform: `rotate3d(1, 0, 0, ${style.deg}deg) translateZ(0)` }">
                    <div class="xs:px-4  mx-auto w-full aspect-[63/43]">
                        <img src="~/assets/images/home-page/display.png" alt="browser-icon" class="w-full object-cover">
                    </div>
                </div>
            </div>

            <div class="mt-11">
                <div class="font-weight-400 mb-4.5 ">We protect every platform you use:</div>
                <!-- <div ref="platformScrollerEl"
                    class="platform-marquee -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0 flex lg:hidden">
                    <ul class="flex flex-nowrap justify-center gap-6 md:mx-auto wh-full">
                        <template v-for="dep in 2" :key="dep">
                            <li v-for="(name, i) in platforms" :key="`${dep}-${i}`"
                                class="shrink-0 whitespace-nowrap w-144px h-15 border-1 border-white/10 rounded-2xl flex items-center justify-center">
                                {{ name }}
                            </li>
                        </template>
                    </ul>
                </div> -->
                <div class="flex gap-30px lg:hidden">
                    <div class="flex flex-nowrap gap-30px animateTest" v-for="dep in 4" :key="dep">
                        <ul class="flex flex-nowrap gap-30px">
                            <li v-for="(name, i) in platforms" :key="`${dep}-${i}`" class="whitespace-nowrap w-144px h-15 border-1 border-white/10 rounded-2xl flex items-center justify-center">
                                {{ name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="relative px-4 md:mx-0 md:px-0 hidden lg:block">
                    <ul class=" w-full h-full flex flex-nowrap justify-center gap-6 md:mx-auto wh-full">
                        <motion.li v-for="(name, i) in platforms" :key="i"
                            class="shrink-0 whitespace-nowrap w-144px h-15 border-1 border-white/10 rounded-2xl flex items-center justify-center"
                            :initial="{ opacity: 0, scale: 0 }"
                            :animate="{ opacity: animationShow ? 1 : 0, scale: animationShow ? 1 : 0 }"
                            :transition="{ duration: 0.3 }">
                            {{ name }}
                        </motion.li>
                    </ul>
                    <ul
                        class="absolute left-0 top-0  w-full h-full flex flex-nowrap justify-center gap-6 md:mx-auto wh-full">
                        <motion.li v-for="(name, i) in platforms2" :key="i"
                            class="shrink-0 whitespace-nowrap w-144px h-15 border-1 border-white/10 rounded-2xl flex items-center justify-center"
                            :initial="{ opacity: 0, scale: 0 }"
                            :animate="{ opacity: animationShow ? 0 : 1, scale: animationShow ? 0 : 1 }"
                            :transition="{ duration: 0.3 }">
                            {{ name }}
                        </motion.li>
                    </ul>
                </div>
            </div>

            <div class="relative mt-41">
                <div class="w-full h-full">
                    <!-- <img src="~/assets/images/home-page/global-reach.png" alt="global-reach" class="w-full h-full"> -->
                    <!-- 客户端渲染，避免在服务端渲染时，globe组件报错 -->
                    <ClientOnly>
                        <!-- <globalComp /> -->
                    </ClientOnly>
                </div>
                <div class="relative z-10">
                    <h2 class="font-family-archivo-bold md:w-[720px] text-left whitespace-nowrap">Global Reach and
                        Reliability</h2>
                    <div
                        class="font-weight-500 text-white/60 xs:font-size-[18px] md:font-size-[20px] text-left md:w-[720px] mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis, eros at pharetra
                        rutrum, ante odio fringilla urna</div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-between flex-wrap mt-20">
                        <div class="flex flex-col mt-5">
                            <span class="text1-title">Hours served</span>
                            <span class="text1">2,348,394</span>
                        </div>
                        <div class="flex flex-col mt-5">
                            <span class="text1-title">Profiles protected</span>
                            <span class="text1">122,348,394</span>
                        </div>
                        <div class="flex flex-col mt-5">
                            <span class="text1-title">Latest visited</span>
                            <span class="text1">London,UK</span>
                        </div>
                    </div>

                    <div class="mt-20 md:mt-40 text-left font-weight-400 text-white/60 md:max-w-[983px]">
                        * Duis vestibulum lacinia magna, et dignissim odio semper ut. Maecenas ultricies tellus ac odio
                        dignissim euismod. Duis ut risus nisl. Class aptent taciti sociosqu ad litora torquent per
                        conubia nostra, per inceptos himenaeos.
                    </div>

                    <div class="relative md:w-full h-[300px] md:h-[120px] mx-auto mt-10 md:mt-32  mb-15">
                        <div class="absolute w-full h-full flex flex-col md:flex-row justify-between items-center p-10">
                            <div class="xs:font-size-[24px] xs:font-weight-700 text-left">Impressed? Download now and
                                experience
                                the interview
                                tool firsthand!</div>
                            <div
                                class="rounded-[8px] py-3.5 px-5 shrink-0 bg-white/10 text-white cursor-pointer hover:bg-white/30 transition-all duration-300">
                                Download for macOS</div>
                        </div>
                        <div class="md:w-full h-full  overflow-hidden rounded-2xl">
                            <img src="~/assets/images/home-page/download-bg.png" alt="download-mac"
                                class=" w-full h-full object-cover">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.Streamline {
    position: relative;
    display: inline-block;

    .Streamline-arc {
        position: absolute;
        left: 0;
        bottom: -4px;
        width: 100%;
        height: 8px;
    }
}

/* 自动横滑时隐藏滚动条，仍可用触控板/手指滑动 */
.platform-marquee {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.platform-marquee::-webkit-scrollbar {
    display: none;
}

.text1-title {
    font-weight: 700;
    text-align: left;
    font-size: 24px;
}

.text1 {
    font-weight: 700;
    text-align: left;
    font-size: 48px;
}

@media (max-width: 640px) {
    .text1-title {
        font-size: 18px;
    }

    .text1 {
        font-size: 36px;
    }
}

.perspective-wrapper {
    position: relative;
    z-index: 10;
    perspective: 5200px;
    transform-style: preserve-3d;
    isolation: isolate;
}

.bg-container {
    position: relative;
    z-index: 1;
    transform-origin: center bottom;
    transform-style: preserve-3d;
    backface-visibility: visible;
}

@keyframes liAnimation {
    0% {
        opacity: 0;
        transform: scale(0);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes li2Animation {
    0% {
        opacity: 1;
        transform: scale(1);

    }

    100% {
        opacity: 0;
        transform: scale(0);
    }
}

.liAnimation {
    animation: liAnimation 1.2s ease-in;
    transition: all 0.8s;
}

.li2Animation {
    animation: li2Animation 1.2s ease-out;
    transition: all 0.8s;
}

.position-x-center {
    left: 50%;
    transform: translateX(-50%);

}
.animateTest {
    animation: animateTest 30s linear infinite;
    animation-direction: normal;
}
@keyframes animateTest {
    from {
        transform: translateX(calc(-100% - 30px));
    }
    to {
        transform: translateX(0);
    }
}
</style>