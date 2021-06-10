import _ from "lodash";

import SearchUtils from "./misc/searches";

const SEARCH_MENU_ID = "custom-search";

// Install handler.
chrome.runtime.onInstalled.addListener(function () {
  updateContextMenu();
});

// Startup handler.
chrome.runtime.onStartup.addListener(function () {
  updateContextMenu();
});

// Messages handler.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (_.get(request, "action") === "updateContextMenu") {
    updateContextMenu();
    sendResponse({ success: true });
  }
});

// Context menu handler.
chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId === SEARCH_MENU_ID) {
    // Search selected text.
    const url = await SearchUtils.getSearchUrl(info.selectionText);
    chrome.tabs.create({
      url,
      index: _.get(tab, "index", 0) + 1,
      selected: true,
    });
  }
});

// Add extension's items to context menu.
async function updateContextMenu() {
  // Clear previuos entries (if any).
  chrome.contextMenus.removeAll();

  // Add entry for search a selection.
  const searchEngine = await SearchUtils.getSearchEngine();
  chrome.contextMenus.create({
    id: SEARCH_MENU_ID,
    title: `Search on ${searchEngine.name}`,
    contexts: ["selection"],
  });
}
