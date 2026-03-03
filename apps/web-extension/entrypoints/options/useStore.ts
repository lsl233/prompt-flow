import { useState, useEffect } from 'react';
import { Prompt, ViewState } from './types';
import { browser } from 'wxt/browser';

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

const STORAGE_KEY = 'promptflow_prompts';

export function useStore() {
  const [prompts, setPrompts] = useState<Prompt[]>(INITIAL_PROMPTS);
  const [view, setView] = useState<ViewState>('dashboard');
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
        const result = await browser.storage.local.get(STORAGE_KEY);
        if (result[STORAGE_KEY]) {
          setPrompts(result[STORAGE_KEY] as Prompt[]);
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

  // Save to storage when prompts change
  useEffect(() => {
    if (!isLoaded) return;
    const saveStorage = async () => {
      try {
        await browser.storage.local.set({ [STORAGE_KEY]: prompts });
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

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

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
          updated.versions = [{ id: Math.random().toString(36).substring(2, 9), content: updates.content, timestamp: Date.now() }, ...p.versions];
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

  const allTags = Array.from(new Set(prompts.flatMap(p => p.tags))).sort();

  return {
    prompts,
    view,
    setView,
    isDarkMode,
    toggleTheme,
    addPrompt,
    updatePrompt,
    deletePrompt,
    duplicatePrompt,
    allTags,
    setPrompts
  };
}

export type Store = ReturnType<typeof useStore>;
