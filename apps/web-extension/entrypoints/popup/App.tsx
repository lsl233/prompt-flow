import { useState, useEffect } from 'react';
import { Settings, Play, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import '@/shared/style.css';
import { useI18n, I18nProvider } from '@/shared/i18n';

function AppContent() {
  const { t } = useI18n();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [isInjecting, setIsInjecting] = useState(false);
  const [injectionStatus, setInjectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    checkCurrentTabPermission();
  }, []);

  const checkCurrentTabPermission = async () => {
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const currentTab = tabs[0];

      if (currentTab?.url) {
        setCurrentUrl(currentTab.url);

        // Check if we have permission for this URL
        const url = new URL(currentTab.url);
        const origin = `${url.protocol}//${url.hostname}${url.port ? ':' + url.port : ''}/*`;

        const permissionGranted = await browser.permissions.contains({
          origins: [origin]
        });

        setHasPermission(permissionGranted);
      } else {
        setHasPermission(false);
      }
    } catch (error) {
      console.error('[Prompt Flow] Failed to check permission:', error);
      setHasPermission(false);
    }
  };

  const requestPermission = async () => {
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const currentTab = tabs[0];

      if (!currentTab?.url) {
        setInjectionStatus('error');
        return;
      }

      const url = new URL(currentTab.url);
      const origin = `${url.protocol}//${url.hostname}${url.port ? ':' + url.port : ''}/*`;

      const granted = await browser.permissions.request({
        origins: [origin]
      });

      if (granted) {
        setHasPermission(true);
        // Auto inject content script after permission granted
        await injectContentScript();
      }
    } catch (error) {
      console.error('[Prompt Flow] Failed to request permission:', error);
      setInjectionStatus('error');
    }
  };

  const injectContentScript = async () => {
    setIsInjecting(true);
    setInjectionStatus('idle');
    debugger

    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const currentTab = tabs[0];

      if (!currentTab?.id) {
        setInjectionStatus('error');
        return;
      }

      // Send message to background script to inject content script
      const response = await browser.runtime.sendMessage({
        type: 'INJECT_CONTENT_SCRIPT',
        tabId: currentTab.id
      });

      if (response?.success) {
        setInjectionStatus('success');
        // Close popup after successful injection
        setTimeout(() => {
          window.close();
        }, 800);
      } else {
        setInjectionStatus('error');
      }
    } catch (error) {
      console.error('[Prompt Flow] Failed to inject content script:', error);
      setInjectionStatus('error');
    } finally {
      setIsInjecting(false);
    }
  };

  const openOptions = () => {
    browser.runtime.openOptionsPage();
    window.close();
  };

  const openPromptPicker = async () => {
    if (!hasPermission) {
      await requestPermission();
      return;
    }

    await injectContentScript();
  };

  return (
    <div className="w-[280px] min-h-[180px] p-5 flex flex-col items-center gap-3 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-2.5">
        <img
          src="/icon/logo.svg"
          alt="PromptFlow"
          className="w-8 h-8"
        />
        <h1 className="text-lg font-semibold text-slate-800 dark:text-white">{t('popupTitle')}</h1>
      </div>

      <p className="text-[13px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
        {t('popupDescription')}
      </p>

      {/* Permission Status */}
      {hasPermission === false && (
        <div className="w-full p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                {t('popupNoPermission')}
              </p>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 truncate">
                {currentUrl}
              </p>
            </div>
          </div>
        </div>
      )}

      {injectionStatus === 'success' && (
        <div className="w-full p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            <p className="text-xs text-green-700 dark:text-green-300 font-medium">
              {t('popupContentScriptInjected')}
            </p>
          </div>
        </div>
      )}

      {injectionStatus === 'error' && (
        <div className="w-full p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <p className="text-xs text-red-700 dark:text-red-300 font-medium">
              {t('popupInjectFailed')}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-2 mt-1">
        <button
          onClick={openPromptPicker}
          disabled={isInjecting}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-0"
        >
          {isInjecting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t('popupOpening')}
            </>
          ) : (
            <>
              <Play size={16} />
              {hasPermission ? t('popupOpenPicker') : t('popupRequestPermission')}
            </>
          )}
        </button>

        <button
          onClick={openOptions}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-all"
        >
          <Settings size={16} />
          {t('popupOpenSettings')}
        </button>
      </div>

      {/* Info Text */}
      <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
        {t('popupShortcutHint')}
      </p>
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
