---
id: p014
slug: meeting-notes-summarizer
category: other
tags: [journal, chatgpt]
author: ProductivityPro
targetModels: [GPT-4.1, GPT-5, Claude 3.7 Sonnet]
promptType: workflow
difficulty: beginner
featured: false
verified: false
likes: 156
createdAt: "2026-03-05"
useCase: "快速整理会议纪要。"
exampleInput: "包含讨论和决定的会议记录"
exampleOutput: "摘要、决策和行动项列表"
variables:
  - name: rawNotes
    description:
      zh: 原始会议记录
      en: Raw meeting notes
    required: true
    example: "未整理的会议笔记"
title:
  zh: 会议记录整理器
  en: Meeting Notes Summarizer
summary:
  zh: 将会议记录整理成结构化的摘要和行动项。
  en: Organize meeting notes into structured summaries and action items.
---

zh:
请将以下会议记录整理成结构化摘要，包含决策、行动项和负责人。

en:
Please organize the following meeting notes into a structured summary, including decisions, action items, and responsible persons.
