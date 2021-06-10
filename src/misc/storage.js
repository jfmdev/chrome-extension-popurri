/**
 * Utility to wrap Chrome local storage calls in Promises.
 */
const LocalStorage = {
  set: function (data) {
    return new Promise(function (resolve) {
      chrome.storage.local.set(data, resolve);
    });
  },

  setSingle: function (key, value) {
    const data = { [key]: value };
    return LocalStorage.set(data);
  },

  get: function (keys) {
    return new Promise(function (resolve) {
      chrome.storage.local.get(keys, resolve);
    });
  },

  getSingle: async function (key) {
    const result = await LocalStorage.get([key]);
    return result[key];
  },

  Keys: {
    SEARCH: "search-engine",
  },
};

export default LocalStorage;
