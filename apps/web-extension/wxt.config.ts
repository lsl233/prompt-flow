import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { DEFAULT_AI_WEBSITES, getMatchPatterns } from './shared/ai-websites';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  }),
  manifest: {
    name: '__MSG_extensionName__',
    description: '__MSG_extensionDescription__',
    version: '1.0.1',
    default_locale: 'en',
    commands: {
      'toggle-popup': {
        suggested_key: {
          default: 'Ctrl+Shift+P',
          mac: 'Command+Shift+P',
        },
        description: '__MSG_commandTogglePopup__',
      },
    },
    permissions: [
      'storage',
      'activeTab',
      'scripting',
    ],
    host_permissions: getMatchPatterns(DEFAULT_AI_WEBSITES),
    optional_host_permissions: [
      '<all_urls>',
    ],
    web_accessible_resources: [
      {
        resources: ['content-scripts/*', 'chunks/*'],
        matches: ['<all_urls>'],
      },
    ],
  },
});
