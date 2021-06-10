import _ from "lodash";
import $ from "jquery/dist/jquery.slim.min";

const EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
const URLS_REGEX = /(https?:\/\/[^\s]+)/gi;

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // Scrape page content.
  if (msg.action === "scrape") {
    // Get href attributes from link elements and separate URLs from emails.
    const hrefs = _.map($("body a"), (elem) => $(elem).attr("href"));
    let urls = _.filter(hrefs, (href) => href && href.indexOf("mailto:") !== 0);
    let emails = _.map(
      _.filter(hrefs, (href) => href && href.indexOf("mailto:") === 0),
      (mailto) => mailto.substring(7)
    );

    // Get URLs and emails from text.
    const text = $("body").text();
    urls = urls.concat(text.match(URLS_REGEX) || []);
    emails = emails.concat(text.match(EMAIL_REGEX) || []);

    // Remove duplicates and sort.
    urls = _.sortedUniq(urls.sort());
    emails = _.sortedUniq(emails.sort());

    sendResponse({
      urls: urls,
      emails: emails,
    });
  }
});
