const rowLights = document.querySelector("div.row-lights");
const defaultColors = [
  "#ff0000",
  "#aabbcc",
  "#eeffaa",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
  "#888888",
];

for (i = 0; i <= 6; i++) {
  let lightDiv = document.createElement("div");
  let color = defaultColors[i];
  lightDiv.style.backgroundColor = color;
  lightDiv.className = "light";
  lightDiv.innerHTML = `<input type="color" id="light${
    i + 1
  }" value="${color}" />`;
  rowLights.appendChild(lightDiv);
}

colorInputs = document.querySelectorAll("input[type='color']");
console.log(colorInputs);
colorInputs.forEach(colorInput => {
  const lightDiv = colorInput.parentNode;

  // input color changes div background color
  colorInput.addEventListener("change", (elem) => {
    lightDiv.style.backgroundColor = elem.target.value;
  });

  // div click activates input
  lightDiv.addEventListener("click", () => {
    colorInput.click();
  })
})
