---
id: p004
slug: midjourney-scene-director
category: image
tags: [midjourney, xiaohongshu]
author: AI Artist Lab
targetModels: [Midjourney v6, GPT-4.1, GPT-5]
promptType: generator
difficulty: intermediate
featured: true
verified: true
likes: 412
createdAt: "2026-03-15"
useCase: "把抽象画面想法转成可直接生成图片的 Prompt。"
exampleInput: "concept=retro kiosk on Mars"
exampleOutput: "三个风格不同的 Midjourney 英文提示词。"
variables:
  - name: concept
    description:
      zh: 需要转成 Prompt 的视觉概念
      en: Visual concept to convert into prompt
    required: true
    example: "未来感书店里的透明雨夜"
title:
  zh: Midjourney 场景导演
  en: Midjourney Scene Director
summary:
  zh: 把一个简短描述扩写成带镜头语言、材质和光线的 MJ Prompt。
  en: Expand a short description into a Midjourney prompt with camera language, materials, and lighting.
---

zh:
Turn the following concept into three Midjourney-ready prompt directions:

Concept: {{concept}}

For each direction, include:
- visual style
- camera framing
- lighting
- material and texture cues
- environment details
- a suggested aspect ratio

Rules:
- Output in English.
- Make each direction visually distinct.
- Avoid generic adjectives.

en:
Turn the following concept into three Midjourney-ready prompt directions:

Concept: {{concept}}

For each direction, include:
- visual style
- camera framing
- lighting
- material and texture cues
- environment details
- a suggested aspect ratio

Rules:
- Output in English.
- Make each direction visually distinct.
- Avoid generic adjectives.
