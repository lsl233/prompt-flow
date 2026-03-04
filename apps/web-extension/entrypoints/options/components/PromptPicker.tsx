import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Command, Check, X } from 'lucide-react';
import type { Prompt } from '../types';

export interface PromptPickerProps {
  prompts: Prompt[];
  onSelect: (prompt: Prompt, filledContent: string) => void;
  onClose: () => void;
  autoFocus?: boolean;
  classNamePrefix?: string;
  actionLabel?: string;
  showInsertHint?: boolean;
}

interface VariableState {
  name: string;
  value: string;
}

export default function PromptPicker({
  prompts,
  onSelect,
  onClose,
  autoFocus = true,
  classNamePrefix = '',
  actionLabel = 'Copy to Clipboard',
  showInsertHint = true,
}: PromptPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [variables, setVariables] = useState<VariableState[]>([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const p = (className: string) =>
    classNamePrefix ? `${classNamePrefix}${className}` : className;

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
        <div
          className={p(
            'flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-700'
          )}
        >
          <Search className={p('w-[18px] h-[18px] text-slate-400 mr-3')} />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyNavigation}
            placeholder="Search prompts..."
            className={p(
              'flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-lg'
            )}
          />
          <div
            className={p(
              'flex items-center gap-1 text-xs text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded'
            )}
          >
            <Command className={p('w-3 h-3')} /> K
          </div>
        </div>

        <div className={p('max-h-[60vh] overflow-y-auto p-2')}>
          {filteredPrompts.length === 0 ? (
            <div
              className={p(
                'p-4 text-center text-slate-500 text-sm'
              )}
            >
              {searchQuery
                ? 'No prompts found.'
                : 'No prompts available. Add some in the extension options.'}
            </div>
          ) : (
            <ul className={p('space-y-1')}>
              {filteredPrompts.map((prompt, index) => (
                <li
                  key={prompt.id}
                  onClick={() => handleSelectPrompt(prompt)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={p(
                    `flex flex-col px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                      selectedIndex === index
                        ? 'bg-blue-50 dark:bg-blue-900/30'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`
                  )}
                >
                  <div className={p('flex items-center justify-between')}>
                    <span
                      className={p(
                        `font-medium ${
                          selectedIndex === index
                            ? 'text-blue-700 dark:text-blue-400'
                            : 'text-slate-900 dark:text-white'
                        }`
                      )}
                    >
                      {prompt.title}
                    </span>
                    <div className={p('flex gap-1.5')}>
                      {prompt.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className={p(
                            'text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded'
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className={p(
                      'text-xs text-slate-500 dark:text-slate-400 mt-1 truncate'
                    )}
                  >
                    {prompt.description}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={p(
            'px-4 py-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs text-slate-500'
          )}
        >
          <div className={p('flex gap-4')}>
            <span className={p('flex items-center gap-1')}>↑↓ to navigate</span>
            <span className={p('flex items-center gap-1')}>↵ to select</span>
          </div>
          <span>esc to close</span>
        </div>
      </>
    );
  }

  // Variable input view
  return (
    <div className={p('flex flex-col')}>
      <div
        className={p(
          'px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between'
        )}
      >
        <div>
          <h3
            className={p(
              'font-semibold text-slate-900 dark:text-white'
            )}
          >
            {selectedPrompt.title}
          </h3>
          <p className={p('text-xs text-slate-500 mt-0.5')}>
            Fill in the variables
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedPrompt(null);
            setVariables([]);
          }}
          className={p(
            'p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700'
          )}
        >
          <X className={p('w-4 h-4')} />
        </button>
      </div>

      <div className={p('p-5 space-y-4 max-h-[50vh] overflow-y-auto')}>
        {variables.map((variable, idx) => (
          <div key={variable.name}>
            <label
              className={p(
                'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 capitalize'
              )}
            >
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
              className={p(
                'w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none'
              )}
            />
          </div>
        ))}
      </div>

      <div
        className={p(
          'px-5 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center'
        )}
      >
        {showInsertHint && (
          <span className={p('text-xs text-slate-500')}>
            Cmd + Enter to {actionLabel.toLowerCase()}
          </span>
        )}
        <button
          onClick={handleConfirm}
          className={p(
            'px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center gap-2 ml-auto'
          )}
        >
          {copied ? <Check className={p('w-4 h-4')} /> : null}
          {copied ? 'Copied!' : actionLabel}
        </button>
      </div>
    </div>
  );
}
