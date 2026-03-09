import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold text-neutral-900 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-neutral-900 text-white">
                <Sparkles className="h-3 w-3" />
              </div>
              <span>Quick Prompt</span>
            </Link>
            <p className="text-sm text-neutral-500">
              The fastest way to manage prompts for ChatGPT, Claude, and AI tools.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link href="/prompts" className="hover:text-neutral-900 transition-colors">Explore Prompts</Link></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Chrome Extension</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link href="/blog" className="hover:text-neutral-900 transition-colors">Blog</Link></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-neutral-900 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-neutral-900 transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Quick Prompt. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
