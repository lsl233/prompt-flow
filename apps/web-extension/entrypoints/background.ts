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
