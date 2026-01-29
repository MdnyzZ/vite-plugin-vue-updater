<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" width="100" />
</p>

<h1 align="center">vite-plugin-vue-updater</h1>

<p align="center">
  Vue 3 + Vite 项目的智能版本更新检测方案，内置 Element Plus 交互策略。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vite-plugin-vue-updater">
    <img src="https://img.shields.io/npm/v/vite-plugin-vue-updater?color=42b883&label=" alt="NPM Version">
  </a>
  <a href="https://github.com/your-name/vite-plugin-vue-updater">
    <img src="https://img.shields.io/github/stars/your-name/vite-plugin-vue-updater?color=42b883&logo=github" alt="GitHub Stars">
  </a>
  <img src="https://img.shields.io/npm/l/vite-plugin-vue-updater?color=blue" alt="License">
</p>

<p align="center">
  <a href="https://your-name.github.io/vite-plugin-vue-updater/">文档</a> &nbsp;|&nbsp; 
  <a href="#installation">安装</a> &nbsp;|&nbsp; 
  <a href="#usage">快速开始</a>
</p>

## ✨ 特性

- **⚡️ 零配置**：开箱即用，自动生成版本标识。
- **🔄 智能轮询**：基于 `visibilityState` 的高性能轮询机制，支持时间戳防缓存。
- **🛡️ 交互闭环**：内置“强提醒（Modal） -> 拒绝 -> 弱提醒（Notification）”的最佳实践策略。
- **🎨 UI 集成**：深度集成 Element Plus，支持文案与行为自定义。
- **🔧 TS 支持**：完全使用 TypeScript 编写，提供完整的类型推断。

## 📦 安装

```bash
# pnpm
pnpm add vite-plugin-vue-updater

# npm
npm install vite-plugin-vue-updater

# yarn
yarn add vite-plugin-vue-updater

```

⚠️ 注意：本项目依赖 element-plus、vue 和 axios，请确保你的项目中已安装它们。

🚀 快速开始

1. 配置 Vite 插件
   在 vite.config.ts 中引入插件，用于构建时生成 version.json。

```Ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { versionUpdatePlugin } from 'vite-plugin-vue-updater'

export default defineConfig({
  plugins: [
    vue(),
    // 在构建时自动生成 dist/version.json
    versionUpdatePlugin()
  ]
})
```

2. 在 App.vue 中启用
   在你的根组件中引入 Hook，即可开启自动检测。

```Vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useVersionCheck } from 'vite-plugin-vue-updater'

const isProd = import.meta.env.PROD
let updater: any

onMounted(() => {
  if (isProd) {
    updater = useVersionCheck({
      // 轮询间隔（毫秒），默认 60000
      timer: 5 * 60 * 1000,
      // version.json 的地址，注意处理 base 路径
      jsonUrl: `${import.meta.env.BASE_URL}version.json`,
      // 自定义 UI 文案
      ui: {
        title: '系统升级',
        description: '检测到新版本，请刷新页面以加载最新功能。',
        confirmText: '立即刷新',
        cancelText: '稍后再说'
      }
    })
  }
})

onUnmounted(() => {
  updater?.destroy()
})
</script>
```

📚 详细文档
请访问 官方文档 查看完整的配置项和高级用法。

📄 License
MIT.