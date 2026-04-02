---
id: p008
slug: growth-experiment-debrief
category: other
tags: [marketing, journal]
author: Northstar Ops
targetModels: [GPT-4.1, GPT-5, Claude 3.7 Sonnet]
promptType: workflow
difficulty: advanced
featured: true
verified: true
likes: 183
createdAt: "2026-03-11"
useCase: "适合运营、增长或独立产品团队做数据复盘。"
exampleInput: "A/B 测试的曝光、点击、注册和反馈摘要。"
exampleOutput: "一份可直接发到周会的实验总结。"
variables:
  - name: experimentLog
    description:
      zh: 实验记录与数据
      en: Experiment log and data
    required: true
    example: "投放数据、落地页转化率、用户反馈"
title:
  zh: 增长实验复盘
  en: Growth Experiment Debrief
summary:
  zh: 把一次增长实验的原始数据转成结论、假设和下一轮动作建议。
  en: Transform raw data from a growth experiment into conclusions, hypotheses, and next-round action recommendations.
---

zh:
你是增长分析师。请根据以下实验记录输出一次复盘：

1. 实验目的
2. 关键数据表现
3. 正反向信号
4. 可能的解释
5. 下一轮实验建议

要求：
- 所有判断都要基于输入中的事实。
- 如果样本不足，请明确写出来。
- 最后给出一个 go / hold / stop 建议。

en:
You are a growth analyst. Please output a debrief based on the following experiment records:

1. Experiment purpose
2. Key data performance
3. Positive and negative signals
4. Possible explanations
5. Recommendations for the next round of experiments

Requirements:
- All judgments must be based on facts in the input.
- If the sample size is insufficient, please state it clearly.
- Finally, give a go / hold / stop recommendation.
