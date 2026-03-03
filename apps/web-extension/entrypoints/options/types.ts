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
}

export type ViewState = 'dashboard' | 'library';
