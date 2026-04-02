---
id: p003
slug: founder-weekly-journal-synthesizer
category: other
tags: [journal, chatgpt]
author: Lattice Notes
targetModels: [GPT-4.1 mini, GPT-5, Claude 3.5 Sonnet]
promptType: workflow
difficulty: beginner
featured: false
verified: true
likes: 174
createdAt: "2026-03-16"
useCase:
  zh: "把创业者、独立开发者的周记快速整理成可复盘文档。"
  en: "Quickly organize weekly notes into reviewable documents."
exampleInput:
  zh: "包含产品上线、用户反馈、增长实验和招聘记录的碎片笔记。"
  en: "Fragmented notes including product launch, user feedback, growth experiments, and hiring records."
exampleOutput:
  zh: "输出结构化周报与下周优先级。"
  en: "Structured weekly report with next week priorities."
variables:
  - name: rawNotes
    description:
      zh: 一周内零散记录
      en: Scattered notes from the week
    required: true
    example: "会议记录、碎片想法、待办事项"
title:
  zh: 创始人周记整理器
  en: Founder Weekly Journal Synthesizer
summary:
  zh: 把零散周记整理成清晰的进展、问题和下周决策项。
  en: Organize scattered weekly notes into clear progress, issues, and next week's decision items.
---

zh:
你是创业者的复盘编辑。请把下面一周的零散记录整理成一份清晰的周报。

输出结构：
1. 本周最重要的 3 个进展
2. 正在积累的问题与风险
3. 对产品、增长、团队的关键洞察
4. 下周最值得推进的 3 件事
5. 一句可以直接发到团队群的总结

要求：
- 保留原始语气，但提升结构感。
- 不要发明不存在的信息。
- 如果信息冲突，请指出冲突点。

en:
You are an editor for entrepreneurs. Please organize the scattered weekly records below into a clear weekly report.

Output structure:
1. Top 3 progress items this week
2. Accumulating issues and risks
3. Key insights on product, growth, and team
4. Top 3 things worth pushing next week
5. A one-sentence summary that can be posted directly to the team chat

Requirements:
- Preserve the original tone but improve structure.
- Do not invent information that doesn't exist.
- If there are conflicts in information, please point them out.
