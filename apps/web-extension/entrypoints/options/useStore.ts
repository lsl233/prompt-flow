import { useState, useEffect } from 'react';
import { Prompt, ViewState } from '@/shared/types';
import { browser } from 'wxt/browser';

const STORAGE_KEY = 'promptflow_prompts';
const STORAGE_VERSION_KEY = 'promptflow_version';
const STORAGE_THEME_KEY = 'promptflow_theme';
const CURRENT_VERSION = 2;
const MAX_VERSIONS_PER_PROMPT = 20;

const INITIAL_PROMPTS: Prompt[] = [
  {
    id: 'template-rctco',
    title: 'RCTCO 提示词框架（演示）',
    description: '一个结构化的提示词模版框架，包含角色、背景、任务、约束和输出格式五个核心要素',
    content: `角色 (Role)：{{给 AI 一个明确的身份定位}}

背景 (Context)：
{{解释为什么要做这件事，受众是谁}}

任务 (Task)：
{{极其明确地描述具体要做什么}}

约束 (Constraints)：
{{设定边界条件（字数、语气、避开的内容）}}

输出格式 (Output)：
{{规定结果的长相}}`,
    tags: ['模版', 'RCTCO框架'],
    isFavorite: true,
    versions: [
      {
        id: 'v1-rctco',
        content: `角色 (Role)：
{{角色}}

背景 (Context)：
{{背景}}

任务 (Task)：
{{任务}}

约束 (Constraints)：
{{约束}}

输出格式 (Output)：
{{输出格式}}`,
        timestamp: Date.now(),
      }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    useCount: 1,
    lastUsedAt: Date.now(),
  },
  {
    id: 'example-fitness',
    title: '健身教练计划（演示）',
    description: '使用 RCTCO 框架制定的4周减脂增肌计划示例',
    content: `角色 (Role)：你是一位拥有 10 年经验的资深健身教练。

背景 (Context)：
我是一个平时工作很忙、只有周末能运动的上班族。

任务 (Task)：
请为我制定一份为期 4 周的减脂增肌计划。

约束 (Constraints)：
不要推荐昂贵的器械，每餐预算控制在 30 元内。

输出格式 (Output)：
请用表格形式呈现，并分条列出购物清单。`,
    tags: ['示例', '健身', 'RCTCO框架'],
    isFavorite: false,
    versions: [
      {
        id: 'v1-fitness',
        content: `角色 (Role)：
你是一位拥有 10 年经验的资深健身教练。

背景 (Context)：
我是一个平时工作很忙、只有周末能运动的上班族。

任务 (Task)：
请为我制定一份为期 4 周的减脂增肌计划。

约束 (Constraints)：
不要推荐昂贵的器械，每餐预算控制在 30 元内。

输出格式 (Output)：
请用表格形式呈现，并分条列出购物清单。`,
        timestamp: Date.now(),
      }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    useCount: 2,
    lastUsedAt: Date.now(),
  },
];

export function useStore() {
  const [prompts, setPrompts] = useState<Prompt[]>(INITIAL_PROMPTS);
  const [view, setView] = useState<ViewState>('dashboard');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    const loadStorage = async () => {
      try {
        // Check version for data migration
        const versionResult = await browser.storage.local.get(STORAGE_VERSION_KEY);
        const storedVersion = (versionResult[STORAGE_VERSION_KEY] as number) || 0;

        const result = await browser.storage.local.get(STORAGE_KEY);
        if (result[STORAGE_KEY]) {
          let loadedPrompts = result[STORAGE_KEY] as Prompt[];

          // Data migration if needed
          if (storedVersion < CURRENT_VERSION) {
            loadedPrompts = migrateData(loadedPrompts, storedVersion);
            await browser.storage.local.set({ [STORAGE_KEY]: loadedPrompts });
            await browser.storage.local.set({ [STORAGE_VERSION_KEY]: CURRENT_VERSION });
          }

          setPrompts(loadedPrompts);
        } else {
          // First install, save initial prompts
          await browser.storage.local.set({ [STORAGE_KEY]: INITIAL_PROMPTS });
          await browser.storage.local.set({ [STORAGE_VERSION_KEY]: CURRENT_VERSION });
        }

        // Load theme preference
        const themeResult = await browser.storage.local.get(STORAGE_THEME_KEY);
        if (themeResult[STORAGE_THEME_KEY] !== undefined) {
          setIsDarkMode(themeResult[STORAGE_THEME_KEY] as boolean);
        }
      } catch (e) {
        // Fallback to localStorage
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setPrompts(JSON.parse(saved));
        }
        // Fallback: load theme from localStorage
        const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
        if (savedTheme !== null) {
          try {
            setIsDarkMode(JSON.parse(savedTheme));
          } catch (err) {
            // Ignore parse error
          }
        }
      }
      setIsLoaded(true);
    };
    loadStorage();
  }, []);

  // Data migration function
  const migrateData = (data: Prompt[], fromVersion: number): Prompt[] => {
    // Migration from version 1 to 2: add useCount and lastUsedAt fields
    if (fromVersion < 2) {
      return data.map(prompt => ({
        ...prompt,
        useCount: 0,
        lastUsedAt: null,
      }));
    }
    return data;
  };

  // Save to storage when prompts change
  useEffect(() => {
    if (!isLoaded) return;
    const saveStorage = async () => {
      try {
        await browser.storage.local.set({ [STORAGE_KEY]: prompts });
        await browser.storage.local.set({ [STORAGE_VERSION_KEY]: CURRENT_VERSION });
      } catch (e) {
        // Fallback to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
      }
    };
    saveStorage();
  }, [prompts, isLoaded]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    browser.storage.local.set({ [STORAGE_THEME_KEY]: newValue }).catch(() => {
      // Fallback to localStorage
      localStorage.setItem(STORAGE_THEME_KEY, JSON.stringify(newValue));
    });
  };

  const addPrompt = (prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'versions' | 'useCount' | 'lastUsedAt'>) => {
    const newPrompt: Prompt = {
      ...prompt,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      versions: [{ id: Math.random().toString(36).substring(2, 9), content: prompt.content, timestamp: Date.now() }],
      useCount: 0,
      lastUsedAt: null,
    };
    setPrompts([newPrompt, ...prompts]);
  };

  const updatePrompt = (id: string, updates: Partial<Prompt>) => {
    setPrompts(prompts.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates, updatedAt: Date.now() };
        if (updates.content && updates.content !== p.content) {
          // Add new version and limit to MAX_VERSIONS_PER_PROMPT
          const newVersion = { id: Math.random().toString(36).substring(2, 9), content: updates.content, timestamp: Date.now() };
          updated.versions = [newVersion, ...p.versions].slice(0, MAX_VERSIONS_PER_PROMPT);
        }
        return updated;
      }
      return p;
    }));
  };

  const deletePrompt = (id: string) => {
    setPrompts(prompts.filter(p => p.id !== id));
  };

  const duplicatePrompt = (id: string) => {
    const promptToDuplicate = prompts.find(p => p.id === id);
    if (promptToDuplicate) {
      addPrompt({
        title: `${promptToDuplicate.title} (Copy)`,
        description: promptToDuplicate.description,
        content: promptToDuplicate.content,
        tags: promptToDuplicate.tags,
        isFavorite: false,
      });
    }
  };

  // Delete a specific version from prompt history
  const deleteVersion = (promptId: string, versionId: string) => {
    setPrompts(prompts.map(p => {
      if (p.id === promptId) {
        return {
          ...p,
          versions: p.versions.filter(v => v.id !== versionId)
        };
      }
      return p;
    }));
  };

  // Restore a specific version
  const restoreVersion = (promptId: string, versionId: string) => {
    const prompt = prompts.find(p => p.id === promptId);
    if (!prompt) return;

    const version = prompt.versions.find(v => v.id === versionId);
    if (!version) return;

    updatePrompt(promptId, { content: version.content });
  };

  // Record prompt usage (increment useCount and update lastUsedAt)
  const recordPromptUsage = (promptId: string) => {
    setPrompts(prompts.map(p => {
      if (p.id === promptId) {
        return {
          ...p,
          useCount: (p.useCount || 0) + 1,
          lastUsedAt: Date.now(),
        };
      }
      return p;
    }));
  };

  const allTags = Array.from(new Set(prompts.flatMap(p => p.tags))).sort();

  // Filtered prompts based on selected tag
  const filteredPrompts = selectedTag
    ? prompts.filter(p => p.tags.includes(selectedTag))
    : prompts;

  return {
    prompts,
    filteredPrompts,
    view,
    setView,
    selectedTag,
    setSelectedTag,
    isDarkMode,
    toggleTheme,
    addPrompt,
    updatePrompt,
    deletePrompt,
    duplicatePrompt,
    deleteVersion,
    restoreVersion,
    recordPromptUsage,
    allTags,
    setPrompts,
  };
}

export type Store = ReturnType<typeof useStore>;
