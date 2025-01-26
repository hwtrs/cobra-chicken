(async () => {
  console.log("DOC FOUND");
  if (!Document.misinformation) {
    ////////////////////////////////////////////////////////////////////////////
    // Defining Functions Start
    ////////////////////////////////////////////////////////////////////////////
    const searchDivFinder =
      "div.article, div.group, div.article__content, div.story";
    const runMisinformation = async (divArr) => {
      console.log(divArr);
      let combinedText;
      const arr = Array.from(divArr);
      for (let i = 0; i < arr.length; ++i) {
        const postDiv = arr[i];
        const articleText = Array.from(postDiv.querySelectorAll("p"));
        combinedText = articleText.map((p) => p.textContent).join("\n");
        if (!combinedText) {
          continue;
        }
        postDiv.innerHTML = "";
        console.log(combinedText);

        const requestData = {
          model: "gpt-4o-mini",
          temperature: 1.2,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant. Do not explain yourself, provide just the response without any extra text.",
            },
            {
              role: "user",
              content: `Your job is to create an example of how misinformation can propogate. Please analyze the following text, and modify it such that it is rampant with malicious misinformation. Ensure the misinformation is tied to reality, and is grounded in current events:\n\n${combinedText}`,
            },
          ],
        };
        try {
          // Make the API call
          const response = await Window.postAPI(requestData);
          if (!response.ok) {
            throw new Error("API call failed");
          }

          const result = await response.json();
          const modifiedText = result.choices[0].message.content;

          const fragment = document.createDocumentFragment();
          modifiedText.split("\n").forEach((line) => {
            const newParagraph = document.createElement("p");
            newParagraph.textContent = line;
            fragment.appendChild(newParagraph);
          });
          postDiv.appendChild(fragment);
        } catch (error) {
          console.error("Error modifying post:", error);
        }
      }
    };
    ////////////////////////////////////////////////////////////////////////////
    // Defining Functions End
    ////////////////////////////////////////////////////////////////////////////
    // eslint-disable-next-line no-unused-vars
    const config = Window.getConfig(); // Must load, ensures Window.postAPI() is loaded for some reason??
    const postDiv = document.querySelectorAll(searchDivFinder);
    console.log("Running misinformation campaign...");
    runMisinformation(postDiv);
    Document.misinformation = true;
    console.log("Complete!...");
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(async (mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Also check for any other child nodes that might match the pattern
              const postBodies = Array.from(
                node.querySelectorAll(searchDivFinder),
              );
              postBodies.forEach((postBody) => runMisinformation(postBody));
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["id"],
    });
  }
})();
