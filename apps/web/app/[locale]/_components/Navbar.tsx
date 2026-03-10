import Link from 'next/link';
import { Sparkles, Github } from 'lucide-react';
import { Button } from '@/components/Button';
import LocaleSwitcher from './LocaleSwitcher';
import { getTranslations } from 'next-intl/server';

export default async function Navbar() {
  const t = await getTranslations('nav');

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-semibold text-neutral-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg tracking-tight">{t('brand')}</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <Link href="/prompts" className="hover:text-neutral-900 transition-colors">{t('prompts')}</Link>
            <Link href="/blog" className="hover:text-neutral-900 transition-colors">{t('blog')}</Link>
            <a href="#" className="hover:text-neutral-900 transition-colors">{t('extension')}</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <a href="#" className="hidden sm:flex text-neutral-500 hover:text-neutral-900 transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <Button variant="primary" size="sm" className="hidden sm:inline-flex">
            {t('install')}
          </Button>
        </div>
      </div>
    </nav>
  );
}
