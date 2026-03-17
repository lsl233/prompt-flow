export interface CommunityPrompt {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  category: 'writing' | 'coding' | 'image' | 'other';
  tags: string[];
  createdAt: string;
}
