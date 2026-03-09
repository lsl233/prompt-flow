'use client';

import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { PromptCard } from '@/components/PromptCard';
import { Button } from '@/components/Button';
import { TagChip } from '@/components/TagChip';

const MOCK_PROMPTS = [
  {
    id: '1',
    slug: 'startup-idea-generator',
    title: 'Startup Idea Generator',
    description: 'Generate startup ideas based on current market trends and emerging technologies.',
    tags: ['Startup', 'Idea', 'Business'],
    usageCount: 12450,
  },
  {
    id: '2',
    slug: 'code-reviewer',
    title: 'Expert Code Reviewer',
    description: 'Act as a senior software engineer and review code for performance, security, and best practices.',
    tags: ['Coding', 'Review', 'Developer'],
    usageCount: 8920,
  },
  {
    id: '3',
    slug: 'seo-blog-post',
    title: 'SEO Optimized Blog Post',
    description: 'Write a comprehensive, SEO-optimized blog post on a given topic with proper headings and keywords.',
    tags: ['Marketing', 'SEO', 'Writing'],
    usageCount: 5600,
  },
  {
    id: '4',
    slug: 'react-component-generator',
    title: 'React Component Generator',
    description: 'Generate a functional React component with TypeScript interfaces and Tailwind CSS styling.',
    tags: ['React', 'Frontend', 'Coding'],
    usageCount: 15200,
  },
  {
    id: '5',
    slug: 'cold-email-writer',
    title: 'B2B Cold Email Writer',
    description: 'Write a highly converting B2B cold email sequence targeting specific pain points.',
    tags: ['Sales', 'Email', 'B2B'],
    usageCount: 4300,
  },
  {
    id: '6',
    slug: 'midjourney-photorealistic',
    title: 'Midjourney Photorealistic Portrait',
    description: 'A detailed prompt structure for generating hyper-realistic portraits in Midjourney v6.',
    tags: ['Image', 'Midjourney', 'Art'],
    usageCount: 21000,
  },
];

const CATEGORIES = ['All', 'Coding', 'Marketing', 'Business', 'Writing', 'Image Gen', 'Productivity'];

export default function PromptsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-2">
            Explore AI Prompts
          </h1>
          <p className="text-neutral-500 text-lg">
            Discover the best prompts created by the community.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Popular
          </Button>
          <Button variant="primary">
            Submit Prompt
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === category
                        ? 'bg-neutral-900 text-white font-medium'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'SEO', 'Sales', 'Midjourney', 'Python', 'Copywriting'].map((tag) => (
                  <button key={tag} className="hover:opacity-80 transition-opacity">
                    <TagChip label={tag} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {MOCK_PROMPTS.map((prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg">
              Load More Prompts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
