
if (!Document.misinformation) {
  console.log("Finding Posts...");
  // Select the post body by its ID
  // Select all post bodies on the page
  const postBodies = document.querySelectorAll("[id*='post-rtjson-content']");

  // Loop through each post body to modify and combine the text
  postBodies.forEach((postBody) => {
    // Extract all paragraph elements within the post body
    const paragraphs = postBody.querySelectorAll("p");

    // Combine text from all paragraphs into a single string
    let combinedText = "";
    paragraphs.forEach((p) => {
      combinedText += p.innerText + "\n";
    });

    //
    // AI Call
    //
    const apiUrl = "https://api.openai.com/v1/chat/completions"; // OpenAI API endpoint

    // Define the request payload
    const requestData = {
      model: "gpt-4o-mini", // Use the gpt-4o-mini model
      messages: [
        {
          "role": "system",
          "content": "You are a helpful assistant designed to rewrite text in a way a user requests. Do not include anything except your result."
        },
        {
          "role": "user",
          "content": "Please rewrite the following text to slightly modify facts or information to make the text contain misinformation or sound crazy." +
          + combinedText
        }
      ]
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `,
      },
      body: JSON.stringify(requestData),
    }).then((response) => {
      if(!response.ok) {
        throw new Error("BROKEY ):")
      }
      return response.json();
    }).then(result => {
      postBody.innerHTML = '';
      console.log(result.choices[0].message.content)
      result.choices[0].message.content.split("\n").forEach((value) => {
        const newParagraph = document.createElement("p");
        newParagraph.innerHTML = value;
        postBody.appendChild(newParagraph);
      });
    })
    .catch(error => {});
  });

  Document.misinformation = true;
}
