export default function() {
    const mouseData = ref({
        x: 0,
        y: 0,
    })
    onMounted(() => {
        window.addEventListener('mousemove', (event) => {
            console.log('mousemove',event);
            
            mouseData.value.x = event.clientX
            mouseData.value.y = event.clientY
        })
    })
    onUnmounted(() => {
        window.removeEventListener('mousemove', (event) => {
            mouseData.value.x = event.clientX
            mouseData.value.y = event.clientY
        })
    })
    return mouseData
}