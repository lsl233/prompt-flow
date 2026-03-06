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

    // Get the manifest to find content script files
    const manifest = browser.runtime.getManifest();

    // Inject CSS first (if any)
    const contentCss = manifest.content_scripts?.[0]?.css || [];
    for (const cssFile of contentCss) {
      try {
        await browser.scripting.insertCSS({
          target: { tabId },
          files: [cssFile as unknown as string]
        });
      } catch (e) {
        console.warn('[Prompt Flow] Failed to inject CSS:', cssFile, e);
      }
    }

    // Inject JS files
    const contentJs = manifest.content_scripts?.[0]?.js || [];
    for (const jsFile of contentJs) {
      try {
        await browser.scripting.executeScript({
          target: { tabId },
          files: [jsFile as never]
        });
      } catch (e) {
        console.error('[Prompt Flow] Failed to inject script:', jsFile, e);
        return false;
      }
    }

    // Wait a bit for the content script to initialize, then send toggle message
    await new Promise(resolve => setTimeout(resolve, 100));
    await browser.tabs.sendMessage(tabId, { type: 'TOGGLE_POPUP' });

    console.log('[Prompt Flow] Content script injected successfully');
    return true;
  } catch (error) {
    console.error('[Prompt Flow] Failed to inject content script:', error);
    return false;
  }
}
