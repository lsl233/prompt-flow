import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const MOCK_POSTS = [
  {
    id: '1',
    slug: 'how-to-write-better-prompts',
    title: 'How to Write Better Prompts for ChatGPT',
    excerpt: 'Learn the core principles of prompt engineering and how to structure your requests for the best possible outputs.',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=400',
    date: 'Oct 24, 2023',
    readTime: '5 min read',
    category: 'Guide',
  },
  {
    id: '2',
    slug: 'introducing-quick-prompt-v2',
    title: 'Introducing Quick Prompt v2.0',
    excerpt: 'We are thrilled to announce the next major version of Quick Prompt, featuring a completely redesigned interface and powerful new features.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400',
    date: 'Oct 18, 2023',
    readTime: '3 min read',
    category: 'Product',
  },
  {
    id: '3',
    slug: 'midjourney-v6-prompt-guide',
    title: 'The Ultimate Midjourney v6 Prompt Guide',
    excerpt: 'Master the art of AI image generation with our comprehensive guide to Midjourney v6 parameters and styles.',
    coverImage: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=800&h=400',
    date: 'Oct 12, 2023',
    readTime: '8 min read',
    category: 'Tutorial',
  },
];

export default async function BlogListPage() {
  const t = await getTranslations('blog');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_POSTS.map((post) => (
          <article key={post.id} className="group flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
            <Link href={`/blog/${post.slug}`} className="block aspect-[2/1] overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mb-4">
                <span className="text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">{post.category}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </div>
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline decoration-neutral-300 underline-offset-4">
                  {post.title}
                </Link>
              </h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-semibold text-neutral-900 hover:text-emerald-600 transition-colors mt-auto">
                {t('readArticle')}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
