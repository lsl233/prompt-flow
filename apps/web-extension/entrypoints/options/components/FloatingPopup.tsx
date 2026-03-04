import { useState } from 'react';
import { Store } from '../useStore';
import PromptPicker from '@/shared/components/PromptPicker';

interface FloatingPopupProps {
  store: Store;
  onClose: () => void;
}

export default function FloatingPopup({ store, onClose }: FloatingPopupProps) {
  const [copied, setCopied] = useState(false);

  const handleSelect = async (_prompt: unknown, filledContent: string) => {
    try {
      await navigator.clipboard.writeText(filledContent);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-slate-800 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in slide-in-from-top-4 duration-200">
        <PromptPicker
          prompts={store.prompts}
          onSelect={handleSelect}
          onClose={onClose}
          actionLabel="Copy"
        />
      </div>
    </div>
  );
}
