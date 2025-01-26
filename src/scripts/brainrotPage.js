/* eslint-disable prefer-const */
(async () => {
  if (!Window.brainrot) {
    Window.getConfig();
    let array = Array.from([
      ...document.querySelectorAll("p"),
      ...document.querySelectorAll("h1"),
      ...document.querySelectorAll("h2"),
      ...document.querySelectorAll("h3"),
    ]);
    console.log("Running brainrot campaign...");

    array.forEach(async (doc) => {
      let text = doc.textContent;
      if (!text || text.length < 4) {
        return;
      }
      let requestData = {
        model: "gpt-4o-mini",
        temperature: 1.2,
        messages: [
          {
            role: "system",
            content:
              "You are a text editting bot designed to translate any user input into Gen Z brainrot slang. Do not explain yourself, provide just the response without any extra text. Brianrot slang includes the following terms:" +
              "Brain rot may include the following language: skibidi gyatt rizz only in ohio duke dennis did you pray today livvy dunne rizzing up baby gronk sussy imposter pibby glitch in real life sigma alpha omega male grindset andrew tate goon cave freddy fazbear colleen ballinger smurf cat vs strawberry elephant blud dawg shmlawg ishowspeed a whole bunch of turbulence ambatukam bro really thinks he's carti literally hitting the griddy the ocky way kai cenat fanum tax garten of banban no edging in class not the mosquito again bussing axel in harlem whopper whopper whopper whopper 1 2 buckle my shoe goofy ahh aiden ross sin city monday left me broken quirked up white boy busting it down sexual style goated with the sauce john pork grimace shake kiki do you love me huggy wuggy nathaniel b lightskin stare biggest bird omar the referee amogus uncanny wholesome reddit chungus keanu reeves pizza tower zesty poggers kumalala savesta quandale dingle glizzy rose toy ankha zone thug shaker morbin time dj khaled sisyphus oceangate shadow wizard money gang ayo the pizza here PLUH nair butthole waxing t-pose ugandan knuckles family guy funny moments compilation with subway surfers gameplay at the bottom nickeh30 ratio uwu delulu opium bird cg5 mewing fortnite battle pass all my fellas gta 6 backrooms gigachad based cringe kino redpilled no nut november pokénut november foot fetish F in the chat i love lean looksmaxxing gassy social credit bing chilling xbox live mrbeast kid named finger better caul saul i am a surgeon hit or miss i guess they never miss huh i like ya cut g ice spice gooning fr we go gym kevin james josh hutcherson coffin of andy and leyley metal pipe falling.",
          },
          {
            role: "user",
            content: `Please convert the following without exceeding ${text.length} characters: ${text}`,
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
        doc.textContent = modifiedText;
      } catch (error) {
        console.error(error);
      }
    });
    console.log("Complete!");
    Window.brainrot = true;
  }
})();
