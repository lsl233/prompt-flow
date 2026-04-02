---
id: p005
slug: resume-bullet-rewriter
category: writing
tags: [resume, chatgpt]
author: Career Forge
targetModels: [GPT-4.1, GPT-5, Claude 3.7 Sonnet]
promptType: template
difficulty: beginner
featured: false
verified: true
likes: 149
createdAt: "2026-03-14"
useCase:
  zh: "改写简历、作品集或自我介绍中的经历段落。"
  en: "Rewrite experience paragraphs in resumes, portfolios, or self-introductions."
exampleInput:
  zh: "experience=做过校园活动策划，targetRole=市场实习生"
  en: "experience=campus event planning, targetRole=marketing intern"
exampleOutput:
  zh: "3-5 条双语 bullet points，并附可补充指标建议。"
  en: "3-5 bilingual bullet points with suggestions for additional metrics."
variables:
  - name: experience
    description:
      zh: 原始经历描述
      en: Original experience description
    required: true
    example: "负责社媒账号运营，涨粉较快"
  - name: targetRole
    description:
      zh: 目标岗位
      en: Target role
    required: true
    example: "增长运营 / 产品营销"
title:
  zh: 简历要点改写器
  en: Resume Bullet Rewriter
summary:
  zh: 把普通经历描述改写成结果导向、可量化的简历要点。
  en: Rewrite ordinary experience descriptions into result-oriented, quantifiable resume bullet points.
---

zh:
你是一位招聘经理和职业教练。请把以下经历重写成简历 bullet points。

要求：
- 每条以动作动词开头。
- 优先体现结果、影响和量化指标。
- 如果缺少指标，请给出可以补充的数据建议。
- 输出中英文双语版本。

原始经历：
{{experience}}

目标岗位：
{{targetRole}}

en:
You are a hiring manager and career coach. Please rewrite the following experience into resume bullet points.

Requirements:
- Start each bullet with an action verb.
- Prioritize results, impact, and quantifiable metrics.
- If metrics are missing, suggest data that could be added.
- Output in both Chinese and English.

Original experience:
{{experience}}

Target role:
{{targetRole}}
