import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: (env) => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
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
