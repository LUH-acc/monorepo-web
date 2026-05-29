<script setup lang="ts">
import createGlobe from 'cobe'
import { onMounted } from 'vue'
const el = ref<HTMLCanvasElement | null>(null)
const phi = ref(0);
const markers = [
    { id: 'sf', location: [37.78, -122.44], label: 'San Francisco', color: '#ff6633' },
    { id: 'tokyo', location: [35.68, 139.65], label: 'Tokyo', color: '#ff6633' },
    { id: 'nyc', location: [40.71, -74.01], label: 'New York', color: '#ff6633' },
    { id: 'london', location: [51.50, -0.12], label: 'London', color: '#ff6633' },
    { id: 'paris', location: [48.86, 2.35], label: 'Paris', color: '#ff6633' },
    { id: 'berlin', location: [52.52, 13.41], label: 'Berlin', color: '#ff6633' },
    { id: 'rome', location: [41.90, 12.49], label: 'Rome', color: '#ff6633' },
    { id: 'madrid', location: [40.42, -3.70], label: 'Madrid', color: '#ff6633' },
    { id: 'moscow', location: [55.75, 37.62], label: 'Moscow', color: '#ff6633' },
    { id: 'beijing', location: [39.91, 116.40], label: 'Beijing', color: '#ff6633' },
    { id: 'hongkong', location: [22.32, 114.17], label: 'Hong Kong', color: '#ff6633' },
]
const arcs = [
    { id: 'sf-nyc', from: [37.78, -122.44], to: [40.71, -74.01], label: 'San Francisco to New York' },
    { id: 'tokyo-sf', from: [35.68, 139.65], to: [37.78, -122.44], label: 'Tokyo to San Francisco' },
]
onMounted(() => {
    const globe = createGlobe(el.value, {
        devicePixelRatio: 2,
        width: 600 * 2,
        height: 600 * 2,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [0.2, 0.4, 1],
        glowColor: [1, 1, 1],
        // cobe 只认 location / size / id；label 需用 DOM + CSS Anchor 单独渲染
        markers: markers.map(m => ({
            location: m.location,
            size: 0.03,
            id: m.id,
        })),
        arcs: arcs.map(a => ({
            from: a.from,
            to: a.to,
            id: a.id,
        })),
        arcColor: [0.3, 0.5, 1],  // 弧线颜色
        arcWidth: 0.5,            // 线宽
        arcHeight: 0.3,
    })
    // Animate the globe
    function animate() {
        phi.value += 0.005
        globe.update({ phi: phi.value })
        requestAnimationFrame(animate)
    }
    animate()
})

</script>

<template>
    <div class="relative">
        <h1>Cobe Earth</h1>

        <div class="globe-wrapper hero-globe relative">
            <div class="rounded-sm absolute top-0 left-0 z-0 cobe-bg"></div>
            <canvas :style="{ width: '350px', height: '350px' }" ref="el" />
            <div v-for="m in markers" :key="m.id" class="marker-label" :style="{
                positionAnchor: `--cobe-${m.id}`,
                opacity: `var(--cobe-visible-${m.id}, 0)`,
                color: m.color,
            }">
                {{ m.label }}
            </div>
            <div v-for="a in arcs" :key="a.id" class="arc-label" :style="{
                positionAnchor: `--cobe-arc-${a.id}`,
                opacity: `var(--cobe-visible-arc-${a.id}, 0)`
            }">
                {{ a.label }}
            </div>
            <!-- 文字环 -->
            <div class="orbit-ring" aria-hidden="true">
                <svg class="orbit-svg" viewBox="0 0 300 300">
                    <defs>
                        <path id="orbitPath" d="M 150,150 m -130,0 a 130,130 0 1,0 260,0 a 130,130 0 1,0 -260,0" />
                    </defs>
                    <text class="orbit-text">
                        <textPath href="#orbitPath">
                            {{ 'The 5KB Globe Lib · '.repeat(10) }}
                        </textPath>
                    </text>
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>

.cobe-bg {
    background-image: linear-gradient(to bottom, #32aee1 0%, #13c4aa 100%);
    height: 100%;
    width: 70%;
    border-radius: 10px;
}
.globe-wrapper {
    position: relative;
    width: 400px;
    height: 400px;
    overflow: hidden;
}

/* 锚定到 cobe 暴露的 --cobe-{id}，背面 marker 时 --cobe-visible-{id} 为 0 */
.marker-label {
    position: absolute;
    bottom: anchor(top);
    left: anchor(center);
    translate: -50% 0;
    margin-bottom: 6px;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    transition: opacity 0.2s;
}

.hero-globe {
    perspective: 700px;
    /* 父级 3D 透视 */
    transform-style: preserve-3d;
}

.arc-label {
    position: absolute;
    bottom: anchor(top);
    left: anchor(center);
    translate: -50% 0;
    margin-bottom: 8px;
    padding: 0.3rem 0.6rem;
    background: #fff;
    color: #1a1a1a;
    font-size: 0.7rem;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.orbit-ring {
    position: absolute;
    top: 0;
    left: -5%;
    width: 100%;
    height: 100%;
    /* mask 用 alpha 控制显隐，降低透明度让环更浅、过渡更柔 */
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 38%, rgba(0, 0, 0, 0.35) 52%, rgba(0, 0, 0, 0.6) 100%);
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 38%, rgba(0, 0, 0, 0.35) 52%, rgba(0, 0, 0, 0.6) 100%);
}

.orbit-svg {
    transform: rotateX(62deg);
    /* 圆环「躺」成椭圆，像套在球外 */
    animation: orbit-spin 30s linear infinite;
}

@keyframes orbit-spin {
    from {
        transform: rotateX(62deg) rotateZ(0deg);
    }

    to {
        transform: rotateX(62deg) rotateZ(-360deg);
    }
}
</style>