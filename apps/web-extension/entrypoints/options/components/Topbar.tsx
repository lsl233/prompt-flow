import { Search, Sun, Moon, Plus, User } from 'lucide-react';

interface TopbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  onCreatePrompt: () => void;
}

export default function Topbar({ toggleTheme, isDarkMode, onCreatePrompt }: TopbarProps) {
  return (
    <header className="h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search prompts (Cmd+K)"
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 dark:text-slate-200 outline-none transition-shadow"
          />
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
  );
}
