import { LayoutDashboard, Library, Hash, Download, X, Filter } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  view: ViewState;
  setView: (view: ViewState) => void;
  tags: string[];
  onImportExport: () => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export default function Sidebar({ view, setView, tags, onImportExport, selectedTag, onSelectTag }: SidebarProps) {
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      // Toggle off if already selected
      onSelectTag(null);
    } else {
      onSelectTag(tag);
      // Switch to library view when selecting a tag
      setView('library');
    }
  };

  const clearFilter = () => {
    onSelectTag(null);
  };

  return (
    <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
          P
        </div>
        <span className="font-semibold text-lg tracking-tight">PromptFlow</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <button
          onClick={() => {
            setView('dashboard');
            onSelectTag(null);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 'dashboard' && !selectedTag
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>
        <button
          onClick={() => {
            setView('library');
            if (selectedTag) onSelectTag(null);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 'library' && !selectedTag
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Library size={18} />
          Prompt Library
        </button>

        <div className="pt-6 pb-2">
          <div className="flex items-center justify-between px-3">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Tags
            </p>
            {selectedTag && (
              <button
                onClick={clearFilter}
                className="flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                <X size={10} />
                Clear
              </button>
            )}
          </div>
        </div>

        {selectedTag && (
          <div className="px-3 py-2 mx-2 mb-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={12} className="text-blue-500" />
              <span className="text-sm text-blue-700 dark:text-blue-400 font-medium">{selectedTag}</span>
            </div>
            <button onClick={clearFilter} className="text-blue-400 hover:text-blue-600">
              <X size={14} />
            </button>
          </div>
        )}

        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              selectedTag === tag
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Hash size={16} className={selectedTag === tag ? 'text-blue-500' : 'text-slate-400'} />
            {tag}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-1">
        <button
          onClick={onImportExport}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        >
          <Download size={18} />
          Import / Export
        </button>
      </div>
    </div>
  );
}
