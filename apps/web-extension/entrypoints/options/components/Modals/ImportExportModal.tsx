import { useState, useRef } from 'react';
import { Store } from '../../useStore';
import { X, Download, FileJson, AlertTriangle, Check, Merge, Replace } from 'lucide-react';
import { Prompt } from '@/shared/types';

type ImportMode = 'replace' | 'merge';
type ImportStep = 'upload' | 'preview' | 'confirm';

interface ImportExportModalProps {
  store: Store;
  onClose: () => void;
}

interface ImportPreview {
  newPrompts: Prompt[];
  updatedPrompts: { existing: Prompt; imported: Prompt }[];
  unchangedCount: number;
}

export default function ImportExportModal({ store, onClose }: ImportExportModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [importMode, setImportMode] = useState<ImportMode>('merge');
  const [importStep, setImportStep] = useState<ImportStep>('upload');
  const [importPreview, setImportPreview] = useState<ImportPreview | null>(null);
  const [pendingImport, setPendingImport] = useState<Prompt[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  };

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

  const processImport = (text: string) => {
    try {
      const parsed = JSON.parse(text);
      let promptsToImport: Prompt[];

      // Handle both old format (array) and new format (object with prompts field)
      if (Array.isArray(parsed)) {
        promptsToImport = parsed;
      } else if (parsed.prompts && Array.isArray(parsed.prompts)) {
        promptsToImport = parsed.prompts;
      } else {
        setImportStatus({ type: 'error', message: 'Invalid format. Expected an array of prompts or an export object.' });
        return;
      }

      const validPrompts = promptsToImport.filter(p => p.id && p.title && p.content);

      if (validPrompts.length === 0) {
        setImportStatus({ type: 'error', message: 'No valid prompts found in the file.' });
        return;
      }

      if (importMode === 'replace') {
        setPendingImport(validPrompts);
        setImportStep('confirm');
      } else {
        // Merge mode - show preview
        const preview = generatePreview(validPrompts);
        setImportPreview(preview);
        setPendingImport(validPrompts);
        setImportStep('preview');
      }
    } catch (e) {
      setImportStatus({ type: 'error', message: 'Failed to parse JSON file.' });
    }
  };

  const executeImport = () => {
    if (!pendingImport) return;

    if (importMode === 'replace') {
      store.setPrompts(pendingImport);
      setImportStatus({ type: 'success', message: `Successfully replaced with ${pendingImport.length} prompts.` });
    } else {
      // Merge mode
      const existingIds = new Set(store.prompts.map(p => p.id));
      const merged = [...store.prompts];

      for (const imported of pendingImport) {
        const index = merged.findIndex(p => p.id === imported.id);
        if (index >= 0) {
          // Update existing prompt, preserving versions
          const existing = merged[index];
          merged[index] = {
            ...imported,
            versions: [...imported.versions, ...existing.versions].slice(0, 20),
            updatedAt: Date.now()
          };
        } else {
          // Add new prompt
          merged.push(imported);
        }
      }

      store.setPrompts(merged);
      const newCount = pendingImport.filter(p => !existingIds.has(p.id)).length;
      const updatedCount = pendingImport.filter(p => existingIds.has(p.id)).length;
      setImportStatus({ type: 'success', message: `Import complete: ${newCount} new, ${updatedCount} updated.` });
    }

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          processImport(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

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
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            processImport(event.target.result as string);
          }
        };
        reader.readAsText(file);
      } else {
        setImportStatus({ type: 'error', message: 'Please upload a valid JSON file.' });
      }
    }
  };

  const resetImport = () => {
    setImportStep('upload');
    setImportPreview(null);
    setPendingImport(null);
    setImportStatus({ type: null, message: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh]">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {importStep === 'upload' ? 'Import / Export' :
             importStep === 'preview' ? 'Import Preview' :
             'Confirm Import'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {importStep === 'upload' && (
            <div className="p-6 space-y-6">
              {/* Import Mode Selection */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Import Mode</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setImportMode('merge')}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-left ${
                      importMode === 'merge'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Merge size={18} className={importMode === 'merge' ? 'text-blue-500' : 'text-slate-400'} />
                    <div>
                      <p className={`text-sm font-medium ${importMode === 'merge' ? 'text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>Merge</p>
                      <p className="text-xs text-slate-500">Add new, update existing</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setImportMode('replace')}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-left ${
                      importMode === 'replace'
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Replace size={18} className={importMode === 'replace' ? 'text-amber-500' : 'text-slate-400'} />
                    <div>
                      <p className={`text-sm font-medium ${importMode === 'replace' ? 'text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'}`}>Replace</p>
                      <p className="text-xs text-slate-500">Delete all, start fresh</p>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Export Prompts</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  Download all your prompts and versions as a JSON file for backup or sharing.
                </p>
                <button
                  onClick={handleExport}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <Download size={18} />
                  Export to JSON
                </button>
              </div>

              <div className="h-px bg-slate-200 dark:bg-slate-700 w-full" />

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Import Prompts</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  Upload a previously exported JSON file.
                </p>

                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/30'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <FileJson size={32} className="mx-auto text-slate-400 mb-3" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    JSON files only
                  </p>
                </div>

                {importStatus.message && (
                  <div className={`mt-3 p-3 rounded-lg text-sm ${
                    importStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {importStatus.message}
                  </div>
                )}
              </div>
            </div>
          )}

          {importStep === 'preview' && importPreview && (
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                  <Check size={16} />
                  Import Summary
                </h3>
                <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
                  <li className="flex items-center justify-between">
                    <span>New prompts to add:</span>
                    <span className="font-semibold">{importPreview.newPrompts.length}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Existing prompts to update:</span>
                    <span className="font-semibold">{importPreview.updatedPrompts.length}</span>
                  </li>
                  {importPreview.unchangedCount > 0 && (
                    <li className="flex items-center justify-between text-slate-500">
                      <span>Unchanged prompts:</span>
                      <span>{importPreview.unchangedCount}</span>
                    </li>
                  )}
                </ul>
              </div>

              {importPreview.newPrompts.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">New Prompts</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {importPreview.newPrompts.slice(0, 5).map(p => (
                      <div key={p.id} className="flex items-center gap-2 text-sm p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <span className="font-medium truncate flex-1">{p.title}</span>
                        {p.tags.slice(0, 2).map(t => (
                          <span key={t} className="text-xs px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded">{t}</span>
                        ))}
                      </div>
                    ))}
                    {importPreview.newPrompts.length > 5 && (
                      <p className="text-xs text-slate-500 text-center">+{importPreview.newPrompts.length - 5} more</p>
                    )}
                  </div>
                </div>
              )}

              {importPreview.updatedPrompts.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Prompts to Update</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {importPreview.updatedPrompts.slice(0, 5).map(({ existing, imported }) => (
                      <div key={existing.id} className="flex items-center justify-between text-sm p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                        <span className="truncate flex-1">{existing.title}</span>
                        <span className="text-xs text-amber-600 dark:text-amber-400">Will be updated</span>
                      </div>
                    ))}
                    {importPreview.updatedPrompts.length > 5 && (
                      <p className="text-xs text-slate-500 text-center">+{importPreview.updatedPrompts.length - 5} more</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={resetImport}
                  className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={executeImport}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Confirm Import
                </button>
              </div>
            </div>
          )}

          {importStep === 'confirm' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <AlertTriangle size={24} />
                <div>
                  <h3 className="font-semibold">Warning: Replace Mode</h3>
                  <p className="text-sm">This will delete all your current prompts and replace them with the imported data.</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Current prompts: <strong>{store.prompts.length}</strong><br />
                Prompts to import: <strong>{pendingImport?.length || 0}</strong>
              </p>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={resetImport}
                  className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeImport}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Yes, Replace All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
