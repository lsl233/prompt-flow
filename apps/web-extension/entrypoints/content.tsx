import { createRoot } from 'react-dom/client';
import ContentFloatingPopup from './content/ContentFloatingPopup';
import './content/content-styles.css';

export default defineContentScript({
  matches: ['<all_urls>'],
  excludeMatches: [
    '*://*.google.com/recaptcha/*',
    '*://*.gstatic.com/recaptcha/*',
  ],
  main() {
    // Create container with Shadow DOM for style isolation
    const container = document.createElement('div');
    container.id = 'prompt-flow-container';
    document.body.appendChild(container);

    // Create shadow root
    const shadowRoot = container.attachShadow({ mode: 'open' });

    // Create style element for Tailwind CSS
    const style = document.createElement('style');
    style.textContent = `
      /* Reset styles */
      :host {
        all: initial;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      /* Tailwind will be injected here by the build process */
    `;
    shadowRoot.appendChild(style);

    // Create root element for React
    const rootElement = document.createElement('div');
    rootElement.id = 'prompt-flow-root';
    shadowRoot.appendChild(rootElement);

    // Mount React app
    const root = createRoot(rootElement);
    root.render(<ContentFloatingPopup />);

    // Listen for messages from background script
    browser.runtime.onMessage.addListener((message) => {
      if (message.type === 'TOGGLE_POPUP') {
        window.dispatchEvent(new CustomEvent('prompt-flow:toggle'));
      }
      return Promise.resolve();
    });

    console.log('[Prompt Flow] Content script initialized');
  },
});
