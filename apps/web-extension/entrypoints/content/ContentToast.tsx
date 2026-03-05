import { useEffect } from 'react';

interface ContentToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  onClose: () => void;
}

export default function ContentToast({ message, visible, duration = 2000, onClose }: ContentToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-[2147483647] px-[16px] py-[8px] bg-slate-800 dark:bg-slate-900 text-white text-[14px] font-medium rounded-[8px] shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
      {message}
    </div>
  );
}
