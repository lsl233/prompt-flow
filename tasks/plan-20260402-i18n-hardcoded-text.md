# 项目计划: 社区页面多语言文案迁移

## 概述
- **项目目标**: 排查并迁移社区页面中所有硬编码的中英文文案到 i18n 配置
- **背景**: 项目采用 `next-intl` + `getCommunityDictionary()` 双轨制 i18n，社区页面存在大量 `locale === "zh"` 硬编码判断需要统一迁移
- **预期成果**: 所有社区页面的 UI 文案统一走 `dictionary` 配置，支持中英文切换

## 技术栈
- **框架**: Next.js 15+ (App Router)
- **i18n**: next-intl + 自定义 getCommunityDictionary()
- **语言**: TypeScript

## 任务列表

### 阶段一: 基础配置扩展

- [x] Task-1: 扩展 CommunityDictionary 类型和 getCommunityDictionary() 函数
- [x] Task-2: 新增社区首页缺失的 i18n 字段

#### Task-1: 扩展 CommunityDictionary 类型和 getCommunityDictionary() 函数
- **描述**: 在 `components/community/CommunityUI.tsx` 的 `getCommunityDictionary()` 中新增以下 i18n 字段：
  - `indexPage` namespace: 社区首页的 SectionHeading 标题和描述
  - `categoryIndexPage` namespace: 分类索引页的 metadata、hero、section 文案
  - `tagIndexPage` namespace: 标签索引页的 metadata、hero、section 文案
  - `categoryPage` namespace: 分类详情页的 section 描述、FAQ 文案
  - `tagPage` namespace: 标签详情页的 section 描述
  - `promptDetailPage` namespace: Prompt 详情页的 section 描述
- **依赖**: -
- **验收标准**:
  - [x] 中英文文案完整覆盖所有页面组件
  - [x] 新增字段遵循现有命名规范
  - [x] TypeScript 类型检查通过

#### Task-2: 新增社区首页缺失的 i18n 字段
- **描述**: 在 `getCommunityDictionary()` 的 `indexPage` 中新增：
  - browseEntry: { title, description } - 浏览入口区域
  - categorySection: { title, description } - 分类区块
  - tagSection: { title, description } - 标签区块
  - featuredSection: { title, description } - 精选区块
  - latestSection: { title, description } - 最新区块
  - faqSection: { title, description } - FAQ 区块
- **依赖**: Task-1
- **验收标准**:
  - [x] 首页所有硬编码文案迁移完成

### 阶段二: 页面文案迁移

- [x] Task-3: 迁移 community/page.tsx 硬编码文案
- [x] Task-4: 迁移 category/page.tsx 硬编码文案
- [x] Task-5: 迁移 category/[slug]/page.tsx 硬编码文案
- [x] Task-6: 迁移 tag/page.tsx 硬编码文案
- [x] Task-7: 迁移 tag/[slug]/page.tsx 硬编码文案
- [x] Task-8: 迁移 community/[slug]/page.tsx 硬编码文案
- [x] Task-9: 迁移 CommunityUI.tsx 硬编码文案 (如 "likes")

#### Task-3: 迁移 community/page.tsx 硬编码文案
- **描述**: 将以下硬编码替换为 dictionary 调用：
  - 第 73-78 行：browseEntry section
  - 第 92-117 行：categoryIndex/tagIndex links
  - 第 125-126 行：categories section description
  - 第 137-138 行：tags section description
  - 第 145-146 行：featured section description
  - 第 153-154 行：latest section description
  - 第 161-162 行：faq section description
- **依赖**: Task-2
- **验收标准**:
  - [x] 所有 `locale === "zh"` 判断移除
  - [x] 中英文切换正常

#### Task-4: 迁移 category/page.tsx 硬编码文案
- **描述**: 将以下硬编码替换为 dictionary 调用：
  - generateMetadata 中的 title/description
  - CommunityHero 的 eyebrow、title、description、stats
  - SectionHeading 的 title、description
  - CommunityCTA 的 title
- **依赖**: Task-2
- **验收标准**:
  - [x] 所有硬编码文案迁移完成

#### Task-5: 迁移 category/[slug]/page.tsx 硬编码文案
- **描述**: 将以下硬编码替换为 dictionary 调用：
  - SectionHeading descriptions (3处)
  - CommunityFAQ items (3组问答)
- **依赖**: Task-2
- **验收标准**:
  - [x] FAQ 文案全部走 dictionary
  - [x] 中英文版本 FAQ 内容适当调整

#### Task-6: 迁移 tag/page.tsx 硬编码文案
- **描述**: 将以下硬编码替换为 dictionary 调用：
  - generateMetadata 中的 title/description
  - CommunityHero 的 eyebrow、title、description、stats
  - SectionHeading 的 title、description
  - CommunityCTA 的 title
- **依赖**: Task-2
- **验收标准**:
  - [x] 所有硬编码文案迁移完成

#### Task-7: 迁移 tag/[slug]/page.tsx 硬编码文案
- **描述**: 将以下硬编码替换为 dictionary 调用：
  - SectionHeading descriptions (3处)
- **依赖**: Task-2
- **验收标准**:
  - [x] 所有硬编码文案迁移完成

#### Task-8: 迁移 community/[slug]/page.tsx 硬编码文案
- **描述**: 将以下硬编码替换为 dictionary 调用：
  - SectionHeading description (1处)
- **依赖**: Task-2
- **验收标准**:
  - [x] 所有硬编码文案迁移完成

#### Task-9: 迁移 CommunityUI.tsx 硬编码文案
- **描述**: 将以下硬编码替换为 dictionary 调用：
  - PromptCard 组件中的 "likes" 文本
- **依赖**: Task-2
- **验收标准**:
  - [x] likes 标签支持 i18n

### 阶段三: 验证与清理

- [x] Task-10: 全局搜索确认无遗漏硬编码
- [x] Task-11: 运行 TypeScript 类型检查
- [x] Task-12: 运行构建验证

#### Task-10: 全局搜索确认无遗漏硬编码
- **描述**: 使用 Grep 搜索以下模式确认无遗漏：
  - `locale === "zh"`
  - 硬编码的中文文本（如 "浏览入口"、"分类索引"）
- **依赖**: Task-3 ~ Task-9
- **验收标准**:
  - [x] 社区目录下无 `locale === "zh"` 判断
  - [x] 无明显的硬编码中文文案

#### Task-11: 运行 TypeScript 类型检查
- **描述**: 执行 `pnpm compile` 确保类型安全
- **依赖**: Task-10
- **验收标准**:
  - [x] 编译无错误

#### Task-12: 运行构建验证
- **描述**: 执行 `pnpm --filter web build` 确保构建正常
- **依赖**: Task-11
- **验收标准**:
  - [x] 构建成功，无警告

## 附录

### 硬编码文案清单 (排查结果)

#### community/page.tsx
| 行号 | 内容 | 类型 |
|------|------|------|
| 73-78 | browseEntry section | 硬编码 |
| 92-117 | category/tag index links | 硬编码 |
| 125-162 | 各 section descriptions | 硬编码 |

#### category/page.tsx
| 行号 | 内容 | 类型 |
|------|------|------|
| 29-34 | metadata title/description | 硬编码 |
| 59-74 | CommunityHero 全字段 | 硬编码 |
| 80-101 | SectionHeading descriptions | 硬编码 |
| 108 | CTA title | 硬编码 |

#### category/[slug]/page.tsx
| 行号 | 内容 | 类型 |
|------|------|------|
| 87-104 | SectionHeading + FAQ | 硬编码 |

#### tag/page.tsx
| 行号 | 内容 | 类型 |
|------|------|------|
| 24-29 | metadata title/description | 硬编码 |
| 58-73 | CommunityHero 全字段 | 硬编码 |
| 78-84 | SectionHeading descriptions | 硬编码 |
| 136 | CTA title | 硬编码 |

#### tag/[slug]/page.tsx
| 行号 | 内容 | 类型 |
|------|------|------|
| 103-119 | SectionHeading descriptions | 硬编码 |

#### community/[slug]/page.tsx
| 行号 | 内容 | 类型 |
|------|------|------|
| 78 | SectionHeading description | 硬编码 |

#### CommunityUI.tsx
| 行号 | 内容 | 类型 |
|------|------|------|
| 440 | "likes" | 硬编码 |

### 风险点
- **FAQ 内容本地化**: FAQ 中的解释性文本需要中英文版本都有意义，需仔细翻译
- **Section descriptions**: 这些描述性文本是中性的说明文字，需要确保翻译准确

### 参考资料
- [next-intl 文档](https://next-intl-docs.vercel.app/)
- `apps/web/components/community/CommunityUI.tsx` - getCommunityDictionary() 实现参考
- `apps/web/messages/en.json` - 主 i18n 文件结构参考
