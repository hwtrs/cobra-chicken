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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "debugSwitch") {
    doTask(); // Calls the function that makes tabs start switching around
  }
  else if (message.action === "debugDelete") {
    deleteRandomTab(); // Calls the function that makes a tab delete at random
  }
  else if (message.action === "debugConvert") {
    convertRandom(); // Calls the function that makes a tab delete at random
  }
  else if (message.action === "debugGeese") {
    toGeeseHacks(); // Calls the function that makes a tab delete at random
  }
  else if (message.action === "debugPunctuation") {
    deletePunctuation(); // Calls the function that makes a tab delete at random
  }
  else if (message.action === "debugError") {
    errorMessage(); // Calls the function that makes a tab delete at random
  }
  else if (message.action === "debugBrainrot") {
    brainrot(); // Calls the function that makes a tab delete at random
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
  } else if (
    url.includes("cbc.ca") ||
    url.includes("cnn.com") ||
    url.includes("cnbc.com")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["./src/scripts/news.js"],
    });
  }
});

////////////////////////////////////////////////////////////////////////////////
// Interval
////////////////////////////////////////////////////////////////////////////////
const actions = [
  doTask,
  deleteRandomTab,
  convertRandom,
  toGeeseHacks,
  deletePunctuation,
  errorMessage,
  brainrot,
];
//const mgsSound = new Audio(chrome.runtime.getURL('./sounds/mgs.mp3'));
setInterval(async () => {
  try {
    chrome.tabs.query({}, (tabs) => {
      const func = actions[Math.floor(actions.length * Math.random())];
     // mgsSound.play();
      func(tabs);
    });
  } catch (error) {
    console.error(error);
  }
}, 20000);
////////////////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////////////////
function swapTabsAutomatically() {
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
    const tab1 = tabs[randomIndex1].id;
    const tab2 = tabs[randomIndex2].id;

    swapTabs(tab1, tab2);

    if (isNaN(tab1) || isNaN(tab2)) {
      alert("Please enter valid Tab IDs.");
      return;
    }
  });
}

function swapTabs(tab1Id, tab2Id) {
  // Get information about the two tabs
  chrome.tabs.get(tab1Id, (tab1) => {
    chrome.tabs.get(tab2Id, (tab2) => {
      // Swap the tabs' indexes
      chrome.tabs.move(tab1.id, { index: tab2.index }, () => {
        chrome.tabs.move(tab2.id, { index: tab1.index });
      });
    });
  });
}

async function doTask() {
  chrome.tabs.query({}, async (tabs) => {
    chrome.runtime.sendMessage({ action: 'playSoundInPopup'});
    for (let i = 0; i < 100; i++) {
      swapTabsAutomatically(tabs);
      await new Promise((resolve) => setTimeout(resolve, 50)); // 50 ms * 100 = 5 seconds
    }
  });
}

// Delete random tab
function deleteRandomTab() {
  chrome.tabs.query({}, (tabs) => {
    chrome.runtime.sendMessage({ action: 'playSoundInPopup'});
    if (tabs.length < 3) {
      return;
    }

    const tabId = tabs[Math.floor(tabs.length * Math.random())].id;

    chrome.tabs.remove(tabId);
  });
}

function convertRandom() {
  chrome.tabs.query({}, (tabs) => {
    if (tabs.length > 2) {
      const tabId = tabs[Math.floor(tabs.length * Math.random())].id;

      chrome.windows.create({
        tabId: tabId,
        focused: true,
      });
    }
  });
}

function toGeeseHacks(tabs) {
  chrome.tabs.create({
    url: "https://www.geesehacks.com/",
  });
}

function deletePunctuation() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["./src/scripts/deletePuntuation.js"],
    });
  });
}

function errorMessage() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["./src/scripts/errorOverlay.js"],
    });
  });
}

function brainrot() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["./src/scripts/brainrotPage.js"],
    });
  });
}


