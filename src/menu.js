import "@fortawesome/fontawesome-free/css/all.min.css";
import "bulma/css/bulma.min.css";

function listenClick(idAttr, callback) {
  document.getElementById(idAttr).addEventListener('click', function(evt) {
    callback(evt);
    evt.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  listenClick('scrap', function() {
    alert('WIP - URL scraping');
  });

  listenClick('right', function() {
    alert('WIP - Right click');
  });

  listenClick('options', function() {
    chrome.runtime.openOptionsPage();
  });
});
