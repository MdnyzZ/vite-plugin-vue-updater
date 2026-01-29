import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // 同时构建 CommonJS 和 ES Module
  dts: true, // 生成类型定义文件 (.d.ts)
  clean: true, // 每次构建前清空 dist
  minify: true, // 压缩代码
  external: ["vue", "element-plus", "axios", "vite"], // 排除宿主环境已有的依赖
});
