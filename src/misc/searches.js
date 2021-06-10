import _ from "lodash";

import Storage from "./storage";

export const SEARCH_ENGINES = [
  {
    key: "duck-duck-go",
    name: "Duck Duck Go",
    url: "https://duckduckgo.com/?q={SEARCH}",
  },
  {
    key: "ecosia",
    name: "Ecosia",
    url: "https://www.ecosia.org/search?q={SEARCH}",
  },
  { key: "qwant", name: "Qwant", url: "https://www.qwant.com/?q={SEARCH}" },
];

export async function getSearchEngine() {
  const searcherKey = await Storage.getSingle(Storage.Keys.SEARCH);
  return (
    _.find(SEARCH_ENGINES, (item) => item.key === searcherKey) ||
    SEARCH_ENGINES[0]
  );
}

export async function getSearchUrl(textToSearch) {
  const searcher = await getSearchEngine();
  return searcher.url.replace("{SEARCH}", textToSearch);
}

export default {
  SEARCH_ENGINES,
  getSearchEngine,
  getSearchUrl,
};
