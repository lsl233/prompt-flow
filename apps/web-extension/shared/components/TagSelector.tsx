import { useState, useRef, useEffect, useMemo } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react';
import { useI18n } from '@/shared/i18n';

export interface TagSelectorProps {
  /** Current selected tags */
  tags: string[];
  /** Available tags to suggest (optional) */
  availableTags?: string[];
  /** Callback when tags change */
  onChange: (tags: string[]) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the dropdown with available tags */
  showDropdown?: boolean;
  /** ID for the label */
  labelId?: string;
}

/**
 * A reusable tag selector component with add/remove functionality.
 * Supports keyboard navigation and optional dropdown for existing tags.
 */
export default function TagSelector({
  tags,
  availableTags = [],
  onChange,
  placeholder,
  className = '',
  showDropdown = true,
  labelId,
}: TagSelectorProps) {
  const { t } = useI18n();
  const [tagInput, setTagInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter available tags based on input
  const filteredAvailableTags = useMemo(() => {
    return availableTags
      .filter(tag => !tags.includes(tag))
      .filter(tag => tag.toLowerCase().includes(tagInput.toLowerCase()))
      .sort();
  }, [availableTags, tags, tagInput]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlighted index when input changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [tagInput]);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setTagInput('');
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(t => t !== tagToRemove));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // If a tag is highlighted in dropdown, select it
      if (isDropdownOpen && filteredAvailableTags.length > 0) {
        addTag(filteredAvailableTags[highlightedIndex]);
      } else if (tagInput.trim()) {
        // Create new tag
        addTag(tagInput);
      }
    } else if (e.key === 'ArrowDown' && showDropdown) {
      e.preventDefault();
      if (!isDropdownOpen && filteredAvailableTags.length > 0) {
        setIsDropdownOpen(true);
      }
      setHighlightedIndex(prev =>
        prev < filteredAvailableTags.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp' && showDropdown) {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      // Remove last tag when backspace on empty input
      removeTag(tags[tags.length - 1]);
    }
  };

  const showCreateOption = tagInput.trim() &&
    !tags.includes(tagInput.trim()) &&
    !filteredAvailableTags.some(t => t.toLowerCase() === tagInput.toLowerCase());

  const inputPlaceholder = placeholder || (tags.length > 0
    ? t('editorTagsAddMore')
    : t('editorTagsPlaceholder'));

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-md font-medium"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="text-slate-400 hover:text-red-500 transition-colors"
              type="button"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      {/* Input Area */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={tagInput}
          onChange={e => {
            setTagInput(e.target.value);
            if (showDropdown) {
              setIsDropdownOpen(true);
            }
          }}
          onKeyDown={handleInputKeyDown}
          onFocus={() => showDropdown && setIsDropdownOpen(true)}
          placeholder={inputPlaceholder}
          aria-labelledby={labelId}
          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
        />
        {showDropdown && (
          <ChevronDown
            size={16}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform pointer-events-none ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        )}

        {/* Dropdown with available tags */}
        {showDropdown && isDropdownOpen && (filteredAvailableTags.length > 0 || showCreateOption) && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {/* Create new tag option */}
            {showCreateOption && (
              <button
                onClick={() => addTag(tagInput)}
                className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700"
                type="button"
              >
                <Plus size={14} className="text-blue-500" />
                <span>
                  {t('editorCreateTag')} &quot;
                  <span className="font-medium text-slate-900 dark:text-white">
                    {tagInput.trim()}
                  </span>
                  &quot;
                </span>
              </button>
            )}

            {/* Existing tags */}
            {filteredAvailableTags.map((tag, index) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  index === highlightedIndex
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Empty state - all tags selected */}
        {showDropdown && isDropdownOpen &&
          filteredAvailableTags.length === 0 &&
          !showCreateOption &&
          availableTags.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-4 text-sm text-slate-500 text-center">
            {t('editorAllTagsSelected')}
          </div>
        )}
      </div>
    </div>
  );
}
