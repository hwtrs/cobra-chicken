
function getConfig() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", chrome.runtime.getURL("config.json"), false); // 'false' makes it synchronous
  xhr.send();

  if (xhr.status === 200) {
    try {
      return JSON.parse(xhr.responseText);
    } catch (e) {
      console.error("Failed to parse config.json:", e);
      return null;
    }
  } else {
    console.error("Failed to load config.json. Status:", xhr.status);
    return null;
  }
}

Window.getConfig = getConfig