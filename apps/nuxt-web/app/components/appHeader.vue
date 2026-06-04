<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'
import NavProvide from './home-page/nav-provide.vue';
const itmeList = [
  {
    title: '社媒运营',
  },
  {
    title: '跨界电商',
  },
  {
    title: 'seo优化',
  },
  {
    title: '广告投放',
  },
  {
    title: '联盟营销',
  },
  {
    title: '数据爬取',
  },
  {
    title: '加密货币',
  },
]

const mobileHeaderList = ref([
  { title: '应用场景', href: '/use-cases', list: itmeList },
  { title: '产品功能', href: '/function', list: itmeList },
  { title: '资源', href: '/resources', list: itmeList },
  { title: '价格方案', href: '/pricing', list: itmeList },
  { title: '下载', href: '/download', list: itmeList },
])
const headerList = useHeader()
const show = ref(false)
const menuShow = ref(false)
const showNavProvide = ref(true)
const style = ref({
  height: '0px',
  opacity: 0,
  transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
})
const mobileMenuRef = ref<HTMLElement | null>(null)

const handlemobileMenuHeight = () => {
  // console.dir(mobileMenuRef.value);
  menuShow.value = !menuShow.value
  // if(menuShow.value) {
  //   menuShow.value = false
  //   const scrollHeight = mobileMenuRef.value?.scrollHeight || 0
  //   style.value.height = scrollHeight + 'px'
  //   style.value.opacity = 1

  //   requestAnimationFrame(() => {
  //     style.value.height = '0px'
  //     style.value.opacity = 0
  //   })
  // } else {
  //   menuShow.value = true
  //   nextTick(() => {
  //     style.value.height =  '0px'
  //     style.value.opacity = 0
  //     const scrollHeight = mobileMenuRef.value?.scrollHeight || 0
  //     requestAnimationFrame(() => {
  //       style.value.height = scrollHeight + 'px'
  //       style.value.opacity = 1
  //     })
  //   })
  // }
}

const handleMouseEnter = () => {
  console.log('handleMouseEnter');

  showNavProvide.value = true
}
const handleMouseLeave = () => {
  console.log('handleMouseLeave');
  showNavProvide.value = false
}
</script>

<template>
  <div
    class="max-w-[375px] xs:max-w-[640px] h-12 text-white md:max-w-[1320px] mx-auto fixed top-0 left-0 right-0 z-100 px-4">
    <div class="bg-white lg:bg-[#0C1A31]/20 text-black lg:text-white backdrop-blur-md rounded-3">
      <div class="relative flex w-full items-center  py-1.5 px-2  mt-3" :class="menuShow ? 'rounded-b-none' : ''">
        <div class="flex items-center gap-2">
          <NuxtLink to="/">
            <img class="w-8 h-8" src="/logo.svg" alt="logo" />
          </NuxtLink>
          <span>RoxyBrowser</span>
        </div>
        <div class="hidden gap-3 ml-4 lg:flex ">
          <motion.div v-for="item in headerList" :key="item.title"
            class="py-1.5 px-3 font-weight-[500] font-size-[14px]  hover:bg-white/30 rounded-md cursor-pointer">
            <NavProvide>
              <template #reference>
                <NuxtLink :to="item.href">{{ item.title }}</NuxtLink>
              </template>
            </NavProvide>
          </motion.div>
        </div>
        <div class="ml-auto flex items-center">
          <NuxtLink class="py-1.5 px-3 lg:hidden hover:bg-white/30 cursor-pointer rounded-md" @click="handlemobileMenuHeight">open menu
          </NuxtLink>
          <NuxtLink class="py-1.5 font-weight-500 font-size-[14px] px-5 border-1 border-white/30 rounded-md hidden lg:block" @click="show = !show">登录</NuxtLink>
          <NuxtLink class="py-1.5 font-weight-500 font-size-[14px] px-5 ml-3 bg-primary-blue text-white rounded-md hidden lg:block" @click="show = !show">注册</NuxtLink>
        </div>

      </div>
      <!-- 移动端nav -->
      <Transition name="mobile-menu">
        <div v-show="menuShow" class="lg:hidden px-4 max-h-[calc(100dvh-124px)] relative overflow-y-auto">
          <div class="overflow-y-auto flex flex-col justify-between">
            <div class="flex-1 overflow-y-auto">
              <ul class="flex flex-col gap-2 ">
                <li v-for="item in mobileHeaderList" :key="item.title" class="border-b-1 last:border-b-0 border-b-white/20 py-4 mx-4">
                  <div class="flex justify-between items-center ">
                    <div class="font-archivo font-weight-500 font-size-[16px]">{{ item.title }}</div>
                    <div @click="item.show = !item.show">open</div>
                  </div>
                  <AnimatePresence>
                    <motion.ul v-if="item.show" ref="mobileMenuItemRef" :initial="{ height: 0, opacity: 0 }"
                      :animate="{ height: 'auto', opacity: 1 }" :exit="{ height: 0, opacity: 0 }"
                      :transition="{ duration: 0.3, ease: [0.4, 0, 0.2, 0.4] }" style="overflow: hidden;"
                      class="grid grid-cols-2 gap-4 text-left pt-4">
                      <motion.li v-for="list in item.list" :key="list.title">
                        <NuxtLink>{{ list.title }}</NuxtLink>
                      </motion.li>
                    </motion.ul>
                  </AnimatePresence>
                </li>
              </ul>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-4 font-weight-500 font-size-[14px]">
              <div class="py-3 border-1 border-black/30 rounded-[8px]">login</div>
              <div class="py-3 bg-[#12A3FC] rounded-[8px]">register</div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

  </div>
  <TeleportOverlay v-model="show" :close-on-backdrop-only="false">
    <p>hello</p>
  </TeleportOverlay>

</template>
<style scoped lang="scss">
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, height 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  height: 0;
  opacity: 0;
}
</style>
