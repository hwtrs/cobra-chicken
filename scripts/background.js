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
  } else if (tab.url.includes("geesehacks")) {
    chrome.tabs.update(tabId, { url: "https://www.amazon.ca/Online-Cushion-Pillow-150x50cm-Pillowcase/dp/B0CFKNP7NV/ref=sr_1_5?crid=VFBTSMP9NYMN&dib=eyJ2IjoiMSJ9.kfAR5m-hY_-7dzDwZQLxqoVE_mDUp2Ea19OdT46qod4fiu6Dbp5EzqoJMIngAdN0e_jXiL3JRRV--yBO4Clzz0nPpeljW_5ywiUcyCvVMM7Th22LPUmsIi_N9gUXGV-nfskFtyakmRf10boS4agoB2i-8UghoTVA7VpWVYK3_OMtwvoscYachcLxLEqdLfBTGxQQpU00ncmmZpXYCsUAG3T_aB_4MR1uPq-A7i2VZfDeRno1atLGp88VlxDm2iAUQv0VJxST1W4b4hKE2SIMthcQPZpkK90mGVTMmb8ZXHouaRXJzlcqepfmcibSvQPKbP7BZ6iHQLZsS3GOAPW6PjBxnqogn-jcya3KbG29Yil2PSGHkHWXG9FAhCBrGeFxoQOWSRL20B6oVKwvxiW96pttwUiUEim5bVHBjoXJ21MhINdULCRgu5ZjG1M8a4Bi.cKmtHy0-dPcbeOOBhHBNeZJ72z_N4V5JHJ7Xr5sjEDw&dib_tag=se&keywords=body%2Bpillow%2Banime&qid=1737826793&sprefix=body%2Bpillow%2Caps%2C82&sr=8-5&th=1"});

  }
});
