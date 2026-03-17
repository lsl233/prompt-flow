'use client';

import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';

interface ImportButtonProps {
  promptId: string;
  t: {
    import: string;
    importSuccess: string;
    installPrompt: string;
  };
}

export function ImportButton({ promptId, t }: ImportButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isImported, setIsImported] = useState(false);

  const handleImport = () => {
    // Check if PromptFlow extension is installed
    // The extension injects a global variable or responds to custom events
    const isExtensionInstalled =
      typeof window !== 'undefined' &&
      (window as Window & { __PROMPTFLOW_INSTALLED__?: boolean }).__PROMPTFLOW_INSTALLED__;

    if (!isExtensionInstalled) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    // Extension is installed - trigger import
    window.dispatchEvent(
      new CustomEvent('PROMPTFLOW_IMPORT', {
        detail: { promptId },
      })
    );

    setIsImported(true);
    setTimeout(() => setIsImported(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleImport}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                   bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-elevated)]
                   border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)]
                   rounded-lg transition-all duration-300 group"
      >
        {isImported ? (
          <>
            <Check className="w-4 h-4 text-[var(--color-accent-primary)]" />
            <span className="text-[var(--color-accent-primary)]">{t.importSuccess}</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
            <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
              {t.import}
            </span>
          </>
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2
                        bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)]
                        rounded-lg shadow-xl whitespace-nowrap z-50">
          <p className="text-xs text-[var(--color-text-secondary)]">{t.installPrompt}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="w-2 h-2 bg-[var(--color-bg-elevated)] border-r border-b border-[var(--color-border-strong)] rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
}
