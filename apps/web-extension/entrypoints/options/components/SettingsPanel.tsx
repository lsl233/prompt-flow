import { useState, useRef, useEffect } from 'react';
import { Store } from '../useStore';
import { useI18n } from '@/shared/i18n';
import { toast } from '@/shared/components/Toast';
import {
  Download,
  Upload,
  FileJson,
  AlertTriangle,
  Check,
  Merge,
  Replace,
  Keyboard,
  Info,
  ChevronDown,
  ChevronUp,
  Package
} from 'lucide-react';
import { Prompt } from '@/shared/types';

type ImportMode = 'replace' | 'merge';
type ImportStep = 'upload' | 'preview' | 'confirm';

interface ImportPreview {
  newPrompts: Prompt[];
  updatedPrompts: { existing: Prompt; imported: Prompt }[];
  unchangedCount: number;
}

interface SettingsPanelProps {
  store: Store;
}

// Version from manifest
const EXTENSION_VERSION = '1.0.3';

// Keyboard shortcuts from manifest
const KEYBOARD_SHORTCUTS = [
  {
    name: 'toggle-popup',
    label: 'Toggle Prompt Picker',
    shortcut: { default: 'Ctrl+Shift+P', mac: '⌘+Shift+P' }
  }
];

export default function SettingsPanel({ store }: SettingsPanelProps) {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<'import-export' | 'shortcuts' | 'about'>('import-export');

  // Import/Export state
  const [dragActive, setDragActive] = useState(false);
  const [importMode, setImportMode] = useState<ImportMode>('merge');
  const [importStep, setImportStep] = useState<ImportStep>('upload');
  const [importPreview, setImportPreview] = useState<ImportPreview | null>(null);
  const [pendingImport, setPendingImport] = useState<Prompt[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle export
  const handleExport = () => {
    const exportData = {
      version: 1,
      exportDate: new Date().toISOString(),
      prompts: store.prompts
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `promptflow-export-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast.success(t('settingsExportSuccess') || 'Exported successfully');
  };

  // Generate import preview
  const generatePreview = (importedPrompts: Prompt[]): ImportPreview => {
    const newPrompts: Prompt[] = [];
    const updatedPrompts: { existing: Prompt; imported: Prompt }[] = [];
    let unchangedCount = 0;

    const existingIds = new Map(store.prompts.map(p => [p.id, p]));

    for (const imported of importedPrompts) {
      const existing = existingIds.get(imported.id);
      if (!existing) {
        newPrompts.push(imported);
      } else if (imported.content !== existing.content || imported.title !== existing.title) {
        updatedPrompts.push({ existing, imported });
      } else {
        unchangedCount++;
      }
    }

    return { newPrompts, updatedPrompts, unchangedCount };
  };

  // Handle file upload
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        if (!parsed.prompts || !Array.isArray(parsed.prompts)) {
          toast.error(t('settingsImportInvalidFormat') || 'Invalid file format');
          return;
        }

        const importedPrompts = parsed.prompts as Prompt[];
        setPendingImport(importedPrompts);

        const preview = generatePreview(importedPrompts);
        setImportPreview(preview);
        setImportStep('preview');
      } catch (err) {
        toast.error(t('settingsImportParseError') || 'Failed to parse file');
      }
    };
    reader.readAsText(file);
  };

  // Handle import confirmation
  const handleImportConfirm = () => {
    if (!pendingImport) return;

    if (importMode === 'replace') {
      store.setPrompts(pendingImport);
    } else {
      // Merge mode
      const existingIds = new Set(store.prompts.map(p => p.id));
      const merged = [...store.prompts];

      for (const imported of pendingImport) {
        const index = merged.findIndex(p => p.id === imported.id);
        if (index >= 0) {
          merged[index] = { ...imported, updatedAt: Date.now() };
        } else {
          merged.push(imported);
        }
      }
      store.setPrompts(merged);
    }

    toast.success(t('settingsImportSuccess') || 'Imported successfully');
    resetImportState();
  };

  // Reset import state
  const resetImportState = () => {
    setImportStep('upload');
    setPendingImport(null);
    setImportPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t('settingsTitle') || 'Settings'}
        </h1>
      </div>

      {/* Settings Navigation */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveSection('import-export')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeSection === 'import-export'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <Package size={16} />
            {t('settingsImportExport') || 'Import / Export'}
          </span>
        </button>
        <button
          onClick={() => setActiveSection('shortcuts')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeSection === 'shortcuts'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <Keyboard size={16} />
            {t('settingsShortcuts') || 'Keyboard Shortcuts'}
          </span>
        </button>
        <button
          onClick={() => setActiveSection('about')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeSection === 'about'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <Info size={16} />
            {t('settingsAbout') || 'About'}
          </span>
        </button>
      </div>

      {/* Import/Export Section */}
      {activeSection === 'import-export' && (
        <div className="space-y-6">
          {/* Export */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              {t('settingsExportTitle') || 'Export Data'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {t('settingsExportDescription') || 'Download all your prompts as a JSON file for backup or sharing.'}
            </p>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Download size={18} />
              {t('settingsExportButton') || 'Export Prompts'}
            </button>
          </div>

          {/* Import */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              {t('settingsImportTitle') || 'Import Data'}
            </h2>

            {importStep === 'upload' && (
              <>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  {t('settingsImportDescription') || 'Import prompts from a JSON file. You can choose to merge or replace existing data.'}
                </p>

                {/* Import Mode Selection */}
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="merge"
                      checked={importMode === 'merge'}
                      onChange={(e) => setImportMode(e.target.value as ImportMode)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {t('settingsImportMerge') || 'Merge'}
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="replace"
                      checked={importMode === 'replace'}
                      onChange={(e) => setImportMode(e.target.value as ImportMode)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {t('settingsImportReplace') || 'Replace'}
                    </span>
                  </label>
                </div>

                {/* Drop Zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    className="hidden"
                  />
                  <FileJson size={32} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t('settingsImportDropzone') || 'Click or drag JSON file here'}
                  </p>
                </div>
              </>
            )}

            {importStep === 'preview' && importPreview && (
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                    {t('settingsImportPreview') || 'Import Preview'}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Check size={16} />
                      {importPreview.newPrompts.length} {t('settingsImportNewPrompts') || 'new prompts'}
                    </li>
                    <li className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <AlertTriangle size={16} />
                      {importPreview.updatedPrompts.length} {t('settingsImportUpdatedPrompts') || 'to update'}
                    </li>
                    {importPreview.unchangedCount > 0 && (
                      <li className="text-slate-500 dark:text-slate-400">
                        {importPreview.unchangedCount} {t('settingsImportUnchanged') || 'unchanged'}
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleImportConfirm}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {t('settingsImportConfirm') || 'Confirm Import'}
                  </button>
                  <button
                    onClick={resetImportState}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    {t('settingsImportCancel') || 'Cancel'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shortcuts Section */}
      {activeSection === 'shortcuts' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            {t('settingsShortcutsTitle') || 'Keyboard Shortcuts'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {t('settingsShortcutsDescription') || 'Keyboard shortcuts can be customized in your browser extension settings.'}
          </p>

          <div className="space-y-3">
            {KEYBOARD_SHORTCUTS.map((shortcut) => (
              <div
                key={shortcut.name}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
              >
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {shortcut.label}
                </span>
                <div className="flex items-center gap-2">
                  <kbd className="hidden sm:inline-flex px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-xs font-mono text-slate-700 dark:text-slate-300">
                    {shortcut.shortcut.default}
                  </kbd>
                  <kbd className="inline-flex px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-xs font-mono text-slate-700 dark:text-slate-300">
                    {shortcut.shortcut.mac}
                  </kbd>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              {t('settingsShortcutsTip') || 'Tip: You can customize shortcuts by going to chrome://extensions/shortcuts (Chrome) or about:addons (Firefox).'}
            </p>
          </div>
        </div>
      )}

      {/* About Section */}
      {activeSection === 'about' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-4 mb-6">
            <img src="/icon/logo.svg" alt="PromptFlow" className="w-12 h-12" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">PromptFlow</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('settingsVersion') || 'Version'} {EXTENSION_VERSION}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <p>{t('settingsAboutDescription') || 'PromptFlow is a browser extension that helps you manage and quickly access your AI prompts.'}</p>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                {t('settingsLinks') || 'Links'}
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://github.com/promptflow/promptflow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://promptflow.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {t('settingsWebsite') || 'Website'}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
