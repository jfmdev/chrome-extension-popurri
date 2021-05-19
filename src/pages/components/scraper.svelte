<script>
  import { onMount } from 'svelte';

  let name = 'scraper';
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

<h1 class="title">Popurri Scrapper</h1>

{#if error}
  <div class="has-text-danger has-text-centered">
    <p>The page couldn't be scraped, please try reloading the tab or restaring Chrome.</p>
    <p class="is-family-code mt-1">{error}</p>
  </div>
{:else}
  <h2 class="subtitle mt-3 mb-1">Emails</h2>

  {#if emails && emails.length > 0}
    <ul>
      {#each emails as email}
        <li class="has-text-primary">{email}</li>
      {/each}
    </ul>
  {:else}
    <p class="has-text-grey">The page don't contain any e-mail address.</p>
  {/if}

  <h2 class="subtitle mt-3 mb-1">URLs</h2>

  {#if urls && urls.length > 0}
    <ul>
      {#each urls as url}
        <li class="has-text-info">{url}</li>
      {/each}
    </ul>
  {:else}
    <p class="has-text-grey">The page don't contain any URL nor link.</p>
  {/if}
{/if}
