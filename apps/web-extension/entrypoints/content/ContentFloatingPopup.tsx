import { useState, useEffect, useRef } from 'react';
import { browser } from 'wxt/browser';
import type { Prompt } from '../options/types';
import PromptPicker from '../options/components/PromptPicker';

export default function ContentFloatingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [copied, setCopied] = useState(false);

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
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen]);

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
      navigator.clipboard.writeText(content).catch(err => {
        console.error('[Prompt Flow] Failed to copy:', err);
      });
    }

    setIsOpen(false);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSelect = (_prompt: unknown, filledContent: string) => {
    insertContent(filledContent);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2147483647] flex items-start justify-center pt-[15vh] p-4 bg-slate-900/50 backdrop-blur-sm">
      <div
        className="bg-white dark:bg-slate-800 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <PromptPicker
          prompts={prompts}
          onSelect={handleSelect}
          onClose={handleClose}
          classNamePrefix=""
          actionLabel={copied ? 'Inserted!' : 'Insert / Copy'}
        />
      </div>
    </div>
  );
}
