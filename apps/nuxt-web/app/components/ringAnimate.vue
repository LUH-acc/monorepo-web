<script setup lang="ts">
const R = 300
const count = 14
const MIN_SIZE = 65
const MAX_SIZE = 100
const timeId = ref<NodeJS.Timeout | null>(null)
const rotation = ref(0)
const RING_ANGLE = 360

const textList = [
    'Syncing Linear issues',
    'Connected Vercel account',
    'Connected GitHub account',
    'Syncing AWS resources',
    'Connected Slack workspace',
]
const currentIndex = ref(0)
const currentText = computed(() => (textList[currentIndex.value] ?? '').split(''))

const getAngle = () => {
    return RING_ANGLE / count
}

const getOpacity = (x: number, y: number) => {
    if (y >= 0 && x > 150) {
        if (y > 100) {
            return 0.6
        }
        return 1
    } else if (y < 0 && x > -290) {
        if (x >= 0) {
            return 1
        }
        return 0.6
    } else {
        return 0
    }
}

const getPosition = (index: number) => {
    // 获取固定角度
    const angle = getAngle()
    // 获取移动后的角度
    const moveAngle = (angle * index - rotation.value) % 360
    // 获取对边
    const y = R * Math.sin((moveAngle) * Math.PI / 180)   // 随着旋转角度变化，y慢慢增加
    const x = R * Math.cos((moveAngle) * Math.PI / 180)  // 随着旋转角度变化，x慢慢减小
    const size = Math.max(MIN_SIZE, (x / R) * MAX_SIZE)
    const translateX = Math.ceil(x - size / 2)
    const translateY = Math.ceil(y - size / 2)
    const opacity = getOpacity(translateX, translateY)
    return {
        translateX,
        translateY,
        size: size,
        opacity: opacity,
    }
}

const getItemStyle = (index: number) => {
    const s = getPosition(index)
    return {
        transform: `translate(${s.translateX}px, ${s.translateY}px)`,
        width: s.size + 'px',
        height: s.size + 'px',
        opacity: s.opacity,
    }
}

const handleRun = () => {
    const ratationAngle = RING_ANGLE / count
    // rotation.value = (rotation.value + ratationAngle) % 360
    // currentIndex.value = (currentIndex.value + 1) % textList.length
    timeId.value = setTimeout(() => {
        handleRun()
    }, 1500)
}
onMounted(() => {
    handleRun()
})

onUnmounted(() => {
    if (timeId.value) {
        clearTimeout(timeId.value)
    }
})
</script>
<template>
    <div class="relative  mt-90 h-screen">
        <div class="mt-40 w-600px ml-20% relative">

            <div class="flex flex-col text-left gap-4 p-10">
                <div class="text-18px">Intergrations</div>
                <div class="text-42px font-600">Connect your stack</div>
                <div class="text-18px">
                    Monitoring,code,observability,cloud,CI/CD systems, messageing,and even homegrown tooling.
                </div>
                <div class="mt-2">
                    <!-- #2d405c  -->
                    <button
                        class="bg-[linear-gradient(to_bottom,#2d405c_0%,#03112e_50%,#2d405c_100%)] text-white px-6 py-2 rounded-full">Get
                        started</button>
                </div>
                <div
                    class="mt-10 border-1 w-270px border-[#ccc] px-4 py-2 rounded-full flex justify-center items-center gap-10 h-10 overflow-hidden">
                    <Transition name="text-fade" mode="out-in">
                        <div :key="currentIndex">
                            <span v-for="(value, index) in currentText" :key="`${currentIndex}-${value}-${index}`" class="text-animate" :style="{
                                animationDelay: `${index * 35}ms`
                            }">
                                {{ value === ' ' ? '\u00A0' : value }}
                            </span>
                        </div>
                    </Transition>
                </div>
            </div>

            <div class="absolute top-50% left-85% -translate-y-[340px] -translate-x-[300px] w-600px h-600px">
                <ul class=" relative w-full h-full ring-animate-list z-10">
                    <li v-for="value in count" :key="value" class="ring-animate-item rounded-full bg-blue-500 "
                        :style="getItemStyle(value)">
                        {{ value }}
                    </li>
                </ul>
                <div
                    class="absolute top-50% left-100% -translate-y-1/2 -translate-x-[180px] w-100px h-100px rounded-full bg-blue-500 z-10">
                </div>
                <div
                    class="w-101px h-101px top-50% left-100% -translate-y-1/2 -translate-x-[180px] rounded-full ring-bg-item">
                </div>
                <div
                    class="absolute top-50% left-100% -translate-y-1/2 -translate-x-[190px] w-260px h-120px rounded-full border-1 border-[#ccc]">
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.ring-animate-list {
    transform-origin: center center;
}

.ring-animate-item {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;

    /* top: 0;
    left: 0; */
    transition: all 0.5s ease;

}

.ring-bg-item {
    position: absolute;
    background: linear-gradient(to top, #000000, #ffffff);
}

.text-animate {
    display: inline-block;
    opacity: 0;
    transform: translateY(10px);
    animation: textAnimate 0.45s ease forwards;
}

.text-fade-enter-active,
.text-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.text-fade-enter-from {
    opacity: 0;
    transform: translateY(10px);
}
.text-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

@keyframes textAnimate {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>