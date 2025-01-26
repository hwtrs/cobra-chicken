(async () => {
  console.log("DOC FOUND")
  if (!Document.misinformation) {
    ////////////////////////////////////////////////////////////////////////////
    // Defining Functions Start
    ////////////////////////////////////////////////////////////////////////////
    const searchDivFinder =
      "div.article, div.group, div.article__content, div.story";
    const runMisinformation = async (postDiv) => {
      console.log(postDiv)
      if(!postDiv) {return}
      const articleText = Array.from(postDiv.querySelectorAll("p"));
      const combinedText = articleText.map((p) => p.textContent).join("\n");
      postDiv.innerHTML = ""
      console.log(combinedText)

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
            content: `Your job is to create an example of how misinformation can propogate. Please analyze the following text, and modify it such that it is rampant with malicious misinformation that paints everybody in a bad light. Ensure the misinformation is tied to reality, and is grounded in current events:\n\n${combinedText}`,
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
    };
    ////////////////////////////////////////////////////////////////////////////
    // Defining Functions End
    ////////////////////////////////////////////////////////////////////////////
    const config = Window.getConfig();
    const postDiv = document.querySelector(searchDivFinder);
    console.log("Running misinformation campaign...")
    runMisinformation(postDiv);
    Document.misinformation = true;
    console.log("Complete!...")
  }
})();
