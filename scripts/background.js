console.log("OK");

////////////////////////////////////////////////////////////////////////////////
// Listeners
////////////////////////////////////////////////////////////////////////////////
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      active: true,
      url: "https://www.bing.com/",
    });
  } else if (details.reason === "update") {
    chrome.tabs.create({
      active: true,
      url: "https://www.bing.com/",
    });
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInf, tab) => {
  console.log(tab.url);
  if (tab.url === "chrome://newtab/") {
    chrome.tabs.update(tabId, { url: "http://yahoo.com" });
  }
});
