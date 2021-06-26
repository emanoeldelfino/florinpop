const playPauseButton = document.querySelector("i#play-pause");
const reloadButton = document.querySelector("i#reload");
const sliderElem = document.querySelector("input#slider");

const colorInputs = document.querySelectorAll("input[type='color']");
let lightsDefault = Array.from(document.querySelectorAll("label div.light"));
let lights = [...lightsDefault];

function pauseLights() {
  if (playPauseButton.className.includes("pause")) {
    lights = lights.slice(-1).concat(lights.slice(0, -1));

    // Set a fake timeout to get the highest timeout id
    let highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    playPauseButton.className = playPauseButton.className.replace("pause", "play");
  }
}

function blinkLights() {
  if (playPauseButton.className.includes("play")) {
    playPauseButton.className = playPauseButton.className.replace("play", "pause");
    setIntervalFirstNoDelay(() => {
      lights.forEach((lightElem, index) => {
        setTimeout(() => {
          let color =
            lightElem.style.backgroundColor === ""
              ? getComputedStyle(lightElem)["background-color"]
              : lightElem.style.backgroundColor;
  
          // turn on light
          lightElem.setAttribute(
            "style",
            `background-color: ${color}; filter:brightness(100%); box-shadow:0 0 50px ${color};`
          );
  
          // turn off light
          setTimeout(() => {
            lightElem.setAttribute("style", `background-color: ${color};`);
          }, intensity);
          lights = lights.slice(1).concat(lights[0]);
        }, intensity * index);
      });
    }, 7 * intensity)
  }
}

function resetLights() {
  lights.forEach((lightElem) => {
    lightElem.setAttribute(
      "style",
      `background-color: ${lightElem.style.backgroundColor};`
    );
  });
  lights = [...lightsDefault];
}

reloadButton.addEventListener("click", () => {
  pauseLights();
  resetLights();
});

colorInputs.forEach((colorInput) => {
  colorInput.addEventListener("change", (elem) => {
    const prev = colorInput.previousElementSibling;
    prev.style.backgroundColor = elem.target.value;
  });
});

intensity = sliderElem.value;
sliderElem.addEventListener("change", () => {
  if (playPauseButton.className.includes("pause")) {
    pauseLights();
    intensity = sliderElem.value;
    console.log(intensity);
    blinkLights();
  } else {
    intensity = sliderElem.value;
  }
});

function toggleLights() {
  const [currentClass, replaceClass] = playPauseButton.className.includes(
    "play"
  )
    ? ["play", "pause"]
    : ["pause", "play"];

  if (currentClass === "play") {
    blinkLights();
  } else {
    pauseLights();
  }

  playPauseButton.className = playPauseButton.className.replace(
    currentClass,
    replaceClass
  );
}

playPauseButton.addEventListener("click", toggleLights);

function setIntervalFirstNoDelay(callback, delay) {
  callback();
  setInterval(callback, delay);
}
