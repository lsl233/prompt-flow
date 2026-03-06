// Default AI websites that content script will run on
// This is the single source of truth for AI website matching
export const DEFAULT_AI_WEBSITES = [
  'chat.openai.com',
  'claude.ai',
  'gemini.google.com',
  'perplexity.ai',
  'you.com',
  'bing.com',
  'chat.deepseek.com',
  'www.kimi.com',
  'www.doubao.com',
  'yuanbao.tencent.com',
  'www.qianwen.com',
];

// Convert domains to match patterns for WXT content script
export const getMatchPatterns = (domains: string[]): string[] => {
  return domains.flatMap(domain => [
    `*://${domain}/*`,
    `*://*.${domain}/*`,
  ]);
};
