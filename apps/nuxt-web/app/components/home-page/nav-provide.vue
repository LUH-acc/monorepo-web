<script setup lang="ts">
/** 与 CSS padding 一致：左右留白，避免贴边 */
const VIEW_MARGIN = 16
const PANEL_MAX_WIDTH = 800
const GAP_BELOW_TRIGGER = 8

const navList = ref([
    {
        title: 'SEO',
        description: 'Optimize SEO campaigns with secure multi-account browsing',
    },
    {
        title: 'Advertising',
        description: 'Manage paid ads safely with isolated browser profiles',
    },
    {
        title: 'Social Marketing',
        description: 'Run multiple social accounts without detection risks',
    },
    {
        title: 'Affiliate Marketing',
        description: 'Boost affiliate campaigns using undetectable browser profiles',
    },
    {
        title: 'Web Scraping',
        description: 'Operate ecommerce stores safely with unique browser identities',
    },
    {
        title: 'Affiliate Marketing',
        description: 'Scrape web data efficiently while avoiding IP blocks',
    },
    {
        title: 'Crypto Trading',
        description: 'Trade cryptocurrencies securely across multiple exchange accounts',
    },
])

const showNavProvide = ref(false)
const anchorRef = ref<HTMLElement | null>(null)
const panelStyle = reactive({
    left: '0px',
    top: '0px',
    width: `${PANEL_MAX_WIDTH}px`,
})

function clampPanelToViewport() {
    if (typeof window === 'undefined') return

    const anchor = anchorRef.value
    if (!anchor) return

    const vw = window.innerWidth
    const vh = window.innerHeight
    const usable = Math.max(0, vw - VIEW_MARGIN * 2)
    const panelWidth = Math.min(PANEL_MAX_WIDTH, usable)

    const a = anchor.getBoundingClientRect()
    // 以触发器中心对齐，再夹紧到视口内
    let left = a.left + a.width / 2 - panelWidth / 2
    left = Math.max(VIEW_MARGIN, Math.min(left, vw - VIEW_MARGIN - panelWidth))

    let top = a.bottom + GAP_BELOW_TRIGGER
    // 纵向：若下方空间不足，尽量上移（仍可能需滚动页面，只做简单兜底）
    const estHeight = Math.min(640, vh * 0.85)
    if (top + estHeight > vh - VIEW_MARGIN) {
        top = Math.max(VIEW_MARGIN, vh - VIEW_MARGIN - estHeight)
    }

    panelStyle.left = `${left}px`
    panelStyle.top = `${top}px`
    panelStyle.width = `${panelWidth}px`
}

function handleMouseEnter() {
    showNavProvide.value = true
}

function handleMouseLeave() {
    showNavProvide.value = false
}

let stopScroll: (() => void) | undefined
let stopResize: (() => void) | undefined

watch(showNavProvide, async (open) => {
    stopScroll?.()
    stopResize?.()
    stopScroll = undefined
    stopResize = undefined

    if (!open) return

    await nextTick()
    clampPanelToViewport()

    if (typeof window === 'undefined') return

    const onUpdate = () => clampPanelToViewport()
    window.addEventListener('scroll', onUpdate, true)
    window.addEventListener('resize', onUpdate)
    stopScroll = () => window.removeEventListener('scroll', onUpdate, true)
    stopResize = () => window.removeEventListener('resize', onUpdate)
})

onUnmounted(() => {
    stopScroll?.()
    stopResize?.()
})
</script>

<template>
    <!-- 整颗触发器宽度：供 getBoundingClientRect 计算居中与边界 -->
    <div ref="anchorRef" class="relative inline-block max-w-full align-middle">
        <div
        class="w-full"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
        >
            <slot name="reference" />

            <!-- fixed：不受父级 overflow 裁剪，且便于按视口夹紧 left -->
            <div
                v-if="showNavProvide"
                class="nav-provide__panel pointer-events-auto fixed z-[200] pt-2"
                :style="panelStyle"
            >
                <div
                    class="max-h-[min(85vh,640px)] overflow-y-auto rounded-2xl border-8 border-gray-200 bg-white p-4 text-left text-black"
                >
                    <div class="grid grid-cols-3 gap-4">
                        <div class="col-span-2">
                            <div class="border-b border-gray-200 p-4">
                                use cases
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div
                                    v-for="item in navList"
                                    :key="item.title"
                                    class="px-3 py-2"
                                >
                                    <div class="font-size-[13px] font-weight-500">
                                        {{ item.title }}
                                    </div>
                                    <div class="font-size-[12px] font-weight-400 text-[#575D60]">
                                        {{ item.description }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-1">
                            <div class="border-b border-gray-200 p-4">
                                blog
                            </div>
                            <div class="mt-4 flex flex-col items-center">
                                <div class="h-30 w-50">
                                    <img src="~/assets/images/home-page/nav-banner.png" alt="blog1" class="wh-full">
                                </div>
                                <div class="p-5">
                                    <h3 class="font-size-[13px] font-weight-600 leading-[1.5]">
                                        5 种方法绕开 YouTube 限制，随时随地在油管刷视频！
                                    </h3>
                                    <p class="mt-2 font-size-[12px] font-weight-400 text-[#575D60]">
                                        无论是学校、公司还是某些地区特意设置的“访问限制”，都有办法解决，让你可以不受限制地浏览油管视频。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
