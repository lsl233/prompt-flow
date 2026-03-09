'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Share2, Twitter, MessageSquare, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { Button } from '@/components/Button';
import { TagChip } from '@/components/TagChip';

interface PromptDetailClientProps {
  slug: string;
}

export default function PromptDetailClient({ slug }: PromptDetailClientProps) {
  const [copied, setCopied] = useState(false);

  const prompt = {
    title: 'Startup Idea Generator',
    author: { name: 'Alex', username: 'alex', avatar: 'https://i.pravatar.cc/150?u=alex' },
    tags: ['Startup', 'Idea', 'Business'],
    content: `Act as a seasoned startup founder and venture capitalist. I will provide you with an industry or a target audience.

Your task is to generate 5 innovative startup ideas that solve real problems for this audience or within this industry.

For each idea, provide:
1. **The Problem:** What specific pain point are you solving?
2. **The Solution:** How does your product/service solve it?
3. **Target Audience:** Who are the early adopters?
4. **Business Model:** How will it make money?
5. **Why Now:** What technological or cultural shift makes this possible today?

Industry/Audience: [INSERT INDUSTRY OR AUDIENCE HERE]`,
    usageCount: 12450,
    createdAt: '2023-10-24',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/u/${prompt.author.username}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={prompt.author.avatar} alt={prompt.author.name} className="h-10 w-10 rounded-full border border-neutral-200" />
            <div>
              <p className="font-medium text-neutral-900">{prompt.author.name}</p>
              <p className="text-sm text-neutral-500">@{prompt.author.username}</p>
            </div>
          </Link>
          <div className="h-4 w-px bg-neutral-300"></div>
          <p className="text-sm text-neutral-500">{prompt.createdAt}</p>
          <div className="h-4 w-px bg-neutral-300"></div>
          <p className="text-sm text-neutral-500">{prompt.usageCount.toLocaleString()} uses</p>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-4">
          {prompt.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
            <Button variant="primary" size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <MessageSquare className="h-4 w-4" />
              Open in ChatGPT
            </Button>
          </div>
        </div>
      </div>

      {/* Prompt Content Block */}
      <div className="relative rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden mb-8">
        <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <div className="h-3 w-3 rounded-full bg-amber-400"></div>
            <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-neutral-500 hover:text-neutral-900 gap-2"
          >
            {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Prompt'}
          </Button>
        </div>
        <div className="p-6 overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed text-neutral-800 whitespace-pre-wrap">
            {prompt.content}
          </pre>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4 mb-16 border-t border-neutral-200 pt-8">
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Link
        </Button>
        <Button variant="outline" className="gap-2 text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] border-[#1DA1F2]/20">
          <Twitter className="h-4 w-4" />
          Share on Twitter
        </Button>
      </div>

      {/* Bottom Section */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6">
          More from {prompt.author.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 hover:border-neutral-300 transition-colors">
            <h3 className="font-semibold text-neutral-900 mb-2">B2B SaaS Landing Page Copy</h3>
            <p className="text-sm text-neutral-500 mb-4 line-clamp-2">Generate high-converting landing page copy for a B2B SaaS product following the PAS framework.</p>
            <div className="flex items-center justify-between">
              <TagChip label="Marketing" />
              <Link href="#" className="text-sm font-medium text-neutral-900 hover:underline">View →</Link>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-6 hover:border-neutral-300 transition-colors">
            <h3 className="font-semibold text-neutral-900 mb-2">Technical Co-founder Interview</h3>
            <p className="text-sm text-neutral-500 mb-4 line-clamp-2">A comprehensive list of technical and behavioral questions to ask a potential technical co-founder.</p>
            <div className="flex items-center justify-between">
              <TagChip label="Startup" />
              <Link href="#" className="text-sm font-medium text-neutral-900 hover:underline">View →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Extension Banner */}
      <div className="mt-16 rounded-2xl bg-neutral-900 p-8 text-center text-white flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-4">Save prompts instantly</h3>
        <p className="text-neutral-400 mb-6 max-w-lg">
          Install the Quick Prompt Chrome extension to save prompts from any website and access them directly inside AI tools.
        </p>
        <Button className="bg-white text-neutral-900 hover:bg-neutral-100 gap-2">
          <ExternalLink className="h-4 w-4" />
          Install Extension
        </Button>
      </div>
    </div>
  );
}
