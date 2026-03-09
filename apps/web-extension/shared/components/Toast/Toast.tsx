import { useEffect } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  onClose: () => void;
  /**
   * When true, uses pixel-based styles optimized for content script shadow DOM
   * to avoid conflicts with host page CSS.
   */
  contentScript?: boolean;
}

export default function Toast({ message, visible, duration = 2000, onClose, contentScript = false }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  // Content script uses pixel-based styles to avoid conflicts with host page CSS
  // Regular mode uses Tailwind spacing classes
  const containerClasses = contentScript
    ? 'fixed bottom-[32px] left-1/2 -translate-x-1/2 z-[2147483647] px-[16px] py-[8px] bg-slate-800 dark:bg-slate-900 text-white text-[14px] font-medium rounded-[8px] shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200'
    : 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[2147483647] px-4 py-2 bg-slate-800 dark:bg-slate-900 text-white text-sm font-medium rounded-lg shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200';

  return (
    <div className={containerClasses}>
      {message}
    </div>
  );
}
