const hexChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

function getRandom(num=1, arr) {
    if (num === 1) {
        return arr[Math.floor(Math.random() * arr.length)];
    } else if (num <= 0) {
        return null;
    } else {
        let elems = [];
        for (i=0; i < num; i++) {
            elems.push(arr[Math.floor(Math.random() * arr.length)])
        }
        return elems;
    }
}

function getRandomHexColor() {
  return getRandom(6, hexChars) 
}

const rowLights = document.querySelector("div.row-lights");
const defaultColors = [];

for (i = 0; i <= 6; i++) {
  defaultColors.push(getRandomHexColor());
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
