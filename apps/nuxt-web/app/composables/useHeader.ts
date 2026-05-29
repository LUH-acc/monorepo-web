type HeaderItem = {
    title: string
    href: string
    /** 为 true 时悬停展开 mega menu */
    mega?: boolean
}

export default function useHeader() {
    const headerList = reactive<HeaderItem[]>([
        { title: '应用场景', href: '/usesPage', mega: true },
        { title: '产品功能', href: '/function' },
        { title: '资源', href: '/resources' },
        { title: '价格方案', href: '/pricing' },
        { title: '下载', href: '/download' },
    ])
    return headerList
}
