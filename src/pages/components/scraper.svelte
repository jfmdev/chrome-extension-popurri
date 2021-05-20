<script>
  import { onMount } from 'svelte';

  let source = null;
  let urls = []
  let emails = []
  let error = null;

  // Wait for component to be mountd and scrap page.
  onMount(async () => {
    try{    
      // Parse query parameters.
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const tab = parseInt(urlParams.get('tab'));
      source = urlParams.get('source');

      // Scrape page.
      const data = await scrapePage(tab);
      urls = data.urls;
      emails = data.emails;
    }catch(err) {
      error = err;
    }    
  });  

  // Send message to content script to scrape page's content.
  function scrapePage(tabId) {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, {action: 'scrape'}, function(result) {
        if(result != null) {
          resolve(result);
        } else {
          const errMsg = chrome.runtime.lastError
            ? chrome.runtime.lastError.message
            : "Unexpected error";
          reject(new Error(errMsg));
        }
      });
    });
  }  
</script>

<div class="content p-3">
  <h1 class="title mb-2">Popurri Scraper</h1>

  {#if source}
    <div>
      <strong>Source:</strong>
      <a href="{source}" target="_blank" class="has-text-primary" title="Scraped website">{source}</a>
    </div>
  {/if}

  {#if error}
    <div class="columns mt-2">
      <div class="column is-half is-offset-one-quarter">
        <div class="notification is-danger has-text-centered p-2">
          <p class="mb-1">The page couldn't be scraped, please try reloading the tab or restaring Chrome.</p>
          <p class="is-family-code is-size-7 mb-0">{error}</p>
        </div>
      </div>
    </div>
  {:else}
    <h2 class="subtitle mt-3 mb-1">Emails</h2>

    {#if emails && emails.length > 0}
      <ul>
        {#each emails as email}
          <li><a href="mailto:{email}" class="has-text-info">{email}</a></li>
        {/each}
      </ul>
    {:else}
      <p class="has-text-grey">The page don't contain any e-mail address.</p>
    {/if}

    <h2 class="subtitle mt-3 mb-1">URLs</h2>

    {#if urls && urls.length > 0}
      <ul>
        {#each urls as url}
          <li><a href="{url}" target="_blank">{url}</a></li>
        {/each}
      </ul>
    {:else}
      <p class="has-text-grey">The page don't contain any URL nor link.</p>
    {/if}
  {/if}
</div>
