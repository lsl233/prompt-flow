---
id: p006
slug: prompt-ops-content-calendar
category: other
tags: [marketing, xiaohongshu]
author: Ops Grid
targetModels: [GPT-5, Claude 3.7 Sonnet, Gemini 2.0 Flash]
promptType: workflow
difficulty: intermediate
featured: true
verified: true
likes: 237
createdAt: "2026-03-13"
useCase: "快速生成连续内容规划，适合 launch 前两周执行。"
exampleInput: "topic=独立开发者产品上线"
exampleOutput: "14 天日历，含平台、素材与 CTA。"
variables:
  - name: topic
    description:
      zh: 内容主题
      en: Content topic
    required: true
    example: "AI 提示词管理"
title:
  zh: Prompt Ops 内容日历
  en: Prompt Ops Content Calendar
summary:
  zh: 围绕一个主题生成 2 周内容规划，包括角度、目标和 CTA。
  en: Generate a 2-week content plan around a topic, including angles, goals, and CTAs.
---

zh:
请你作为内容运营负责人，围绕 {{topic}} 生成 14 天内容日历。

每一天都输出：
- 内容角度
- 适合平台
- 核心信息点
- CTA
- 需要准备的素材

要求：
- 至少覆盖教育、案例、观点、转化四类内容。
- 节奏上前轻后重，最后 3 天更偏转化。

en:
As a content operations lead, generate a 14-day content calendar around {{topic}}.

For each day, output:
- Content angle
- Suitable platform
- Key message points
- CTA
- Materials needed

Requirements:
- Cover at least four types of content: educational, case studies, opinions, and conversion.
- Start light and build up, with the last 3 days more focused on conversion.
