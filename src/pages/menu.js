import "@fortawesome/fontawesome-free/css/all.min.css";
import "bulma/css/bulma.min.css";

// Wait for the page to be loaded and define click behaviours on menu's items.
document.addEventListener("DOMContentLoaded", async function () {
  listenClick('scrape', async function() {
    const tab = await getCurrentTab();
    chrome.tabs.create({
      "url": `scraper.html?tab=${tab.id}&source=${encodeURIComponent(tab.url)}`,
    });
  });

  listenClick('right', function() {
    alert('WIP - Right click');
  });

  listenClick('options', function() {
    chrome.runtime.openOptionsPage();
  });
});

// Define click listener for a link.
function listenClick(idAttr, callback) {
  document.getElementById(idAttr).addEventListener('click', function(evt) {
    callback(evt);
    evt.preventDefault();
  });
}

// Get browser's current active tab.
async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
