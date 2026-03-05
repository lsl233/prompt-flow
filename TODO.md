# Prompt Flow 功能清单

> 最后更新于 2026-03-04

---

## 🟢 待办（体验优化）

### 1. UI/UX 改进

**可改进项**：
- [ ] 拖拽排序 prompt 或文件夹
- [ ] 批量操作（批量删除、批量添加标签）
- [ ] Tag 可以置顶（常用 Tag 快速访问）

### 2. 键盘快捷键支持

**文件**：`entrypoints/background.ts`

**需求**：
- [ ] 用户可自定义快捷键配置
- [ ] 快捷键冲突检测与提示

### 3. Content Script 交互优化 ✅

**文件**：`entrypoints/content.ts`, `entrypoints/content/ContentFloatingPopup.tsx`

**已完成**：
- [x] 点击外部区域关闭弹窗（通过 `onClick` 处理 overlay 点击事件）
- [x] 复制提示词成功后显示 Toast 提示（2秒自动消失，支持插入/复制两种场景）

### 5. 组件重构 - TagSelector 提取 ✅

**文件**：`entrypoints/options/components/Modals/VariableFillerModal.tsx:220-250`

**已完成**：
- [x] 将 Tag 选择和创建功能抽离为独立组件 `TagSelector`
- [x] 支持复用到其他需要 Tag 管理的场景（如 PromptEditor）
- [x] 组件 Props：`tags: string[]`, `availableTags?: string[]`, `onChange: (tags: string[]) => void`

**实现说明**：
- 新组件位于 `shared/components/TagSelector.tsx`
- 已在 `VariableFillerModal` 和 `PromptEditorModal` 中替换原有内联实现
- 支持键盘导航（Enter 添加、Backspace 删除、方向键选择）
- 支持从可用标签下拉选择或创建新标签

### 6. VariableFillerModal 预览区支持直接编辑

**文件**：`entrypoints/options/components/Modals/VariableFillerModal.tsx:150-154`

**需求**：
- [ ] 预览区域从只读改为可编辑（`pre` 标签改为 `textarea` 或 `contentEditable`）

### 7. i18n 文案补全 - VariableFillerModal ✅

**文件**：`entrypoints/options/components/Modals/VariableFillerModal.tsx`

**已完成**：
- [x] "Tags" 标签 → 使用 `t('editorTagsLabel')`
- [x] "No tags" 提示 → 组件内部处理
- [x] "Add a tag and press Enter" placeholder → 使用 `t('editorTagsAddMore')` / `t('editorTagsPlaceholder')`
- [x] "Preview" 标签 → 使用 `t('variablesPreviewLabel')`
- [x] "Cancel" 按钮 → 使用 `t('editorCancel')`
- [x] "Save Prompt" 按钮 → 使用 `t('variablesSavePrompt')`
- [x] "Saved!" 提示 → 使用 `t('variablesSaved')`

## ✅ 已完成（归档）

<details>
<summary>点击展开已完成的 10 项功能</summary>

### 高优先级
1. **Content Script** - 网页端 FloatingPopup 注入 (`content.ts`)
2. **Background Script** - 核心服务逻辑 (`background.ts`)

### 中优先级
3. **Topbar 搜索框** - 实时搜索、下拉列表、键盘导航
4. **Sidebar 标签过滤** - 标签点击过滤、高亮选中
5. **Prompt 版本历史** - 限制 20 个版本、支持删除特定版本
6. **数据导入导出** - 合并模式、去重策略、预览、确认对话框

### 低优先级
7. **数据持久化优化** - 数据结构版本号（v2）
8. **UI/UX** - 深色模式切换闪烁问题修复
9. **提示词使用统计** - useCount、lastUsedAt、Recently Used / Most Used 列表
10. **主题切换样式修复** - Tailwind v4 添加 `@custom-variant dark` 配置

</details>
