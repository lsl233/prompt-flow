import { Settings } from 'lucide-react';
import '@/shared/style.css';
import { useI18n, I18nProvider } from '@/shared/i18n';

function AppContent() {
  const { t } = useI18n();

  const openOptions = () => {
    browser.runtime.openOptionsPage();
    window.close();
  };

  return (
    <div className="w-[280px] min-h-[160px] p-5 flex flex-col items-center gap-3 bg-white dark:bg-slate-900">
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
      <button
        onClick={openOptions}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 mt-1 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-0"
      >
        <Settings size={16} />
        {t('popupOpenSettings')}
      </button>
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
