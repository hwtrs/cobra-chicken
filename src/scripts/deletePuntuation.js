(async () => {
  if (!Document.puntuation) {
    const texts = document.querySelectorAll("p");
    console.log("Running dis-punctuation & decaps campaign...");
    texts.forEach(async (pHtml) => {
      let content = pHtml.textContent.toLowerCase();
      const puntuation = [".", ",", "!", "?", "-", "_", ":", ";", "/", "—", "'", "\""];
      puntuation.forEach((punc) => {
        content = content.replaceAll(punc, "");
      });
      pHtml.textContent = content;
    });
    Document.puntuation = true;
    console.log("Complete!...");
  }
})();
