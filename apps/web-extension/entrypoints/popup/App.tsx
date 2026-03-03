import { Settings } from 'lucide-react';
import './App.css';

function App() {
  const openOptions = () => {
    browser.runtime.openOptionsPage();
    window.close();
  };

  return (
    <div className="w-[280px] min-h-[160px] p-5 flex flex-col items-center gap-3 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
          P
        </div>
        <h1 className="text-lg font-semibold text-slate-800 dark:text-white">Prompt Flow</h1>
      </div>
      <p className="text-[13px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
        Manage and use your AI prompts efficiently.
      </p>
      <button
        onClick={openOptions}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 mt-1 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-0"
      >
        <Settings size={16} />
        Open Settings
      </button>
    </div>
  );
}

export default App;
