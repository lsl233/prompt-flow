# Prompt Flow 功能清单

> 最后更新于 2026-03-04

---

## 🟢 待办（体验优化）

### 1. UI/UX 改进

**可改进项**：
- [ ] 拖拽排序 prompt 或文件夹
- [ ] 批量操作（批量删除、批量添加标签）

---

## 🐛 已知问题

| 问题 | 位置 | 状态 |
|------|------|------|
| **切换明暗主题后样式不生效** | `shared/style.css` | 🐛 HTML 标签已添加 `dark` 类，但 Tailwind dark 变体样式未生成 |

### 主题切换 Bug 详情

**现象**：
- HTML 标签已正确添加/移除 `dark` class
- 但 Tailwind 的 dark 变体样式（如 `.dark\:text-slate-100`, `.dark\:bg-slate-900`）未生成

**可能原因**：
- Tailwind v4 的 dark mode 配置问题
- 需要在 CSS 中添加 `@variant dark` 配置
- 或检查 `wxt.config.ts` 中的 Tailwind 插件配置

**相关文件**：
- `apps/web-extension/shared/style.css`
- `apps/web-extension/wxt.config.ts`
- `apps/web-extension/entrypoints/options/index.html` (已有防闪烁脚本)

---

## ✅ 已完成（归档）

<details>
<summary>点击展开已完成的 9 项功能</summary>

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

</details>
