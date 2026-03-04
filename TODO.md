# Prompt Flow 未实现功能清单

> 自动生成于 2026-03-03

---

## 🔴 高优先级（核心功能缺失）

### 1. Content Script - 网页端 FloatingPopup 注入

**当前状态**：仅打印日志，且只匹配 Google 页面
**文件**：`apps/web-extension/entrypoints/content.ts`

**缺失功能**：
- [x] 监听全局快捷键 (Cmd+K) 在任意网页触发 FloatingPopup
- [x] 将 FloatingPopup React 组件注入到网页 DOM
- [x] 处理与 options 页面的通信（获取 prompt 数据）
- [x] 自动填充变量后的内容到当前输入框

**建议实现**：
```typescript
// 需要实现
- 使用 Shadow DOM 隔离样式
- 监听键盘事件触发搜索弹窗
- 与 background script 通信获取 prompt 列表
- 将生成的内容填充到当前聚焦的 input/textarea
```

---

### 2. Background Script - 核心服务逻辑

**当前状态**：仅打印日志
**文件**：`apps/web-extension/entrypoints/background.ts`

**缺失功能**：
- [x] 处理快捷键命令（如 Cmd+Shift+P 快速弹出搜索）
- [x] 作为 content script 与 options 页面的消息中转站
- [x] 监听扩展安装/更新事件（数据迁移）
- [x] 管理跨页面状态同步

---

## 🟡 中优先级（功能不完整）

### 3. Topbar 搜索框 - 纯占位符

**当前状态**：输入框无任何事件处理
**文件**：`apps/web-extension/entrypoints/options/components/Topbar.tsx`

**缺失功能**：
- [x] 输入时实时搜索 prompt
- [x] 显示搜索结果下拉列表
- [x] 支持键盘导航（↑↓ 选择，Enter 确认）
- [x] 点击搜索结果打开 VariableFillerModal

---

### 4. Sidebar 标签点击 - 无过滤效果

**当前状态**：点击标签仅切换视图，无过滤
**文件**：`apps/web-extension/entrypoints/options/components/Sidebar.tsx:53`

**缺失功能**：
- [x] 点击标签后按该标签过滤 prompt 列表
- [x] 高亮当前选中的标签
- [x] 清除过滤的选项

---

### 5. Prompt 版本历史 - 无清理策略

**当前状态**：版本无限累积
**文件**：`apps/web-extension/entrypoints/options/useStore.ts:105`

**缺失功能**：
- [x] 限制版本数量（如保留最近 20 个版本）
- [x] 手动删除特定版本
- [ ] 版本对比功能（diff 视图）

---

### 6. 数据导入 - 无合并策略

**当前状态**：完全替换现有数据
**文件**：`apps/web-extension/entrypoints/options/components/Modals/ImportExportModal.tsx:34`

**缺失功能**：
- [x] 合并模式：导入的 prompt 与现有数据合并
- [x] 去重策略：相同 ID 或标题的处理
- [x] 预览模式：导入前预览将要导入的内容
- [x] 导入确认对话框（防止误覆盖）

---

## 🟢 低优先级（体验优化）

### 7. 数据持久化优化

**文件**：`apps/web-extension/entrypoints/options/useStore.ts`

**可改进项**：
- [ ] 添加数据结构版本号（便于未来迁移）
- [ ] 数据导出加密选项
- [ ] 自动备份机制（定期导出到本地文件）

---

### 8. UI/UX 改进

**可改进项**：
- [ ] Prompt Library 添加分页或虚拟滚动（大量 prompt 时性能）
- [ ] 拖拽排序 prompt 或文件夹
- [ ] 批量操作（批量删除、批量添加标签）
- [ ] 深色模式切换闪烁问题

---

### 9. 提示词使用统计

**文件**：`apps/web-extension/entrypoints/options/components/Dashboard.tsx`

**可改进项**：
- [ ] 记录使用次数（useCount）
- [ ] 最近使用过的提示词排序
- [ ] 使用频率图表

---

## 📋 开发建议顺序

1. **先完成 Content Script** - 这是产品的核心功能（在网页中使用提示词）
2. **优化数据导入导出** - 防止用户误操作丢失数据
3. **实现搜索和标签过滤** - 提升使用效率
4. **版本管理优化** - 长期使用的必要功能

---

## 🐛 已知问题

| 问题 | 位置 | 影响 |
|------|------|------|
| ~~Content Script 仅匹配 Google 页面~~ | ~~content.ts matches~~ | ✅ 已修复：匹配所有网址 |
| ~~Topbar 搜索无响应~~ | ~~Topbar.tsx~~ | ✅ 已修复：实现完整搜索功能 |
| ~~标签点击无过滤~~ | ~~Sidebar.tsx~~ | ✅ 已修复：实现标签过滤 |
| ~~导入直接覆盖数据~~ | ~~ImportExportModal.tsx~~ | ✅ 已修复：添加合并模式 |
