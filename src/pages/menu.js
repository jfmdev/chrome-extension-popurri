import Jokes from "../misc/jokes";

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

  listenClick('joke', async function(evt) {
    try{
      // Change icon to loading.
      const icon = evt.target.querySelector("i");
      const initialClass = icon.className;
      icon.className = "fas fa-sync-alt fa-spin";

      // Show joke.
      const joke = await Jokes.chuckNorris();
      await showNotification('Keep coding', joke);

      // Restore icon.
      icon.className = initialClass;
    }catch(err) {
      console.error("An unexpected error ocurred when creating a notification", JSON.stringify(err));
    }

    // Close menu (set a delay, otherwise sometimes the notification isn't shown).
    setTimeout(window.close, 150);
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

// Show a notification (at OS level).
function showNotification(title, message) {
  return new Promise(function(resolve, error) {
    // Define parameters.
    const id = 'chromePopurri_' + new Date().getTime();
    const options = {
      type: 'basic',
      title: title,
      message: message,
      priority: 1,
      iconUrl:'../images/icon_64.png'
    };

    chrome.notifications.create(id, options, function() {
      // Check if action was successful.
      if(chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  })
}
