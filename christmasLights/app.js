const playPauseButton = document.querySelector("i#play-pause");
const reloadButton = document.querySelector("i#reload");
const intensitySlider = document.querySelector("input#intensity-slider");
const intensityNum = document.querySelector("input#intensity-num");

const colorInputs = document.querySelectorAll("input[type='color']");
const lightDivs = document.querySelectorAll("div.light");
let lightsDefault = Array.from(lightDivs);
let lights = [...lightsDefault];
const defaultColors = ["red", "yellow", "green", "purple", "orange","blue", "cyan"];

intensity = intensitySlider.value;

intensitySlider.addEventListener("change", () => {
  if (playPauseButton.className.includes("pause")) {
    pauseLights();
    intensity = intensitySlider.value;
    blinkLights();
  } else {
    intensity = intensitySlider.value;
  }
  intensityNum.value = intensitySlider.value;
});

intensityNum.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (playPauseButton.className.includes("pause")) {
      pauseLights();
      intensity = intensityNum.value;
      blinkLights();
    } else {
      intensity = intensityNum.value;
    }
    intensitySlider.value = intensityNum.value;
  }
});

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
          colorIndex = Number(lightElem.className.slice(-1)) -1;
          let color =
            lightElem.style.backgroundColor === ""
              ? getComputedStyle(lightElem)["background-color"]
              : defaultColors[colorIndex];
          console.log(getComputedStyle(lightElem)["background-color"]);
  
          // turn on lights
          let lightElems = document.querySelectorAll(`.${lightElem.className.replace(" ", ".")}`);
          lightElems.forEach((light) => {
            light.setAttribute(
              "style",
              `background-color: ${color}; filter:brightness(100%); box-shadow:0 0 50px ${color};`
            );
          })

  
          // turn off light
          setTimeout(() => {
            lightElems.forEach((light) => {
              light.setAttribute("style", `background-color: ${color};`);
            })
          }, intensity);
          lights = lights.slice(1).concat(lights[0]);
        }, intensity * index);
      });
    }, 7 * intensity)
  }
}

function resetLights() {
  select.value = 1;
  updateNumColors();

  lights.forEach((lightElem, index) => {
    console.log(defaultColors[index])
    lightElem.setAttribute(
      "style",
      `background-color: ${defaultColors[index]};`
    );
  });
  lights = [...lightsDefault];
}

reloadButton.addEventListener("click", () => {
  pauseLights();
  resetLights();
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

colorInputs.forEach((colorInput) => {
  const lightDiv = colorInput.parentNode;

  // input color changes div background color
  colorInput.addEventListener("change", (elem) => {
    lightDiv.style.backgroundColor = elem.target.value;
  });

  // div click activates input
  lightDiv.addEventListener("click", () => {
    colorInput.click();
  })
});

const divLights = document.getElementById("lights");
const divRowLights = document.getElementById("lights").firstElementChild;
const cloneDivRowLights = divRowLights.cloneNode(true);
const select = document.querySelector("select#num-rows");

select.addEventListener("change", updateNumColors);

function updateNumColors() {
  divLights.innerHTML = "";
  for (i=1; i <= select.value; i++) {
    const clone = cloneDivRowLights.cloneNode(true);
    divLights.appendChild(clone);
  }
  colorInputsUpdate = document.querySelectorAll("input[type='color']");
  colorInputsUpdate.forEach((colorInput) => {
    const lightDiv = colorInput.parentNode;
  
    // input color changes div background color
    colorInput.addEventListener("change", (elem) => {
      lightDiv.style.backgroundColor = elem.target.value;
    });
  
    // div click activates input
    lightDiv.addEventListener("click", () => {
      colorInput.click();
    })
  });
}