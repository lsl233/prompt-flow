import { LayoutDashboard, Library, Hash, Download } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  view: ViewState;
  setView: (view: ViewState) => void;
  tags: string[];
  onImportExport: () => void;
}

export default function Sidebar({ view, setView, tags, onImportExport }: SidebarProps) {
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
          onClick={() => setView('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 'dashboard'
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>
        <button
          onClick={() => setView('library')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 'library'
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Library size={18} />
          Prompt Library
        </button>

        <div className="pt-6 pb-2">
          <p className="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Tags
          </p>
        </div>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setView('library')}
            className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            <Hash size={16} className="text-slate-400" />
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
