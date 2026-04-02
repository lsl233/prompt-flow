---
id: p002
slug: xiaohongshu-launch-copy-engine
category: writing
tags: [xiaohongshu, marketing]
author: Mika Studio
targetModels: [GPT-4.1, GPT-5, Claude 3.7 Sonnet]
promptType: generator
difficulty: beginner
featured: true
verified: true
likes: 256
createdAt: "2026-03-17"
useCase: "为内容营销或新品发布生成第一版社媒文案。"
exampleInput: "product=提示词管理插件，sellingPoint=一键在 AI 页面调起，audience=重度 AI 用户"
exampleOutput: "提供标题候选、正文和结尾互动问题。"
variables:
  - name: product
    description:
      zh: 产品名或服务名
      en: Product or service name
    required: true
    example: "AI 写作课程"
  - name: sellingPoint
    description:
      zh: 最核心卖点
      en: Core selling point
    required: true
    example: "3 天做出第一套提示词系统"
  - name: audience
    description:
      zh: 目标受众
      en: Target audience
    required: true
    example: "自由职业者 / 小团队创始人"
title:
  zh: 小红书发布文案引擎
  en: Xiaohongshu Launch Copy Engine
summary:
  zh: 为产品发布生成小红书风格标题、开头钩子和正文节奏。
  en: Generate Xiaohongshu-style titles, opening hooks, and content rhythm for product launches.
---

zh:
请以资深内容策划的身份，为 {{product}} 生成一篇小红书发布文案。

输出结构：
- 5 个标题方案
- 1 个 80-120 字的开场钩子
- 正文分成 3 段，每段都有明确目的
- 结尾加互动问题

写作要求：
- 口语化，但不要浮夸。
- 强调真实体验、具体场景和细节。
- 自然融入 {{sellingPoint}}。
- 适合 {{audience}} 阅读。

en:
As a senior content strategist, generate a Xiaohongshu post for {{product}}.

Output structure:
- 5 title options
- 1 opening hook of 80-120 characters
- Body divided into 3 paragraphs, each with a clear purpose
- Ending with an engagement question

Writing requirements:
- Conversational but not exaggerated.
- Emphasize real experiences, specific scenarios, and details.
- Naturally integrate {{sellingPoint}}.
- Suitable for {{audience}} to read.
