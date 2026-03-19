'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  const scrollToFeatures = () => {
    const features = document.getElementById('features');
    features?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)] mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl overflow-hidden">
                <Image
                  src="/logo.svg"
                  alt="PromptFlow"
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </div>
              <span className="text-lg">{navT('brand')}</span>
            </Link>
            <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">{t('product.title')}</h3>
            <ul className="space-y-3 text-sm text-[var(--color-text-tertiary)]">
              <li>
                <button
                  onClick={scrollToFeatures}
                  className="hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  {t('product.features')}
                </button>
              </li>
              <li><a href="https://chromewebstore.google.com/detail/prompt-flow/hfifkmpkoiciamimifcahopbdefknnko" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-primary)] transition-colors">{t('product.chromeExtension')}</a></li>
              <li><Link href="/community" className="hover:text-[var(--color-accent-primary)] transition-colors">{t('product.community')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">{t('resources.title')}</h3>
            <ul className="space-y-3 text-sm text-[var(--color-text-tertiary)]">
              <li><a href="#" className="hover:text-[var(--color-accent-primary)] transition-colors">{t('resources.blog')}</a></li>
              <li><a href="#" className="hover:text-[var(--color-accent-primary)] transition-colors">{t('resources.documentation')}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">{t('company.title')}</h3>
            <ul className="space-y-3 text-sm text-[var(--color-text-tertiary)]">
              <li><a href="#" className="hover:text-[var(--color-accent-primary)] transition-colors">{t('company.about')}</a></li>
              <li><a href="#" className="hover:text-[var(--color-accent-primary)] transition-colors">{t('company.twitter')}</a></li>
              <li><a href="https://github.com/promptflow/promptflow" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-primary)] transition-colors">{t('company.github')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-[var(--color-border-subtle)] pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-[var(--color-text-tertiary)]">
          <p>{t('copyright', { year: currentYear })}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">{t('privacy')}</a>
            <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
