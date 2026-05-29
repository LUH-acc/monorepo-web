<script setup lang="ts">
const appConfig = useAppConfig()
// console.log('appConfig',appConfig.testData)

const changeColor = () => {
    appConfig.testData.color = 'blue'
    // updateAppConfig({
    //    testData: {
    //     color: 'blue',
    //     width: 200,
    //    }
    // })
}

</script>

<template>
    <div @click="changeColor">change color</div>
    <div :style="{ color: appConfig.testData.color, width: appConfig.testData.width + 'px', height: appConfig.testData.height + 'px',border: '1px solid black' }">useAppConfig:{{ appConfig.foo }}</div>
</template>