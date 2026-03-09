import { useState, useEffect, useMemo } from 'react';
import { Prompt } from '@/shared/types';
import { X, Copy, Check, Save } from 'lucide-react';
import { Store } from '../../useStore';
import { useI18n } from '@/shared/i18n';
import TagSelector from '@/shared/components/TagSelector';
import { toast } from '@/shared/components/Toast';

interface VariableFillerModalProps {
  prompt: Prompt;
  onClose: () => void;
  store: Store;
}

export default function VariableFillerModal({ prompt, onClose, store }: VariableFillerModalProps) {
  const { t } = useI18n();
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newTitle, setNewTitle] = useState(`${prompt.title} (Filled)`);
  const [newDescription, setNewDescription] = useState(`Generated from: ${prompt.description}`);
  const [newTags, setNewTags] = useState<string[]>(prompt.tags);

  const variableNames = useMemo(() => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [...prompt.content.matchAll(regex)];
    const uniqueVars = Array.from(new Set(matches.map(m => m[1].trim())));
    return uniqueVars;
  }, [prompt.content]);

  useEffect(() => {
    const initialVars: Record<string, string> = {};
    variableNames.forEach(v => {
      initialVars[v] = '';
    });
    setVariables(initialVars);
  }, [variableNames]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleVarChange = (name: string, value: string) => {
    setVariables(prev => ({ ...prev, [name]: value }));
  };

  const generatedContent = useMemo(() => {
    let result = prompt.content;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      result = result.replace(regex, value || `{{${key}}}`);
    });
    return result;
  }, [prompt.content, variables]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Show toast notification
      toast.success(t('toastCopySuccess'));

      // Record usage
      store.recordPromptUsage(prompt.id);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCopyAndClose = async () => {
    await handleCopy();
    onClose();
  }

  const handleSaveAsNew = () => {
    if (!newTitle.trim()) return;

    store.addPrompt({
      title: newTitle,
      description: newDescription,
      content: generatedContent,
      tags: newTags,
      isFavorite: false
    });

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowSaveDialog(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-2xl shadow-xl flex flex-col max-h-full overflow-hidden animate-in zoom-in-95 duration-200">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              {prompt.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{prompt.description}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {variableNames.length > 0 && (
            <div className="w-full md:w-1/2 p-6 overflow-y-auto border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">{t('variablesTitle')}</h3>

              <div className="space-y-4">
                {variableNames.map(vName => (
                  <div key={vName}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 capitalize">
                      {vName.replace(/_/g, ' ')}
                    </label>
                    <textarea
                      value={variables[vName] || ''}
                      onChange={e => handleVarChange(vName, e.target.value)}
                      placeholder={t('variablesEnterValue', [vName])}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow min-h-[80px] resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`w-full p-6 flex flex-col bg-white dark:bg-slate-800 overflow-hidden ${variableNames.length > 0 ? 'md:w-1/2' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">{t('variablesPreview')}</h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                {copied ? t('variablesCopied') : t('variablesCopyClipboard')}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <pre className="text-sm font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap break-words font-sans">
                {generatedContent}
              </pre>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {t('variablesClose')}
          </button>
          {variableNames.length > 0 && (
            <button
              onClick={() => setShowSaveDialog(true)}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              {t('variablesSaveAsNew')}
            </button>
          )}
          <button
            onClick={handleCopyAndClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-500/20 flex items-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? t('variablesCopied') : t('variablesCopyClose')}
          </button>
        </div>
      </div>

      {/* Save as New Prompt Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-xl flex flex-col max-h-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('variablesSaveDialogTitle')}</h3>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('editorTitleLabel')}</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder={t('editorTitlePlaceholder')}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('editorDescriptionLabel')}</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Brief description..."
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('editorTagsLabel')}</label>
                <TagSelector
                  tags={newTags}
                  availableTags={store.allTags}
                  onChange={setNewTags}
                  showDropdown={true}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('variablesPreviewLabel')}</label>
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 max-h-32 overflow-y-auto">
                  <pre className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap break-words">
                    {generatedContent.slice(0, 200)}{generatedContent.length > 200 ? '...' : ''}
                  </pre>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                {t('editorCancel')}
              </button>
              <button
                onClick={handleSaveAsNew}
                disabled={!newTitle.trim() || saved}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-emerald-500/20 flex items-center gap-2"
              >
                {saved ? <Check size={16} /> : <Save size={16} />}
                {saved ? t('variablesSaved') : t('variablesSavePrompt')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
