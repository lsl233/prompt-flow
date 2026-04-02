---
id: p017
slug: bug-analysis-report
category: coding
tags: [chatgpt]
author: DebugMaster
targetModels: [GPT-4.1, GPT-5, Claude 3.7 Sonnet]
promptType: assistant
difficulty: intermediate
featured: false
verified: false
likes: 178
createdAt: "2026-03-02"
useCase:
  zh: "系统性分析 bug 根因。"
  en: "Systematically analyze bug root causes."
exampleInput:
  zh: "崩溃日志和复现步骤"
  en: "Crash logs and reproduction steps"
exampleOutput:
  zh: "根因分析和修复建议"
  en: "Root cause analysis and fix recommendations"
variables:
  - name: bugDescription
    description:
      zh: Bug 描述和复现步骤
      en: Bug description and reproduction steps
    required: true
    example: "错误信息和复现环境"
title:
  zh: Bug 分析报告
  en: Bug Analysis Report
summary:
  zh: 分析 bug 原因并生成结构化的故障报告。
  en: Analyze bug causes and generate structured fault reports.
---

zh:
请分析以下 bug 现象并生成结构化的故障分析报告。

en:
Please analyze the following bug phenomenon and generate a structured fault analysis report.
