import { useState, useEffect } from 'react';
import { Store } from '../../useStore';
import { X } from 'lucide-react';
import { useI18n } from '@/shared/i18n';
import TagSelector from '@/shared/components/TagSelector';

interface PromptEditorModalProps {
  promptId: string | null;
  store: Store;
  onClose: () => void;
}

export default function PromptEditorModal({ promptId, store, onClose }: PromptEditorModalProps) {
  const { t } = useI18n();
  const existingPrompt = promptId ? store.prompts.find(p => p.id === promptId) : null;

  const [title, setTitle] = useState(existingPrompt?.title || '');
  const [description, setDescription] = useState(existingPrompt?.description || '');
  const [content, setContent] = useState(existingPrompt?.content || '');
  const [tags, setTags] = useState<string[]>(existingPrompt?.tags || []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    if (promptId) {
      store.updatePrompt(promptId, { title, description, content, tags });
    } else {
      store.addPrompt({ title, description, content, tags, isFavorite: false });
    }
    onClose();
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-2xl shadow-xl flex flex-col max-h-full overflow-hidden animate-in zoom-in-95 duration-200">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {promptId ? t('editorEditTitle') : t('editorCreateTitle')}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('editorTitleLabel')}</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={t('editorTitlePlaceholder')}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('editorDescriptionLabel')}</label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={t('editorDescriptionPlaceholder')}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('editorTagsLabel')}</label>
              <TagSelector
                tags={tags}
                availableTags={store.allTags}
                onChange={setTags}
                showDropdown={true}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('editorContentLabel')}</label>
              <span className="text-xs text-slate-500">{t('editorVariableHint')}</span>
            </div>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={t('editorContentPlaceholder')}
              className="w-full h-64 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none transition-shadow resize-y"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {t('editorCancel')}
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-500/20"
          >
            {t('editorSave')}
          </button>
        </div>
      </div>
    </div>
  );
}
