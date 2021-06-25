const playPauseButton = document.querySelector("i#play-pause-button");

const sliderElem = document.querySelector("input#slider");

intensity = sliderElem.value;
sliderElem.addEventListener("change", () => {
  intensity = sliderElem.value;
});

let lights = [1, 2, 3, 4, 5, 6, 7];


playPauseButton.addEventListener("click", (evt) => {
  const [currentClass, replaceClass] = evt.target.className.includes("play")
    ? ["play", "pause"]
    : ["pause", "play"];
  evt.target.className = evt.target.className.replace(
    currentClass,
    replaceClass
  );

  if (currentClass === "play") {
    console.log(lights);
    (function blinkLights() {
      lights.forEach((light, index) => {
        let lightElem = document.querySelector(`div#light${light}`);
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
            lights = lights.slice(1).concat(lights[0]);
          }, intensity);
        }, intensity * index);
      })
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
