<script setup lang="ts">
const text = 'Why you can trust RoxyBrowser?'
const textVal = ref('')
const timerId = ref<ReturnType<typeof setTimeout> | null>(null)

const randomString = ['a', 'b', 'c', '3', '4', '5', '~', '%', '#', '*', '?']
const randomCount = 14
const MAX_TIME_MS = 80
const MIN_TIME_MS = 30
// 随机数
const randomText = () => {
    const len = randomString.length
    return randomString[Math.floor(Math.random() * len)]
}
const getRandomTextNum = (index: number) => {
    const process = index / text.length
    const count = Math.max(2, Math.floor((1 - process) * randomCount))
    let textVar = ''
    for (let i = 0; i < count; i++) {
        textVar += randomText()
    }
    return textVar
}
// 清除定时器
const clearTimeId = () => {
    if (timerId.value) {
        clearTimeout(timerId.value)
    }
}
// 获取动态定时时间
const getTimeMS = (index: number) => {
    const process = index / text.length
    return Math.max(MIN_TIME_MS, (1 - process) * MAX_TIME_MS)
}

// 打字机效果函数
const handleText = async () => {
    clearTimeId()
    textVal.value = ''

    let index = 0
    function tick2(index: number) {
        return new Promise((resolve) => {
            timerId.value = setTimeout(() => {
                timerId.value = null
                resolve(getRandomTextNum(index))
            }, 60);
        })
    }
    async function tick() {
        if (index >= text.length) {
            textVal.value = text
            clearTimeId()
            return
        }
        index++
        const count = Math.max(1, 5 - index)
        for (let i = 0; i < count; i++) {
            let randomText = await tick2(index)
            textVal.value = text.slice(0, index) + randomText
        }
        timerId.value = setTimeout(tick, getTimeMS(index))
    }
    for (let i = 0; i < 5; i++) {
        textVal.value = await tick2(index)
    }
    timerId.value = setTimeout(tick, 100)

}
const observer = ref<IntersectionObserver | null>(null)
const enterView = () => {
    observer.value?.disconnect()
    observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                clearTimeId()
                handleText()
            }
        })
    })
    observer.value?.observe(document.querySelector('.fingerprint-container ') as Element)
}

onMounted(() => {
    enterView()
})

onUnmounted(() => {
    clearTimeId()
})
</script>

<template>

    <div class="bg-[#050F1E] text-white min-h-100vh flex items-center ">
        <div
            class="flex flex-col w-full  xl:web-container  xl:justify-center xl:items-center xl:flex-row gap-10 px-4 lg:pl-15 fingerprint-container">
            <div class="md:w-[558px] md:h-[679px] w-[302px] h-[343px] mx-auto mt-5 xl:(mx-0 mt-0)">
                <!-- <img src="~/assets/images/home-page/fingerprint.png" alt="fingerprint" class="w-full h-full"> -->
                 <finger-canvas-demo />
            </div>
            <div class="flex flex-col items-center md:items-start">
                <h1 class="font-chivo-mono font-weight-400 text-center lg:text-left md:font-size-[24px]  font-size-[16px] flex  items-center">{{ textVal }}
                    <div class="cursor"></div>
                </h1>
                <p class="mt-3 font-weight-400  lg:text-left font-size-[20px] text-white/60">We protect your online data
                    through
                    multiple security measures.</p>
                <ul class="mt-10 w-full">
                    <li v-for="item in 3" :key="item" class="flex py-6 relative fingerprint-item">
                        <div class="mt-[5px] shrink-0 mr-3 mt-[5px]">
                            <img src="~/assets/images/home-page/Rectangle.png" alt="" class="h-[16px]">
                        </div>
                        <div
                            class="flex flex-col md:flex-row md:w-80% items-start xl:justify-between gap-5.5 relative first:pt-0  ">
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
                            <div class="w-[300px] md:w-[240px]  md:h-[120px] h-[150px] lg:px-0 shrink-0">
                                <img src="~/assets/images/home-page/Frame.png" alt="" class="w-full">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>

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
.fingerprint-item:last-child::after {
    display: none;
}
.cursor {
    margin-left: 6px;
    width: 4px;
    height: 26px;
    background-color: #fff;
    opacity: 0;
    animation: cursor-blink 1s steps(1) infinite;
}

@keyframes cursor-blink {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }
}
</style>