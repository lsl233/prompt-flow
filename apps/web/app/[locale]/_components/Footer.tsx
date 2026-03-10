import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('footer');
  const navT = await getTranslations('nav');

  return (
    <footer className="border-t border-neutral-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold text-neutral-900 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-neutral-900 text-white">
                <Sparkles className="h-3 w-3" />
              </div>
              <span>{navT('brand')}</span>
            </Link>
            <p className="text-sm text-neutral-500">
              {t('description')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">{t('product.title')}</h3>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link href="/prompts" className="hover:text-neutral-900 transition-colors">{t('product.explorePrompts')}</Link></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">{t('product.chromeExtension')}</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">{t('product.pricing')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">{t('resources.title')}</h3>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link href="/blog" className="hover:text-neutral-900 transition-colors">{t('resources.blog')}</Link></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">{t('resources.documentation')}</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">{t('resources.community')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">{t('company.title')}</h3>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-neutral-900 transition-colors">{t('company.about')}</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">{t('company.twitter')}</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">{t('company.github')}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-neutral-500">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-900 transition-colors">{t('privacy')}</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
