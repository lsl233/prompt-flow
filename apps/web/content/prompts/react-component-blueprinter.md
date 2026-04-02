---
id: p007
slug: react-component-blueprinter
category: coding
tags: [chatgpt, resume]
author: ReactWizard
targetModels: [GPT-4.1, GPT-5, Claude 3.7 Sonnet]
promptType: assistant
difficulty: intermediate
featured: false
verified: false
likes: 298
createdAt: "2026-03-12"
useCase:
  zh: "在开始编码前先拿到一个结构可靠的组件蓝图。"
  en: "Get a structurally reliable component blueprint before coding."
exampleInput:
  zh: "featureDescription=团队成员邀请弹窗，支持邮箱校验和权限配置"
  en: "featureDescription=team member invite modal with email validation and permission config"
exampleOutput:
  zh: "生成组件草图、类型和边界条件清单。"
  en: "Generated component sketch, types, and boundary condition checklist."
variables:
  - name: featureDescription
    description:
      zh: 组件功能描述
      en: Component feature description
    required: true
    example: "一个支持筛选、排序和分页的资源列表"
title:
  zh: React 组件蓝图生成器
  en: React Component Blueprinter
summary:
  zh: 根据功能描述生成带 props、状态和边界条件说明的组件骨架。
  en: Generate component skeletons with props, state, and boundary condition explanations based on feature descriptions.
---

zh:
你是一位前端架构师。请根据下面的需求，生成一个 React + TypeScript 组件蓝图。

必须输出：
1. 组件职责说明
2. Props 定义
3. 状态设计
4. 事件与副作用清单
5. 组件代码骨架
6. 最容易遗漏的边界条件

功能描述：
{{featureDescription}}

en:
You are a frontend architect. Please generate a React + TypeScript component blueprint based on the following requirements.

Must output:
1. Component responsibility description
2. Props definition
3. State design
4. Event and side effects checklist
5. Component code skeleton
6. Most easily overlooked boundary conditions

Feature description:
{{featureDescription}}
