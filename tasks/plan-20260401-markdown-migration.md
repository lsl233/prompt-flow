# 项目计划: PromptFlow 内容数据 Markdown 化与多语言支持

## 概述
- **项目目标**: 将社区提示词数据源从 JSON 格式迁移到 Markdown 格式，支持多语言内容管理，并保留分类/标签页面的可渲染内容能力。
- **背景**: 当前数据存储在 `content/prompts/*.json`、`categories.json`、`tags.json` 中，编辑不够友好。使用 Markdown + YAML frontmatter 可以改善内容编辑体验，同时支持多语言字段。
- **预期成果**:
  - 所有提示词使用 Markdown 文件存储，元数据放在 frontmatter
  - 分类和标签也有独立的 Markdown 文件，支持页面内容渲染
  - 多语言字段使用嵌套对象格式（如 `title: { zh: "...", en: "..." }`）
  - 数据读取逻辑更新，保持现有 API 兼容
  - 构建和运行正常，社区页面功能不受影响

## 技术栈
- **语言**: TypeScript
- **框架**: Next.js 16 (App Router + SSG)
- **内容源**: Markdown 文件 (`apps/web/content/`)
- **Markdown 解析**: gray-matter (frontmatter) + remark (可选，用于内容渲染)
- **包管理**: pnpm workspace

## 数据格式设计

### 文件结构
```
content/
├── prompts/
│   ├── senior-code-review-copilot.md
│   ├── api-doc-generator.md
│   └── ...
├── categories/
│   ├── coding.md
│   ├── writing.md
│   └── ...
└── tags/
    ├── code-review.md
    └── ...
```

### Prompt Markdown 格式
```yaml
---
id: p001
slug: senior-code-review-copilot
category: coding
tags: [code-review, refactoring]
author: DevMaster
targetModels: [GPT-4, Claude]
promptType: assistant
difficulty: intermediate
featured: true
verified: true
likes: 328
createdAt: "2026-03-18"
variables:
  - name: code
    description:
      zh: 待审查的代码或 diff
      en: Code or diff to review
    required: true
title:
  zh: 资深代码审查助手
  en: Senior Code Review Copilot
summary:
  zh: 把一段代码拆成结构、风险、性能、可维护性四个维度做审查。
  en: Review code across structure, risks, performance, and maintainability.
---

zh:
你是一位资深代码审查专家...

en:
You are a senior code review expert...
```

### Category Markdown 格式
```yaml
---
slug: coding
accent: "#00d4aa"
featuredTagSlugs: [code-review, refactoring]
title:
  zh: 编程开发
  en: Coding
description:
  zh: 代码审查、重构、调试等开发相关提示词
  en: Code review, refactoring, debugging prompts
---

zh:
分类页面的详细内容，可以包含使用指南、SEO 介绍等...

en:
Category page content with usage tips and SEO description...
```

### Tag Markdown 格式
```yaml
---
slug: code-review
categorySlugs: [coding]
relatedTagSlugs: [refactoring]
featured: true
title:
  zh: 代码审查
  en: Code Review
description:
  zh: 适用于代码审查场景的提示词
  en: Prompts for code review scenarios
---

zh:
标签页面的详细内容...

en:
Tag page content...
```

## 里程碑1: 添加依赖和工具函数
**目标**: 安装 gray-matter 包，创建 Markdown 解析工具函数
**预计完成时间**: 0.5 天

### 任务列表

#### Task-1: 安装 gray-matter 依赖
- **描述**: 在 `apps/web` 中添加 `gray-matter` 包用于解析 Markdown frontmatter
- **优先级**: P0
- **状态**: 已完成
- **预估工时**: 10 分钟
- **依赖**: -
- **验收标准**:
  - [x] `gray-matter` 已添加到 `apps/web/package.json`
  - [x] `pnpm install` 成功
  - [x] TypeScript 编译通过

#### Task-2: 创建 Markdown 内容读取工具函数
- **描述**: 在 `lib/content.ts` 中创建读取 Markdown 文件的通用函数，支持按 locale 获取多语言字段
- **优先级**: P0
- **状态**: 已完成
- **预估工时**: 1 小时
- **依赖**: Task-1
- **验收标准**:
  - [x] 创建 `lib/content.ts` 文件
  - [x] 实现 `parseMarkdown()` 函数解析 frontmatter 和 content
  - [x] 实现 `getLocalizedField()` 函数根据 locale 获取多语言值
  - [x] 实现 `getPromptContentByLocale()` 函数按语言提取 Markdown 内容
  - [x] 所有函数有完整的类型定义

## 里程碑2: 数据迁移
**目标**: 将现有的 JSON 数据转换为 Markdown 格式
**预计完成时间**: 0.5 天

### 任务列表

#### Task-3: 迁移 categories.json 到 Markdown
- **描述**: 创建 `content/categories/` 目录，将 `categories.json` 中的每个分类转换为独立的 `.md` 文件
- **优先级**: P0
- **状态**: 已完成
- **预估工时**: 30 分钟
- **依赖**: -
- **验收标准**:
  - [x] 创建 `content/categories/` 目录
  - [x] 每个分类有独立的 `.md` 文件（如 `coding.md`、`writing.md`）
  - [x] 文件包含正确的 YAML frontmatter（多语言 title/description）
  - [x] 文件包含空的或基础的 content 部分

#### Task-4: 迁移 tags.json 到 Markdown
- **描述**: 创建 `content/tags/` 目录，将 `tags.json` 中的每个标签转换为独立的 `.md` 文件
- **优先级**: P0
- **状态**: 已完成
- **预估工时**: 30 分钟
- **依赖**: Task-3
- **验收标准**:
  - [x] 创建 `content/tags/` 目录
  - [x] 每个标签有独立的 `.md` 文件
  - [x] 文件包含正确的 YAML frontmatter
  - [x] 文件包含空的或基础的 content 部分

#### Task-5: 迁移 prompts/*.json 到 Markdown
- **描述**: 将 `content/prompts/*.json` 转换为 `.md` 文件，保留所有字段，content、title、summary 改为多语言格式
- **优先级**: P0
- **状态**: 已完成
- **预估工时**: 1 小时
- **依赖**: Task-3, Task-4
- **验收标准**:
  - [x] 所有 JSON 文件已转换为 Markdown 格式
  - [x] 文件包含正确的 YAML frontmatter（含多语言字段）
  - [x] content 部分按 `zh:` 和 `en:` 分块
  - [x] 原有的 JSON 文件可以备份后删除

## 里程碑3: 重构数据读取层
**目标**: 更新 `lib/community-prompts.ts`，从 Markdown 读取数据，保持 API 兼容
**预计完成时间**: 1 天

### 任务列表

#### Task-6: 重构分类和标签读取函数
- **描述**: 更新 `getAllCategories()`、`getCategoryBySlug()`、`getAllTags()`、`getTagBySlug()` 等函数，改为从 Markdown 文件读取
- **优先级**: P0
- **状态**: 已完成
- **预估工时**: 1.5 小时
- **依赖**: Task-2, Task-3, Task-4
- **验收标准**:
  - [x] `getAllCategories()` 从 `content/categories/*.md` 读取
  - [x] `getCategoryBySlug()` 从对应 Markdown 文件读取
  - [x] `getAllTags()` 从 `content/tags/*.md` 读取
  - [x] `getTagBySlug()` 从对应 Markdown 文件读取
  - [x] 函数返回类型保持不变（添加 content 字段用于页面渲染）
  - [x] 多语言字段根据 locale 参数返回对应值

#### Task-7: 重构提示词读取函数
- **描述**: 更新 `getAllPrompts()`、`getPromptBySlug()`、`getPromptById()`、`getPromptsByCategory()`、`getPromptsByTag()`、`searchPrompts()`、`getRelatedPrompts()` 等函数
- **优先级**: P0
- **状态**: 已完成
- **预估工时**: 2 小时
- **依赖**: Task-6, Task-5
- **验收标准**:
  - [x] `getAllPrompts()` 从 `content/prompts/*.md` 读取所有提示词
  - [x] `getPromptBySlug()` 从对应 Markdown 文件读取
  - [x] 所有读取函数正确处理多语言字段
  - [x] 搜索功能支持多语言内容搜索
  - [x] 函数返回类型保持不变
  - [x] 使用 React cache() 保持性能

## 里程碑4: 验证和清理
**目标**: 确保功能正常，清理旧数据文件
**预计完成时间**: 0.5 天

### 任务列表

#### Task-8: 验证所有社区页面正常
- **描述**: 检查 `/community`、`/community/[slug]`、`/community/category/[slug]`、`/community/tag/[slug]` 页面都能正常渲染
- **优先级**: P0
- **状态**: 已完成
- **预估工时**: 30 分钟
- **依赖**: Task-7
- **验收标准**:
  - [x] 社区首页正常显示所有提示词
  - [x] 提示词详情页正常显示
  - [x] 分类页面正常显示分类信息和提示词列表
  - [x] 标签页面正常显示标签信息和提示词列表
  - [x] 搜索功能正常工作
  - [x] 多语言切换正常

#### Task-9: 删除旧 JSON 文件
- **描述**: 在确认 Markdown 数据完整且功能正常后，删除旧的 JSON 文件
- **优先级**: P1
- **状态**: 已完成
- **预估工时**: 10 分钟
- **依赖**: Task-8
- **验收标准**:
  - [x] 删除 `content/categories.json`
  - [x] 删除 `content/tags.json`
  - [x] 删除 `content/prompts/*.json`（保留备份）
  - [x] 构建正常，无文件引用错误

#### Task-10: TypeScript 编译和构建验证
- **描述**: 运行类型检查和构建，确保没有错误
- **优先级**: P0
- **状态**: 已完成
- **预估工时**: 15 分钟
- **依赖**: Task-8
- **验收标准**:
  - [x] `pnpm compile` 通过
  - [x] `pnpm --filter web build` 成功
  - [x] 无 TypeScript 类型错误
  - [x] 无运行时错误

## 附录

### 风险点
- **数据迁移完整性**: JSON 转 Markdown 过程中可能有字段遗漏，需要仔细核对类型定义
- **多语言字段缺失**: 如果某个语言字段缺失，需要有合理的 fallback 机制
- **性能影响**: Markdown 解析可能比 JSON 慢，但实际影响应该很小（构建时读取）
- **内容格式转换**: Markdown 内容部分的 `zh:`/`en:` 格式需要文档化，便于后续编辑

### 参考资料
- [gray-matter](https://github.com/jonschlinkert/gray-matter): 用于解析 Markdown frontmatter
- [apps/web/types/prompt.ts]: 提示词类型定义
- [apps/web/lib/community-prompts.ts]: 当前数据读取逻辑

### 变更记录
- 2026-04-01: 初始计划创建，确定从 JSON 迁移到 Markdown 的方案
- 2026-04-02: 所有任务完成，成功迁移到 Markdown 格式
  - 安装 gray-matter 依赖
  - 创建 content.ts 和 localized.ts 工具文件
  - 迁移 4 个分类、6 个标签、20 个提示词到 Markdown
  - 重构 community-prompts.ts 从 Markdown 读取数据
  - 更新类型定义支持多语言字段
  - 所有页面验证正常，构建成功
  - 旧 JSON 文件已备份到 content/backup/ 目录
- 2026-04-02 (补充): 扩展多语言支持
  - 将 useCase、exampleInput、exampleOutput 字段也改为中英文双语格式
  - 更新 PromptFrontmatter 类型定义
  - 更新 parsePrompt 函数处理这三个字段的多语言
