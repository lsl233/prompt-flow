export interface PromptVersion {
  id: string;
  content: string;
  timestamp: number;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  isFavorite: boolean;
  versions: PromptVersion[];
  createdAt: number;
  updatedAt: number;
  useCount: number;
  lastUsedAt: number | null;
}

export type ViewState = 'dashboard' | 'library' | 'settings';

export interface FilterState {
  tag: string | null;
  search: string;
}
