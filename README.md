# Prompt Flow Monorepo

基于 pnpm workspace 的 monorepo 项目。

## 项目结构

```
.
├── package.json              # 根 package.json
├── pnpm-workspace.yaml       # pnpm workspace 配置
├── apps/
│   └── web-extension/        # 浏览器扩展 (WXT + React)
└── packages/                 # 共享包（工具、类型等）
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build
```

## Apps

### apps/web-extension

基于 WXT 框架的浏览器扩展，使用 React 开发。

- `pnpm dev` - 开发模式 (Chrome)
- `pnpm dev:firefox` - 开发模式 (Firefox)
- `pnpm build` - 构建生产版本
- `pnpm zip` - 打包为 zip 文件

## Packages

`packages/` 目录用于存放跨项目共享的工具包、类型定义、配置等。

### 添加共享包

```bash
# 在 packages/ 下创建新包
mkdir packages/utils
cd packages/utils
pnpm init
```
