# Chrome Extension Popurri

A proof-of-concept Chrome Extension developed with Webpack and Svelte.

[Install from Chrome Web Store](https://chrome.google.com/webstore/detail/ogfjggmceijfibolfmiikbkhaolmodep/)

## Features

The extension provides four simple features:

- Search a selected text in a private search engine.
- Scrape a page to obtain all URLs and e-mail addresses. 
- Show a random joke (obtained from a public API) in a notification.
- Open Google Maps showing the user's current location.

## Building

For build the extension just run `yarn`, for install all dependencies, and then `yarn run build`, for build the files into the `dist/` folder.

During development you can also run `yarn run watch`, which will watch the `src/` folder and automatically build the extension every time a file is updated.

## Developer notes

The project uses ESLint as code linter and Prettier as code formatter. You can execute both of them using the commands `yarn run lint`, for detect errors, and `yarn run lint:fix`, for try to automatically fix errors and warnings.

The background service worker (`background.js`) initializes (and keeps updated) the contextual menu in order to add the item that allows to search a selected text using a custom search engine (this is why the "contextMenus" permission is required).

The content script (`content.js`) is charged of scraping the current web page when the user clicks the corresponding option from the extension's popup (this is why the "activeTab" permission is required).

The extension's default popup (`menu.html` and `menu.js`) shows buttons for scrape the current page (showing the results in a new tab, defined by `scraper.svelte`), for show a random joke in a notification (this is why the "notifications" permission is required), for open Google Maps showing the user's location (this is why the "geolocation" permission is required) and for open the extension's options page.

The extension's options page (`options.svelte`) allows to change the search engine and the API used to get the jokes, saving the choices in the Chrome's storage (this is why the "storage" permission is required).

## License

Copyright 2021 © JFMDev.

This library is free software; you can redistribute it and/or modify it under the terms of the Mozilla Public License v2.0. 
You should have received a copy of the MPL 2.0 along with this library, otherwise you can obtain one at <http://mozilla.org/MPL/2.0/>.
