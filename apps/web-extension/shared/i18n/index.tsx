import { useState, useEffect, useCallback, useContext, createContext, ReactNode } from 'react';
import { browser } from 'wxt/browser';

const STORAGE_LANGUAGE_KEY = 'promptflow_language';

// Supported languages
export type Language = 'en' | 'zh_CN' | 'zh_TW';

export const LANGUAGES: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh_CN', name: '简体中文', nativeName: '简体中文' },
  { code: 'zh_TW', name: '繁體中文', nativeName: '繁體中文' },
];

// Get the browser/i18n language
function getBrowserLanguage(): Language {
  // In extension context, use browser.i18n
  if (typeof browser !== 'undefined' && browser.i18n) {
    const uiLanguage = browser.i18n.getUILanguage();
    // Map browser locale to our supported languages
    if (uiLanguage.startsWith('zh')) {
      if (uiLanguage.includes('TW') || uiLanguage.includes('HK')) {
        return 'zh_TW';
      }
      return 'zh_CN';
    }
    return 'en';
  }
  // Fallback for development/testing
  return 'en';
}

// i18n Context
interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, substitutions?: string[]) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

// Provider component
interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved language preference
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const result = await browser.storage.local.get(STORAGE_LANGUAGE_KEY);
        if (result[STORAGE_LANGUAGE_KEY]) {
          setLanguageState(result[STORAGE_LANGUAGE_KEY] as Language);
        } else {
          // Use browser language as default
          const browserLang = getBrowserLanguage();
          setLanguageState(browserLang);
        }
      } catch (e) {
        // Fallback to localStorage
        const saved = localStorage.getItem(STORAGE_LANGUAGE_KEY);
        if (saved) {
          setLanguageState(saved as Language);
        } else {
          setLanguageState(getBrowserLanguage());
        }
      }
      setIsLoaded(true);
    };

    loadLanguage();
  }, []);

  // Save language preference when it changes
  const setLanguage = useCallback(async (lang: Language) => {
    setLanguageState(lang);
    try {
      await browser.storage.local.set({ [STORAGE_LANGUAGE_KEY]: lang });
    } catch (e) {
      // Fallback to localStorage
      localStorage.setItem(STORAGE_LANGUAGE_KEY, lang);
    }
  }, []);

  // Translation function
  const t = useCallback(
    (key: string, substitutions?: string[]): string => {
      // In extension context, use browser.i18n
      if (typeof browser !== 'undefined' && browser.i18n) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const message = browser.i18n.getMessage(key as any, substitutions);
        // Return the message if found, otherwise return the key as fallback
        return message || key;
      }
      // Fallback for development
      return key;
    },
    [language]
  );

  if (!isLoaded) {
    return null;
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook for using i18n
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Utility function to get current language from storage (for non-React contexts)
export async function getStoredLanguage(): Promise<Language> {
  try {
    const result = await browser.storage.local.get(STORAGE_LANGUAGE_KEY);
    return (result[STORAGE_LANGUAGE_KEY] as Language) || getBrowserLanguage();
  } catch (e) {
    const saved = localStorage.getItem(STORAGE_LANGUAGE_KEY);
    return (saved as Language) || getBrowserLanguage();
  }
}

// Simple t function for non-React contexts (content scripts, background)
export function t(key: string, substitutions?: string[]): string {
  if (typeof browser !== 'undefined' && browser.i18n) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = browser.i18n.getMessage(key as any, substitutions);
    return message || key;
  }
  return key;
}
