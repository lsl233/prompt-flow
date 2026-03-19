"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import LocaleSwitcher from "./LocaleSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Link } from "@/i18n/navigation";

interface NavbarProps {
  t: {
    brand: string;
    features: string;
    community: string;
    install: string;
    github: string;
  };
}

export function Navbar({ t }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
            <Image
              src="/logo.svg"
              alt="PromptFlow"
              width={36}
              height={36}
              className="w-full h-full"
            />
          </div>
          <span className="text-lg font-bold text-[var(--color-text-primary)] tracking-tight">
            {t.brand}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/*
          <button
            onClick={scrollToFeatures}
            className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            {t.features}
          </button>
          <Link
            href="/community"
            className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            {t.community}
          </Link>
          <a
            href="https://github.com/promptflow/promptflow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            {t.github}
          </a>
          */}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          <ThemeSwitcher />
          <a
            href="https://chromewebstore.google.com/detail/prompt-flow/hfifkmpkoiciamimifcahopbdefknnko"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm btn-glow"
          >
            {t.install}
          </a>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]">
          <div className="px-4 py-4 space-y-3">
            {/*
            <button
              onClick={scrollToFeatures}
              className="block w-full text-left px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              {t.features}
            </button>
            <Link
              href="/community"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              {t.community}
            </Link>
            <a
              href="https://github.com/promptflow/promptflow"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              {t.github}
            </a>
            */}
            <div className="pt-3 border-t border-[var(--color-border-subtle)]">
              <a
                href="https://chromewebstore.google.com/detail/prompt-flow/hfifkmpkoiciamimifcahopbdefknnko"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-medium btn-glow"
              >
                {t.install}
              </a>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-subtle)]">
              <ThemeSwitcher />
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
