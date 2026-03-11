# PromptFlow 项目文档

> 本文档记录 PromptFlow 的产品定位、技术架构和规划
> 最后更新：2026-03-10

---

## 一、项目概述

**PromptFlow** 是一个帮助用户管理和快速调用提示词/提示词模版的工具。

**核心价值**：在 ChatGPT、Claude、DeepSeek 等主流 AI 工具中，按 ⌘K 即可快速调用你收藏的提示词，告别重复输入。

**Slogan**：提示词，一键即达 / Prompts at Your Fingertips

---

## 二、产品定位

### 2.1 目标用户

| 用户类型 | 核心需求 | 典型场景 |
|---------|---------|---------|
| **个人用户** | 管理常用提示词，提高效率 | 日常办公、学习研究 |
| **内容创作者** | 快速调用优质提示词生成内容 | 写作、营销、社交媒体 |
| **开发者** | 管理代码相关的 system prompts | 编程辅助、代码审查 |

### 2.2 核心差异化

与市面竞品（AIPRM、PromptPerfect 等）相比：

| 竞品局限 | PromptFlow 优势 |
|---------|----------------|
| AIPRM 仅限 ChatGPT 使用 | 支持多平台：ChatGPT、Claude、Gemini、DeepSeek、Kimi、豆包等 |
| PromptPerfect 已停止服务 | 持续迭代，专注提示词管理 |
| 其他插件无社区功能 | 开放社区 + 编辑精选，SEO 友好 |
| 数据同步依赖云服务 | 本地优先保护隐私，可选跨设备同步 |

### 2.3 使用场景

**典型流程**：
1. 用户在浏览器扩展中管理提示词（Option 页面）
2. 在 ChatGPT/Claude 等页面按 ⌘K 呼出选择器
3. 选择提示词后自动复制
4. 在输入框 ⌘V 粘贴发送

**社区发现流程**：
1. 用户在网页端浏览社区精选提示词
2. 发现优质提示词后保存到本地扩展
3. 在 AI 工具中快速调用

---

## 三、产品形态

### 3.1 浏览器扩展（核心产品）

**技术栈**：WXT + React + TypeScript

**核心功能**：
- **Option 页面**：管理提示词/文件夹、标签系统、版本历史、导入导出
- **Content Script**：在授权页面注入 ⌘K 提示词选择器
- **Popup**：快速授权检测、快捷入口
- **存储**：本地优先（Storage API），可选云端同步

**支持站点**：
```
chat.openai.com
claude.ai
gemini.google.com
perplexity.ai
you.com
bing.com
chat.deepseek.com
www.kimi.com
www.doubao.com
yuanbao.tencent.com
www.qianwen.com
```

### 3.2 网页端（流量入口 + 社区）

**技术栈**：Next.js 15 + React 19 + TypeScript + Tailwind CSS

**部署**：Vercel

**页面规划**：

| 页面 | 路径 | 功能描述 | SEO 价值 |
|-----|------|---------|---------|
| 首页 | `/[locale]` | 产品价值主张 + 功能介绍 + 定价 + CTA | 品牌词 |
| 社区首页 | `/[locale]/prompts` | 分类导航 + 热门/最新提示词列表 | 核心流量页 |
| 提示词详情 | `/[locale]/prompts/[id]` | 提示词展示 + 一键复制 | 长尾关键词主力 |
| 分类页 | `/[locale]/categories/[slug]` | 某类提示词聚合 | 分类关键词 |
| 博客 | `/[locale]/blog` | 提示词教程、使用技巧 | 内容营销 |
| 用户中心 | `/[locale]/dashboard` | 我的提示词、购买记录 | - |
| 登录/注册 | `/[locale]/login` | Supabase Auth | - |

**多语言路由**：
- `/` → 英文（默认）
- `/en` → 英文
- `/zh` → 中文

---

## 四、商业模式

### 4.1 功能点付费（按功能解锁）

区别于传统的订阅制，采用**功能点付费**模式：

| 功能 | 价格 | 说明 |
|-----|------|------|
| 基础版 | 免费 | 有限的保存数量、基础变量 |
| 扩展保存数量 | $2 | 解锁更多提示词保存额度 |
| 高级变量 | $3 | 支持复杂变量模板 |
| 跨设备同步 | $3 | 云端同步提示词数据 |

### 4.2 社区内容策略

- **开放浏览**：社区内容 SEO 友好，无需登录即可查看
- **精选机制**：编辑精选 + 用户点赞/保存排名
- **分享激励**：优质提示词分享可获得曝光

### 4.3 支付方案

- **收款方式**：PayPal（适合中国大陆个人开发者）
- **备选方案**：Stripe（如有海外主体）

---

## 五、技术架构

### 5.1 Monorepo 结构

```
prompt-flow/
├── apps/
│   ├── web-extension/     # 浏览器扩展 (WXT)
│   └── web/               # 网页应用 (Next.js)
├── packages/
│   └── (shared)/          # 共享包（如需要）
├── TODO.md                # 功能清单
└── PROJECT.md             # 项目文档（本文档）
```

### 5.2 后端服务

**推荐方案**：Supabase

| 模块 | 用途 |
|-----|------|
| Auth | 用户注册/登录、社交登录 |
| PostgreSQL | 用户数据、社区提示词、统计数据 |
| Storage | 用户头像、提示词封面 |
| Edge Functions | 支付回调、AI 翻译 |

**选择理由**：
- 开源，可自托管避坑
- 免费额度 generous（500MB 数据库、1GB 存储）
- Auth + Database + Storage 一体，减少集成成本

### 5.3 数据库设计（初稿）

```sql
-- 用户表（由 Supabase Auth 管理）
-- 社区提示词表
community_prompts (
  id,
  author_id,
  title,
  content,
  variables,        -- JSON 数组
  category_id,
  tags,             -- JSON 数组
  use_count,
  save_count,
  like_count,
  is_featured,      -- 编辑精选
  created_at,
  updated_at
)

-- 分类表
categories (
  id,
  slug,             -- URL 友好标识
  name_zh,
  name_en,
  description_zh,
  description_en,
  sort_order
)

-- 用户购买记录表
user_purchases (
  id,
  user_id,
  feature_type,     -- 'storage' | 'variables' | 'sync'
  amount,
  currency,
  status,
  created_at
)
```

---

## 六、品牌与文案

### 6.1 品牌元素

| 元素 | 内容 |
|-----|------|
| 品牌名 | PromptFlow |
| 中文 Slogan | 提示词，一键即达 |
| 英文 Slogan | Prompts at Your Fingertips |
| 视觉风格 | 现代简约 |
| 主色调 | （待确定）|

### 6.1.1 品牌关键词部署策略

**核心原则**：品牌词必须出现在关键位置，同时兼顾 SEO 非品牌词流量。

| 位置 | 部署方式 | 示例 |
|-----|---------|------|
| **Title 标签** | 品牌前置 + 核心价值词 | `PromptFlow - AI 提示词库 \| 管理你的 ChatGPT、Claude、DeepSeek 提示词` |
| **Logo** | 品牌名 | PromptFlow |
| **Meta Description** | 自然提及 1-2 次 | "PromptFlow 是你的个人 AI 提示词库..." |
| **H1 标题** | 品牌 + 功能 | "用 PromptFlow 管理你的 AI 提示词库" |
| **CTA 按钮** | 品牌名强化 | "免费安装 PromptFlow" |
| **用户评价** | 第三方背书 | "PromptFlow 帮我节省了..." |
| **Footer** | 品牌保护 | "© 2026 PromptFlow. All rights reserved." |

### 6.2 核心价值主张

**中文**：
> 在 ChatGPT、Claude、DeepSeek 等 AI 工具中，按 ⌘K 快速调用你的提示词库。发现社区精选，分享你的创作。

**英文**：
> Access your prompt library in ChatGPT, Claude, DeepSeek and more with ⌘K. Discover community favorites, share your own.

### 6.3 社区分类（第一批）

| 分类（中文） | 分类（英文） | 目标关键词 |
|------------|------------|-----------|
| 写作内容 | Writing | ChatGPT 写作提示词 |
| 编程开发 | Coding | Claude 编程提示 |
| 图像生成 | Image Generation | Midjourney 提示词 |
| 办公效率 | Productivity | AI 办公助手提示词 |
| 学习研究 | Learning | 学习助手提示词 |
| 营销运营 | Marketing | 营销文案提示词 |
| 角色扮演 | Roleplay | AI 角色扮演提示词 |

---

## 七、网页端 SEO 策略

### 7.1 页面 SEO 结构

**首页（Landing Page）**：

| 元素 | 中文 | 英文 |
|-----|------|------|
| **Title** | `PromptFlow - AI 提示词库 \| 管理你的 ChatGPT、Claude、DeepSeek 提示词` | `PromptFlow - AI Prompt Library \| Manage Your ChatGPT, Claude & DeepSeek Prompts` |
| **Description** | PromptFlow 是你的个人 AI 提示词库。在 ChatGPT、Claude、DeepSeek、Kimi 等任意 AI 工具中，按 ⌘K 一键调用保存的提示词。 | PromptFlow is your personal AI prompt library. Press ⌘K to instantly access saved prompts in ChatGPT, Claude, DeepSeek, Kimi and more. |

**Title 策略说明**：
- 采用**平衡型策略**：品牌前置 + 通用类目词 + 多平台列举
- 避免过度限定单一平台（如 "ChatGPT 提示词库"），突出跨平台通用性
- 同时服务品牌搜索用户（"PromptFlow"）和需求搜索用户（"AI prompt library"）

**社区列表页**：
- **Title (中文)**: `发现优质 AI 提示词 | PromptFlow Community`
- **Title (英文)**: `Discover AI Prompts | PromptFlow Community`
- **结构化数据**: ItemList

**提示词详情页**：
- **Title**: `{提示词标题} | PromptFlow`
- **Description**: {提示词前 150 字符}
- **结构化数据**: Article/HowTo
- **URL**: `/prompts/{slug}`

**分类页**：
- **Title**: `{分类名} 提示词精选 | PromptFlow`
- **Description**: 发现最佳 {分类名} AI 提示词，提升你的工作效率...

### 7.2 技术 SEO 清单

- [ ] Sitemap.xml 自动生成
- [ ] Robots.txt 配置
- [ ] 结构化数据（JSON-LD）
- [ ] Open Graph / Twitter Card
- [ ] 多语言 hreflang 标签
- [ ] 页面性能优化（Core Web Vitals）
- [ ] 图片懒加载 + WebP 格式

---

## 八、内容策略

### 8.1 博客内容方向

| 类型 | 示例标题 | 目的 |
|-----|---------|------|
| 提示词合集 | 10 个提升写作效率的 ChatGPT 提示词 | SEO 流量 |
| 使用教程 | 如何用 PromptFlow 管理你的提示词库 | 产品教育 |
| 案例分享 | 我是如何用 AI 提示词提升工作效率的 | 用户故事 |
| 行业动态 | 2024 年最佳 AI 提示词管理工具对比 | 品牌曝光 |

### 8.2 社区内容运营

- **种子内容**：官方创建 50-100 个高质量提示词
- **精选机制**：每周精选 5 个优质提示词展示在首页
- **用户激励**：优质分享者获得徽章/展示位

---

## 九、里程碑规划

### Phase 1：MVP（当前）
- [x] 浏览器扩展基础功能
- [x] 提示词管理、标签、文件夹
- [x] ⌘K 快速调用
- [ ] 网页端基础框架

### Phase 2：社区上线
- [ ] 社区分享功能
- [ ] 用户账号系统
- [ ] 提示词详情页 SEO
- [ ] 基础支付集成

### Phase 3：商业化
- [ ] 功能点付费解锁
- [ ] 高级变量功能
- [ ] 跨设备同步
- [ ] 团队/协作功能（可选）

---

## 十、附录

### 10.1 竞品分析

| 竞品 | 优势 | 劣势 | 我们的机会 |
|-----|------|------|-----------|
| AIPRM | 功能丰富、社区活跃 | 仅限 ChatGPT、价格较高 | 多平台支持、更简洁 |
| PromptPerfect | 提示词优化 | 已停止服务 | 承接流失用户 |
| Snack Prompt | 社区内容丰富 | 英文为主、扩展体验一般 | 双语支持、更好的扩展体验 |

### 10.2 参考资源

- **Next.js i18n**: https://nextjs.org/docs/app/guides/internationalization
- **Supabase 文档**: https://supabase.com/docs
- **WXT 文档**: https://wxt.dev/
- **PayPal 开发者**: https://developer.paypal.com/

---

**文档维护**：本文档由项目维护者更新，重大变更需同步团队。