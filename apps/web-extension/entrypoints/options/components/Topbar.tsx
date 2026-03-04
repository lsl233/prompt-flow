import { useState, useRef, useEffect } from 'react';
import { Search, Sun, Moon, Plus, User, X } from 'lucide-react';
import { Prompt } from '@/shared/types';
import VariableFillerModal from './Modals/VariableFillerModal';

import { Store } from '../useStore';

interface TopbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  onCreatePrompt: () => void;
  prompts: Prompt[];
  store: Store;
}

export default function Topbar({ toggleTheme, isDarkMode, onCreatePrompt, prompts, store }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredPrompts = prompts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 6);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showResults || filteredPrompts.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredPrompts.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredPrompts.length) % filteredPrompts.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const prompt = filteredPrompts[selectedIndex];
        if (prompt) {
          setSelectedPromptId(prompt.id);
          setShowResults(false);
          setSearchQuery('');
        }
      } else if (e.key === 'Escape') {
        setShowResults(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showResults, filteredPrompts, selectedIndex]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPrompt = (prompt: Prompt) => {
    setSelectedPromptId(prompt.id);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    inputRef.current?.focus();
  };

  return (
    <>
      <header className="h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex-1 flex items-center" ref={containerRef}>
          <div className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search prompts (Cmd+K in any page)"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => searchQuery && setShowResults(true)}
              className="w-full pl-10 pr-10 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 dark:text-slate-200 outline-none transition-shadow"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200"
              >
                <X size={14} />
              </button>
            )}

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                {filteredPrompts.length === 0 ? (
                  <div className="p-4 text-center text-slate-500 text-sm">
                    No prompts found
                  </div>
                ) : (
                  <>
                    <ul className="max-h-64 overflow-y-auto py-2">
                      {filteredPrompts.map((prompt, index) => (
                        <li
                          key={prompt.id}
                          onClick={() => handleSelectPrompt(prompt)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`px-4 py-3 cursor-pointer transition-colors ${
                            selectedIndex === index
                              ? 'bg-blue-50 dark:bg-blue-900/30'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-medium text-sm ${selectedIndex === index ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                              {prompt.title}
                            </span>
                            <div className="flex gap-1">
                              {prompt.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {prompt.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex gap-3">
                        <span>↑↓ navigate</span>
                        <span>↵ select</span>
                      </div>
                      <span>esc close</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCreatePrompt}
            className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm shadow-blue-500/20"
          >
            <Plus size={16} />
            Create Prompt
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 ml-2">
            <User size={18} />
          </div>
        </div>
      </header>

      {selectedPromptId && (
        <VariableFillerModal
          prompt={prompts.find(p => p.id === selectedPromptId)!}
          onClose={() => setSelectedPromptId(null)}
          store={store}
        />
      )}
    </>
  );
}
