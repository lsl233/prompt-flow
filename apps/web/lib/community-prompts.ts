import {
  CommunityPrompt,
  PromptCategory,
  PromptCategorySlug,
  PromptTag,
} from "@/types/prompt";

export const promptCategories: PromptCategory[] = [
  {
    slug: "writing",
    title: "Writing Systems",
    description: "面向内容创作、结构化表达和语气控制的提示词集合。",
    accent: "from-amber-300/30 via-orange-400/20 to-transparent",
    featuredTagSlugs: ["xiaohongshu", "journal", "marketing"],
  },
  {
    slug: "coding",
    title: "Code Operators",
    description: "覆盖代码生成、重构、审查和调试等高频开发场景。",
    accent: "from-emerald-300/30 via-cyan-400/20 to-transparent",
    featuredTagSlugs: ["chatgpt", "resume", "marketing"],
  },
  {
    slug: "image",
    title: "Visual Engines",
    description: "为 Midjourney 和视觉生成工具准备的构图与风格提示。",
    accent: "from-fuchsia-300/25 via-rose-300/20 to-transparent",
    featuredTagSlugs: ["midjourney", "xiaohongshu"],
  },
  {
    slug: "other",
    title: "Workflow Kits",
    description: "适合研究、分析、运营与跨部门协作的通用 Prompt。",
    accent: "from-slate-200/20 via-sky-300/10 to-transparent",
    featuredTagSlugs: ["journal", "marketing", "chatgpt"],
  },
];

export const promptTags: PromptTag[] = [
  {
    slug: "chatgpt",
    title: "ChatGPT",
    description: "适用于日常问答、结构化生成与工作流封装的通用标签。",
    categorySlugs: ["coding", "other"],
    relatedTagSlugs: ["marketing", "journal"],
    featured: true,
  },
  {
    slug: "journal",
    title: "Journal",
    description: "围绕日记、复盘与表达训练的写作提示模板。",
    categorySlugs: ["writing", "other"],
    relatedTagSlugs: ["marketing", "chatgpt"],
    featured: true,
  },
  {
    slug: "midjourney",
    title: "Midjourney",
    description: "用于图像生成、风格控制与镜头语言设计的提示词。",
    categorySlugs: ["image"],
    relatedTagSlugs: ["xiaohongshu"],
    featured: true,
  },
  {
    slug: "xiaohongshu",
    title: "Xiaohongshu",
    description: "适合种草文案、封面标题和笔记结构拆解的内容模板。",
    categorySlugs: ["writing", "image"],
    relatedTagSlugs: ["marketing", "journal"],
    featured: true,
  },
  {
    slug: "marketing",
    title: "Marketing",
    description: "覆盖营销策略、内容包装、增长实验和转化文案。",
    categorySlugs: ["writing", "other", "coding"],
    relatedTagSlugs: ["xiaohongshu", "chatgpt", "journal"],
    featured: true,
  },
  {
    slug: "resume",
    title: "Resume",
    description: "求职场景下的简历润色、经历重写和岗位匹配分析。",
    categorySlugs: ["coding", "writing"],
    relatedTagSlugs: ["chatgpt", "journal"],
    featured: false,
  },
];

export const communityPrompts: CommunityPrompt[] = [
  {
    id: "p001",
    slug: "senior-code-review-copilot",
    title: "Senior Code Review Copilot",
    summary: "把一段代码拆成结构、风险、性能、可维护性四个维度做审查。",
    content: `你是一位资深代码审查专家。请对以下代码做高质量 review，并严格使用下面结构输出：

1. 先用 2-3 句话总结这段代码的职责。
2. 找出潜在 bug、边界条件和隐藏假设。
3. 指出命名、结构、可读性和复用性问题。
4. 给出性能和安全风险评估。
5. 提供可执行的改进建议，必要时附重构后的代码片段。

额外要求：
- 按严重程度排序。
- 避免空泛建议。
- 如果信息不足，要明确说明还缺什么上下文。

待审查代码：
{{code}}`,
    author: "DevMaster",
    category: "coding",
    tags: ["chatgpt", "marketing"],
    targetModels: ["GPT-4.1", "GPT-5", "Claude 3.7 Sonnet"],
    language: "zh-CN",
    variables: [
      { name: "code", description: "待审查的代码或 diff", required: true, example: "React 组件 / PR diff" },
    ],
    promptType: "assistant",
    difficulty: "intermediate",
    featured: true,
    verified: true,
    useCase: "在提交 PR 前，快速获得结构化 review 意见。",
    exampleInput: "一个包含 hooks、请求和表单校验逻辑的 React 组件。",
    exampleOutput: "列出 3 个高优先级 bug、2 个结构问题和重构示例。",
    likes: 328,
    createdAt: "2026-03-18",
  },
  {
    id: "p002",
    slug: "xiaohongshu-launch-copy-engine",
    title: "Xiaohongshu Launch Copy Engine",
    summary: "为产品发布生成小红书风格标题、开头钩子和正文节奏。",
    content: `请以资深内容策划的身份，为 {{product}} 生成一篇小红书发布文案。

输出结构：
- 5 个标题方案
- 1 个 80-120 字的开场钩子
- 正文分成 3 段，每段都有明确目的
- 结尾加互动问题

写作要求：
- 口语化，但不要浮夸。
- 强调真实体验、具体场景和细节。
- 自然融入 {{sellingPoint}}。
- 适合 {{audience}} 阅读。`,
    author: "Mika Studio",
    category: "writing",
    tags: ["xiaohongshu", "marketing"],
    targetModels: ["GPT-4.1", "GPT-5", "Claude 3.7 Sonnet"],
    language: "zh-CN",
    variables: [
      { name: "product", description: "产品名或服务名", required: true, example: "AI 写作课程" },
      { name: "sellingPoint", description: "最核心卖点", required: true, example: "3 天做出第一套提示词系统" },
      { name: "audience", description: "目标受众", required: true, example: "自由职业者 / 小团队创始人" },
    ],
    promptType: "generator",
    difficulty: "beginner",
    featured: true,
    verified: true,
    useCase: "为内容营销或新品发布生成第一版社媒文案。",
    exampleInput: "product=提示词管理插件，sellingPoint=一键在 AI 页面调起，audience=重度 AI 用户",
    exampleOutput: "提供标题候选、正文和结尾互动问题。",
    likes: 256,
    createdAt: "2026-03-17",
  },
  {
    id: "p003",
    slug: "founder-weekly-journal-synthesizer",
    title: "Founder Weekly Journal Synthesizer",
    summary: "把零散周记整理成清晰的进展、问题和下周决策项。",
    content: `你是创业者的复盘编辑。请把下面一周的零散记录整理成一份清晰的周报。

输出结构：
1. 本周最重要的 3 个进展
2. 正在积累的问题与风险
3. 对产品、增长、团队的关键洞察
4. 下周最值得推进的 3 件事
5. 一句可以直接发到团队群的总结

要求：
- 保留原始语气，但提升结构感。
- 不要发明不存在的信息。
- 如果信息冲突，请指出冲突点。`,
    author: "Lattice Notes",
    category: "other",
    tags: ["journal", "chatgpt"],
    targetModels: ["GPT-4.1 mini", "GPT-5", "Claude 3.5 Sonnet"],
    language: "zh-CN",
    variables: [
      { name: "rawNotes", description: "一周内零散记录", required: true, example: "会议记录、碎片想法、待办事项" },
    ],
    promptType: "workflow",
    difficulty: "beginner",
    featured: false,
    verified: true,
    useCase: "把创业者、独立开发者的周记快速整理成可复盘文档。",
    exampleInput: "包含产品上线、用户反馈、增长实验和招聘记录的碎片笔记。",
    exampleOutput: "输出结构化周报与下周优先级。",
    likes: 174,
    createdAt: "2026-03-16",
  },
  {
    id: "p004",
    slug: "midjourney-scene-director",
    title: "Midjourney Scene Director",
    summary: "把一个简短描述扩写成带镜头语言、材质和光线的 MJ Prompt。",
    content: `Turn the following concept into three Midjourney-ready prompt directions:

Concept: {{concept}}

For each direction, include:
- visual style
- camera framing
- lighting
- material and texture cues
- environment details
- a suggested aspect ratio

Rules:
- Output in English.
- Make each direction visually distinct.
- Avoid generic adjectives.`,
    author: "AI Artist Lab",
    category: "image",
    tags: ["midjourney", "xiaohongshu"],
    targetModels: ["Midjourney v6", "GPT-4.1", "GPT-5"],
    language: "en",
    variables: [
      { name: "concept", description: "需要转成 Prompt 的视觉概念", required: true, example: "未来感书店里的透明雨夜" },
    ],
    promptType: "generator",
    difficulty: "intermediate",
    featured: true,
    verified: true,
    useCase: "把抽象画面想法转成可直接生成图片的 Prompt。",
    exampleInput: "concept=retro kiosk on Mars",
    exampleOutput: "三个风格不同的 Midjourney 英文提示词。",
    likes: 412,
    createdAt: "2026-03-15",
  },
  {
    id: "p005",
    slug: "resume-bullet-rewriter",
    title: "Resume Bullet Rewriter",
    summary: "把普通经历描述改写成结果导向、可量化的简历要点。",
    content: `你是一位招聘经理和职业教练。请把以下经历重写成简历 bullet points。

要求：
- 每条以动作动词开头。
- 优先体现结果、影响和量化指标。
- 如果缺少指标，请给出可以补充的数据建议。
- 输出中英文双语版本。

原始经历：
{{experience}}

目标岗位：
{{targetRole}}`,
    author: "Career Forge",
    category: "writing",
    tags: ["resume", "chatgpt"],
    targetModels: ["GPT-4.1", "GPT-5", "Claude 3.7 Sonnet"],
    language: "zh-CN",
    variables: [
      { name: "experience", description: "原始经历描述", required: true, example: "负责社媒账号运营，涨粉较快" },
      { name: "targetRole", description: "目标岗位", required: true, example: "增长运营 / 产品营销" },
    ],
    promptType: "template",
    difficulty: "beginner",
    featured: false,
    verified: true,
    useCase: "改写简历、作品集或自我介绍中的经历段落。",
    exampleInput: "experience=做过校园活动策划，targetRole=市场实习生",
    exampleOutput: "3-5 条双语 bullet points，并附可补充指标建议。",
    likes: 149,
    createdAt: "2026-03-14",
  },
  {
    id: "p006",
    slug: "prompt-ops-content-calendar",
    title: "Prompt Ops Content Calendar",
    summary: "围绕一个主题生成 2 周内容规划，包括角度、目标和 CTA。",
    content: `请你作为内容运营负责人，围绕 {{topic}} 生成 14 天内容日历。

每一天都输出：
- 内容角度
- 适合平台
- 核心信息点
- CTA
- 需要准备的素材

要求：
- 至少覆盖教育、案例、观点、转化四类内容。
- 节奏上前轻后重，最后 3 天更偏转化。`,
    author: "Ops Grid",
    category: "other",
    tags: ["marketing", "xiaohongshu"],
    targetModels: ["GPT-5", "Claude 3.7 Sonnet", "Gemini 2.0 Flash"],
    language: "zh-CN",
    variables: [
      { name: "topic", description: "内容主题", required: true, example: "AI 提示词管理" },
    ],
    promptType: "workflow",
    difficulty: "intermediate",
    featured: true,
    verified: true,
    useCase: "快速生成连续内容规划，适合 launch 前两周执行。",
    exampleInput: "topic=独立开发者产品上线",
    exampleOutput: "14 天日历，含平台、素材与 CTA。",
    likes: 237,
    createdAt: "2026-03-13",
  },
  {
    id: "p007",
    slug: "react-component-blueprinter",
    title: "React Component Blueprinter",
    summary: "根据功能描述生成带 props、状态和边界条件说明的组件骨架。",
    content: `你是一位前端架构师。请根据下面的需求，生成一个 React + TypeScript 组件蓝图。

必须输出：
1. 组件职责说明
2. Props 定义
3. 状态设计
4. 事件与副作用清单
5. 组件代码骨架
6. 最容易遗漏的边界条件

功能描述：
{{featureDescription}}`,
    author: "ReactWizard",
    category: "coding",
    tags: ["chatgpt", "resume"],
    targetModels: ["GPT-4.1", "GPT-5", "Claude 3.7 Sonnet"],
    language: "zh-CN",
    variables: [
      { name: "featureDescription", description: "组件功能描述", required: true, example: "一个支持筛选、排序和分页的资源列表" },
    ],
    promptType: "assistant",
    difficulty: "intermediate",
    featured: false,
    verified: false,
    useCase: "在开始编码前先拿到一个结构可靠的组件蓝图。",
    exampleInput: "featureDescription=团队成员邀请弹窗，支持邮箱校验和权限配置",
    exampleOutput: "生成组件草图、类型和边界条件清单。",
    likes: 298,
    createdAt: "2026-03-12",
  },
  {
    id: "p008",
    slug: "growth-experiment-debrief",
    title: "Growth Experiment Debrief",
    summary: "把一次增长实验的原始数据转成结论、假设和下一轮动作建议。",
    content: `你是增长分析师。请根据以下实验记录输出一次复盘：

1. 实验目的
2. 关键数据表现
3. 正反向信号
4. 可能的解释
5. 下一轮实验建议

要求：
- 所有判断都要基于输入中的事实。
- 如果样本不足，请明确写出来。
- 最后给出一个 go / hold / stop 建议。`,
    author: "Northstar Ops",
    category: "other",
    tags: ["marketing", "journal"],
    targetModels: ["GPT-4.1", "GPT-5", "Claude 3.7 Sonnet"],
    language: "zh-CN",
    variables: [
      { name: "experimentLog", description: "实验记录与数据", required: true, example: "投放数据、落地页转化率、用户反馈" },
    ],
    promptType: "workflow",
    difficulty: "advanced",
    featured: true,
    verified: true,
    useCase: "适合运营、增长或独立产品团队做数据复盘。",
    exampleInput: "A/B 测试的曝光、点击、注册和反馈摘要。",
    exampleOutput: "一份可直接发到周会的实验总结。",
    likes: 183,
    createdAt: "2026-03-11",
  },
];

export function getAllPrompts(): CommunityPrompt[] {
  return [...communityPrompts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getPromptById(id: string): CommunityPrompt | undefined {
  return communityPrompts.find((prompt) => prompt.id === id);
}

export function getPromptBySlug(slug: string): CommunityPrompt | undefined {
  return communityPrompts.find((prompt) => prompt.slug === slug);
}

export function getFeaturedPrompts(): CommunityPrompt[] {
  return getAllPrompts().filter((prompt) => prompt.featured);
}

export function getLatestPrompts(limit = 6): CommunityPrompt[] {
  return getAllPrompts().slice(0, limit);
}

export function getPromptsByCategory(categorySlug: PromptCategorySlug): CommunityPrompt[] {
  return getAllPrompts().filter((prompt) => prompt.category === categorySlug);
}

export function getPromptsByTag(tagSlug: string): CommunityPrompt[] {
  return getAllPrompts().filter((prompt) => prompt.tags.includes(tagSlug));
}

export function getAllCategories(): PromptCategory[] {
  return promptCategories;
}

export function getCategoryBySlug(slug: string): PromptCategory | undefined {
  return promptCategories.find((category) => category.slug === slug);
}

export function getAllTags(): PromptTag[] {
  return promptTags;
}

export function getTagBySlug(slug: string): PromptTag | undefined {
  return promptTags.find((tag) => tag.slug === slug);
}

export function getFeaturedTags(): PromptTag[] {
  return promptTags.filter((tag) => tag.featured);
}

export function getRelatedPrompts(prompt: CommunityPrompt, limit = 3): CommunityPrompt[] {
  return getAllPrompts()
    .filter((candidate) => candidate.slug !== prompt.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => prompt.tags.includes(tag)).length;
      const sameCategory = candidate.category === prompt.category ? 2 : 0;
      return { candidate, score: sharedTags + sameCategory };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.likes - a.candidate.likes)
    .slice(0, limit)
    .map((item) => item.candidate);
}

export function searchPrompts(query: string): CommunityPrompt[] {
  const lowerQuery = query.toLowerCase();

  return getAllPrompts().filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(lowerQuery) ||
      prompt.summary.toLowerCase().includes(lowerQuery) ||
      prompt.content.toLowerCase().includes(lowerQuery) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
