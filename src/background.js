import _ from "lodash";

import SearchEngine from "./misc/searches";

// Install handler.
chrome.runtime.onInstalled.addListener(function () {
  updateContextMenu();
});

// Startup handler.
chrome.runtime.onStartup.addListener(function () {
  updateContextMenu();
});

// Context menu handler.
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === SearchEngine.KEY) {
    // Search selected text.
    chrome.tabs.create({
      url: SearchEngine.getUrl(info.selectionText),
      index: _.get(tab, "index", 0) + 1,
      selected: true,
    });
  }
});

// Add extension's items to context menu.
function updateContextMenu() {
  // Clear previuos entries (if any).
  chrome.contextMenus.removeAll();

  // Add entry for search a selection.
  chrome.contextMenus.create({
    id: SearchEngine.KEY,
    title: SearchEngine.LABEL,
    contexts: ["selection"],
  });
}
