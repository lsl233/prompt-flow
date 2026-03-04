import { useState, useEffect } from 'react';
import { Prompt, ViewState } from '@/shared/types';
import { browser } from 'wxt/browser';

const STORAGE_KEY = 'promptflow_prompts';
const STORAGE_VERSION_KEY = 'promptflow_version';
const STORAGE_THEME_KEY = 'promptflow_theme';
const CURRENT_VERSION = 1;
const MAX_VERSIONS_PER_PROMPT = 20;

const INITIAL_PROMPTS: Prompt[] = [
  {
    id: '1',
    title: 'Code Review Assistant',
    description: 'Analyze code for bugs, style, and performance.',
    content: 'Please review the following code for any bugs, style issues, or performance improvements. \n\nLanguage: {{language}}\n\nCode:\n```\n{{code}}\n```',
    tags: ['Development', 'Review'],
    isFavorite: true,
    versions: [
      { id: 'v1', content: 'Please review the following code.', timestamp: Date.now() - 100000 }
    ],
    createdAt: Date.now() - 100000,
    updatedAt: Date.now(),
  },
  {
    id: '2',
    title: 'Email Responder',
    description: 'Draft a professional response to an email.',
    content: 'Draft a professional and polite response to the following email. The tone should be {{tone}}.\n\nOriginal Email:\n{{email_content}}\n\nKey points to include:\n{{key_points}}',
    tags: ['Communication', 'Email'],
    isFavorite: false,
    versions: [],
    createdAt: Date.now() - 50000,
    updatedAt: Date.now() - 50000,
  }
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
      }
      setIsLoaded(true);
    };
    loadStorage();
  }, []);

  // Data migration function
  const migrateData = (data: Prompt[], fromVersion: number): Prompt[] => {
    // Add future migration logic here
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

  const addPrompt = (prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'versions'>) => {
    const newPrompt: Prompt = {
      ...prompt,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      versions: [{ id: Math.random().toString(36).substring(2, 9), content: prompt.content, timestamp: Date.now() }]
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
    allTags,
    setPrompts
  };
}

export type Store = ReturnType<typeof useStore>;
