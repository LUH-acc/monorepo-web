export default function useWindowSize() {
    const windowWidth = ref(0)
    const windowHeight = ref(0)

    const useResize = (fun: () => void) => {
        window.addEventListener('resize', fun, { passive: true })
    }
    const removeResize = (fun: () => void) => {
        window.removeEventListener('resize', fun)
    }

    const updateWindowSize = () => {
        if (window) {
            windowWidth.value = window.innerWidth
            windowHeight.value = window.innerHeight
        }
    }
    onMounted(() => {
        updateWindowSize()
        useResize(updateWindowSize)
    })
    onUnmounted(() => {
        removeResize(updateWindowSize)
    })
    return {
        windowWidth,
        windowHeight,
    }
}