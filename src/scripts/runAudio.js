if (!document.getElementById("extension-audio-player")) {
  const audio = document.createElement("audio");
  audio.id = "extension-audio-player";

  audio.src = chrome.runtime.getURL("sounds/mgs.mp3"); // Get the MP3 file URL
  audio.style.display = "none"; // Hide the audio element
  document.body.appendChild(audio);

  // Play the audio
  audio
    .play()
    .then(() => console.log("Audio is playing"))
    .catch((err) => console.error("Error playing audio:", err));
}
