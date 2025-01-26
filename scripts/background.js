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
      "https://www.aol.com",
      "https://www.yahoo.com",
      "https://www.bing.com",
      "https://duckduckgo.com",
      "https://www.ask.com",
      "https://search.brave.com",
      "https://www.startpage.com"
    ];

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

// Define the word count threshold
const wordThreshold = 30; // Change to your desired word count threshold

// Function to count words in a text
function countWords(text) {
  return text.trim().split(/\s+/).length;
}

// Function to send the email by clicking the "Send" button
function sendEmail() {
  // Try to find the "Send" button in the Gmail compose window
  const sendButton = document.querySelector('div[aria-label="Send ‪(Ctrl-Enter)‬"]');
  
  if (sendButton) {
    sendButton.click();  // Automatically click the "Send" button
    console.log("Email sent automatically!");
  }
}

// Monitor the email body and trigger auto-send if threshold is reached
function monitorEmailBody() {
  // Ensure the compose window is loaded
  const emailBody = document.querySelector('[aria-label="Message Body"]');
  
  if (emailBody) {
    // Add an event listener to monitor input in the email body
    emailBody.addEventListener('input', function() {
      const wordCount = countWords(emailBody.innerText);
      console.log("Word Count: ", wordCount);

      // If word count exceeds the threshold, automatically send the email
      if (wordCount >= wordThreshold) {
        sendEmail(); // Trigger the auto-send function
      }
    });
  }
}

// Wait for the page to load and then start monitoring the email body
window.onload = monitorEmailBody;



function swapTabsAutomatically() {
  var tab1;
  var tab2;
  chrome.tabs.query({}, (tabs) => {
      if (tabs.length < 2) {
        console.log("Not en`ough tabs open to select two random ones.");
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
