import { Store } from '../useStore';
import { FileText, Hash, Clock, Plus, Star } from 'lucide-react';

interface DashboardProps {
  store: Store;
  onCreatePrompt: () => void;
}

export default function Dashboard({ store, onCreatePrompt }: DashboardProps) {
  const { prompts, allTags } = store;

  const totalVersions = prompts.reduce((acc, p) => acc + p.versions.length, 0);
  const recentPrompts = [...prompts].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 5);
  const favoritePrompts = prompts.filter(p => p.isFavorite);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h1>
        <p className="text-slate-500 dark:text-slate-400">Here&apos;s an overview of your prompt library.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Prompts</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{prompts.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Hash size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tags</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{allTags.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Versions</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalVersions}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            {recentPrompts.length > 0 ? (
              <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {recentPrompts.map(prompt => (
                  <li key={prompt.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => store.setView('library')}>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900 dark:text-white truncate">{prompt.title}</p>
                      <span className="text-xs text-slate-400">{new Date(prompt.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">{prompt.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-slate-500">No recent activity.</div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Favorites</h2>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            {favoritePrompts.length > 0 ? (
              <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {favoritePrompts.map(prompt => (
                  <li key={prompt.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => store.setView('library')}>
                    <div className="flex items-center gap-3">
                      <Star size={16} className="text-amber-400 fill-amber-400" />
                      <p className="font-medium text-slate-900 dark:text-white truncate">{prompt.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-slate-500">No favorite prompts yet.</div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={onCreatePrompt}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center transition-transform hover:scale-105 sm:hidden"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
