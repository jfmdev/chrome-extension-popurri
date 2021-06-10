<script>
  import _ from "lodash";

  import JokesUtils from "../../misc/jokes";
  import SearchUtils from "../../misc/searches";

  const searchEngines = SearchUtils.SEARCH_ENGINES;
  let selectedEngine = null;

  const jokesApis = JokesUtils.JOKES_APIS;
  let selectedApi = null;

  async function initialize() {
    selectedEngine = _.get(await SearchUtils.getSearchEngine(), 'key');
    selectedApi = await JokesUtils.getApiKey();
  }

  async function engineChanged() {
    // Save new value and update contexual menu.
    await SearchUtils.setSearchEngine(selectedEngine);
    chrome.runtime.sendMessage({ action: "updateContextMenu" });
  }

  async function jokesApiChanged() {
    // Save new value.
    await JokesUtils.setApiKey(selectedApi);
  }

  initialize();
</script>

<div class="container py-3">
  <h1 class="title mb-4">Popurri Settings</h1>

  <div class="field">
    <label class="label">Preferred Search Engine</label>
    <div class="select">
      <select name="search-engine" bind:value={selectedEngine} on:change="{engineChanged}">
        {#each searchEngines as engine}
          <option value="{engine.key}" >{engine.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="field">
    <label class="label">Preferred Jokes API</label>
    <div class="control">
      {#each jokesApis as jokesApi}
        <label class="radio mr-2">
          <input type="radio" name="jokes-api" bind:group={selectedApi} value={jokesApi.key} on:change="{jokesApiChanged}">
          {jokesApi.name}
        </label>
      {/each}
    </div>
  </div>
</div>