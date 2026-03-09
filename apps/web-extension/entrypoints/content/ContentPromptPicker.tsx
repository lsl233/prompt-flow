import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Command, Check, X } from 'lucide-react';
import type { Prompt } from '@/shared/types';
import { useI18n } from '@/shared/i18n';
import { toast } from '@/shared/components/Toast';

export interface ContentPromptPickerProps {
  prompts: Prompt[];
  onSelect: (prompt: Prompt, filledContent: string) => void;
  onClose: () => void;
  autoFocus?: boolean;
  actionLabel?: string;
  showInsertHint?: boolean;
}

interface VariableState {
  name: string;
  value: string;
}

export default function ContentPromptPicker({
  prompts,
  onSelect,
  onClose,
  autoFocus = true,
  actionLabel,
  showInsertHint = true,
}: ContentPromptPickerProps) {
  const { t } = useI18n();
  const finalActionLabel = actionLabel ?? t('variablesCopyClipboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [variables, setVariables] = useState<VariableState[]>([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredPrompts = useMemo(() => {
    return prompts
      .filter(
        p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .slice(0, 8);
  }, [prompts, searchQuery]);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPrompt) {
          setSelectedPrompt(null);
          setVariables([]);
        } else {
          onClose();
        }
        return;
      }

      if (!selectedPrompt) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredPrompts.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(
            prev =>
              (prev - 1 + filteredPrompts.length) % filteredPrompts.length
          );
        } else if (e.key === 'Enter' && filteredPrompts[selectedIndex]) {
          e.preventDefault();
          handleSelectPrompt(filteredPrompts[selectedIndex]);
        }
      } else {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          handleConfirm();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredPrompts, selectedIndex, selectedPrompt, onClose]);

  const extractVariables = (content: string): string[] => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [...content.matchAll(regex)];
    return Array.from(new Set(matches.map(m => m[1].trim())));
  };

  const handleSelectPrompt = (prompt: Prompt) => {
    const varNames = extractVariables(prompt.content);

    if (varNames.length === 0) {
      onSelect(prompt, prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
      toast.success({ message: t('toastCopySuccess'), contentScript: true });
    } else {
      setSelectedPrompt(prompt);
      setVariables(varNames.map(name => ({ name, value: '' })));
    }
  };

  const handleConfirm = () => {
    if (!selectedPrompt) return;

    let result = selectedPrompt.content;
    variables.forEach(({ name, value }) => {
      const regex = new RegExp(
        `\\{\\{${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\}\\}`,
        'g'
      );
      result = result.replace(regex, value || `{{${name}}}`);
    });

    onSelect(selectedPrompt, result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
    toast.success({ message: t('toastCopySuccess'), contentScript: true });
  };

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (!selectedPrompt) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredPrompts.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(
          prev =>
            (prev - 1 + filteredPrompts.length) % filteredPrompts.length
        );
      } else if (e.key === 'Enter' && filteredPrompts[selectedIndex]) {
        e.preventDefault();
        handleSelectPrompt(filteredPrompts[selectedIndex]);
      }
    } else {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleConfirm();
      }
    }
  };

  if (!selectedPrompt) {
    return (
      <>
        <div className="flex items-center px-[16px] py-[12px] border-b border-slate-200 dark:border-slate-700">
          <Search className="w-[18px] h-[18px] text-slate-400 mr-[12px]" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyNavigation}
            placeholder={t('pickerSearchPlaceholder')}
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-[18px]"
          />
          <div className="flex items-center gap-[4px] text-[12px] text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-[8px] py-[4px] rounded-[4px]">
            <Command className="w-[12px] h-[12px]" /> K
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-[8px]">
          {filteredPrompts.length === 0 ? (
            <div className="p-[16px] text-center text-slate-500 text-[14px]">
              {searchQuery
                ? t('pickerNoPromptsSearch')
                : t('pickerNoPromptsAvailable')}
            </div>
          ) : (
            <ul className="space-y-[4px]">
              {filteredPrompts.map((prompt, index) => (
                <li
                  key={prompt.id}
                  onClick={() => handleSelectPrompt(prompt)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex flex-col px-[16px] py-[12px] rounded-[12px] cursor-pointer transition-colors ${
                    selectedIndex === index
                      ? 'bg-blue-50 dark:bg-blue-900/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        selectedIndex === index
                          ? 'text-blue-700 dark:text-blue-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {prompt.title}
                    </span>
                    <div className="flex gap-[6px]">
                      {prompt.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="text-[12px] px-[6px] py-[2px] bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-[4px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[12px] text-slate-500 dark:text-slate-400 mt-[4px] truncate">
                    {prompt.description}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-[16px] py-[8px] border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-[12px] text-slate-500">
          <div className="flex gap-[16px]">
            <span className="flex items-center gap-[4px]">↑↓ {t('pickerNavigate')}</span>
            <span className="flex items-center gap-[4px]">↵ {t('pickerSelect')}</span>
          </div>
          <span>{t('pickerClose')}</span>
        </div>
      </>
    );
  }

  // Variable input view
  return (
    <div className="flex flex-col">
      <div className="px-[20px] py-[16px] border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {selectedPrompt.title}
          </h3>
          <p className="text-[12px] text-slate-500 mt-[2px]">
            {t('variablesFillVariables')}
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedPrompt(null);
            setVariables([]);
          }}
          className="p-[6px] text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          <X className="w-[16px] h-[16px]" />
        </button>
      </div>

      <div className="p-[20px] space-y-[16px] max-h-[50vh] overflow-y-auto">
        {variables.map((variable, idx) => (
          <div key={variable.name}>
            <label className="block text-[14px] font-medium text-slate-700 dark:text-slate-300 mb-[4px] capitalize">
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
              className="w-full px-[12px] py-[8px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[8px] text-[14px] focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        ))}
      </div>

      <div className="px-[20px] py-[16px] border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
        {showInsertHint && (
          <span className="text-[12px] text-slate-500">
            {t('variablesCmdEnter', [finalActionLabel.toLowerCase()])}
          </span>
        )}
        <button
          onClick={handleConfirm}
          className="px-[16px] py-[8px] bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-[8px] transition-colors shadow-sm flex items-center gap-[8px] ml-auto"
        >
          {copied ? <Check className="w-[16px] h-[16px]" /> : null}
          {copied ? t('variablesCopied') : finalActionLabel}
        </button>
      </div>
    </div>
  );
}
