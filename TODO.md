# PromptFlow 功能清单

> 最后更新于 2026-03-10

---

## 🟢 待办（体验优化）

### 1. UI/UX 改进

**可改进项**：
- [ ] 拖拽排序 prompt 或文件夹
- [ ] 批量操作（批量删除、批量添加标签）
- [x] Tag 可以置顶（常用 Tag 快速访问）✅ 已完成

### 2. 键盘快捷键支持

**文件**：`entrypoints/background.ts`

**需求**：
- [ ] 用户可自定义快捷键配置
- [ ] 快捷键冲突检测与提示

### 3. VariableFillerModal 预览区支持直接编辑

**文件**：`entrypoints/options/components/Modals/VariableFillerModal.tsx:150-154`

**需求**：
- [ ] 预览区域从只读改为可编辑（`pre` 标签改为 `textarea` 或 `contentEditable`）

### 4. VariableFillerModal 复制成功提示 ✅

**文件**：`entrypoints/options/components/Modals/VariableFillerModal.tsx`

**已完成**：
- [x] 复制成功后展示 toast 提示（当前只有图标变化）
- [x] 使用命令式 Toast API (`toast.success()`) 简化代码

### 5. Toast 组件命令式 API ✅

**文件**：`shared/components/Toast/`

**已完成**：
- [x] 创建命令式 Toast API (`toast.show()`, `toast.success()`, `toast.error()`)
- [x] 支持 `contentScript` 选项以适配 content script 环境
- [x] 使用 `ToastProvider` 管理全局 toast 状态
- [x] 保留声明式 Toast 组件用于向后兼容
- [x] 删除独立的 `ContentToast.tsx` 文件

### 6. Popup 权限检测与 Content Script 注入 ✅

**文件**：`entrypoints/popup/App.tsx`, `entrypoints/background.ts`

**已完成**：
- [x] 用户点击 popup 时检测当前网站是否有权限注入 content script
- [x] 如果没有权限，显示授权提示并引导用户授权
- [x] 授权成功后自动注入 content script
- [x] Popup 中增加"打开 Prompt Picker"按钮，点击后注入并打开 content script

### 7. 设置模块 - 功能整合与信息展示 ✅ 已完成

**文件**：`entrypoints/options/App.tsx`, `entrypoints/options/components/SettingsPanel.tsx`

**已完成**：
- [x] 导入/导出功能移到设置模块
  - 新建 SettingsPanel 组件，包含 Import/Export、Shortcuts、About 三个标签页
  - 从 Sidebar 移除导入/导出按钮，改为设置入口
- [x] 版本号查看
  - 从 `wxt.config.ts` 读取版本号（1.0.3）
  - 在设置面板 About 标签页显示扩展版本
- [x] 快捷键查看
  - 从 manifest 的 `commands` 配置读取快捷键（Ctrl+ShiftP / Cmd+Shift+P）
  - 在 Shortcuts 标签页展示并说明如何自定义

**新增文件**：
- `entrypoints/options/components/SettingsPanel.tsx` - 设置面板主组件

---

## 🖥️ Web 项目（Next.js）

### 1. 基础架构 ✅

- [x] Next.js 15 + React 19 项目初始化
- [x] Tailwind CSS v4 配置
- [x] 项目目录结构规划

### 2. i18n 国际化支持 ✅

**已完成**：
- [x] 集成 `next-intl`
- [x] 配置语言路由 `/zh` `/en`
- [x] 创建语言文件结构
- [x] 封装翻译 Hook

**相关文件**：
- `apps/web/middleware.ts`
- `apps/web/i18n/routing.ts`
- `apps/web/messages/en.json`
- `apps/web/messages/zh.json`
- `apps/web/app/[locale]/`

### 3. 落地页（首页）开发

**参考文档**：`PROJECT.md` 第 6、7 章、`docs/DISCUSSION_SUMMARY_20260311.md`

**页面结构**：
- [x] Hero 区域（核心价值主张 + 主 CTA）- 已更新文案
- [ ] 平台 Logo 墙（新增板块 - 展示 10+ AI 平台）
- [x] 功能特性展示（4张卡片 - 已更新 SEO 文案）
- [ ] 热门提示词预览（新增板块 - 3-4个社区精选）
- [x] 使用步骤（3步流程 - 已更新）
- [ ] 用户评价（新增板块 - 3条评价 + Chrome Store 评分）
- [x] 最终 CTA（已更新）
- [ ] Footer（更新品牌名和文案）

**文案需求**：
- [x] Hero 标题 + 副标题（双语）- ✅ 已完成
- [x] 功能特性描述（双语）- ✅ 已完成
- [x] CTA 按钮文案 - ✅ 已完成

**技术要点**：
- [ ] 响应式设计
- [ ] 深色模式支持
- [ ] 性能优化（图片懒加载）

#### 3.1 新增板块详细需求

**平台 Logo 墙**（紧接 Hero）
- **文件**：`app/[locale]/_components/PlatformLogos.tsx`
- **功能**：展示 8-10 个 AI 平台 Logo（ChatGPT, Claude, Gemini, DeepSeek, Kimi, Midjourney, etc.）
- **文案**：`home.platforms.title` - "在以下 AI 工具中无缝使用"

**热门提示词预览**（紧接功能特性）
- **文件**：`app/[locale]/_components/PopularPrompts.tsx`
- **功能**：展示 3-4 个提示词卡片预览（标题、摘要、使用次数、评分）
- **文案**：`home.popularPrompts.title` - "看看社区用户在用什么"
- **数据**：需要准备 4-6 个种子提示词数据

**用户评价**（CTA 之前）
- **文件**：`app/[locale]/_components/Testimonials.tsx`
- **功能**：3 条用户评价卡片（头像、姓名、评价内容、星级）
- **文案**：`home.testimonials.title` - "用户的真实反馈"
- **数据**：需要准备 3-5 条真实用户评价

### 4. 社区功能开发

**依赖**：Supabase 项目创建、数据库设计

#### 4.1 数据库设计

**文件**：`apps/web/supabase/schema.sql`

- [ ] 创建 `categories` 表（分类）
- [ ] 创建 `community_prompts` 表（社区提示词）
- [ ] 创建 `user_purchases` 表（购买记录）
- [ ] 设置 RLS（行级安全）策略

#### 4.2 社区首页 `/prompts`

- [ ] 页面布局（侧边栏分类 + 主内容区）
- [ ] 分类导航组件
- [ ] 热门/最新 Tab 切换
- [ ] 提示词卡片组件（标题、摘要、作者、点赞/保存数）
- [ ] 分页或无限滚动加载

#### 4.3 提示词详情页 `/prompts/[id]`

**URL 结构**：`/prompts/{slug}` 或 `/prompts/{id}/{slug}`

- [ ] 提示词内容展示（支持变量高亮）
- [ ] 一键复制按钮（带成功提示）
- [ ] 作者信息卡片
- [ ] 点赞/保存功能（需登录）
- [ ] 相关推荐（同分类其他提示词）
- [ ] SEO Meta 标签动态生成
- [ ] 结构化数据（JSON-LD）

#### 4.4 分类页 `/categories/[slug]`

- [ ] 分类信息展示（标题、描述）
- [ ] 该分类下的提示词列表
- [ ] 分类 SEO 优化

### 5. 用户系统

**依赖**：Supabase Auth

- [ ] 登录页 `/login`
- [ ] 注册页 `/register`
- [ ] 用户中心 `/dashboard`
  - [ ] 我的提示词列表（从扩展同步的）
  - [ ] 购买记录/已解锁功能
  - [ ] 个人资料设置

### 6. SEO 优化

- [ ] Sitemap.xml 动态生成
- [ ] Robots.txt 配置
- [ ] Open Graph / Twitter Card 元标签
- [ ] 多语言 hreflang 标签
- [ ] 结构化数据（JSON-LD）
  - [ ] Article（博客文章）
  - [ ] ItemList（列表页）
  - [ ] HowTo（提示词详情页）

### 7. 博客系统（可选 Phase 2）

- [ ] 博客列表页 `/blog`
- [ ] 博客详情页 `/blog/[slug]`
- [ ] MDX 支持
- [ ] 文章结构化数据

---

## 🔧 后端与支付

### 1. Supabase 项目设置

- [ ] 创建 Supabase 项目
- [ ] 配置环境变量（`NEXT_PUBLIC_SUPABASE_URL` 等）
- [ ] 初始化数据库 Schema
- [ ] 配置 Auth（邮箱 + 社交登录）

### 2. 扩展与网页数据同步

**方案待确定**：
- 方案 A：用户登录后，扩展通过 API 拉取社区提示词
- 方案 B：网页端生成分享码/链接，扩展扫码/点击导入

### 3. 支付集成（PayPal）

**参考**：PayPal Developer Docs

- [ ] 创建 PayPal 开发者账号
- [ ] 配置 PayPal Buttons（一次性付款）
- [ ] 后端验证支付状态（Edge Function）
- [ ] 解锁对应功能（更新 user_purchases 表）

---

## ✅ 已完成（归档）

<details>
<summary>点击展开已完成的 10 项功能</summary>

### 高优先级
1. **Content Script** - 网页端 FloatingPopup 注入 (`content.ts`)
2. **Background Script** - 核心服务逻辑 (`background.ts`)

### 中优先级
3. **Topbar 搜索框** - 实时搜索、下拉列表、键盘导航
4. **Sidebar 标签过滤** - 标签点击过滤、高亮选中
5. **Prompt 版本历史** - 限制 20 个版本、支持删除特定版本
6. **数据导入导出** - 合并模式、去重策略、预览、确认对话框

### 低优先级
7. **数据持久化优化** - 数据结构版本号（v2）
8. **UI/UX** - 深色模式切换闪烁问题修复
9. **提示词使用统计** - useCount、lastUsedAt、Recently Used / Most Used 列表
10. **主题切换样式修复** - Tailwind v4 添加 `@custom-variant dark` 配置

### 2026-03-05 至 2026-03-06 完成
11. **Content Script 交互优化** - 点击外部关闭弹窗、Toast 提示
12. **组件重构** - TagSelector 提取为独立组件
13. **i18n 文案补全** - VariableFillerModal 国际化
14. **Dashboard 统计项优化** - 点击直接打开 VariableFillerModal
15. **Sidebar Logo 更新** - 替换为 SVG 图标
16. **Content Script 匹配模式优化** - 默认仅匹配主流 AI 网站
17. **Popup Logo 更新** - 替换为 SVG 图标
18. **Popup 权限检测** - 权限检测与 Content Script 动态注入

</details>
