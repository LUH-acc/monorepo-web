<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    options: {
        type: Array as PropType<{value: string, label: string}[]>,
        default: () => [],
    },
})
const modelValue = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])
const handleClick = (value: string) => {
    modelValue.value = value
    emit('update:modelValue', value)
}
</script>

<template>
    <div>
        <ul class="flex gap-3">
            <li class="radio-item" :class="{ 'radio-item-active': modelValue === item.value }" v-for="item in options" :key="item.value" @click="handleClick(item.value)">
                <span class="radio-parent relative" :class="{ 'radio_parent_active': modelValue === item.value }" >
                    <span class="radio-dot absolute-center"></span>
                </span>
                <span class="radio-label"> {{ item.label }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.radio-item {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    min-width: 110px;
    background-color: #ffffff;
    padding: 12px 12px 12px 14px;
    border-radius: 5px;
    color: black;
}
.radio-item-active {
    border: 1px solid #12a3fc;
}

.radio_parent_active .radio-dot {
    background-color: #12a3fc;
}
.radio-parent {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #aaaaac;
  display: flex;
align-items: center;
  flex-shrink: 0;
  line-height: 0; /* 消除行高影响 */
  transition: border-color 0.3s ease;
}
.radio_parent_active {
    border:  solid #12a3fc;
}

.radio_parent_active .radio-dot {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: border-color 0.3s ease;
}
</style>