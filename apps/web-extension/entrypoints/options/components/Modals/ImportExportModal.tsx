import { useState, useRef } from 'react';
import { Store } from '../../useStore';
import { X, Download, FileJson } from 'lucide-react';
import { Prompt } from '../../types';

interface ImportExportModalProps {
  store: Store;
  onClose: () => void;
}

export default function ImportExportModal({ store, onClose }: ImportExportModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(store.prompts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `promptflow-export-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const processImport = (text: string) => {
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        const validPrompts = parsed.filter(p => p.id && p.title && p.content);
        if (validPrompts.length > 0) {
          store.setPrompts(validPrompts as Prompt[]);
          setImportStatus({ type: 'success', message: `Successfully imported ${validPrompts.length} prompts.` });
          setTimeout(() => {
            onClose();
          }, 2000);
        } else {
          setImportStatus({ type: 'error', message: 'No valid prompts found in the file.' });
        }
      } else {
        setImportStatus({ type: 'error', message: 'Invalid format. Expected an array of prompts.' });
      }
    } catch (e) {
      setImportStatus({ type: 'error', message: 'Failed to parse JSON file.' });
    }
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Import / Export</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">

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

          <div className="h-px bg-slate-200 dark:border-slate-700 w-full" />

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Import Prompts</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              Upload a previously exported JSON file. <span className="font-semibold text-amber-600 dark:text-amber-400">Warning: This will replace all your current prompts.</span>
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
      </div>
    </div>
  );
}
