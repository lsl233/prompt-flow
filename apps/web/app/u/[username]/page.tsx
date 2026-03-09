import UserPageClient from './UserPageClient';

// Mock usernames for static generation
const MOCK_USERNAMES = ['alex', 'jane', 'john', 'sarah', 'mike'];

export function generateStaticParams() {
  return MOCK_USERNAMES.map((username) => ({
    username,
  }));
}

export default function UserPage({ params }: { params: { username: string } }) {
  return <UserPageClient username={params.username} />;
}
