import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: (env) => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  }),
  manifest: {
    name: 'Prompt Flow',
    description: 'A tool to manage and execute your prompts',
    version: '1.0.0',
    commands: {
      'toggle-popup': {
        suggested_key: {
          default: 'Ctrl+Shift+P',
          mac: 'Command+Shift+P',
        },
        description: 'Toggle Prompt Flow popup',
      },
    },
    permissions: [
      'storage',
      'activeTab',
    ],
    host_permissions: [
      '<all_urls>',
    ],
  },
});
