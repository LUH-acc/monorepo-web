<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const FONT_SIZE = 14
/** 行高：略大于字号，避免基线间距过小导致上下行重叠、视觉大小不一致 */
const LINE_HEIGHT = FONT_SIZE * 1.4

function randomLowerAlphanumeric(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

// 获取文字宽度
function getTextWidth(ctx: CanvasRenderingContext2D, text: string): number {
    const metrics = ctx.measureText(text)
    return metrics.width
}
// 给文字渲染成固定颜色
function renderColorText(ctx: CanvasRenderingContext2D, text: string, x: number, baselineY: number, color: string) {
    ctx.fillStyle = color
    ctx.fillText(text, x, baselineY)
}

/** 用统一字体度量计算每行 top，避免 fillText 的 y 当顶边用 */
function getLineTop(ctx: CanvasRenderingContext2D, lineIndex: number) {
    return lineIndex * 20 || 20
}

const drawText = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // 等宽字体：每个字母/数字占位一致，避免 w/i 视觉宽窄不一
    ctx.font = `${FONT_SIZE}px ui-monospace, monospace`
    ctx.textBaseline = 'alphabetic'
    const count = Math.floor(rect.height / LINE_HEIGHT)
    for (let i = 1; i < count; i++) {
        tick(ctx, getLineTop(ctx, i), i)
    }
}

const tick = (ctx: CanvasRenderingContext2D, baselineY: number, lineIndex: number) => {
    const text = randomLowerAlphanumeric(70)
    if (lineIndex === 6) {
        const text1 = text.slice(0, 28)
        renderColorText(ctx, text1, 0, baselineY, '#000000')
        const text2 = '###'
        renderColorText(ctx, text2, getTextWidth(ctx, text1), baselineY, '#11A3FD')
        const text3 = text.slice(28 + text2.length, 70)
        renderColorText(ctx, text3, getTextWidth(ctx, text1 + text2), baselineY, '#000000')
    } else {

        ctx.fillStyle = '#000000'
        ctx.fillText(text, 0, baselineY)
    }

}

onMounted(() => {
    drawText()
})
</script>

<template>
    <div class="mt-20 ml-10 w-500px h-500px border-1">
        <canvas ref="canvasRef" id="fingerCanvas" class="w-full h-full"></canvas>
    </div>
</template>

<style scoped></style>