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

function postAPI(requestData) {
  const config = getConfig();
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const apiHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config["api_key"]}`,
  };
  return fetch(apiUrl, {
    method: "POST",
    headers: apiHeaders,
    body: JSON.stringify(requestData),
  });
}

Window.getConfig = getConfig;
Window.postAPI = postAPI;
if (!Window.blur) {
  Window.blur = 0;
}

(async () => {
  setInterval(() => {
    Window.blur += 0.1;
    document.body.style.filter = `blur(${Window.blur}px)`;
  }, 30000); // Every half minute
})();
