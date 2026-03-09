'use client';

import { PromptCard } from '@/components/PromptCard';
import { Button } from '@/components/Button';
import { MapPin, Link as LinkIcon, Twitter, Github } from 'lucide-react';

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
];

interface UserPageClientProps {
  username: string;
}

export default function UserPageClient({ username }: UserPageClientProps) {
  const user = {
    name: 'Alex Chen',
    username: username || 'alex',
    avatar: `https://i.pravatar.cc/150?u=${username || 'alex'}`,
    bio: 'Product Designer & Prompt Engineer. Building tools for the AI era. Exploring the intersection of design and machine learning.',
    location: 'San Francisco, CA',
    website: 'alexchen.design',
    twitter: '@alexc',
    github: 'alexchen',
    promptCount: 24,
    followers: 1205,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* User Profile Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="sticky top-24">
            <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm text-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="mx-auto h-32 w-32 rounded-full border-4 border-white shadow-md mb-6"
              />
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mb-1">{user.name}</h1>
              <p className="text-neutral-500 mb-6">@{user.username}</p>

              <p className="text-neutral-700 leading-relaxed mb-8 text-sm text-left">
                {user.bio}
              </p>

              <div className="space-y-4 text-sm text-neutral-600 text-left mb-8">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-neutral-400" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-4 w-4 text-neutral-400" />
                  <a href={`https://${user.website}`} className="hover:text-neutral-900 hover:underline">{user.website}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="h-4 w-4 text-neutral-400" />
                  <a href={`https://twitter.com/${user.twitter}`} className="hover:text-neutral-900 hover:underline">{user.twitter}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-neutral-400" />
                  <a href={`https://github.com/${user.github}`} className="hover:text-neutral-900 hover:underline">{user.github}</a>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 border-t border-neutral-100 pt-6 mb-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-neutral-900">{user.promptCount}</p>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Prompts</p>
                </div>
                <div className="h-10 w-px bg-neutral-200"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-neutral-900">{user.followers.toLocaleString()}</p>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Followers</p>
                </div>
              </div>

              <Button className="w-full">Follow</Button>
            </div>
          </div>
        </aside>

        {/* User Prompts */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-neutral-200 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
              Prompts
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-neutral-100 text-neutral-900 border-neutral-200">Latest</Button>
              <Button variant="ghost" size="sm">Popular</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {MOCK_PROMPTS.map((prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
