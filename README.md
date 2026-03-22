# 提示词社区规划总结

本次对话围绕 `PromptFlow` 的“提示词社区”功能展开，重点讨论了产品定位、信息架构、SEO 策略，以及 `category / tag / blog / community` 各类页面的职责边界。

核心结论如下：

- 提示词社区不应只是“静态提示词列表页”，而应升级为“可发现、可筛选、可验证、可复用”的提示词内容中心。
- 社区功能应从“展示 prompt 文本”升级为“提供可复用解决方案”，每条 prompt 需要有明确场景、适用模型、变量说明、示例和导入能力。
- SEO 不能只依赖 `/community` 一个总页，而应拆分为：
  - `/community`：社区总入口页
  - `/community/category/[slug]`：主分类聚合页
  - `/community/tag/[slug]`：细分专题页
  - `/community/[prompt-slug]`：单条 prompt 详情页
  - `/blog/[slug]`：流量型内容页
- `category` 和 `tag` 的区别：
  - `category` 是稳定的大类，承担导航和大词 SEO
  - `tag` 是灵活的专题标签，承接细分长尾需求
- `blog` 不应与社区页重复，而应承担“获取搜索流量并导流到社区/扩展”的职责。
- `/community` 的定位应是“提示词内容中心首页”，不是一个单纯的数据库结果页。

---

# 产品文档

## 1. 产品背景

当前社区页面已具备基础展示能力，包括：

- 社区首页入口
- 提示词卡片展示
- 分类标签
- 导入到扩展的按钮

但现阶段仍存在明显不足：

- 社区数据仍是静态本地数组
- 页面缺少真实投稿、审核、互动机制
- 搜索和筛选能力较弱
- 缺少详情页和场景化内容结构
- SEO 承接能力不足，只有总页，没有分类页、专题页、详情页

因此，需要将“提示词社区”从展示页面升级为完整的内容与增长体系。

## 2. 产品目标

### 2.1 核心目标

打造一个可以持续沉淀高质量 AI 提示词内容的社区系统，实现：

- 高质量 prompt 收集与分发
- 用户高效发现和复用 prompt
- 社区内容可被搜索引擎索引和放大
- 社区内容反哺 PromptFlow 扩展安装和使用

### 2.2 用户目标

用户来到社区后，应能完成以下任务：

- 快速找到适合自己场景的提示词
- 判断该提示词是否值得使用
- 一键导入或复制到自己的 Prompt 库
- 浏览同类主题，持续发现更多内容
- 贡献自己的提示词内容

## 3. 产品定位

提示词社区的定位不是“提示词展示墙”，而是：

**一个围绕 AI prompt 的内容中心、分发中心和复用中心。**

其核心价值在于：

- 帮用户找到可用 prompt
- 帮用户理解 prompt 的使用方式
- 帮用户将 prompt 转为可复用资产
- 帮产品获得自然流量和安装转化

## 4. 信息架构

## 4.1 页面结构

建议采用以下结构：

- `/community`
- `/community/category/[slug]`
- `/community/tag/[slug]`
- `/community/[prompt-slug]`
- `/blog/[slug]`

## 4.2 页面职责

### `/community`

社区总入口页，承担以下职责：

- 解释社区是什么
- 展示精选内容
- 提供搜索和入口导航
- 分发到 category / tag / detail
- 进行产品转化

### `/community/category/[slug]`

主分类聚合页，适合承接大类和高流量泛词，例如：

- writing
- coding
- image

职责：

- 建立站点主栏目结构
- 覆盖大类关键词
- 聚合同类 prompt
- 引导进入更细分主题和详情页

### `/community/tag/[slug]`

专题聚合页，适合承接细分场景和长尾需求，例如：

- journal
- midjourney
- xiaohongshu
- marketing

职责：

- 承接长尾关键词
- 满足具体使用场景
- 强化 prompt discovery

### `/community/[prompt-slug]`

单条 prompt 详情页，适合承接高意图和长尾搜索。

职责：

- 展示完整 prompt 内容
- 说明使用方式和场景
- 提供导入/复制
- 引导浏览相似 prompt

### `/blog/[slug]`

内容营销页，用于获取搜索流量并导流到社区和产品。

职责：

- 承接榜单型、指南型、场景型关键词
- 建立行业权威和主题覆盖
- 将内容流量导入社区详情页和扩展安装

## 5. 页面内容规划

## 5.1 `/community` 页面内容

建议包含：

1. Hero 区
- 标题
- 副标题
- 主 CTA
- 次 CTA

2. 搜索与主筛选
- 搜索框
- 分类入口
- 热门 tag
- 排序切换

3. 精选内容区
- 编辑精选
- 本周热门
- 最新发布
- 已验证内容

4. 分类导航区
- Writing
- Coding
- Image
- 未来扩展类目

5. 热门专题区
- ChatGPT
- Midjourney
- Journal
- Xiaohongshu
- Marketing
- Resume

6. 社区价值说明
- 社区收录什么
- 如何使用
- 如何导入
- 为什么可复用

7. 投稿入口
- 分享提示词
- 投稿规范
- 成为精选作者

8. FAQ

9. 最终 CTA

## 5.2 Category 页内容

建议结构：

1. 标题与导语
2. 精选 prompts
3. 热门 / 最新内容
4. 相关 tags
5. 使用指南
6. FAQ
7. CTA

适合覆盖大词，如：

- writing prompts
- drawing prompts
- coding prompts

## 5.3 Tag 页内容

建议结构：

1. 标题与专题定义
2. 相关 prompts 列表
3. 场景说明
4. 相关 tags / 上级 category
5. FAQ 或示例
6. CTA

适合覆盖长尾词，如：

- journal prompts for mental health
- midjourney portrait prompts
- xiaohongshu prompts

## 5.4 Prompt 详情页内容

每条 prompt 页建议包含：

- 标题
- 简介
- 完整 prompt 内容
- 适用场景
- 适用模型
- 变量说明
- 示例输入
- 示例输出
- 标签
- 作者信息
- 互动数据
- 相似 prompt 推荐
- 导入/复制按钮

## 5.5 Blog 内容规划

Blog 主要承担 SEO 流量获取，建议覆盖三类内容：

### 榜单型
示例：
- 100 Best ChatGPT Prompts
- 365 Journal Prompts
- 50 Drawing Prompts

### 指南型
示例：
- How to Build a Prompt Library
- How to Organize ChatGPT Prompts
- Prompt Management for AI Tools

### 场景型
示例：
- Xiaohongshu Prompts
- Resume Prompts
- Marketing Prompts
- Midjourney Prompts

## 6. 数据结构建议

当前字段较少，建议扩展为：

```ts
type CommunityPrompt = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  authorId: string;
  authorName: string;
  category: 'writing' | 'coding' | 'image' | 'other';
  tags: string[];
  targetModels: string[];
  language: string;
  variables: {
    name: string;
    required: boolean;
    description?: string;
  }[];
  promptType: 'plain' | 'template' | 'workflow';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  verified: boolean;
  featured: boolean;
  stats: {
    likes: number;
    saves: number;
    imports: number;
    views: number;
    successVotes: number;
  };
  createdAt: string;
  updatedAt: string;
};
```

## 7. 社区机制规划

社区要成立，至少要有以下机制：

- 投稿
- 审核
- 发布状态
- 点赞
- 收藏
- 导入统计
- “有效/无效”反馈
- 作者页

## 8. 功能优先级

建议按以下顺序推进：

### 第一阶段：可用
- Prompt 详情页
- 数据结构扩展
- 搜索与筛选增强
- 复制 / 导入 / 变量说明

### 第二阶段：社区化
- 投稿入口
- 审核状态
- 互动数据
- 作者页

### 第三阶段：增长化
- 排序模型升级
- category / tag SEO 页
- blog 内容联动
- 内链推荐系统

---

# 开发文档

## 1. 当前现状

已存在的关键代码：

- 社区页：[apps/web/app/[locale]/community/page.tsx](/Users/xxx/Code/prompt-flow/apps/web/app/[locale]/community/page.tsx)
- 社区数据：[apps/web/lib/community-prompts.ts](/Users/xxx/Code/prompt-flow/apps/web/lib/community-prompts.ts)
- 类型定义：[apps/web/types/prompt.ts](/Users/xxx/Code/prompt-flow/apps/web/types/prompt.ts)
- 导入按钮：[apps/web/components/ImportButton.tsx](/Users/xxx/Code/prompt-flow/apps/web/components/ImportButton.tsx)
- SEO 工具：[apps/web/lib/seo.ts](/Users/xxx/Code/prompt-flow/apps/web/lib/seo.ts)
- Sitemap：[apps/web/app/sitemap.ts](/Users/xxx/Code/prompt-flow/apps/web/app/sitemap.ts)
- Robots：[apps/web/app/robots.ts](/Users/xxx/Code/prompt-flow/apps/web/app/robots.ts)

现状特点：

- 社区内容为本地静态数组
- 无详情页路由
- 无 category/tag 独立页
- sitemap 仅包含 `/` 和 `/community`
- 页面 metadata 基础能力已具备
- 具备多语言 alternate 基础

## 2. 技术目标

开发目标包括：

- 完成社区页面体系拆分
- 增强 prompt 数据结构
- 支持详情页、分类页、标签页
- 支持后续 SEO 拓展
- 为未来投稿和互动功能预留结构

## 3. 路由规划

建议新增路由：

- `apps/web/app/[locale]/community/page.tsx`
- `apps/web/app/[locale]/community/category/[slug]/page.tsx`
- `apps/web/app/[locale]/community/tag/[slug]/page.tsx`
- `apps/web/app/[locale]/community/[slug]/page.tsx`
- `apps/web/app/[locale]/blog/[slug]/page.tsx`

如需静态生成，可配合：

- `generateStaticParams`
- `generateMetadata`

## 4. 类型设计

建议新增类型：

```ts
export type PromptCategory = 'writing' | 'coding' | 'image' | 'other';

export interface PromptVariable {
  name: string;
  required: boolean;
  description?: string;
}

export interface PromptStats {
  likes: number;
  saves: number;
  imports: number;
  views: number;
  successVotes: number;
}

export interface CommunityPrompt {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  authorId: string;
  authorName: string;
  category: PromptCategory;
  tags: string[];
  targetModels: string[];
  language: string;
  variables: PromptVariable[];
  promptType: 'plain' | 'template' | 'workflow';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  verified: boolean;
  featured: boolean;
  stats: PromptStats;
  createdAt: string;
  updatedAt: string;
}
```

可新增：

```ts
export interface PromptCategoryMeta {
  slug: string;
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export interface PromptTagMeta {
  slug: string;
  name: string;
  description: string;
  category?: PromptCategory;
  seoTitle: string;
  seoDescription: string;
}
```

## 5. 数据层规划

短期可继续使用本地数据文件，但建议从“纯数组”升级为“结构化内容源”。

建议拆分：

- `apps/web/lib/community-prompts.ts`
- `apps/web/lib/community-categories.ts`
- `apps/web/lib/community-tags.ts`

需要支持的方法：

```ts
getAllPrompts()
getPromptBySlug(slug)
getPromptsByCategory(category)
getPromptsByTag(tag)
getFeaturedPrompts()
getVerifiedPrompts()
getPopularPrompts()
searchPrompts(query)
getAllCategories()
getAllTags()
```

## 6. 页面实现规划

## 6.1 Community 总页

保留现有页面路径，重构内容模块。

建议拆分组件：

- `CommunityHero`
- `CommunitySearchBar`
- `FeaturedPromptsSection`
- `CategoryGrid`
- `HotTagsSection`
- `CommunityFAQ`
- `CommunityCTA`

## 6.2 Category 页

新增页面：

- `apps/web/app/[locale]/community/category/[slug]/page.tsx`

功能：

- 根据 slug 获取 category meta
- 获取该分类下 prompts
- 输出独立 metadata
- 增加 FAQ 和介绍文案
- 提供内部链接到相关 tags 和 detail

## 6.3 Tag 页

新增页面：

- `apps/web/app/[locale]/community/tag/[slug]/page.tsx`

功能：

- 获取 tag meta
- 获取该 tag 下 prompts
- 输出独立 metadata
- 页面文案更专题化
- 提供返回上级分类的导航

## 6.4 Prompt 详情页

新增页面：

- `apps/web/app/[locale]/community/[slug]/page.tsx`

功能：

- 获取单条 prompt
- 渲染完整内容和结构化说明
- 提供复制/导入
- 渲染相似 prompt
- 输出 JSON-LD 和 metadata

## 6.5 Blog 页

新增页面：

- `apps/web/app/[locale]/blog/[slug]/page.tsx`

建议数据源后续支持 MDX 或 CMS。

## 7. SEO 技术实现

## 7.1 Metadata

现有 `buildPageMetadata` 可继续复用，路径在 [seo.ts](/Users/xxx/Code/prompt-flow/apps/web/lib/seo.ts)。

后续需要为以下页面生成独立 metadata：

- community 总页
- category 页
- tag 页
- detail 页
- blog 页

建议 detail/category/tag 页面都包含：

- title
- description
- canonical
- alternates
- openGraph
- twitter

## 7.2 Sitemap

当前 sitemap 仅包含 `/` 和 `/community`，需扩展。

建议加入：

- 所有 category 页
- 所有 tag 页
- 所有 prompt 详情页
- 所有 blog 页

## 7.3 Structured Data

建议支持：

- `BreadcrumbList`
- `CollectionPage`
- `ItemList`
- `FAQPage`

detail 页可酌情加入：

- `CreativeWork`
- `HowTo`

## 7.4 内链系统

需要建立稳定内链关系：

- `/community` -> category / tag / detail
- `category` -> tag / detail
- `tag` -> detail / category
- `blog` -> category / tag / detail
- `detail` -> related detail / category / tag

## 8. 内容生成规则

为避免生成薄页，tag 页建议设置生成门槛：

- 至少 5-10 条高质量 prompts
- 有明确搜索意图
- 有可写的 intro / FAQ / SEO 描述
- 页面内容不能仅是重复列表

category 页可全量生成，tag 页建议人工筛选首批。

## 9. 交互与产品动作

建议保留并扩展 `ImportButton`，同时支持：

- 导入到 PromptFlow
- 复制 prompt
- 收藏
- 成功反馈提示

详情页建议补：

- `CopyButton`
- `SaveButton`
- `ShareButton`

## 10. 推荐迭代顺序

### Milestone 1
- 扩展 `CommunityPrompt` 类型
- 新增 prompt 详情页
- 重构 `/community`
- 扩展 sitemap

### Milestone 2
- 新增 category 页
- 新增 tag 页
- 增强 metadata
- 新增 JSON-LD

### Milestone 3
- 新增 blog 架构
- 建立内链系统
- 添加精选、热门、已验证逻辑

### Milestone 4
- 投稿与审核
- 收藏/点赞/导入统计
- 作者页
- 排序机制升级

## 11. 验收标准

### 产品层
- 用户能从社区入口快速找到目标 prompt
- 用户能理解 prompt 如何使用
- 用户能完成导入/复制
- 页面结构清晰，支持持续扩展

### SEO 层
- category/tag/detail/blog 均可独立索引
- sitemap 包含主要内容页
- 页面具有独立 metadata 和 canonical
- 形成合理内链网络

### 工程层
- 数据结构支持未来 CMS 或数据库迁移
- 页面组件职责清晰
- 文案和 SEO 元信息可国际化
- 后续社区互动能力可平滑接入

如果你需要，我下一步可以继续输出一版更偏执行的内容：
- `PRD v1`
- `技术任务拆解 TODO`
- `字段表设计`
- `页面文案模板`
