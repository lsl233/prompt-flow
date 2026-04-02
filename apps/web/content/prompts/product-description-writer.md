---
id: p013
slug: product-description-writer
category: writing
tags: [marketing, xiaohongshu]
author: ContentCraft
targetModels: [GPT-4.1, GPT-5]
promptType: generator
difficulty: beginner
featured: false
verified: false
likes: 189
createdAt: "2026-03-06"
useCase:
  zh: "快速生成电商产品页面文案。"
  en: "Quickly generate e-commerce product page copy."
exampleInput:
  zh: "产品=无线耳机，features=降噪、长续航"
  en: "Product=wireless earphones, features=noise cancellation, long battery"
exampleOutput:
  zh: "产品标题、亮点和详细描述"
  en: "Product title, highlights, and detailed description"
variables:
  - name: productName
    description:
      zh: 产品名称
      en: Product name
    required: true
    example: "智能手表"
  - name: keyFeatures
    description:
      zh: 核心功能点
      en: Key features
    required: true
    example: "健康监测、NFC 支付"
title:
  zh: 产品描述撰写
  en: Product Description Writer
summary:
  zh: 为电商或 SaaS 产品生成有说服力的产品描述。
  en: Generate persuasive product descriptions for e-commerce or SaaS products.
---

zh:
请为以下产品生成有吸引力的产品描述。

en:
Please generate attractive product descriptions for the following product.
