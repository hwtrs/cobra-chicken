(async () => {
  if (!Document.misinformation) {
    ////////////////////////////////////////////////////////////////////////////
    // Defining Functions Start
    ////////////////////////////////////////////////////////////////////////////
    const searchDivSelector =".css-146c3p1.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-1udbk01.r-bcqeeo.r-1ttztb7.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-bnwqim"
    const searchSpanSelector = ".css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3";
    console.log("finished test test");
    const runMisinformation = async (postDiv) => {
      const postContent = postDiv.querySelector(searchSpanSelector)

      const persona = "hippie, peace-loving, lots of emojis";
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
              content: `Your job is to imitate the following personality: ${persona}. You will be provided a piece of text below to modify to make it ${persona}:\n\n${postContent.textContent}`,
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

          postContent.textContent = modifiedText;
        } catch (error) {
          console.error("Error modifying post:", error);
        }
    };
    ////////////////////////////////////////////////////////////////////////////
    // Defining Functions End
    ////////////////////////////////////////////////////////////////////////////
    const postBodies = document.querySelectorAll(searchDivSelector);
    postBodies.forEach(async (postBody) => runMisinformation(postBody))
    Document.misinformation = true;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(async (mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.id && node.id.includes(searchDivSelector)) {
                runMisinformation(node);
              }

              // Also check for any other child nodes that might match the pattern
              const postBodies = Array.from(
                node.querySelectorAll(searchDivSelector),
              );
              postBodies.forEach((postBody) =>
                runMisinformation(postBody),
              );
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
