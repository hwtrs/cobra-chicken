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

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
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

    // Inject the cat GIF image into the new tab page
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      func: function(randomCatGIF) {
        const img = document.createElement('img');
        img.src = randomCatGIF;
        img.style.maxWidth = '80%';
        img.style.display = 'block';
        img.style.margin = '0 auto 20px';
        document.body.appendChild(img);

        // Add a message saying "Redirecting to a random search engine..."
        const message = document.createElement('h2');
        message.innerText = 'Redirecting to a random search engine...';
        message.style.textAlign = 'center';
        document.body.appendChild(message);
      },
      args: [randomCatGIF]
    });

    // Pick a random search engine
    const randomIndex = Math.floor(Math.random() * searchEngines.length);
    const randomSearchEngine = searchEngines[randomIndex];

    // Update the new tab URL to a random search engine after a short delay
    setTimeout(() => {
      chrome.tabs.update(tabId, { url: randomSearchEngine });
    }, 5000); // 5 seconds delay to give time to view the cat GIF
  }
  // If the URL contains "geesehacks", redirect to qhacks.io
  else if (tab.url.includes("geesehacks")) {
    chrome.tabs.update(tabId, { url: "https://qhacks.io/" });
  } else if (tab.url.includes("reddit.com/r/")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['./scripts/reddit.js']
    })
  }
});



function swapTabsAutomatically() {
  var tab1;
  var tab2;
  chrome.tabs.query({}, (tabs) => {
      if (tabs.length < 2) {
        console.log("Not enough tabs open to select two random ones.");
        return;
      }
  
      // Generate two unique random indices
      const randomIndex1 = Math.floor(Math.random() * tabs.length);
      let randomIndex2;
      do {
        randomIndex2 = Math.floor(Math.random() * tabs.length);
      } while (randomIndex2 === randomIndex1);
  
      // Get the tab IDs
      tab1 = tabs[randomIndex1].id;
      tab2 = tabs[randomIndex2].id;

      swapTabs(tab1, tab2);

  if (isNaN(tab1) || isNaN(tab2)) {
    alert("Please enter valid Tab IDs.");
    return;
  }})};

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "doTask") {
      doTask();  // Call the doTask function
      sendResponse({ status: "Task completed" });  // Send response back to popup.js
    }
  });

  function swapTabs(tab1Id, tab2Id) {
    // Get information about the two tabs
    chrome.tabs.get(tab1Id, (tab1) => {
      chrome.tabs.get(tab2Id, (tab2) => {
        // Swap the tabs' indexes
        chrome.tabs.move(tab1.id, { index: tab2.index }, () => {
          chrome.tabs.move(tab2.id, { index: tab1.index });
          console.log(`Swapped Tab ${tab1Id} and Tab ${tab2Id}`);
        });
      });
    });
  }

  function doTask() {
    setInterval(swapTabsAutomatically, 25);
  }