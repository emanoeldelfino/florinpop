const playPauseButton = document.querySelector("i#play-pause-button");

const sliderElem = document.querySelector("input#slider");

intensity = sliderElem.value;
sliderElem.addEventListener("change", () => {
  intensity = sliderElem.value;
});

playPauseButton.addEventListener("click", (evt) => {
  const [currentClass, replaceClass] = evt.target.className.includes("play")
    ? ["play", "pause"]
    : ["pause", "play"];
  evt.target.className = evt.target.className.replace(
    currentClass,
    replaceClass
  );

  if (currentClass === "play") {
    (function blinkLights() {
      for (let i = 1; i <= 7; i++) {
        let lightElem = document.querySelector(`div#light${i}`);
        // 0 0 50px color
        setTimeout(() => {
          lightElem.setAttribute(
            "style",
            `filter:brightness(100%); box-shadow:0 0 50px ${
              getComputedStyle(lightElem)["background-color"]
            };`
          );
          setTimeout(() => {
            lightElem.setAttribute(
              "style",
              "filter:brightness(20%); box-shadow: none;"
            );
          }, intensity);
        }, intensity * i);
      }
      setTimeout(blinkLights, 7 * intensity);
    })();
  } else {
    // Set a fake timeout to get the highest timeout id
    let highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    for (let i = 1; i <= 7; i++) {
      let lightElem = document.querySelector(`div#light${i}`);
      lightElem.setAttribute("style", "filter:brightness(20%);");
    }
  }
});
