<script setup lang="ts">
</script>

<template>
    <div class="text-black mx-auto test-container">
        <h2 class="font-archivo mt-20 text-[24px] font-bold lg:text-[48px]">All-in-One Account Management</h2>
        <div class="font-weight-400 mt-2 w-full text-[#042144]">
            Keep up with RoxyBrowser's latest research and exclusive insights on secure multi-account management
        </div>
        <div class="mt-10 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
            <div
                v-for="(company, i) in companys"
                :key="company.name"
                class="flex h-[50px] w-full items-center justify-center rounded-2xl bg-white lg:h-[124px]"
                :class="{ 'max-md:hidden': i >= companys.length - 2 }"
            >
                {{ company.name }}
            </div>
        </div>
    </div>
</template>
