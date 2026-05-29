<script setup lang="ts">
/**
 * 全屏遮罩：Teleport 到 body + 淡入淡出。
 * v-model 控制显隐。
 */
const props = withDefaults(
    defineProps<{
        modelValue: boolean
        /**
         * true：只有点到遮罩空白（未点到 slot 内容）时关闭。
         * false：点在遮罩内任意位置（含 slot）都会关闭。
         */
        closeOnBackdropOnly?: boolean
        zIndex?: number
        to?: string
        /** 打开时禁止背后的页面滚动 */
        lockScroll?: boolean
    }>(),
    {
        closeOnBackdropOnly: true,
        zIndex: 200,
        to: 'body',
        lockScroll: true,
    },
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

let savedScrollY = 0
let bodyScrollLocked = false

function lockBodyScroll() {
    if (typeof document === 'undefined' || bodyScrollLocked) return
    savedScrollY = window.scrollY
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    bodyScrollLocked = true
}

function unlockBodyScroll() {
    if (typeof document === 'undefined' || !bodyScrollLocked) return
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.width = ''
    window.scrollTo(0, savedScrollY)
    bodyScrollLocked = false
}

watch(
    () => props.modelValue,
    (open) => {
        if (!props.lockScroll) return
        if (open) lockBodyScroll()
        else unlockBodyScroll()
    },
    { flush: 'sync' },
)

onUnmounted(() => {
    unlockBodyScroll()
})

function close() {
    emit('update:modelValue', false)
}

function onMaskClick(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement
    if (props.closeOnBackdropOnly && e.target !== el) return
    close()
}
</script>

<template>
    <Teleport :to="to">
        <Transition name="teleport-overlay-fade">
            <div
                v-if="modelValue"
                class="fixed inset-0 overflow-y-auto bg-white/30 p-2 backdrop-blur-sm"
                :style="{ zIndex: zIndex }"
                role="dialog"
                aria-modal="true"
                @click="onMaskClick"
            >
                <slot />
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
.teleport-overlay-fade-enter-active,
.teleport-overlay-fade-leave-active {
    transition: opacity 0.5s ease;
}

.teleport-overlay-fade-enter-from,
.teleport-overlay-fade-leave-to {
    opacity: 0;
}
</style>
