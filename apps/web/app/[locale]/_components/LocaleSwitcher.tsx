'use client';

import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';
import { routing, type Locale } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';

const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  'zh-Hant': '繁體中文',
};

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative flex items-center gap-2">
      <Globe className="h-4 w-4 text-[var(--color-text-tertiary)]" />
      <select
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        className="appearance-none bg-transparent text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer focus:outline-none"
      >
        {routing.locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}
