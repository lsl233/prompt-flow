'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/Button';

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const post = {
    title: 'How to Write Better Prompts for ChatGPT',
    content: `
      <p class="lead">Prompt engineering is the art of communicating effectively with AI models. It's not just about asking questions; it's about providing context, structure, and constraints to get the exact output you need.</p>

      <h2>1. Be Specific and Direct</h2>
      <p>The most common mistake people make is being too vague. Instead of asking "Write a blog post about marketing," try "Write a 500-word blog post about content marketing strategies for B2B SaaS companies, focusing on SEO and lead generation."</p>

      <h2>2. Provide Context</h2>
      <p>AI models don't know who you are or what your goals are. Give them the necessary background information. For example, "I am a freelance graphic designer looking to attract more clients. Write a compelling 'About Me' section for my portfolio website."</p>

      <h2>3. Use Examples (Few-Shot Prompting)</h2>
      <p>Showing is often better than telling. If you want the AI to output data in a specific format, provide a few examples of that format in your prompt.</p>

      <pre><code>Input: "Apple"
Output: "Fruit"

Input: "Carrot"
Output: "Vegetable"

Input: "Dog"
Output:</code></pre>

      <h2>4. Define the Role</h2>
      <p>Telling the AI to act as a specific persona can significantly improve the quality and tone of the output. "Act as a senior software engineer and review this code..." or "Act as an expert copywriter and rewrite this headline..."</p>

      <h2>5. Iterate and Refine</h2>
      <p>Don't expect the perfect answer on the first try. Use the AI's response as a starting point and refine your prompt based on what it produced. Ask it to expand on certain points, change the tone, or format the output differently.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200&h=600',
    date: 'Oct 24, 2023',
    readTime: '5 min read',
    author: {
      name: 'Alex Chen',
      avatar: 'https://i.pravatar.cc/150?u=alex',
      role: 'Founder, Quick Prompt',
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <Link href="/blog" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to blog
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm font-medium text-neutral-500 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 border-t border-b border-neutral-200 py-6">
          <img src={post.author.avatar} alt={post.author.name} className="h-12 w-12 rounded-full border border-neutral-200" />
          <div>
            <p className="font-semibold text-neutral-900">{post.author.name}</p>
            <p className="text-sm text-neutral-500">{post.author.role}</p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-neutral-500 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-neutral-500 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="aspect-[2/1] w-full overflow-hidden rounded-2xl mb-12 border border-neutral-200 shadow-sm">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div
        className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-600 hover:prose-a:text-emerald-500 prose-img:rounded-xl prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:border prose-pre:border-neutral-800"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-16 border-t border-neutral-200 pt-8 flex items-center justify-between">
        <p className="text-neutral-500 font-medium">Share this article</p>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] border-[#1DA1F2]/20">
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          <Button variant="outline" className="gap-2 text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] border-[#0A66C2]/20">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>
        </div>
      </div>
    </article>
  );
}
