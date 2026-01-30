import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/vite-plugin-vue-updater/', 
  title: "Vue Updater",
  description: "Vue 3 项目的智能更新检测方案",
  themeConfig: {
    // 顶部导航
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '配置', link: '/guide/configuration' },
      { text: 'GitHub', link: 'https://github.com/MdnyzZ/vite-plugin-vue-updater' }
    ],

    // 侧边栏
    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '工作原理', link: '/guide/how-it-works' } // 可选
        ]
      },
      {
        text: 'API',
        items: [
          { text: '配置选项', link: '/guide/configuration' },
          { text: 'TypeScript 类型', link: '/guide/types' }
        ]
      }
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MdnyzZ/vite-plugin-vue-updater' }
    ],

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present MdnyzZ'
    },
    
    // 搜索配置 (可选)
    search: {
      provider: 'local'
    }
  }
})