import { createShadowRootUi } from 'wxt/utils/content-script-ui/shadow-root';
import ContentFloatingPopup from './ContentFloatingPopup';
import ReactDOM from 'react-dom/client';
import '@/shared/style.css';

export default defineContentScript({
  matches: ['<all_urls>'],
  excludeMatches: [
    '*://*.google.com/recaptcha/*',
    '*://*.gstatic.com/recaptcha/*',
  ],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'prompt-flow-popup',
      position: 'overlay',
      anchor: 'body',
      append: 'first',
      onMount(container: HTMLElement) {
        const root = ReactDOM.createRoot(container);
        root.render(<ContentFloatingPopup />);
        return root;
      },
      onRemove(root: ReactDOM.Root | undefined) {
        root?.unmount();
      },
    });

    ui.mount();

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
