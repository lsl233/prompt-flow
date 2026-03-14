import { useState, useEffect } from 'react';
import { useStore } from './useStore';
import { I18nProvider } from '@/shared/i18n';
import { ToastProvider } from '@/shared/components/Toast';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import PromptLibrary from './components/PromptLibrary';
import SettingsPanel from './components/SettingsPanel';
import FloatingPopup from './components/FloatingPopup';
import PromptEditorModal from './components/Modals/PromptEditorModal';
import '@/shared/style.css';

function AppContent() {
  const store = useStore();
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsFloatingOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCreatePrompt = () => {
    setEditingPromptId(null);
    setIsEditorOpen(true);
  };

  const handleEditPrompt = (id: string) => {
    setEditingPromptId(id);
    setIsEditorOpen(true);
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-200">
      <Sidebar
        view={store.view}
        setView={store.setView}
        tags={store.allTags}
        selectedTag={store.selectedTag}
        onSelectTag={store.setSelectedTag}
        pinnedTags={store.pinnedTags}
        onTogglePinTag={store.togglePinTag}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          toggleTheme={store.toggleTheme}
          isDarkMode={store.isDarkMode}
          onCreatePrompt={handleCreatePrompt}
          prompts={store.prompts}
          store={store}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {store.view === 'dashboard' && (
              <Dashboard store={store} onCreatePrompt={handleCreatePrompt} />
            )}
            {store.view === 'library' && (
              <PromptLibrary store={store} onEditPrompt={handleEditPrompt} />
            )}
            {store.view === 'settings' && (
              <SettingsPanel store={store} />
            )}
          </div>
        </main>
      </div>

      {isEditorOpen && (
        <PromptEditorModal
          promptId={editingPromptId}
          store={store}
          onClose={() => setIsEditorOpen(false)}
        />
      )}

      {isFloatingOpen && (
        <FloatingPopup
          store={store}
          onClose={() => setIsFloatingOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </I18nProvider>
  );
}
