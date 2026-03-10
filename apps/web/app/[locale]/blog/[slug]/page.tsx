import BlogPostClient from './BlogPostClient';

// Mock blog slugs for static generation
const MOCK_BLOG_SLUGS = [
  'how-to-write-better-prompts',
  'introducing-quick-prompt-v2',
  'midjourney-v6-prompt-guide',
];

export function generateStaticParams() {
  return MOCK_BLOG_SLUGS.map((slug) => ({
    slug,
  }));
}

type PageParams = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function BlogPostPage({ params }: PageParams) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
