<script setup lang="ts">
const { cardItem } = defineProps({
    cardItem: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="bg-white rounded-2xl text-black grid grid-cols-2 gap-10 text-left mt-12">
        <div class="p-10 pr-0">
            <h3 class="text-h3">{{ cardItem.title }}</h3>
            <p class="text-p mt-5">{{ cardItem.description }}</p>
            <p class="text-p mt-10">{{ cardItem.content }}</p>
        </div>
        <div>
            <img :src="cardItem.image" alt="uses-card-1">
        </div>
    </div>
</template>