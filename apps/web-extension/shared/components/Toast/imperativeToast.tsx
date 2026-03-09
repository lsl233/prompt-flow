import { useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import Toast from './Toast';

export interface ToastOptions {
  message: string;
  duration?: number;
  contentScript?: boolean;
}

type ToastType = 'default' | 'success' | 'error';

interface ToastItem extends ToastOptions {
  id: string;
  type: ToastType;
}

// Global toast controller
class ToastController {
  private showHandler: ((options: ToastOptions, type: ToastType) => void) | null = null;

  setShowHandler(handler: (options: ToastOptions, type: ToastType) => void) {
    this.showHandler = handler;
  }

  show(options: ToastOptions | string) {
    if (this.showHandler) {
      const opts = typeof options === 'string' ? { message: options } : options;
      this.showHandler(opts, 'default');
    }
  }

  success(options: ToastOptions | string) {
    if (this.showHandler) {
      const opts = typeof options === 'string' ? { message: options } : options;
      this.showHandler(opts, 'success');
    }
  }

  error(options: ToastOptions | string) {
    if (this.showHandler) {
      const opts = typeof options === 'string' ? { message: options } : options;
      this.showHandler(opts, 'error');
    }
  }
}

export const toast = new ToastController();

// Provider component for managing toast state
interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastIdRef = useRef(0);

  const showToast = useCallback((options: ToastOptions, type: ToastType) => {
    const id = `toast-${++toastIdRef.current}`;
    const newToast: ToastItem = {
      ...options,
      id,
      type,
    };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Register the show handler with the global controller
  useEffect(() => {
    toast.setShowHandler(showToast);
    return () => {
      toast.setShowHandler(() => {});
    };
  }, [showToast]);

  return (
    <>
      {children}
      {toasts.map(toastItem => (
        <ToastContainer
          key={toastItem.id}
          toast={toastItem}
          onClose={() => hideToast(toastItem.id)}
        />
      ))}
    </>
  );
}

// Individual toast container with auto-dismiss
interface ToastContainerProps {
  toast: ToastItem;
  onClose: () => void;
}

function ToastContainer({ toast: toastItem, onClose }: ToastContainerProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, toastItem.duration || 2000);
    return () => clearTimeout(timer);
  }, [toastItem.duration, onClose]);

  const getTypeStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-600 border-emerald-500';
      case 'error':
        return 'bg-red-600 border-red-500';
      default:
        return 'bg-slate-800 dark:bg-slate-900 border-slate-700';
    }
  };

  const baseClasses = toastItem.contentScript
    ? 'fixed bottom-[32px] left-1/2 -translate-x-1/2 z-[2147483647] px-[16px] py-[8px] text-white text-[14px] font-medium rounded-[8px] shadow-lg border animate-in fade-in slide-in-from-bottom-2 duration-200'
    : 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[2147483647] px-4 py-2 text-white text-sm font-medium rounded-lg shadow-lg border animate-in fade-in slide-in-from-bottom-2 duration-200';

  return (
    <div className={`${baseClasses} ${getTypeStyles(toastItem.type)}`}>
      {toastItem.message}
    </div>
  );
}
