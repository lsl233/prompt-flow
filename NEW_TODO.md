# 提示词社区 MVP 待办事项

> 目标：使用本地 `json` 内容源，完成提示词社区的基础页面结构和 SEO 骨架验证。

## 1. MVP 范围

- [ ] 使用本地 `json` 作为内容源
- [ ] 重构 `/community`
- [ ] 新增 `/community/[slug]`
- [ ] 新增 `/community/category/[slug]`
- [ ] 新增 `/community/tag/[slug]`
- [ ] 完成基础 SEO：
  - metadata
  - sitemap
  - canonical
  - hreflang
  - 基础 JSON-LD
- [ ] 保留导入按钮
- [ ] 增加复制按钮
- [ ] 建立基础内链

## 2. 本地内容源

- [ ] 新建 `apps/web/content/prompts/`
- [ ] 新建 `apps/web/content/categories.json`
- [ ] 新建 `apps/web/content/tags.json`
- [ ] 将现有 [community-prompts.ts](/Users/xxx/Code/prompt-flow/apps/web/lib/community-prompts.ts) 迁移到本地 `json`

### Prompt 字段
- [ ] `id`
- [ ] `slug`
- [ ] `title`
- [ ] `summary`
- [ ] `content`
- [ ] `author`
- [ ] `category`
- [ ] `tags`
- [ ] `targetModels`
- [ ] `language`
- [ ] `variables`
- [ ] `promptType`
- [ ] `difficulty`
- [ ] `featured`
- [ ] `verified`
- [ ] `useCase`
- [ ] `exampleInput`
- [ ] `exampleOutput`
- [ ] `likes`
- [ ] `createdAt`

### 首批 category
- [ ] `writing`
- [ ] `coding`
- [ ] `image`
- [ ] `other`

### 首批 tag
- [ ] `chatgpt`
- [ ] `journal`
- [ ] `midjourney`
- [ ] `xiaohongshu`
- [ ] `marketing`
- [ ] `resume`

## 3. 内容读取工具

- [ ] 实现 `getAllPrompts()`
- [ ] 实现 `getPromptBySlug(slug)`
- [ ] 实现 `getFeaturedPrompts()`
- [ ] 实现 `getLatestPrompts()`
- [ ] 实现 `getPromptsByCategory(categorySlug)`
- [ ] 实现 `getPromptsByTag(tagSlug)`
- [ ] 实现 `getAllCategories()`
- [ ] 实现 `getCategoryBySlug(slug)`
- [ ] 实现 `getAllTags()`
- [ ] 实现 `getTagBySlug(slug)`
- [ ] 实现 `getFeaturedTags()`
- [ ] 实现 `getRelatedPrompts(prompt)`

## 4. 页面开发

### `/community`
- [ ] 增加 Hero
- [ ] 增加分类入口
- [ ] 增加热门 tag
- [ ] 增加精选 prompts
- [ ] 增加最新 prompts
- [ ] 增加 FAQ
- [ ] 增加 CTA

### `/community/[slug]`
- [ ] 展示标题和 summary
- [ ] 展示完整 prompt 内容
- [ ] 展示变量说明
- [ ] 展示适用模型
- [ ] 展示使用场景
- [ ] 展示示例输入/输出
- [ ] 展示 category 和 tags
- [ ] 展示作者
- [ ] 增加导入按钮
- [ ] 增加复制按钮
- [ ] 增加相关 prompts
- [ ] 支持 404

### `/community/category/[slug]`
- [ ] 展示 category 标题和描述
- [ ] 展示该分类下 prompts
- [ ] 展示相关 tags
- [ ] 增加 FAQ
- [ ] 增加 CTA
- [ ] 支持 404

### `/community/tag/[slug]`
- [ ] 展示 tag 标题和定义
- [ ] 展示该 tag 下 prompts
- [ ] 展示相关 category
- [ ] 展示相近 tags
- [ ] 增加 CTA
- [ ] 支持 404

## 5. 组件拆分

- [ ] `CommunityHero`
- [ ] `FeaturedPromptsSection`
- [ ] `LatestPromptsSection`
- [ ] `CategoryGrid`
- [ ] `HotTagsSection`
- [ ] `CommunityFAQ`
- [ ] `CommunityCTA`
- [ ] `PromptDetailHeader`
- [ ] `PromptContentBlock`
- [ ] `PromptVariables`
- [ ] `PromptExamples`
- [ ] `PromptActions`
- [ ] `RelatedPrompts`
- [ ] `CopyButton`

## 6. SEO

- [ ] 为 `/community` 实现 `generateMetadata`
- [ ] 为 `/community/[slug]` 实现 `generateMetadata`
- [ ] 为 `/community/category/[slug]` 实现 `generateMetadata`
- [ ] 为 `/community/tag/[slug]` 实现 `generateMetadata`
- [ ] 为 prompt detail 实现 `generateStaticParams`
- [ ] 为 category 实现 `generateStaticParams`
- [ ] 为 tag 实现 `generateStaticParams`
- [ ] 扩展 [sitemap.ts](/Users/xxx/Code/prompt-flow/apps/web/app/sitemap.ts)
- [ ] 为 `/community` 增加 `CollectionPage`
- [ ] 为 category/tag 页增加 `ItemList`
- [ ] 为 detail 页增加 `BreadcrumbList`
- [ ] 为 detail 页增加 `CreativeWork`
- [ ] 为 FAQ 增加 `FAQPage`

## 7. 导入、复制与空状态

- [ ] 保留 [ImportButton.tsx](/Users/xxx/Code/prompt-flow/apps/web/components/ImportButton.tsx)
- [ ] 调整导入逻辑适配 prompt `id` 或 `slug`
- [ ] 新增 `CopyButton`
- [ ] 增加搜索无结果空状态
- [ ] 增加 category/tag 无内容空状态
- [ ] 增加 detail 页 404 状态

## 8. 内链

- [ ] `/community` 链接到 category / tag / detail
- [ ] category 页链接到 detail / tag
- [ ] tag 页链接到 detail / category
- [ ] detail 页链接到相关 detail / tag / category

## 9. 内容准备

- [ ] 准备首批 20-50 条高质量 prompts
- [ ] 每条 prompt 至少补齐：
  - `title`
  - `summary`
  - `content`
  - `category`
  - `tags`
  - `useCase`
- [ ] 为重点 prompt 补齐：
  - `variables`
  - `targetModels`
  - `exampleInput`
  - `exampleOutput`

## 10. 推荐开发顺序

1. [ ] 扩展类型定义
2. [ ] 搭建本地内容目录与 JSON 文件
3. [ ] 实现内容读取工具
4. [ ] 开发 prompt detail 页
5. [ ] 重构 `/community`
6. [ ] 开发 category 页
7. [ ] 开发 tag 页
8. [ ] 补 metadata / sitemap / JSON-LD
9. [ ] 增加复制按钮与空状态
10. [ ] 完善内链和内容

## 11. MVP 验收标准

- [ ] `/community` 可浏览社区内容
- [ ] category 页可按主题聚合内容
- [ ] tag 页可按专题聚合内容
- [ ] detail 页可查看完整 prompt
- [ ] 用户可复制或导入 prompt
- [ ] 核心页面可独立索引
- [ ] sitemap 包含核心页面
- [ ] 静态生成正常
- [ ] 404 和空状态正常

