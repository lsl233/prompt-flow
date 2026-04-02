---
id: p009
slug: api-doc-generator
category: coding
tags: [chatgpt]
author: DocuMaster
targetModels: [GPT-4.1, GPT-5, Claude 3.7 Sonnet]
promptType: generator
difficulty: intermediate
featured: false
verified: false
likes: 145
createdAt: "2026-03-10"
useCase: "快速生成符合规范的 API 文档。"
exampleInput: "Express.js REST API"
exampleOutput: "OpenAPI 3.0 格式文档"
variables:
  - name: codeSnippet
    description:
      zh: 代码片段或接口定义
      en: Code snippet or interface definition
    required: true
    example: "REST API 端点代码"
title:
  zh: API 文档生成器
  en: API Documentation Generator
summary:
  zh: 根据代码注释和接口签名自动生成规范的 API 文档。
  en: Automatically generate standard API documentation from code comments and interface signatures.
---

zh:
请为以下代码生成规范的 API 文档，包含接口说明、请求参数、响应格式和错误码。

en:
Please generate standard API documentation for the following code, including interface description, request parameters, response format, and error codes.
