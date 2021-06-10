<script>
  import _ from "lodash";

  import SearchUtils from "../../misc/searches";
  import Storage from "../../misc/storage";

  const searchEngines = SearchUtils.SEARCH_ENGINES;
  let selectedEngine = null;

  async function initialize() {
    selectedEngine = await SearchUtils.getSearchEngine();
  }

  async function engineChanged(evt) {
    // Save new value and update contexual menu.
    await Storage.setSingle(Storage.Keys.SEARCH, _.get(selectedEngine, 'key', null));
    chrome.runtime.sendMessage({ action: "updateContextMenu" });
  }

  initialize();
</script>

<div class="container py-3">
  <h1 class="title mb-4">Popurri Settings</h1>

  <div class="field">
    <label class="label">Preferred Search Engine</label>
    <div class="select">
      <select bind:value={selectedEngine} on:change="{engineChanged}">
        {#each searchEngines as engine}
          <option value="{engine}" >{engine.name}</option>
        {/each}
      </select>
    </div>
  </div>
</div>