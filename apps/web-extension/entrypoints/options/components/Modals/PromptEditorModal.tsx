import { useState, useEffect, useRef, useMemo } from 'react';
import { Store } from '../../useStore';
import { X, Plus, ChevronDown } from 'lucide-react';
import { useI18n } from '@/shared/i18n';

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
  const [tagInput, setTagInput] = useState('');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [highlightedTagIndex, setHighlightedTagIndex] = useState(0);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(e.target as Node)) {
        setIsTagDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlighted index when input changes
  useEffect(() => {
    setHighlightedTagIndex(0);
  }, [tagInput]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    if (promptId) {
      store.updatePrompt(promptId, { title, description, content, tags });
    } else {
      store.addPrompt({ title, description, content, tags, isFavorite: false });
    }
    onClose();
  };

  // Filter available tags based on input
  const availableTags = useMemo(() => {
    return store.allTags
      .filter(tag => !tags.includes(tag))
      .filter(tag => tag.toLowerCase().includes(tagInput.toLowerCase()))
      .sort();
  }, [store.allTags, tags, tagInput]);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
    setIsTagDropdownOpen(false);
    tagInputRef.current?.focus();
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // If a tag is highlighted in dropdown, select it
      if (isTagDropdownOpen && availableTags.length > 0) {
        addTag(availableTags[highlightedTagIndex]);
      } else if (tagInput.trim()) {
        // Create new tag
        addTag(tagInput);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isTagDropdownOpen && availableTags.length > 0) {
        setIsTagDropdownOpen(true);
      }
      setHighlightedTagIndex(prev =>
        prev < availableTags.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedTagIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Escape') {
      setIsTagDropdownOpen(false);
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      // Remove last tag when backspace on empty input
      removeTag(tags[tags.length - 1]);
    }
  };

  const showCreateOption = tagInput.trim() && !tags.includes(tagInput.trim()) && !availableTags.some(t => t.toLowerCase() === tagInput.toLowerCase());

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

            <div ref={tagDropdownRef} className="relative">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('editorTagsLabel')}</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-md font-medium">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-slate-400 hover:text-red-500"><X size={12} /></button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <input
                  ref={tagInputRef}
                  type="text"
                  value={tagInput}
                  onChange={e => {
                    setTagInput(e.target.value);
                    setIsTagDropdownOpen(true);
                  }}
                  onKeyDown={handleTagInputKeyDown}
                  onFocus={() => setIsTagDropdownOpen(true)}
                  placeholder={tags.length > 0 ? t('editorTagsAddMore') : t('editorTagsPlaceholder')}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                />
                <ChevronDown
                  size={16}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform ${isTagDropdownOpen ? 'rotate-180' : ''}`}
                />

                {/* Tag Dropdown */}
                {isTagDropdownOpen && (availableTags.length > 0 || showCreateOption) && (
                  <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {/* Create new tag option */}
                    {showCreateOption && (
                      <button
                        onClick={() => addTag(tagInput)}
                        className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700"
                      >
                        <Plus size={14} className="text-blue-500" />
                        <span>{t('editorCreateTag')} "<span className="font-medium text-slate-900 dark:text-white">{tagInput.trim()}</span>"</span>
                      </button>
                    )}

                    {/* Existing tags */}
                    {availableTags.map((tag, index) => (
                      <button
                        key={tag}
                        onClick={() => addTag(tag)}
                        onMouseEnter={() => setHighlightedTagIndex(index)}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                          index === highlightedTagIndex
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}

                {/* Empty state - no existing tags */}
                {isTagDropdownOpen && availableTags.length === 0 && !showCreateOption && store.allTags.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-4 text-sm text-slate-500 text-center">
                    {t('editorAllTagsSelected')}
                  </div>
                )}
              </div>
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
