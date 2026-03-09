# Prompt Flow 功能清单

> 最后更新于 2026-03-09

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

### 3. VariableFillerModal 预览区支持直接编辑

**文件**：`entrypoints/options/components/Modals/VariableFillerModal.tsx:150-154`

**需求**：
- [ ] 预览区域从只读改为可编辑（`pre` 标签改为 `textarea` 或 `contentEditable`）

### 4. VariableFillerModal 复制成功提示 ✅

**文件**：`entrypoints/options/components/Modals/VariableFillerModal.tsx`

**已完成**：
- [x] 复制成功后展示 toast 提示（当前只有图标变化）
- [x] 使用命令式 Toast API (`toast.success()`) 简化代码

### 5. Toast 组件命令式 API ✅

**文件**：`shared/components/Toast/`

**已完成**：
- [x] 创建命令式 Toast API (`toast.show()`, `toast.success()`, `toast.error()`)
- [x] 支持 `contentScript` 选项以适配 content script 环境
- [x] 使用 `ToastProvider` 管理全局 toast 状态
- [x] 保留声明式 Toast 组件用于向后兼容
- [x] 删除独立的 `ContentToast.tsx` 文件

**API 示例**：
```typescript
import { toast } from '@/shared/components/Toast';

// 在 Options 页面
toast.success('复制成功！');
toast.error('操作失败');

// 在 Content Script
toast.success({ message: '复制成功！', contentScript: true });
```

### 6. Popup 权限检测与 Content Script 注入 ✅

**文件**：`entrypoints/popup/App.tsx`, `entrypoints/background.ts`

**已完成**：
- [x] 用户点击 popup 时检测当前网站是否有权限注入 content script
- [x] 如果没有权限，显示授权提示并引导用户授权
- [x] 授权成功后自动注入 content script
- [x] Popup 中增加"打开 Prompt Picker"按钮，点击后注入并打开 content script

**实现说明**：
- Popup 打开时自动检测当前标签页的权限状态
- 无权限时显示黄色警告框，提示当前网站
- 按钮文字根据权限状态动态变化："授权并打开"或"打开提示词选择器"
- 授权成功后自动注入 content script 并打开 picker
- 注入成功后显示绿色提示，并自动关闭 popup
- 添加 `scripting` 权限到 manifest 以支持动态注入
- 背景脚本添加 `INJECT_CONTENT_SCRIPT` 消息处理

### 7. 设置模块 - 功能整合与信息展示

**文件**：`entrypoints/options/App.tsx`, 新建 `entrypoints/options/components/SettingsPanel.tsx`

**需求**：
- [ ] 导入/导出功能移到设置模块
  - 当前导入/导出在 Sidebar 或独立位置，需要迁移到设置面板
  - 保持现有导入/导出逻辑不变，仅调整 UI 位置
- [ ] 版本号查看
  - 从 `package.json` 或 `manifest.json` 读取版本号
  - 在设置面板底部显示扩展版本
- [ ] 快捷键查看
  - 展示当前配置的快捷键列表
  - 从 manifest 的 `commands` 配置读取
  - 提供快捷键说明和触发方式

**建议实现**：
```typescript
// 设置面板入口
<SettingsPanel
  version={browser.runtime.getManifest().version}
  commands={manifest.commands}
  onImport={handleImport}
  onExport={handleExport}
/>
```

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

### 2026-03-05 至 2026-03-06 完成
11. **Content Script 交互优化** - 点击外部关闭弹窗、Toast 提示
12. **组件重构** - TagSelector 提取为独立组件
13. **i18n 文案补全** - VariableFillerModal 国际化
14. **Dashboard 统计项优化** - 点击直接打开 VariableFillerModal
15. **Sidebar Logo 更新** - 替换为 SVG 图标
16. **Content Script 匹配模式优化** - 默认仅匹配主流 AI 网站
17. **Popup Logo 更新** - 替换为 SVG 图标
18. **Popup 权限检测** - 权限检测与 Content Script 动态注入

</details>
