import { useState } from 'react';
import { Store } from '../useStore';
import { FileText, Hash, Plus, TrendingUp, History } from 'lucide-react';
import { useI18n } from '@/shared/i18n';
import VariableFillerModal from './Modals/VariableFillerModal';

interface DashboardProps {
  store: Store;
  onCreatePrompt: () => void;
}

export default function Dashboard({ store, onCreatePrompt }: DashboardProps) {
  const { t } = useI18n();
  const { prompts, allTags } = store;
  const [fillerPromptId, setFillerPromptId] = useState<string | null>(null);

  const totalUsage = prompts.reduce((acc, p) => acc + (p.useCount || 0), 0);
  // Recent activity: sort by lastUsedAt (most recently used first)
  const recentlyUsedPrompts = [...prompts]
    .filter(p => p.lastUsedAt !== null)
    .sort((a, b) => (b.lastUsedAt || 0) - (a.lastUsedAt || 0))
    .slice(0, 5);
  // Most used prompts (top 5)
  const mostUsedPrompts = [...prompts]
    .filter(p => (p.useCount || 0) > 0)
    .sort((a, b) => (b.useCount || 0) - (a.useCount || 0))
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('dashboardWelcome')}</h1>
        <p className="text-slate-500 dark:text-slate-400">{t('dashboardOverview')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('dashboardTotalPrompts')}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{prompts.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Hash size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('dashboardTags')}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{allTags.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('dashboardTotalUsage')}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalUsage}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <History size={18} className="text-slate-400" />
              {t('dashboardRecentlyUsed')}
            </h2>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            {recentlyUsedPrompts.length > 0 ? (
              <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {recentlyUsedPrompts.map(prompt => (
                  <li key={prompt.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => setFillerPromptId(prompt.id)}>
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900 dark:text-white truncate">{prompt.title}</p>
                      <span className="text-xs shrink-0 ml-2 text-slate-400">{new Date(prompt.lastUsedAt!).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{prompt.description}</p>
                      <span className="text-xs shrink-0 ml-2 text-slate-400">{t('dashboardUsedTimes', [String(prompt.useCount || 0), prompt.useCount === 1 ? '' : 's'])}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-slate-500">
                <p className="text-sm">{t('dashboardNoRecent')}</p>
                <p className="text-xs mt-1 text-slate-400">{t('dashboardStartUsing')}</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-slate-400" />
              {t('dashboardMostUsed')}
            </h2>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            {mostUsedPrompts.length > 0 ? (
              <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {mostUsedPrompts.map((prompt, index) => (
                  <li key={prompt.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => setFillerPromptId(prompt.id)}>
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        index === 0 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                        index === 1 ? 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400' :
                        index === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500'
                      }`}>
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 dark:text-white truncate">{prompt.title}</p>
                        <p className="text-xs text-slate-400">{t('dashboardUsedTimes', [String(prompt.useCount || 0), prompt.useCount === 1 ? '' : 's'])}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-slate-500">
                <p className="text-sm">{t('dashboardNoUsage')}</p>
                <p className="text-xs mt-1 text-slate-400">{t('dashboardMostUsedHint')}</p>
              </div>
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

      {fillerPromptId && (
        <VariableFillerModal
          prompt={prompts.find(p => p.id === fillerPromptId)!}
          onClose={() => setFillerPromptId(null)}
          store={store}
        />
      )}
    </div>
  );
}
