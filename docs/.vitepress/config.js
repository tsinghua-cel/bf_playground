import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'Documentation',
    description: 'Documents for BunnyFinder framework',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Website', link: 'https://bfplay.bitheart.org' },
        ],
        sidebar: [
            // {
            //     text: 'Blogs',
            //     items: [
            //         { text: 'System Overview', link: '/overview' },
            //         { text: 'System Design', link: '/design' },
            //         { text: 'How to deploy', link: '/deploy' },
            //     ]
            // },
            {
                text: 'Tutorials',
                items: [
                    { text: 'Installation', link: '/installation' },
                    { text: 'Configuration', link: '/configuration' },
                    { text: 'Basic Usage', link: '/usage' },
                    { text: 'Advanced Usage', link: '/advanced-usage' }
                    // { text: 'Guide', link: '/guide' }
                ]
            },
            {
                text: 'Development',
                items: [
                    {text: 'Database Statement', link: '/db'},
                    {text: 'Strategy Category', link: '/strategy'},
                    { text:'Github', link: 'https://github.com/tsinghua-cel'},
                    // { text:'Paper', link: '/pager.pdf'}
                ]
            }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024 BunnyFinder Framework. All rights reserved.'
        }
    }
})