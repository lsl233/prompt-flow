---
id: p010
slug: sql-query-optimizer
category: coding
tags: [chatgpt]
author: DataWizard
targetModels: [GPT-4.1, GPT-5]
promptType: assistant
difficulty: advanced
featured: false
verified: false
likes: 198
createdAt: "2026-03-09"
useCase:
  zh: "优化数据库查询性能。"
  en: "Optimize database query performance."
exampleInput:
  zh: "包含多表 JOIN 的复杂查询"
  en: "Complex query with multi-table JOINs"
exampleOutput:
  zh: "优化建议和重构后的 SQL"
  en: "Optimization suggestions and refactored SQL"
variables:
  - name: sqlQuery
    description:
      zh: 需要优化的 SQL 查询
      en: SQL query to optimize
    required: true
    example: "SELECT * FROM ..."
title:
  zh: SQL 查询优化器
  en: SQL Query Optimizer
summary:
  zh: 分析 SQL 查询并提供性能优化建议。
  en: Analyze SQL queries and provide performance optimization suggestions.
---

zh:
请分析以下 SQL 查询的性能问题并提供优化建议。

en:
Please analyze the performance issues of the following SQL query and provide optimization suggestions.
