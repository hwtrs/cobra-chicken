import { modifyReddit } from "./reddit";

////////////////////////////////////////////////////////////////////////////////
// Listeners
////////////////////////////////////////////////////////////////////////////////
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      active: true,
      url: "https://www.bing.com/",
    });
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInf, tab) => {
  console.log(tab.url);
  
  // If the URL is the default new tab page
  if (tab.url === "chrome://newtab/") {
    // List of search engine URLs
    const searchEngines = [
      "https://www.yahoo.com",
      "https://www.bing.com",
      "https://www.aol.com",
      "https://duckduckgo.com",
      "https://www.ask.com",
      "https://search.brave.com",
      "https://www.startpage.com"
    ];

    // List of cat GIFs (you can add more URLs from an API or other sources)
    const catGIFs = [
      "https://cataas.com/cat/cute/says/Hello",
      "https://cataas.com/cat/cute/says/Meow",
      "https://cataas.com/cat/cute/says/LOL",
      "https://cataas.com/cat/cute/says/I%20love%20cats",
      "https://cataas.com/cat/cute/says/Random%20Cat%20GIF"
    ];

    // Pick a random cat GIF
    const randomCatGIF = catGIFs[Math.floor(Math.random() * catGIFs.length)];

    // Display a random cat GIF link as an alert
    alert("Here is a random cat GIF: " + randomCatGIF);

    // Pick a random search engine
    const randomIndex = Math.floor(Math.random() * searchEngines.length);
    const randomSearchEngine = searchEngines[randomIndex];

    // Update the new tab URL to a random search engine
    chrome.tabs.update(tabId, { url: randomSearchEngine });
  }
  // If the URL contains "geesehacks", redirect to qhacks.io
  else if (tab.url.includes("geesehacks")) {
    chrome.tabs.update(tabId, { url: "https://qhacks.io/" });
  }
});

