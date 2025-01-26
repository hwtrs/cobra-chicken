document.getElementById("switchButton").addEventListener("click", () => {
    console.log("HERE");
    // Send a message to the background script to start the task
    chrome.runtime.sendMessage(
      { action: "debugSwitch"},
      (response) => {
        console.log(response.status);
      }
    );
  });
  
  document.getElementById("delButton").addEventListener("click", () => {
    // Send a message to the background script to stop the task
    chrome.runtime.sendMessage({ action: "debugDelete" }, (response) => {
      console.log(response.status);
    })});

  document.getElementById("conButton").addEventListener("click", () => {
    // Send a message to the background script to stop the task
    chrome.runtime.sendMessage({ action: "debugConvert" }, (response) => {
      console.log(response.status);
    })});
  document.getElementById("geeseButton").addEventListener("click", () => {
      // Send a message to the background script to stop the task
      chrome.runtime.sendMessage({ action: "debugGeese" }, (response) => {
        console.log(response.status);
      })});
  document.getElementById("puncButton").addEventListener("click", () => {
    // Send a message to the background script to stop the task
    chrome.runtime.sendMessage({ action: "debugPunctuation" }, (response) => {
      console.log(response.status);
    })});
  document.getElementById("errorButton").addEventListener("click", () => {
    // Send a message to the background script to stop the task
    chrome.runtime.sendMessage({ action: "debugError" }, (response) => {
      console.log(response.status);
    })});
  document.getElementById("brainrotButton").addEventListener("click", () => {
    // Send a message to the background script to stop the task
    chrome.runtime.sendMessage({ action: "debugBrainrot" }, (response) => {
      console.log(response.status);
    })});



  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'playSoundInPopup') {
      const mgsSound = new Audio(chrome.runtime.getURL('sounds/mgs.mp3'));
      mgsSound.play();
    }
  });