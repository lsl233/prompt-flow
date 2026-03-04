import { useState } from 'react';
import { Store } from '../useStore';
import { Search, Filter, MoreVertical, Edit2, Trash2, Copy, Play, Star, History, X } from 'lucide-react';
import VariableFillerModal from './Modals/VariableFillerModal';
import VersionHistoryModal from './Modals/VersionHistoryModal';
import { useI18n } from '@/shared/i18n';

interface PromptLibraryProps {
  store: Store;
  onEditPrompt: (id: string) => void;
}

export default function PromptLibrary({ store, onEditPrompt }: PromptLibraryProps) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [fillerPromptId, setFillerPromptId] = useState<string | null>(null);
  const [historyPromptId, setHistoryPromptId] = useState<string | null>(null);

  // Use filteredPrompts from store (includes tag filtering)
  const filteredPrompts = store.filteredPrompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('libraryTitle')}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t('libraryDescription')}</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder={t('librarySearchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            />
          </div>
          {store.selectedTag && (
            <button
              onClick={() => store.setSelectedTag(null)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              <Filter size={16} />
              {store.selectedTag}
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-20">
        {filteredPrompts.map(prompt => (
          <div key={prompt.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col group relative">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg leading-tight pr-8">{prompt.title}</h3>
              <div className="absolute top-4 right-4 flex items-center gap-1">
                <button
                  onClick={() => store.updatePrompt(prompt.id, { isFavorite: !prompt.isFavorite })}
                  className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <Star size={16} className={prompt.isFavorite ? "fill-amber-400 text-amber-400" : ""} />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === prompt.id ? null : prompt.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {activeMenu === prompt.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                      <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                        <button onClick={() => { onEditPrompt(prompt.id); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                          <Edit2 size={14} /> {t('libraryEdit')}
                        </button>
                        <button onClick={() => { store.duplicatePrompt(prompt.id); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                          <Copy size={14} /> {t('libraryDuplicate')}
                        </button>
                        <button onClick={() => { setHistoryPromptId(prompt.id); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                          <History size={14} /> {t('libraryHistory')}
                        </button>
                        <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                        <button onClick={() => { store.deletePrompt(prompt.id); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                          <Trash2 size={14} /> {t('libraryDelete')}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1 line-clamp-2">{prompt.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {prompt.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
              <span className="text-xs text-slate-400">{t('libraryUpdated')} {new Date(prompt.updatedAt).toLocaleDateString()}</span>
              <button
                onClick={() => setFillerPromptId(prompt.id)}
                className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Play size={14} /> {t('libraryUse')}
              </button>
            </div>
          </div>
        ))}

        {filteredPrompts.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">{t('libraryNoPromptsFound')}</h3>
            <p className="text-slate-500 dark:text-slate-400">{t('libraryAdjustSearch')}</p>
          </div>
        )}
      </div>

      {fillerPromptId && (
        <VariableFillerModal
          prompt={store.prompts.find(p => p.id === fillerPromptId)!}
          onClose={() => setFillerPromptId(null)}
          store={store}
        />
      )}

      {historyPromptId && (
        <VersionHistoryModal
          prompt={store.prompts.find(p => p.id === historyPromptId)!}
          store={store}
          onClose={() => setHistoryPromptId(null)}
        />
      )}
    </div>
  );
}
