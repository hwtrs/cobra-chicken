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
  const url = tab.url;

  // If the URL is the default new tab page
  if (url === "chrome://newtab/") {
    // List of search engine URLs
    const searchEngines = [
      "https://www.google.com",
      "https://www.yahoo.com",
      "https://www.bing.com",
      "https://duckduckgo.com",
      "https://www.ask.com",
      "https://search.brave.com",
      "https://www.startpage.com",
    ];

    // Pick a random search engine
    const randomIndex = Math.floor(Math.random() * searchEngines.length);
    const randomSearchEngine = searchEngines[randomIndex];

    // Random playful message before redirecting
    const messages = [
      "Where will we go today? Let's find out!",
      "Your search adventure begins now...",
      "Hold on tight, you're going to a random search engine!",
      "Are you ready to search the web? Let's go!",
    ];

    // const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    // alert(randomMessage); // Show the playful message

    // Update the new tab URL to a random search engine
    chrome.tabs.update(tabId, { url: randomSearchEngine });
  }
  // If the URL contains "geesehacks", redirect to qhacks.io
  else if (url.includes("geesehacks")) {
    chrome.tabs.update(tabId, { url: "https://qhacks.io/" });
  } else if (url.includes("reddit.com/r/")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["./src/scripts/reddit.js"],
    });
  } else if (url.includes("x.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["./src/scripts/twitter.js"],
    });
  } else if (url.includes("cbc.ca") || url.includes("cnn.com") || url.includes("cnbc.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["./src/scripts/news.js"],
    });
  }
});

function swapTabsAutomatically() {
  let tab1;
  let tab2;
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
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "doTask") {
    doTask(); // Call the doTask function
    sendResponse({ status: "Task completed" }); // Send response back to popup.js
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
