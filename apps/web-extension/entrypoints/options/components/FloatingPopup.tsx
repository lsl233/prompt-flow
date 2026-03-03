import { useState, useEffect, useRef } from 'react';
import { Store } from '../useStore';
import { Search, Command, Check } from 'lucide-react';

interface FloatingPopupProps {
  store: Store;
  onClose: () => void;
}

export default function FloatingPopup({ store, onClose }: FloatingPopupProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredPrompts = store.prompts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 8);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPromptId) {
          setSelectedPromptId(null);
        } else {
          onClose();
        }
      } else if (!selectedPromptId) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredPrompts.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredPrompts.length) % filteredPrompts.length);
        } else if (e.key === 'Enter' && filteredPrompts[selectedIndex]) {
          e.preventDefault();
          handleSelectPrompt(filteredPrompts[selectedIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredPrompts, selectedIndex, selectedPromptId, onClose]);

  const handleSelectPrompt = (id: string) => {
    const prompt = store.prompts.find(p => p.id === id);
    if (prompt) {
      const regex = /\{\{([^}]+)\}\}/g;
      const matches = [...prompt.content.matchAll(regex)];
      const uniqueVars = Array.from(new Set(matches.map(m => m[1].trim())));

      if (uniqueVars.length === 0) {
        copyToClipboard(prompt.content);
      } else {
        const initialVars: Record<string, string> = {};
        uniqueVars.forEach(v => { initialVars[v] = ''; });
        setVariables(initialVars);
        setSelectedPromptId(id);
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleInsert = () => {
    const prompt = store.prompts.find(p => p.id === selectedPromptId);
    if (!prompt) return;

    let result = prompt.content;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      result = result.replace(regex, value || `{{${key}}}`);
    });

    copyToClipboard(result);
  };

  const selectedPrompt = store.prompts.find(p => p.id === selectedPromptId);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-150" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white dark:bg-slate-800 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in slide-in-from-top-4 duration-200">

        {!selectedPromptId ? (
          <>
            <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <Search size={18} className="text-slate-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search prompts or tags..."
                className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-lg"
              />
              <div className="flex items-center gap-1 text-xs text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                <Command size={12} /> K
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredPrompts.length === 0 ? (
                <div className="p-4 text-center text-slate-500 text-sm">No prompts found.</div>
              ) : (
                <ul className="space-y-1">
                  {filteredPrompts.map((prompt, index) => (
                    <li
                      key={prompt.id}
                      onClick={() => handleSelectPrompt(prompt.id)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex flex-col px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                        selectedIndex === index
                          ? 'bg-blue-50 dark:bg-blue-900/30'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${selectedIndex === index ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                          {prompt.title}
                        </span>
                        <div className="flex gap-1.5">
                          {prompt.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {prompt.description}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs text-slate-500">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">↑↓ to navigate</span>
                <span className="flex items-center gap-1">↵ to select</span>
              </div>
              <span>esc to close</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{selectedPrompt?.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Fill in the variables below</p>
              </div>
              <button onClick={() => setSelectedPromptId(null)} className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                Back to search
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[50vh] overflow-y-auto">
              {Object.keys(variables).map((vName, idx) => (
                <div key={vName}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 capitalize">
                    {vName.replace(/_/g, ' ')}
                  </label>
                  <input
                    autoFocus={idx === 0}
                    type="text"
                    value={variables[vName]}
                    onChange={e => setVariables(prev => ({ ...prev, [vName]: e.target.value }))}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.metaKey) handleInsert();
                    }}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  />
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
              <span className="text-xs text-slate-500">Cmd + Enter to copy</span>
              <button
                onClick={handleInsert}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center gap-2"
              >
                {copied ? <Check size={16} /> : null}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
