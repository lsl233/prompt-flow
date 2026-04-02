---
id: p020
slug: competitor-analysis
category: other
tags: [marketing, journal]
author: StrategyHub
targetModels: [GPT-4.1, GPT-5, Claude 3.7 Sonnet]
promptType: workflow
difficulty: advanced
featured: false
verified: false
likes: 201
createdAt: "2026-02-27"
useCase: "快速完成竞品分析。"
exampleInput: "竞品=Notion vs Obsidian"
exampleOutput: "结构化竞品分析报告"
variables:
  - name: competitors
    description:
      zh: 竞争对手列表
      en: List of competitors
    required: true
    example: "竞品 A、竞品 B"
  - name: focusArea
    description:
      zh: 分析重点
      en: Focus area for analysis
    required: false
    example: "功能/定价/用户体验"
title:
  zh: 竞品分析报告
  en: Competitor Analysis Report
summary:
  zh: 分析竞争对手并生成结构化的竞品分析报告。
  en: Analyze competitors and generate structured competitive analysis reports.
---

zh:
请对以下竞争对手进行深入分析并生成报告。

en:
Please conduct in-depth analysis of the following competitors and generate a report.
