<script setup lang="ts">
const props = defineProps({
    options: {
        type: Array as PropType<{value: string, label: string}[]>,
        default: () => [],
    },
    'modelValue': {
        type: String,
        default: 'english',
    },
    style: {
        type: Object,
        default: () => ({}),
        required: false,
    },
})
const emit = defineEmits(['update:modelValue','change'])
const selectCompRef = ref<HTMLElement | null>(null)
const dropdownShow = ref(false)
const dropdownPosition = ref({
    top: 0,
    left: 0,
    width: 0,
})
const selectedLang = ref(props['modelValue'])
const getDropdownPosition = () => {
    if (selectCompRef.value) {
        const { top, left, width } = selectCompRef.value.getBoundingClientRect()
        dropdownPosition.value = {
            top: top - 4,
            left: left,
            width: width,
        }
    }
}
const handleScoll = () => {
    window.addEventListener('scroll', getDropdownPosition,true)
}
const handleShowDropdown = () => {
    dropdownShow.value = !dropdownShow.value
}

const selectLang = (value: string) => {
    selectedLang.value = value
    emit('update:modelValue', value)
    emit('change', value)
    dropdownShow.value = false
}
onMounted(() => {
    getDropdownPosition()
    handleScoll()
})
onUnmounted(() => {
    window.removeEventListener('scroll', getDropdownPosition,true)
})
</script>

<template>
    <div class="w-[220px] py-1.5 px-2.5 rounded-md bg-white/10" ref="selectCompRef">
        <div class="flex items-center justify-between gap-2 cursor-pointer" @click="handleShowDropdown">
            <div class="font-weight-400 font-size-[14px]">{{ selectedLang }}</div>
            <div>
                <!-- <Icon name="mdi:chevron-down" /> -->
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="white" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </div>

        <div v-if="dropdownShow" class="fixed z-[9999] bg-[#5d5b6b] rounded-md max-h-[200px] overflow-y-auto scrollbar-lang" :style="{
            top: dropdownPosition.top + 'px',
            left: dropdownPosition.left + 'px',
            width: dropdownPosition.width + 'px',
            transform: 'translateY(-100%)',
            ...props.style,
        }"
        >
            <ul class="flex flex-col gap-0.5">
                <li class="py-2 px-3 rounded-md hover:bg-white/10 font-weight-400 font-size-[14px] cursor-pointer"
                :class="{ 'bg-white/10': selectedLang === option.value }"
                 @click="selectLang(option.value)"
                    v-for="option in options" :key="option.value">{{ option.value }}</li>
            </ul>
        </div>
    </div>
</template>
<style scoped lang="scss">
</style>