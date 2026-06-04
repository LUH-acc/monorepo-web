<script setup lang="ts">
import { cn } from '~/utils/cn'
const selectRef = ref<HTMLElement | null>(null)
const selectPosition = ref({
    top: 0,
    left: 0,
    width: 0,
})

const props = withDefaults(defineProps<{
    width?: string
    modelValue: string
    options: { value: string, label: string }[]
}>(), {
    modelValue: 'select',
    options: () => [],
})
const modelValue = ref(props.modelValue)
const emit = defineEmits(['update:modelValue', 'change'])
const showDropdown = ref(false)

const handleShowDropdown = () => {
    showDropdown.value = !showDropdown.value
}
const handleSelect = (value: string) => {
    modelValue.value = value
    emit('update:modelValue', value)
    emit('change', value)
    showDropdown.value = false
}
const getSelectPosition = () => {
    if (selectRef.value) {
        const { top, left, width, height } = selectRef.value.getBoundingClientRect()
        selectPosition.value = {
            top: top + height + 4,
            left: left,
            width: width,
        }
    }
}
const scrollHandler = () => {
    window.addEventListener('scroll', getSelectPosition, true)
}
onMounted(() => {
    getSelectPosition()
    scrollHandler()
})
onUnmounted(() => {
    window.removeEventListener('scroll', getSelectPosition, true)
})
</script>
<template>
    <div class="w-full bg-white relative rounded-md" ref="selectRef">
        <div class="flex items-center justify-between cursor-pointer py-3 px-4 rounded-md" @click="handleShowDropdown">
            <div>{{ modelValue }}</div>
            <div>
                <!-- <Icon name="mdi:chevron-down" /> -->
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="black" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </div>

        <div v-if="showDropdown"
            class="fixed z-[9999] top-2 left-0 w-full bg-white border-1 border-[#E5E7EB] rounded-md" :style="{
                top: selectPosition.top + 'px',
                left: selectPosition.left + 'px',
                width: selectPosition.width + 'px',
            }">
            <div class="max-h-[260px] overflow-y-auto py-2 bg-white scrollbar-thin rounded-md">
                <ul class="">
                    <li :class="cn('py-4 px-4 mx-1 mt-1 cursor-pointer rounded-md font-weight-400 font-size-[14px] hover:bg-gray-100', { 'bg-gray-100': modelValue === item.value })"
                        v-for="item in options" :key="item.value" @click="handleSelect(item.value)">
                        {{ item.label }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>