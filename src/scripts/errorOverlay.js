/* eslint-disable prefer-const */
let overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
overlay.style.display = "flex";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "center";
overlay.style.zIndex = "1000";

let errorBox = document.createElement("div");
errorBox.style.backgroundColor = "white";
errorBox.style.padding = "20px";
errorBox.style.borderRadius = "8px";
errorBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
errorBox.style.maxWidth = "400px";
errorBox.style.textAlign = "center";

let errorMessage = document.createElement("p");
errorMessage.innerText = "An error has occurred!";
errorMessage.style.color = "#000000";
errorMessage.style.marginBottom = "20px";
errorMessage.style.fontSize = "16px";

let okButton = document.createElement("button");
okButton.innerText = "Ok!";
okButton.style.padding = "10px 20px";
okButton.style.fontSize = "16px";
okButton.style.backgroundColor = "#007bff";
okButton.style.color = "white";
okButton.style.border = "none";
okButton.style.borderRadius = "4px";
okButton.style.cursor = "pointer";
okButton.style.textAlign = "center";

okButton.addEventListener("click", () => {
  document.body.removeChild(overlay);
  document.body.style.filter = "blur(1px)"
});

errorBox.appendChild(errorMessage);
errorBox.appendChild(okButton);
overlay.appendChild(errorBox);
document.body.appendChild(overlay);
