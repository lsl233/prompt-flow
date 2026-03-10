'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { routing, type Locale } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const currentLocale = pathname.split('/')[1] as Locale;

  const handleLocaleChange = (newLocale: Locale) => {
    // Replace the locale in the pathname
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="relative flex items-center gap-2">
      <Globe className="h-4 w-4 text-neutral-500" />
      <select
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        className="appearance-none bg-transparent text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer focus:outline-none"
      >
        {routing.locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale === 'zh' ? '中文' : 'English'}
          </option>
        ))}
      </select>
    </div>
  );
}
