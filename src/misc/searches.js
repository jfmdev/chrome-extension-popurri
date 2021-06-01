export default {
  KEY: "duck-duck-go",
  LABEL: "Search on Duck Duck Go",

  getUrl: function (textToSearch) {
    return `https://duckduckgo.com/?q=${encodeURIComponent(textToSearch)}`;
  },
};
