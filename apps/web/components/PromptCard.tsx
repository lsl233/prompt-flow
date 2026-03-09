import React from 'react';
import Link from 'next/link';
import { Copy, Eye, Heart } from 'lucide-react';
import { Button } from './Button';
import { TagChip } from './TagChip';

export interface PromptCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  description: string;
  tags: string[];
  usageCount: number;
  slug: string;
  className?: string;
  key?: React.Key;
}

export function PromptCard({ id, title, description, tags, usageCount, slug, className = '', ...props }: PromptCardProps) {
  return (
    <div
      className={`group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-neutral-300 ${className}`}
      {...props}
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 tracking-tight line-clamp-1">
            <Link href={`/p/${slug}`} className="hover:underline decoration-neutral-300 underline-offset-4">
              {title}
            </Link>
          </h3>
          <div className="flex items-center text-neutral-400 text-xs font-medium">
            <Heart className="mr-1 h-3 w-3" />
            {usageCount.toLocaleString()}
          </div>
        </div>

        <p className="text-sm text-neutral-500 mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
        <Button variant="secondary" size="sm" className="flex-1 gap-2">
          <Copy className="h-4 w-4" />
          Copy
        </Button>
        <Link href={`/p/${slug}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <Eye className="h-4 w-4" />
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
