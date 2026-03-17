# PromptFlow Web 任务分解

> 定位：专业 AI 提示词管理工具（浏览器扩展）为主，轻量社区为辅
> 版本：v1.0 首页重构

---

## 任务 1：Hero 区域重构

**描述**：将首页 Hero 区域从"内容门户"导向改为"工具产品"导向

**涉及文件**：
- `apps/web/app/[locale]/page.tsx`
- `apps/web/messages/zh.json`
- `apps/web/messages/en.json`
- `apps/web/messages/zh-Hant.json`

**具体需求**：
1. 修改主标题文案为"专业 AI 提示词管理工具"相关
2. 修改副标题突出"一键调用"、"跨平台支持"
3. 替换两个并列 CTA 为单一主 CTA "免费安装" + 次要 "查看演示"
4. 添加产品演示区域（视频/GIF 占位，先用静态图）
5. 更新 i18n 文案

**验收标准**：
- [ ] Hero 区域展示工具产品定位
- [ ] 文案支持中英繁三种语言
- [ ] 响应式布局正常
- [ ] 点击"免费安装"跳转到 Chrome Web Store（先用占位链接）

---

## 任务 2：核心功能展示模块

**描述**：添加简洁的 3 个核心卖点展示

**涉及文件**：
- `apps/web/app/[locale]/page.tsx`
- `apps/web/messages/*.json`

**具体需求**：
1. 在 Hero 下方添加 Features 模块
2. 展示 3 个核心功能：
   - ⌘K 快速唤起（一键调用）
   - 智能分类管理（标签+搜索）
   - 跨平台支持（ChatGPT/Claude/DeepSeek 等）
3. 每个功能包含：图标、标题、一句话描述
4. 使用 Lucide 图标

**验收标准**：
- [ ] 3 个功能卡片横向排列（桌面端），移动端纵向堆叠
- [ ] 图标风格统一
- [ ] 文案国际化

---

## 任务 3：社区精选板块（轻量）

**描述**：添加社区热门提示词展示板块，强调"可导入"

**涉及文件**：
- `apps/web/app/[locale]/page.tsx`
- `apps/web/lib/community-prompts.ts`（新建）
- `apps/web/messages/*.json`

**具体需求**：
1. 创建社区提示词数据文件 `lib/community-prompts.ts`
2. 预置 6 条示例数据（标题、作者、点赞数、内容预览）
3. 在首页展示 3 条热门提示词卡片
4. 每张卡片包含：
   - 提示词标题
   - 作者名
   - 点赞数
   - "导入到个人库"按钮（需安装插件提示）
5. 添加"浏览社区 →"链接（链接到 /community）

**验收标准**：
- [ ] 社区板块数据从独立文件读取
- [ ] 卡片展示正常
- [ ] "导入"按钮点击提示"请安装 PromptFlow 插件以使用此功能"
- [ ] 空状态处理：数据为空时显示"成为第一个贡献者"

---

## 任务 4：使用场景模块

**描述**：添加"适合谁使用"板块

**涉及文件**：
- `apps/web/app/[locale]/page.tsx`
- `apps/web/messages/*.json`

**具体需求**：
1. 添加使用场景板块
2. 展示 3 类目标用户：
   - 内容创作者（管理文案模板）
   - 开发者（代码片段复用）
   - 运营人员（数据分析 prompt）
3. 每个场景包含：图标、角色名、一句话用途

**验收标准**：
- [ ] 三个场景卡片展示正常
- [ ] 国际化文案

---

## 任务 5：底部 CTA 区域

**描述**：添加页面底部的大号行动号召

**涉及文件**：
- `apps/web/app/[locale]/page.tsx`
- `apps/web/messages/*.json`

**具体需求**：
1. 在页面底部添加深色背景 CTA 区域
2. 文案："免费开始使用" + "加入 X 用户，提升你的 AI 工作效率"
3. 两个按钮：添加到 Chrome、添加到 Firefox
4. 按钮链接先用占位符（#）

**验收标准**：
- [ ] 视觉风格与页面统一
- [ ] 国际化支持

---

## 任务 6：社区页面 /community

**描述**：创建轻量级社区页面

**涉及文件**：
- `apps/web/app/[locale]/community/page.tsx`（新建）
- `apps/web/lib/community-prompts.ts`
- `apps/web/messages/*.json`

**具体需求**：
1. 创建社区页面路由
2. 页面结构：
   - 标题：发现社区精选提示词
   - 搜索框（前端过滤即可，无需后端）
   - 提示词列表（复用首页卡片组件）
   - 空状态/邀请贡献提示
3. 数据读取与首页共用 `lib/community-prompts.ts`
4. 添加简单的分类过滤（全部、写作、编程、其他）

**验收标准**：
- [ ] 页面路由可访问 `/community`
- [ ] 列表展示 6 条提示词
- [ ] 搜索功能可用（前端过滤）
- [ ] 分类过滤可用
- [ ] 空状态友好提示

---

## 任务 7：导航栏调整

**描述**：更新导航结构，突出工具属性

**涉及文件**：
- `apps/web/app/[locale]/_components/Navbar.tsx`

**具体需求**：
1. 调整导航项顺序：
   - 功能（锚点到首页 Features）
   - 社区（链接到 /community）
   - 安装（高亮按钮，链接到 Chrome Web Store）
2. 移除 Pricing 相关导航项
3. "功能"点击后平滑滚动到首页功能板块

**验收标准**：
- [ ] 导航结构符合要求
- [ ] 移动端菜单正常
- [ ] 语言切换保持现有功能

---

## 任务 8：社区数据管理方案

**描述**：建立简单的社区数据管理方案

**涉及文件**：
- `apps/web/lib/community-prompts.ts`
- `apps/web/types/prompt.ts`（如不存在则新建）

**具体需求**：
1. 定义 CommunityPrompt 类型：
   ```typescript
   interface CommunityPrompt {
     id: string;
     title: string;
     content: string;
     author: string;
     likes: number;
     category: 'writing' | 'coding' | 'image' | 'other';
     tags: string[];
     createdAt: string;
   }
   ```
2. 在 `lib/community-prompts.ts` 中预置 6-10 条示例数据
3. 导出函数 `getAllPrompts()`、`getPromptById()`、`getPromptsByCategory()`
4. 数据写死在前端，无需 API

**验收标准**：
- [ ] 类型定义完整
- [ ] 至少 6 条示例数据
- [ ] 函数导出正常，可在组件中使用

---

## 任务 9：导入功能提示

**描述**：实现"导入到个人库"的引导提示

**涉及文件**：
- `apps/web/components/ImportButton.tsx`（新建）
- `apps/web/app/[locale]/page.tsx`
- `apps/web/app/[locale]/community/page.tsx`

**具体需求**：
1. 创建 ImportButton 组件
2. 组件 Props：`promptId: string`
3. 点击后检测是否安装了 PromptFlow 插件
4. 未安装：弹出提示"请安装 PromptFlow 插件以导入此提示词"
5. 已安装：调用插件协议导入（先用 console.log 占位）
6. 在首页和社区页面使用此组件

**验收标准**：
- [ ] 按钮样式统一
- [ ] 未安装时提示友好
- [ ] 检测逻辑正确（通过检查特定 DOM 或自定义协议）

---

## 任务 10：i18n 文案整理

**描述**：整理所有新增文案的国际化

**涉及文件**：
- `apps/web/messages/zh.json`
- `apps/web/messages/en.json`
- `apps/web/messages/zh-Hant.json`

**具体需求**：
1. 为每个模块添加对应的文案键：
   - `home.hero.*`
   - `home.features.*`
   - `home.community.*`
   - `home.useCases.*`
   - `home.cta.*`
   - `community.*`
   - `navbar.*`
2. 确保三种语言版本完整
3. 使用简单清晰的英文键名

**验收标准**：
- [ ] 所有新增模块文案已国际化
- [ ] 三种语言文件结构一致
- [ ] 页面切换语言正常显示

---

## 任务 11：响应式优化

**描述**：确保所有模块在移动端正常显示

**涉及文件**：
- 所有修改过的 page.tsx 文件

**具体需求**：
1. Hero 区域：移动端标题字号缩小，按钮垂直堆叠
2. Features 模块：移动端 1 列布局
3. 社区卡片：移动端 1 列布局
4. UseCases 模块：移动端 1 列布局
5. 导航：移动端汉堡菜单正常

**验收标准**：
- [ ] iPhone SE 尺寸测试通过
- [ ] iPad 尺寸测试通过
- [ ] 桌面端 1440px+ 正常显示

---

## 任务 12：SEO 优化

**描述**：配置页面 SEO 元数据

**涉及文件**：
- `apps/web/app/[locale]/layout.tsx`
- `apps/web/app/[locale]/page.tsx`
- `apps/web/app/[locale]/community/page.tsx`

**具体需求**：
1. 首页 title："PromptFlow - 专业 AI 提示词管理工具 | 一键调用提示词库"
2. 首页 description：详细介绍工具功能
3. 社区页 title："社区精选提示词 | PromptFlow"
4. 添加 Open Graph 图片配置
5. 添加 canonical URL

**验收标准**：
- [ ] 各页面 title 正确
- [ ] description 符合 SEO 最佳实践
- [ ] 社交媒体分享显示正常

---

## 执行顺序建议

```
Phase 1（基础）：
├── 任务 8：社区数据类型定义
├── 任务 10：i18n 文案整理
└── 任务 7：导航栏调整

Phase 2（首页）：
├── 任务 1：Hero 区域重构
├── 任务 2：核心功能展示
├── 任务 3：社区精选板块
├── 任务 4：使用场景模块
└── 任务 5：底部 CTA

Phase 3（社区页）：
├── 任务 6：社区页面
└── 任务 9：导入功能提示

Phase 4（优化）：
├── 任务 11：响应式优化
└── 任务 12：SEO 优化
```

---

## 技术约束

- 使用现有技术栈：Next.js 14 + React + Tailwind CSS + next-intl
- 不引入新依赖（除非必要）
- 数据存储：前端静态数据（无需后端 API）
- 图片：使用 `LocaleImage` 组件（已有）
- 图标：使用 Lucide React

---

## 完成后的验证清单

- [ ] 首页完整展示，无 404 或错误
- [ ] /community 页面可正常访问
- [ ] 导航栏链接正常跳转
- [ ] 语言切换功能正常
- [ ] 移动端显示正常
- [ ] pnpm compile 通过（TypeScript 无错误）
