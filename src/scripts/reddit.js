(async () => {
  if (!Document.misinformation) {
    ////////////////////////////////////////////////////////////////////////////
    // Defining Functions Start
    ////////////////////////////////////////////////////////////////////////////
    const modifyPost = async (postBody, personas) => {
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
        const response = await Window.postAPI(requestData);
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

    const runMisinformation = (personas) => {
      console.log("Finding Posts...");
      const postBodies = document.querySelectorAll(
        "[id*='post-rtjson-content']",
      );
      postBodies.forEach(async (postBody) => modifyPost(postBody, personas));
      console.log("Spreading misinformation done");
    };
    ////////////////////////////////////////////////////////////////////////////
    // Defining Functions End
    ////////////////////////////////////////////////////////////////////////////

    const config = Window.getConfig();
    const personas = config["personas"];
    await runMisinformation(personas);
    Document.misinformation = true;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(async (mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.id && node.id.includes("post-rtjson-content")) {
                modifyPost(node, personas);
              }

              // Also check for any other child nodes that might match the pattern
              const postBodies = Array.from(
                node.querySelectorAll("[id*='post-rtjson-content']"),
              );
              postBodies.forEach((postBody) => modifyPost(postBody, personas));
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
