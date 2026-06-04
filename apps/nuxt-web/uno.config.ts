// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
  } from 'unocss'
  
  export default defineConfig({
    shortcuts: {
      // 方式 A：用 theme 里的 font-archivo（推荐，见下方 theme.fontFamily）
      'rx-h2':
        'font-archivo font-bold text-black text-[24px] min-[641px]:text-[48px]',
      'rx-p': 'font-inter text-[#042144] mt-2',
      'wh-full': 'w-full h-full',
      'text-h3': 'font-archivo font-bold text-[24px] lg:text-[40px]',
      'text-p': 'font-inter text-[#575D60] font-size-[18px] font-weight-400',
      'test-container': 'xl:w-[1280px] xl:mx-auto xl:px-0 px-4 md:px-40px lg:px-60px ',
      'btn-reset': 'appearance-none bg-transparent border-none p-0 m-0 cursor-pointer outline-none shadow-none ring-0 font-inherit text-inherit leading-inherit',
      'web-container': 'lg:max-w-[1280px] mx-auto',
      'section-title': 'font-archivo font-bold text-[24px] md:text-[32px] lg:text-[48px]',
      'absolute-center': 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
      'absolute-x-center': 'absolute left-1/2 -translate-x-1/2',
      'absolute-y-center': 'absolute top-1/2 -translate-y-1/2',
    },
    rules: [
        [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    ],
    theme: {
      fontSize: {
        h3: ['40px', { fontWeight: 'bold', fontFamily: 'var(--font-Archivo-family), system-ui, sans-serif' }],
        
      },
      animation: {
        keyframes: {
          marquee:
            '{from{transform:translateX(0)}to{transform:translateX(calc(-100% - var(--gap)))}}',
        },
        durations: {
          marquee: 'var(--marquee-duration)',
        },
        timingFns: {
          marquee: 'linear',
        },
        counts: {
          marquee: 'infinite',
        },
      },
      colors: {
        'primary': '#042144',
        'primary-blue': '#238AFF',
        'primary-red': '#F9B3B4',
        'primary-gray': '#575D60',
        'primary-white': '#FFFFFF',
        'primary-black': '#000000',
        'primary-green': '#00FF00',
        'primary-yellow': '#FFFF00',
        'primary-purple': '#800080',
        'primary-orange': '#FFA500',
        'primary-brown': '#A52A2A',
        // ...
      },
      fontFamily: {
        archivo: 'var(--font-Archivo-family), system-ui, sans-serif',
        inter: 'var(--font-Inter-family), system-ui, sans-serif',
        'chivo-mono': 'var(--font-Chivo-Mono-family), ui-monospace, monospace',
      },
      breakpoints: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      }
    },
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons(),
      presetTypography(),
      presetWebFonts({
        fonts: {
          // ...
        },
      }),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  })