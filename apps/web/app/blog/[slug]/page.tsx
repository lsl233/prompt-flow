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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />;
}
