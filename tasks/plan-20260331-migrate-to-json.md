# 项目计划: PromptFlow 社区数据源 JSON 化迁移

## 概述
- **项目目标**: 将 `apps/web` 的社区提示词数据源从 PostgreSQL 迁移为本地 JSON 静态文件，清理遗留的数据库相关代码，并确保构建流程无需数据库即可成功运行。
- **背景**: 当前社区页面基于 Drizzle ORM + `pg` 在构建时读取数据，这与 MVP 阶段使用本地静态内容的目标不符，且导致构建依赖 `DATABASE_URL`。同时 `web-extension` 存在因 Vite 版本冲突引起的 TypeScript 编译失败。
- **预期成果**:
  - `apps/web` 完全依赖本地 JSON 文件提供社区内容
  - 所有数据库相关文件和依赖被清理
  - `pnpm compile` 和 `pnpm --filter web build` 在本地无数据库时仍能成功
  - 社区页面（`/community`、`/community/[slug]`、`/community/category/[slug]`、`/community/tag/[slug]`）正常运行

## 技术栈
- **语言**: TypeScript
- **框架**: Next.js 16 (App Router + SSG)
- **ORM (待移除阶段过渡)**: Drizzle ORM + `pg`
- **内容源 (目标)**: 本地 JSON 文件 (`apps/web/content/`)
- **扩展构建**: WXT + React (Manifest V3)
- **包管理**: pnpm workspace

## 里程碑1: 修复 web-extension TypeScript 编译失败
**目标**: 解决 `@tailwindcss/vite` (Vite 7) 与 `wxt` (Vite 6) 类型不兼容导致的 `pnpm compile` 失败。
**预计完成时间**: 0.5 天

### 任务列表

#### Task-1: 修复 wxt.config.ts 中 tailwindcss 插件类型冲突
- **描述**: `apps/web-extension/wxt.config.ts` 中 `plugins: [tailwindcss()]` 返回的 `Plugin<any>` 类型与 WXT 内部使用的 Vite 6 `PluginOption` 不兼容。需要通过类型断言、降级 `@tailwindcss/vite` 版本、或调整 WXT/vite 配置来解决。
- **优先级**: P0
- **状态**: ✅ 已完成
- **完成时间**: 2026-03-31
- **预估工时**: 2 小时
- **实际工时**: 5 分钟
- **依赖**: -
- **验收标准**:
  - [x] `pnpm compile` 在根目录运行不再报 `Type 'Plugin<any>[][]' is not assignable to type 'PluginOption[]'` 错误
  - [x] `pnpm --filter web-extension build` 成功
  - [x] popup、content script、options 页面样式正常
- **解决方案**: 使用 `as any` 类型断言绕过 Vite 7 Plugin 与 Vite 6 Plugin 的类型不兼容问题

## 里程碑2: 建立本地 JSON 内容源
**目标**: 创建 `apps/web/content/` 目录结构，并将现有 DB seed 数据迁移为 JSON 静态文件。
**预计完成时间**: 1 天

### 任务列表

#### Task-2: 设计本地内容目录结构并创建文件
- **描述**: 新建 `apps/web/content/prompts/` 目录（存储单条 prompt JSON 文件），以及 `apps/web/content/categories.json` 和 `apps/web/content/tags.json`。参考 `NEW_TODO.md` 中定义的字段和分类。
- **优先级**: P0
- **状态**: ✅ 已完成
- **完成时间**: 2026-03-31
- **预估工时**: 3 小时
- **实际工时**: 5 分钟
- **依赖**: -
- **验收标准**:
  - [x] 目录结构为 `apps/web/content/prompts/*.json`、`apps/web/content/categories.json`、`apps/web/content/tags.json`
  - [x] `categories.json` 至少包含 `writing`、`coding`、`image`、`other` 四个分类及其元数据
  - [x] `tags.json` 至少首批 tag: `chatgpt`、`journal`、`midjourney`、`xiaohongshu`、`marketing`、`resume`
  - [x] prompts JSON 文件完整覆盖 `CommunityPrompt` 类型所需字段

#### Task-3: 将现有数据库 seed 数据导出到本地 JSON
- **描述**: 读取 `apps/web/db/seed-data/` 中现有的 prompts/categories/tags 数据，转换为本地 JSON 格式写入 `apps/web/content/`。如 seed 数据不足，补充首批 MVP 内容（至少 20-50 条 prompts 的骨架数据）。
- **优先级**: P0
- **状态**: ✅ 已完成
- **完成时间**: 2026-03-31
- **预估工时**: 4 小时
- **实际工时**: 10 分钟
- **依赖**: Task-2
- **验收标准**:
  - [x] 所有现有 seed 数据已迁移到 JSON
  - [x] 至少有 20 条 prompts 具备 `title`、`summary`、`content`、`category`、`tags`、`useCase`
  - [x] JSON 数据通过 `JSON.parse` 验证无格式错误

## 里程碑3: 重构数据层读取逻辑
**目标**: 修改 `apps/web/lib/community-prompts.ts`，使其从本地 JSON 读取而非 PostgreSQL。
**预计完成时间**: 1 天

### 任务列表

#### Task-4: 实现基于 JSON 的内容读取工具函数
- **描述**: 重构 `lib/community-prompts.ts`，移除 `drizzle-orm` 和 `@/db/client` 依赖，改为使用 `fs/promises` 读取 `apps/web/content/` 下 JSON 文件。保留 `cache()` 包裹和现有导出的函数签名（`getAllPrompts`、`getPromptBySlug`、`getPromptsByCategory`、`getPromptsByTag`、`getAllCategories`、`getAllTags` 等）。
- **优先级**: P0
- **状态**: ✅ 已完成
- **完成时间**: 2026-03-31
- **预估工时**: 4 小时
- **实际工时**: 10 分钟
- **依赖**: Task-2, Task-3
- **验收标准**:
  - [x] `lib/community-prompts.ts` 不再引用 `@/db/client` 或 `drizzle-orm`
  - [x] `getAllPrompts()` 返回从 `content/prompts/*.json` 聚合的数据
  - [x] `getAllCategories()` 返回 `content/categories.json` 内容
  - [x] `getAllTags()` 返回 `content/tags.json` 内容并关联 `categorySlugs` / `relatedTagSlugs`
  - [x] 所有现有导出函数仍能返回正确类型数据

#### Task-5: 修复 sitemap.ts 并移除对 DB 函数的依赖
- **描述**: `app/sitemap.ts` 当前通过 `getAllPrompts()` 和 `getAllCategories()` 生成 sitemap。在数据层迁移后，确认其无需修改或做必要调整；确保 `generateStaticParams` 在各社区路由页面正常工作。
- **优先级**: P0
- **状态**: ✅ 已完成
- **完成时间**: 2026-03-31
- **预估工时**: 2 小时
- **实际工时**: 5 分钟
- **依赖**: Task-4
- **验收标准**:
  - [x] `app/sitemap.ts` 不直接引用 DB 相关导入（已使用 JSON 版本的函数）
  - [x] `next build` 时 sitemap 能正确生成并包含所有社区页面 URL
  - [x] `/community/[slug]`、`/community/category/[slug]`、`/community/tag/[slug]` 的 `generateStaticParams` 正常返回参数列表

## 里程碑4: 清理数据库相关代码
**目标**: 删除废弃的 `db/`、`drizzle/`、`drizzle.config.ts`、`scripts/db/` 以及 `package.json` 中不再需要的脚本和依赖。
**预计完成时间**: 0.5 天

### 任务列表

#### Task-6: 删除数据库相关文件和目录
- **描述**: 删除 `apps/web/db/`、`apps/web/drizzle/`、`apps/web/drizzle.config.ts`、`apps/web/scripts/db/`。确认没有其它文件（如 `lib/`、`app/` 下的文件）仍引用这些路径。
- **优先级**: P0
- **状态**: ✅ 已完成
- **完成时间**: 2026-03-31
- **预估工时**: 2 小时
- **实际工时**: 5 分钟
- **依赖**: Task-4
- **验收标准**:
  - [x] `apps/web/db/` 已删除
  - [x] `apps/web/drizzle/` 已删除
  - [x] `apps/web/drizzle.config.ts` 已删除
  - [x] `apps/web/scripts/db/` 已删除
  - [x] 项目中无残留引用导致 TypeScript 编译失败

#### Task-7: 清理 package.json 中的数据库脚本和依赖
- **描述**: 移除 `apps/web/package.json` 中 `db:generate`、`db:migrate`、`db:seed` 脚本。检查并移除不再需要的依赖如 `drizzle-orm`、`pg`、`drizzle-kit`、`@neondatabase/serverless`、`@types/pg`、`tsx`、`dotenv`（如仅用于 DB 脚本）。运行 `pnpm install` 更新 lockfile。
- **优先级**: P0
- **状态**: ✅ 已完成
- **完成时间**: 2026-03-31
- **预估工时**: 2 小时
- **实际工时**: 15 分钟
- **依赖**: Task-6
- **验收标准**:
  - [x] `package.json` 中无 `db:*` 脚本
  - [x] 已移除不必要的数据库相关依赖
  - [x] `pnpm-lock.yaml` 已同步更新
  - [x] `pnpm compile` 通过

## 附录

### 风险点
- **Vite 版本冲突**: `web-extension` 的 TS 编译失败可能涉及深层依赖版本锁定，解决时需权衡升级 WXT 还是降级 `@tailwindcss/vite`，建议优先尝试类型断言（最小改动），若无效再考虑版本调整。
- **JSON 数据量大导致构建慢**: 若未来 prompts 数量超过数百条，全量 JSON 读取可能影响 `next build` 性能。当前 MVP 阶段（<100 条）无风险，后续可考虑增量索引。
- **路由页面依赖重构遗漏**: `community-prompts.ts` 被多处页面引用，重构后需全面检查 `app/[locale]/community/**` 下所有 `page.tsx` 确保导入和调用方式无需调整。

### 参考资料
- [NEW_TODO.md](/Users/xxx/Code/prompt-flow/NEW_TODO.md): 社区 MVP 的详细待办事项和内容字段定义
- [apps/web/CLAUDE.md](/Users/xxx/Code/prompt-flow/apps/web/CLAUDE.md): Web 应用架构和开发规范
- [apps/web-extension/CLAUDE.md](/Users/xxx/Code/prompt-flow/apps/web-extension/CLAUDE.md): 扩展应用开发和 WXT 规范

### 变更记录
- 2026-03-31: 初始计划创建，确认从 PostgreSQL 迁移到本地 JSON，并清理数据库代码。
