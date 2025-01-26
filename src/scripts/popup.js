document.getElementById("startButton").addEventListener("click", () => {
    console.log("HERE");
    // Send a message to the background script to start the task
    chrome.runtime.sendMessage(
      { action: "doTask"},
      (response) => {
        console.log(response.status);
      }
    );
  });
  
  document.getElementById("stopButton").addEventListener("click", () => {
    // Send a message to the background script to stop the task
    chrome.runtime.sendMessage({ action: "stopTask" }, (response) => {
      console.log(response.status);
    })});