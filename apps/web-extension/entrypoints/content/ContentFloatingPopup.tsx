import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Command, Check, X } from 'lucide-react';
import { browser } from 'wxt/browser';
import type { Prompt } from '../options/types';

interface VariableState {
  name: string;
  value: string;
}

export default function ContentFloatingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [variables, setVariables] = useState<VariableState[]>([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load prompts from storage
  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const result = await browser.storage.local.get('promptflow_prompts');
        if (result.promptflow_prompts) {
          setPrompts(result.promptflow_prompts as Prompt[]);
        }
      } catch (e) {
        console.error('[Prompt Flow] Failed to load prompts:', e);
      }
    };

    loadPrompts();

    // Listen for storage changes
    const handleStorageChange = (changes: Record<string, { oldValue?: unknown; newValue?: unknown }>) => {
      if (changes.promptflow_prompts) {
        setPrompts(changes.promptflow_prompts.newValue as Prompt[]);
      }
    };

    browser.storage.onChanged.addListener(handleStorageChange);
    return () => {
      browser.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  // Listen for toggle event
  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('prompt-flow:toggle', handleToggle);
    return () => window.removeEventListener('prompt-flow:toggle', handleToggle);
  }, []);

  // Global keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        // Don't trigger if user is typing in an input
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLInputElement ||
            activeElement instanceof HTMLTextAreaElement) {
          return;
        }
        e.preventDefault();
        setIsOpen(true);
      }

      if (e.key === 'Escape' && isOpen) {
        if (selectedPrompt) {
          setSelectedPrompt(null);
          setVariables([]);
        } else {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, selectedPrompt]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !selectedPrompt) {
      inputRef.current?.focus();
    }
  }, [isOpen, selectedPrompt]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const filteredPrompts = useMemo(() => {
    return prompts
      .filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .slice(0, 8);
  }, [prompts, searchQuery]);

  const extractVariables = (content: string): string[] => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [...content.matchAll(regex)];
    return Array.from(new Set(matches.map(m => m[1].trim())));
  };

  const handleSelectPrompt = (prompt: Prompt) => {
    const varNames = extractVariables(prompt.content);

    if (varNames.length === 0) {
      // No variables, copy directly and insert
      insertContent(prompt.content);
    } else {
      setSelectedPrompt(prompt);
      setVariables(varNames.map(name => ({ name, value: '' })));
    }
  };

  const insertContent = (content: string) => {
    // Try to insert into the active input element
    const activeElement = document.activeElement as HTMLElement | null;

    if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
      // Insert at cursor position
      const start = activeElement.selectionStart || 0;
      const end = activeElement.selectionEnd || 0;
      const value = activeElement.value;

      activeElement.value = value.substring(0, start) + content + value.substring(end);
      activeElement.selectionStart = activeElement.selectionEnd = start + content.length;
      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
      activeElement.focus();
    } else {
      // Fallback: copy to clipboard
      copyToClipboard(content);
    }

    setIsOpen(false);
    setSelectedPrompt(null);
    setVariables([]);
    setSearchQuery('');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('[Prompt Flow] Failed to copy:', err);
    }
  };

  const handleVariableSubmit = () => {
    if (!selectedPrompt) return;

    let result = selectedPrompt.content;
    variables.forEach(({ name, value }) => {
      const regex = new RegExp(`\\{\\{${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\}\\}`, 'g');
      result = result.replace(regex, value || `{{${name}}}`);
    });

    insertContent(result);
  };

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (!selectedPrompt) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredPrompts.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredPrompts.length) % filteredPrompts.length);
      } else if (e.key === 'Enter' && filteredPrompts[selectedIndex]) {
        e.preventDefault();
        handleSelectPrompt(filteredPrompts[selectedIndex]);
      }
    } else {
      if (e.key === 'Enter' && e.metaKey) {
        e.preventDefault();
        handleVariableSubmit();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="pf-fixed pf-inset-0 pf-z-[2147483647] pf-flex pf-items-start pf-justify-center pf-pt-[15vh] pf-p-4 pf-bg-slate-900/50 pf-backdrop-blur-sm">
      <div
        className="pf-bg-white dark:pf-bg-slate-800 pf-w-full pf-max-w-xl pf-rounded-2xl pf-shadow-2xl pf-border pf-border-slate-200 dark:pf-border-slate-700 pf-overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {!selectedPrompt ? (
          <>
            <div className="pf-flex pf-items-center pf-px-4 pf-py-3 pf-border-b pf-border-slate-200 dark:pf-border-slate-700">
              <Search className="pf-w-[18px] pf-h-[18px] pf-text-slate-400 pf-mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyNavigation}
                placeholder="Search prompts..."
                className="pf-flex-1 pf-bg-transparent pf-border-none pf-outline-none pf-text-slate-900 dark:pf-text-white pf-placeholder-slate-400 pf-text-lg"
              />
              <div className="pf-flex pf-items-center pf-gap-1 pf-text-xs pf-text-slate-400 pf-font-medium pf-bg-slate-100 dark:pf-bg-slate-700 pf-px-2 pf-py-1 pf-rounded">
                <Command className="pf-w-3 pf-h-3" /> K
              </div>
            </div>

            <div className="pf-max-h-[60vh] pf-overflow-y-auto pf-p-2">
              {filteredPrompts.length === 0 ? (
                <div className="pf-p-4 pf-text-center pf-text-slate-500 pf-text-sm">
                  {searchQuery ? 'No prompts found.' : 'No prompts available. Add some in the extension options.'}
                </div>
              ) : (
                <ul className="pf-space-y-1">
                  {filteredPrompts.map((prompt, index) => (
                    <li
                      key={prompt.id}
                      onClick={() => handleSelectPrompt(prompt)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`pf-flex pf-flex-col pf-px-4 pf-py-3 pf-rounded-xl pf-cursor-pointer pf-transition-colors ${
                        selectedIndex === index
                          ? 'pf-bg-blue-50 dark:pf-bg-blue-900/30'
                          : 'pf-hover:bg-slate-50 dark:pf-hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="pf-flex pf-items-center pf-justify-between">
                        <span className={`pf-font-medium ${selectedIndex === index ? 'pf-text-blue-700 dark:pf-text-blue-400' : 'pf-text-slate-900 dark:pf-text-white'}`}>
                          {prompt.title}
                        </span>
                        <div className="pf-flex pf-gap-1.5">
                          {prompt.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="pf-text-[10px] pf-px-1.5 pf-py-0.5 pf-bg-slate-100 dark:pf-bg-slate-700 pf-text-slate-500 dark:pf-text-slate-400 pf-rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="pf-text-xs pf-text-slate-500 dark:pf-text-slate-400 pf-mt-1 pf-truncate">
                        {prompt.description}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pf-px-4 pf-py-2 pf-border-t pf-border-slate-200 dark:pf-border-slate-700 pf-bg-slate-50 dark:pf-bg-slate-800/50 pf-flex pf-items-center pf-justify-between pf-text-xs pf-text-slate-500">
              <div className="pf-flex pf-gap-4">
                <span className="pf-flex pf-items-center pf-gap-1">↑↓ to navigate</span>
                <span className="pf-flex pf-items-center pf-gap-1">↵ to select</span>
              </div>
              <span>esc to close</span>
            </div>
          </>
        ) : (
          <div className="pf-flex pf-flex-col">
            <div className="pf-px-5 pf-py-4 pf-border-b pf-border-slate-200 dark:pf-border-slate-700 pf-bg-slate-50 dark:pf-bg-slate-800/50 pf-flex pf-items-center pf-justify-between">
              <div>
                <h3 className="pf-font-semibold pf-text-slate-900 dark:pf-text-white">{selectedPrompt.title}</h3>
                <p className="pf-text-xs pf-text-slate-500 pf-mt-0.5">Fill in the variables</p>
              </div>
              <button
                onClick={() => {
                  setSelectedPrompt(null);
                  setVariables([]);
                }}
                className="pf-p-1.5 pf-text-slate-400 pf-hover:text-slate-600 pf-rounded-full pf-hover:bg-slate-200 dark:pf-hover:bg-slate-700"
              >
                <X className="pf-w-4 pf-h-4" />
              </button>
            </div>

            <div className="pf-p-5 pf-space-y-4 pf-max-h-[50vh] pf-overflow-y-auto">
              {variables.map((variable, idx) => (
                <div key={variable.name}>
                  <label className="pf-block pf-text-sm pf-font-medium pf-text-slate-700 dark:pf-text-slate-300 pf-mb-1 pf-capitalize">
                    {variable.name.replace(/_/g, ' ')}
                  </label>
                  <input
                    autoFocus={idx === 0}
                    type="text"
                    value={variable.value}
                    onChange={e => {
                      const newVars = [...variables];
                      newVars[idx].value = e.target.value;
                      setVariables(newVars);
                    }}
                    onKeyDown={handleKeyNavigation}
                    className="pf-w-full pf-px-3 pf-py-2 pf-bg-white dark:pf-bg-slate-900 pf-border pf-border-slate-200 dark:pf-border-slate-700 pf-rounded-lg pf-text-sm pf-focus:ring-2 pf-focus:ring-blue-500 pf-outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="pf-px-5 pf-py-4 pf-border-t pf-border-slate-200 dark:pf-border-slate-700 pf-bg-slate-50 dark:pf-bg-slate-800/50 pf-flex pf-justify-between pf-items-center">
              <span className="pf-text-xs pf-text-slate-500">Cmd + Enter to insert</span>
              <button
                onClick={handleVariableSubmit}
                className="pf-px-4 pf-py-2 pf-bg-blue-600 pf-hover:bg-blue-700 pf-text-white pf-text-sm pf-font-medium pf-rounded-lg pf-transition-colors pf-shadow-sm pf-flex pf-items-center pf-gap-2"
              >
                {copied ? <Check className="pf-w-4 pf-h-4" /> : null}
                {copied ? 'Inserted!' : 'Insert / Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
