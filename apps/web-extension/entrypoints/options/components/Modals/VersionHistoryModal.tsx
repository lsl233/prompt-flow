import { useState, useEffect } from 'react';
import { Prompt } from '@/shared/types';
import { Store } from '../../useStore';
import { X, Clock, RotateCcw, Eye, Trash2, AlertCircle } from 'lucide-react';
import { useI18n } from '@/shared/i18n';

interface VersionHistoryModalProps {
  prompt: Prompt;
  store: Store;
  onClose: () => void;
}

export default function VersionHistoryModal({ prompt, store, onClose }: VersionHistoryModalProps) {
  const { t } = useI18n();
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleRestore = (versionId: string) => {
    store.restoreVersion(prompt.id, versionId);
    onClose();
  };

  const handleDelete = (versionId: string) => {
    store.deleteVersion(prompt.id, versionId);
    if (selectedVersionId === versionId) {
      setSelectedVersionId(null);
    }
    setShowDeleteConfirm(null);
  };

  const selectedVersion = prompt.versions.find(v => v.id === selectedVersionId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-2xl shadow-xl flex flex-col max-h-full overflow-hidden animate-in zoom-in-95 duration-200">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock size={18} className="text-blue-500" />
              {t('historyTitle', [prompt.title])}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('historyVersionsCount', [String(prompt.versions.length), prompt.versions.length !== 1 ? 's' : ''])} (max 20)
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-[400px]">
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 overflow-y-auto">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 sticky top-0">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('historyPreviousVersions')}</h3>
            </div>
            <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {prompt.versions.length === 0 ? (
                <li className="p-6 text-center text-sm text-slate-500">{t('historyNoVersions')}</li>
              ) : (
                prompt.versions.map((version, index) => (
                  <li
                    key={version.id}
                    onClick={() => setSelectedVersionId(version.id)}
                    className={`p-4 cursor-pointer transition-colors group ${
                      selectedVersionId === version.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-slate-900 dark:text-white">
                        {index === 0 ? t('historyCurrentVersion') : t('historyVersionNumber', [String(prompt.versions.length - index)])}
                      </span>
                      {index !== 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(version.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-all"
                          title={t('historyDeleteTitle')}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">
                      {new Date(version.timestamp).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {version.content}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="w-full md:w-2/3 p-6 flex flex-col bg-white dark:bg-slate-800 overflow-hidden">
            {selectedVersion ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Eye size={16} className="text-slate-400" />
                    {t('historyPreviewing')}
                  </h3>
                  <div className="flex items-center gap-2">
                    {showDeleteConfirm === selectedVersion.id ? (
                      <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-md">
                        <AlertCircle size={14} className="text-red-500" />
                        <span className="text-xs text-red-600 dark:text-red-400">{t('historyDeleteConfirm')}</span>
                        <button
                          onClick={() => handleDelete(selectedVersion.id)}
                          className="text-xs font-medium text-red-600 hover:text-red-700"
                        >
                          {t('historyYes')}
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="text-xs text-slate-500 hover:text-slate-700"
                        >
                          {t('historyNo')}
                        </button>
                      </div>
                    ) : (
                      <>
                        {prompt.versions[0]?.id !== selectedVersion.id && (
                          <>
                            <button
                              onClick={() => setShowDeleteConfirm(selectedVersion.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                            <button
                              onClick={() => handleRestore(selectedVersion.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-md transition-colors"
                            >
                              <RotateCcw size={14} />
                              {t('historyRestore')}
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <pre className="text-sm font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap break-words font-sans">
                    {selectedVersion.content}
                  </pre>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <Clock size={48} className="mb-4 opacity-20" />
                <p>{t('historySelectPrompt')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
