import PromptDetailClient from './PromptDetailClient';

// Mock data slugs for static generation
const MOCK_PROMPT_SLUGS = [
  'startup-idea-generator',
  'code-reviewer',
  'seo-blog-post',
  'react-component-generator',
  'cold-email-writer',
  'midjourney-photorealistic',
];

export function generateStaticParams() {
  return MOCK_PROMPT_SLUGS.map((slug) => ({
    slug,
  }));
}

type PageParams = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function PromptDetailPage({ params }: PageParams) {
  const { slug } = await params;
  return <PromptDetailClient slug={slug} />;
}
