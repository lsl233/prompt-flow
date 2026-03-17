import { CommunityPrompt } from '@/types/prompt';

export const communityPrompts: CommunityPrompt[] = [
  {
    id: '1',
    title: '专业代码审查助手',
    content: '请作为资深代码审查专家，审查以下代码。关注：1) 代码质量和可读性 2) 潜在bug和安全问题 3) 性能优化建议 4) 设计模式应用。请逐行分析并给出具体改进建议。',
    author: 'DevMaster',
    likes: 328,
    category: 'coding',
    tags: ['代码审查', '开发', '最佳实践'],
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: '小红书爆款文案生成器',
    content: '请为{产品名称}创作一篇小红书风格的种草文案。要求：1) 标题吸引眼球 2) 内容真实自然，带有emoji 3) 突出产品3个核心卖点 4) 结尾引导互动。字数控制在300字以内。',
    author: '文案小达人',
    likes: 256,
    category: 'writing',
    tags: ['小红书', '文案', '营销'],
    createdAt: '2024-03-14',
  },
  {
    id: '3',
    title: '数据分析师专属Prompt',
    content: '你是一位资深数据分析师。请分析以下数据集，提供：1) 关键数据洞察 2) 可视化建议 3) 业务改进建议 4) 异常数据警示。请用专业但易懂的语言表达。',
    author: 'DataWhiz',
    likes: 189,
    category: 'other',
    tags: ['数据分析', '商业智能', '报告'],
    createdAt: '2024-03-13',
  },
  {
    id: '4',
    title: 'Midjourney提示词优化师',
    content: '请将以下描述优化为专业的Midjourney提示词：{描述}。要求：1) 添加风格、光线、 camera角度等专业参数 2) 使用英文输出 3) 提供3个不同风格的版本 4) 每个版本附带--ar参数建议。',
    author: 'AI艺术家',
    likes: 412,
    category: 'image',
    tags: ['Midjourney', 'AI绘画', '设计'],
    createdAt: '2024-03-12',
  },
  {
    id: '5',
    title: '学术论文润色专家',
    content: '请润色以下学术论文段落，要求：1) 提升学术表达的严谨性 2) 优化句式结构 3) 检查逻辑连贯性 4) 保持原意不变。请用不同颜色标注修改之处。',
    author: 'PhDHelper',
    likes: 167,
    category: 'writing',
    tags: ['学术', '论文', '润色'],
    createdAt: '2024-03-11',
  },
  {
    id: '6',
    title: 'React组件生成器',
    content: '请创建一个React组件：{组件名称}。要求：1) 使用TypeScript 2) 遵循React最佳实践 3) 包含Props类型定义 4) 添加基础样式（Tailwind）5) 包含使用示例。组件功能：{功能描述}',
    author: 'ReactWizard',
    likes: 298,
    category: 'coding',
    tags: ['React', 'TypeScript', '前端'],
    createdAt: '2024-03-10',
  },
];

export function getAllPrompts(): CommunityPrompt[] {
  return communityPrompts;
}

export function getPromptById(id: string): CommunityPrompt | undefined {
  return communityPrompts.find((prompt) => prompt.id === id);
}

export function getPromptsByCategory(category: CommunityPrompt['category']): CommunityPrompt[] {
  return communityPrompts.filter((prompt) => prompt.category === category);
}

export function searchPrompts(query: string): CommunityPrompt[] {
  const lowerQuery = query.toLowerCase();
  return communityPrompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(lowerQuery) ||
      prompt.content.toLowerCase().includes(lowerQuery) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
