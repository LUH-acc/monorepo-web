export default function() {
    const footerList = reactive([
        {
            title: 'Resources',
            list: [
                {
                    title: 'Blog',
                    href: '/blog',
                },
                {
                    title: 'FAQ',
                    href: '/faq',
                },
                {
                    title: 'User Guide',
                    href: '/user-guide',
                },
                {
                    title: 'Pricing',
                    href: '/pricing',
                },
                {
                    title: 'Download',
                    href: '/download',
                },
                {
                    title: 'About us',
                    href: '/about-us',
                },
            ]
        },
        {
            title: 'Function',
            list: [
                {
                    title: 'Change IP Address',
                    href: '/change-ip-address',
                },
                {
                    title: 'Private Browsing',
                    href: '/private-browsing',
                },
                {
                    title: 'Multi-Accounting',
                    href: '/multi-accounting',
                },
                {
                    title: 'IP Address Lookup',
                    href: '/ip-address-lookup',
                },
            ]
        },
    ])
    return footerList
}