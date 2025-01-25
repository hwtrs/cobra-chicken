console.log("OK")


////////////////////////////////////////////////////////////////////////////////
// Listeners
////////////////////////////////////////////////////////////////////////////////
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
      chrome.tabs.create({
          active: true,
          url: "https://www.bing.com/"
      });
  } else if (details.reason === "update") {
    chrome.tabs.create({
      active: true,
      url: "https://www.bing.com/"
  });
  }
});