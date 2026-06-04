<script setup lang="ts">
import { motion } from "motion-v"
const variants = {
    initial: {
        x: '100vw',
    },
    visible: (index) => {
        return {
            x: '-240px',
            transition: {
                delay: index * 0.8,
                duration: 4,
                ease: [0.65, 0.05, 0.36, 1],
                repeat: Infinity,
                repeatDelay: 1,
            }
        }
    }
}
const variants2 = {
    initial: {
        x: '100vw',
    },
    visible: (index) => {
        return {
            x: '-240px',
            transition: {
                delay: index * 0.65,
                duration: 4,
                ease: [0.65, 0.05, 0.36, 1],
                repeat: Infinity,
                repeatDelay: 1.7,
            }
        }
    }
}
const variants3 = {
    initial: {
        x: '100vw',
    },
    visible: (index) => {
        return {
            x: '-240px',
            transition: {
                delay: index * 0.7,
                duration: 4,
                ease: [0.65, 0.05, 0.36, 1],
                repeat: Infinity,
                repeatDelay: 1.6,
            }
        }
    }
}
const variants4 = {
    initial: {
        x: '100vw',
    },
    visible: (index) => {
        return {
            x: '-240px',
            transition: {
                delay: index * 0.8,
                duration: 4,
                ease: [0.65, 0.05, 0.36, 1],
                repeat: Infinity,
                repeatDelay: 2,
            }
        }
    }
}
const variants5 = {
    initial: {
        x: '100vw',
    },
    visible: (index) => {
        return {
            x: '-240px',
            transition: {
                delay: index * 0.9,
                duration: 4,
                ease: [0.65, 0.05, 0.36, 1],
                repeat: Infinity,
                repeatDelay: 1.6,
            }
        }
    }
}
const variants6 = {
    initial: {
        x: '100vw',
    },
    visible: (index) => {
        return {
            x: '-240px',
            transition: {
                delay: index * 1.2,
                duration: 4,
                ease: [0.65, 0.05, 0.36, 1],
                repeat: Infinity,
                repeatDelay: 1.5,
            }
        }
    }
}
</script>

<template>
    <div>
        <div class="line-container-wrapper line-right">
            <motion.ul class="line-container" :style="{ transform: 'rotate(-4deg)' }">
                <motion.li v-for="n in 3" :key="n" animate="visible" :initial="{ x: '100vw' }" :custom="n"
                    :variants="variants" class="line-item">
                </motion.li>
            </motion.ul>
            <motion.ul class="line-container" :style="{ transform: 'rotate(-2deg)' }">
                <motion.li v-for="n in 3" :key="n" animate="visible" :initial="{ x: '100vw' }" :custom="n"
                    :variants="variants2" class="line-item">
                </motion.li>
            </motion.ul>
            <motion.ul class="line-container">
                <motion.li v-for="n in 3" :key="n" animate="visible" :initial="{ x: '100vw' }" :custom="n"
                    :variants="variants3" class="line-item">
                </motion.li>
            </motion.ul>
            <motion.ul class="line-container" :style="{ transform: 'rotate(1deg)' }">
                <motion.li v-for="n in 3" :key="n" animate="visible" :initial="{ x: '100vw' }" :custom="n"
                    :variants="variants4" class="line-item">
                </motion.li>
            </motion.ul>
            <motion.ul class="line-container" :style="{ transform: 'rotate(2deg)' }">
                <motion.li v-for="n in 3" :key="n" animate="visible" :initial="{ x: '100vw' }" :custom="n"
                    :variants="variants5" class="line-item">
                </motion.li>
            </motion.ul>
            <motion.ul class="line-container" :style="{ transform: 'rotate(4deg)' }">
                <motion.li v-for="n in 3" :key="n" animate="visible" :initial="{ x: '100vw' }" :custom="n"
                    :variants="variants6" class="line-item">
                </motion.li>
            </motion.ul>
        </div>
        <div class="line-container-wrapper line-left">
            <motion.ul class="line-container" :style="{ transform: 'rotate(4deg)' }">
                <motion.li v-for="n in 3" :key="n" animate="visible" :initial="{ x: '100vw' }" :custom="n"
                    :variants="variants" class="line-item">
                </motion.li>
            </motion.ul>
            <motion.ul class="line-container" :style="{ transform: 'rotate(2deg)' }">
                <motion.li v-for="n in 3" :key="n" animate="visible" :initial="{ x: '100vw' }" :custom="n"
                    :variants="variants2" class="line-item">
                </motion.li>
            </motion.ul>
            <motion.ul class="line-container">
                <motion.li v-for="n in 3" :key="n" animate="visible" :initial="{ x: '100vw' }" :custom="n"
                    :variants="variants3" class="line-item">
                </motion.li>
            </motion.ul>
            <motion.ul class="line-container" :style="{ transform: 'rotate(-1deg)' }">
                <motion.li v-for="n in 3" :key="n" animate="visible" :initial="{ x: '100vw' }" :custom="n"
                    :variants="variants4" class="line-item">
                </motion.li>
            </motion.ul>
            <motion.ul class="line-container" :style="{ transform: 'rotate(-2deg)' }">
                <motion.li v-for="n in 3" :key="n" animate="visible" :initial="{ x: '100vw' }" :custom="n"
                    :variants="variants5" class="line-item">
                </motion.li>
            </motion.ul>
            <motion.ul class="line-container" :style="{ transform: 'rotate(-4deg)' }">
                <motion.li v-for="n in 3" :key="n" animate="visible" :custom="n"
                    :variants="variants6" class="line-item">
                </motion.li>
            </motion.ul>
        </div>
    </div>

</template>

<style scoped lang="scss">
.line-left {
    transform: translateX(-80vw) translateY(-50%);
    // border: 1px solid red;
}
.line-right {
    transform: translateX(50vw) translateY(-50%);
    // border: 1px solid blue;
}
.line-container-wrapper {
    position: absolute;
    top: 50%;
    z-index: 0;
    display: flex;
    flex-direction: column;
    gap: 5rem;
}

.line-right>.line-container {
    position: relative;
    width: 100vw;
    height: 2px;
    transform-origin: 0 0;
    background-image: linear-gradient(90deg,
    rgba(255, 255, 255, 0) 15%,
    rgba(255, 255, 255, 0.1) 30%,
    rgba(255, 255, 255, 0) 50%);
}
.line-left>.line-container {
    position: relative;
    width: 100vw;
    height: 2px;
    transform-origin: 100% 0;
    background-image: linear-gradient(90deg,
            rgba(255, 255, 255, 0) 30%,
            rgba(255, 255, 255, 0.1) 60%,
            rgba(255, 255, 255, 0) 75%);
}

.line-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 240px;
    height: 2px;
    background-image: linear-gradient(90deg,
            rgba(48, 134, 255, 0.1) 0%,
            rgba(48, 134, 255, 1) 10%,
            rgba(48, 134, 255, 0) 100%);
}
</style>
