import { useEffect } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, visible, duration = 2000, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[2147483647] px-4 py-2 bg-slate-800 dark:bg-slate-900 text-white text-sm font-medium rounded-lg shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
      {message}
    </div>
  );
}
