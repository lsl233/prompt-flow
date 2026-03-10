import UserPageClient from './UserPageClient';

// Mock usernames for static generation
const MOCK_USERNAMES = ['alex', 'jane', 'john', 'sarah', 'mike'];

export function generateStaticParams() {
  return MOCK_USERNAMES.map((username) => ({
    username,
  }));
}

type PageParams = {
  params: Promise<{ locale: string; username: string }>;
};

export default async function UserPage({ params }: PageParams) {
  const { username } = await params;
  return <UserPageClient username={username} />;
}
