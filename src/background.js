import _ from "lodash";

// Install handler.
chrome.runtime.onInstalled.addListener(function (details) {
  // TODO: Do something.
  console.log(_.toPairs(details));
});

// Startup handler.
chrome.runtime.onStartup.addListener(function () {
  // TODO: Do something.
});
