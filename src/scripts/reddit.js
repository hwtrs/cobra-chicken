(async () => {
  if (!Document.misinformation) {
    console.log("Finding Posts...");
    const config = Window.getConfig()
    const postBodies = document.querySelectorAll("[id*='post-rtjson-content']");

    const personas = config['personas']

    const modifyPost = async (postBody) => {
      // Extract all paragraph elements within the post body
      const paragraphs = Array.from(postBody.querySelectorAll("p"));
      const combinedText = paragraphs.map((p) => p.textContent).join("\n");

      // Choose a random persona
      const persona = personas[Math.floor(Math.random() * personas.length)];

      // Define the request payload
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
            content: `Your job is to imitate the following personality: ${persona}. You will be provided a piece of text below to modify to make it ${persona}:\n\n${combinedText}`,
          },
        ],
      };
      postBody.innerHTML = "";
      try {
        // Make the API call
        const response = await Window.postAPI(requestData)
        if (!response.ok) {
          throw new Error("API call failed");
        }

        const result = await response.json();
        const modifiedText = result.choices[0].message.content;

        // Update the DOM with modified text
        const fragment = document.createDocumentFragment();
        modifiedText.split("\n").forEach((line) => {
          const newParagraph = document.createElement("p");
          newParagraph.textContent = line;
          fragment.appendChild(newParagraph);
        });
        postBody.appendChild(fragment);
      } catch (error) {
        console.error("Error modifying post:", error);
      }
    };
    postBodies.forEach(async (postBody) => modifyPost(postBody));
    console.log("Spreading misinformation done");
    Document.misinformation = true;
  }
})();
