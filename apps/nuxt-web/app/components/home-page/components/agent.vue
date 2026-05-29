<script setup lang="ts">
import VideoComp from './videoComp.vue'
const textStr = 'One Command. All Agents at Work.'
const text = ref('')

/** 首字最慢、越打越快：间隔 ms，随进度从 MAX 降到 MIN */
const MAX_DELAY_MS = 100
const MIN_DELAY_MS = 24

let timerId: ReturnType<typeof setTimeout> | null = null

function clearTypewriter() {
    if (timerId !== null) {
        clearTimeout(timerId)
        timerId = null
    }
}

function delayForIndex(charIndex: number) {
    const progress = charIndex / textStr.length
    return Math.max(MIN_DELAY_MS, (1 - progress) * MAX_DELAY_MS)
}

function changeText() {
    clearTypewriter()
    text.value = ''
    let index = 0

    const tick = () => {
        if (index >= textStr.length) {
            clearTypewriter()
            return
        }
        index++
        text.value = textStr.slice(0, index)
        timerId = setTimeout(tick, delayForIndex(index))
    }

    timerId = setTimeout(tick, delayForIndex(0))
}

onMounted(() => {
    changeText()
})

onUnmounted(() => {
    clearTypewriter()
})
</script>

<template>
    <div class="relative px-4 pb-15">
        <div class="relative z-10">
            <div class="pt-[154px] mx-auto">
                <h2 class="font-size-[24px] font-archivo font-bold md:text-[48px] text-white">Roxy AI Agent
                    <br>
                    <span>{{ text }}</span>
                </h2>
                <div class="mt-3 font-weight-400 text-white ">Description: Assign tasks through natural-language AI
                    conversations and automate multiple browsers in batch.</div>
                <button class="mt-5 rounded-full px-6 py-2.5 border-1 bg-white/10 text-white">Comming Soon</button>
            </div>
        </div>
        <div class="w-full h-full mx-auto absolute z-0 top-0 left-0 right-0 ">
            <img src="~/assets/images/home-page/top-bg.png" alt="top-bg" class="w-full h-full">
        </div>

        <!-- 视频组件 -->
        <div>
            <VideoComp />
        </div>
    </div>
</template>