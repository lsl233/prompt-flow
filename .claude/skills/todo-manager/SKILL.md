---
name: todo-manager
description: |
  Manage and execute TODO items for the project. Use this skill whenever the user wants to:
  - Add new TODO items (bug reports, feature requests, tasks)
  - View or check current TODO items
  - Clean up completed TODO items
  - Organize TODO items by priority or category
  - Update existing TODO items with new information
  - Mark TODO items as completed
  - Execute/Implement a specific TODO item

  This skill helps maintain a clean and organized TODO.md file by:
  1. Reading and understanding the existing TODO structure
  2. Adding new items with proper categorization
  3. Linking TODO items to relevant code files
  4. Cleaning up completed items to keep the file manageable
  5. Executing TODO items by analyzing requirements and implementing them
  6. Ensuring consistent formatting
---

# TODO Manager Skill

This skill manages the project's TODO.md file, handling bug reports, feature requests, and task tracking.

## When to Use

Use this skill when the user:
- Mentions a bug that needs to be tracked
- Requests a new feature or enhancement
- Wants to add a task to the TODO list
- Asks to view current TODOs
- Wants to clean up or organize the TODO file
- Needs to mark items as completed
- Wants to execute/implement a specific TODO item

## Workflow

### 1. Read Current TODO State

Always start by reading the existing TODO.md file to understand:
- Current structure and formatting
- Existing categories and priorities
- Related items that might need updating
- Items that could be cleaned up

### 2. Analyze User Request

Determine the type of request:

**Bug Report**: Issues, errors, or unexpected behavior
- Location: Include file path if known
- Description: Clear explanation of the problem
- Impact: How it affects the user/project

**Feature Request**: New functionality or enhancements
- Goal: What the feature should accomplish
- Location: Relevant files or components
- Priority: Based on user needs

**Task**: General work items
- Description: What needs to be done
- Context: Why it's needed

### 3. Add New TODO Item

Add items to the appropriate section following the existing format:

```markdown
### X. Title - Brief Description

**当前状态**：Status description
**文件**：`path/to/file.ts:line`

**缺失功能**：
- [ ] Task 1
- [ ] Task 2

**建议实现**：
```code
// Optional code suggestion
```
```

For quick additions to the "已知问题" table:
```markdown
| Problem description | File location | Impact |
```

### 4. Link to Code

When possible:
- Include file paths with line numbers
- Reference related functions or components
- Link to existing issues or PRs

### 5. Clean Up Completed Items

When asked to clean up:

1. Identify completed items (marked with [x] or ~~strikethrough~~)
2. Move them to a "已完成" section or remove them
3. Keep the file under 200 lines for readability
4. Archive old items if needed

### 6. Execute/Implement a TODO Item

When the user asks to complete or implement a TODO item (e.g., "完成第3个TODO", "实现主题切换功能"):

1. **Identify the Target Item**
   - Match by section number (e.g., "第3个" → section 3)
   - Match by keyword in title or description
   - Ask for clarification if multiple items match

2. **Analyze Requirements**
   - Read the TODO description carefully
   - Identify affected files from the TODO entry
   - Understand what needs to be implemented

3. **Explore Related Code**
   - Read the file(s) mentioned in the TODO
   - Understand the current implementation
   - Identify where changes need to be made

4. **Implement the Solution**
   - Make necessary code changes
   - Follow existing code patterns and style
   - Ensure changes match the TODO requirements

5. **Test if Possible**
   - Run relevant tests if available
   - Verify the implementation works as expected

6. **Update TODO.md**
   - Mark the item as completed (`- [x]`)
   - Or remove it if fully completed
   - Add any new TODOs discovered during implementation

### 7. Update TODO.md

Use the Edit tool to make changes:
- Add new sections if needed
- Update existing items
- Reorganize by priority
- Maintain consistent formatting

## Formatting Guidelines

### Priority Indicators

- 🔴 高优先级：Core functionality missing or broken
- 🟡 中优先级：Features that are incomplete
- 🟢 低优先级：Nice-to-have improvements

### Status Indicators

- `- [ ]` - Not started
- `- [x]` - Completed
- `~~text~~` - Deprecated/removed

### Code References

Always use backticks for file paths:
- `apps/web-extension/entrypoints/options/App.tsx`
- `apps/web-extension/entrypoints/options/App.tsx:42` (with line number)

## Examples

### Adding a Bug Report

User: "发现 Topbar 主题切换按钮点击没反应"

Action:
1. Read TODO.md
2. Add to "已知问题" table:
   ```markdown
   | 点击主题切换没有效果 | Topbar.tsx | 主题切换按钮无响应 |
   ```

### Adding a Feature Request

User: "需要添加搜索功能"

Action:
1. Read TODO.md
2. Add new section:
   ```markdown
   ### N. Feature Name - Description

   **当前状态**：Not implemented
   **文件**：`path/to/file.ts`

   **缺失功能**：
   - [ ] Subtask 1
   - [ ] Subtask 2
   ```

### Cleaning Up

User: "清理已完成的 TODO"

Action:
1. Scan for items marked with [x] or ~~strikethrough~~
2. Either:
   - Move to "## ✅ 已完成" section at the bottom
   - Remove entirely if no longer relevant
3. Update any section numbering if items were removed

### Executing a TODO Item

User: "完成第5个TODO" or "实现主题切换功能"

Action:
1. Read TODO.md to identify the target item
2. Read the relevant code files mentioned in the TODO
3. Implement the required changes
4. Test the implementation
5. Mark the TODO item as completed

**Example Flow:**

TODO.md has:
```markdown
### 5. 主题切换 - 点击无效果

**当前状态**：按钮点击无响应
**文件**：`Topbar.tsx:25`

**缺失功能**：
- [ ] 添加点击事件处理
- [ ] 切换主题状态
```

Execution steps:
1. Read `Topbar.tsx` to understand current implementation
2. Add click handler for theme toggle button
3. Implement theme switching logic
4. Test the functionality
5. Update TODO.md to mark as completed:
   ```markdown
   - [x] 添加点击事件处理
   - [x] 切换主题状态
   ```

## Output

After managing TODOs, summarize:
- What was added/updated/removed
- Current count of open items
- Any items that might need immediate attention
