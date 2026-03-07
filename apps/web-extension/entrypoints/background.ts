import { browser } from 'wxt/browser';

export default defineBackground(() => {
  console.log('[Prompt Flow] Background script initialized');

  // Listen for keyboard shortcut commands
  browser.commands.onCommand.addListener((command) => {
    if (command === 'toggle-popup') {
      // Send message to active tab to toggle popup
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        if (tabs[0]?.id) {
          browser.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_POPUP' }).catch(() => {
            // Content script may not be loaded on this page
            console.log('[Prompt Flow] Could not toggle popup on this page');
          });
        }
      });
    }
  });

  // Handle extension installation/update
  browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      console.log('[Prompt Flow] Extension installed');
      // Open options page on first install
      browser.runtime.openOptionsPage();
    } else if (details.reason === 'update') {
      console.log('[Prompt Flow] Extension updated from', details.previousVersion, 'to', browser.runtime.getManifest().version);
    }
  });

  // Message handler for content script communication
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_PROMPTS') {
      // Fetch prompts from storage and return to content script
      browser.storage.local.get('promptflow_prompts').then((result) => {
        sendResponse({ prompts: result.promptflow_prompts || [] });
      }).catch((error) => {
        console.error('[Prompt Flow] Failed to get prompts:', error);
        sendResponse({ prompts: [], error: error.message });
      });
      return true; // Keep channel open for async response
    }

    if (message.type === 'OPEN_OPTIONS') {
      browser.runtime.openOptionsPage();
      sendResponse({ success: true });
      return false;
    }

    if (message.type === 'INJECT_CONTENT_SCRIPT') {
      const tabId = message.tabId;
      injectContentScript(tabId).then((success) => {
        sendResponse({ success });
      }).catch((error) => {
        console.error('[Prompt Flow] Failed to inject content script:', error);
        sendResponse({ success: false, error: error.message });
      });
      return true; // Keep channel open for async response
    }

    if (message.type === 'TOGGLE_POPUP') {
      const tabId = message.tabId;

      // Try to send toggle message with retry
      const tryToggle = async (attempts = 3): Promise<boolean> => {
        for (let i = 0; i < attempts; i++) {
          try {
            await browser.tabs.sendMessage(tabId, { type: 'TOGGLE_POPUP' });
            console.log('[Prompt Flow] Successfully toggled popup on tab', tabId);
            return true;
          } catch (e) {
            console.log(`[Prompt Flow] Toggle attempt ${i + 1}/${attempts} failed on tab`, tabId);
            if (i < attempts - 1) {
              // Wait before retry
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          }
        }
        return false;
      };

      tryToggle().then(success => {
        sendResponse({ success });
      });

      return true;
    }
  });

  // Storage change listener for cross-page sync
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.promptflow_prompts) {
      // Notify all tabs about the change
      browser.tabs.query({}).then((tabs) => {
        tabs.forEach((tab) => {
          if (tab.id) {
            browser.tabs.sendMessage(tab.id, {
              type: 'PROMPTS_UPDATED',
              prompts: changes.promptflow_prompts.newValue
            }).catch(() => {
              // Ignore errors for tabs without content script
            });
          }
        });
      });
    }
  });
});

// Helper function to inject content script into a tab
async function injectContentScript(tabId: number): Promise<boolean> {
  try {
    // First, try to send a message to see if content script is already injected
    try {
      await browser.tabs.sendMessage(tabId, { type: 'TOGGLE_POPUP' });
      // If we get here, content script is already injected, just toggle it
      return true;
    } catch {
      // Content script not injected yet, proceed with injection
    }

    // Get the tab URL
    const tab = await browser.tabs.get(tabId);
    if (!tab.url) {
      console.error('[Prompt Flow] Tab has no URL');
      return false;
    }

    // Check if it's a restricted URL
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') ||
      tab.url.startsWith('about:') || tab.url.startsWith('edge://') ||
      tab.url.startsWith('moz-extension://')) {
      console.error('[Prompt Flow] Cannot inject into restricted URL:', tab.url);
      return false;
    }

    // Method 1: Try scripting.registerContentScripts (Chrome 96+)
    try {
      if (browser.scripting?.registerContentScripts) {
        const url = new URL(tab.url);
        const matchPattern = `${url.protocol}//${url.hostname}/*`;

        await browser.scripting.registerContentScripts([{
          id: `prompt-flow-dynamic-${tabId}`,
          js: ['/content-scripts/content.js'],
          css: ['/content-scripts/content.css'],
          matches: [matchPattern],
          runAt: 'document_end',
          world: 'ISOLATED'
        }]);

        // Reload the tab to apply the registered script
        // await browser.tabs.reload(tabId);
        console.log('[Prompt Flow] Content script registered for', matchPattern);
        return true;
      }
    } catch (e) {
      console.warn('[Prompt Flow] registerContentScripts failed, falling back:', e);
    }

    // Method 2: Direct injection via executeScript
    try {
      // Inject CSS first
      await browser.scripting.insertCSS({
        target: { tabId },
        files: ['/content-scripts/content.css']
      });

      // Inject the content script
      await browser.scripting.executeScript({
        target: { tabId },
        files: ['/content-scripts/content.js'],
        world: 'ISOLATED'
      });

      // Wait for initialization
      await new Promise(resolve => setTimeout(resolve, 300));

      // Try to send toggle message
      await browser.tabs.sendMessage(tabId, { type: 'TOGGLE_POPUP' });

      console.log('[Prompt Flow] Content script injected successfully via executeScript');
      return true;
    } catch (e) {
      console.error('[Prompt Flow] executeScript injection failed:', e);
      return false;
    }
  } catch (error) {
    console.error('[Prompt Flow] Failed to inject content script:', error);
    return false;
  }
}
