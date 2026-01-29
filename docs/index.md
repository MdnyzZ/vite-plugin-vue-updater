---
layout: home

hero:
  name: "Vue Updater"
  text: "智能版本检测与更新"
  tagline: 为 Element Plus + Vite 项目打造的无感更新体验
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看配置
      link: /guide/configuration

features:
  - title: 零配置集成
    details: 包含 Vite 构建插件，自动生成版本指纹，无需手动维护版本号。
  - title: 智能交互策略
    details: 内置“强提醒 -> 拒绝 -> 弱提醒”闭环逻辑，避免重复打扰用户。
  - title: 性能优先
    details: 基于 Visibility API，页面不可见时自动暂停轮询，节省服务器资源。
---

<style>
/* 可以在这里覆盖 CSS 变量来调整主题色 */
:root {
  --vp-c-brand: #42b883;
  --vp-c-brand-light: #42d392;
}
</style>