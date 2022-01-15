const gitHubImg = document.querySelector("#github");
const inputField = document.querySelector("#binary");
const inputText = document.querySelector("#input-text");
const submitButton = document.querySelector("button#submit");
const resultSpan = document.querySelector("#result > #converted-number");
const resultText = document.querySelector("#result-text");
const tooltip = document.querySelector(".tooltip");
console.log(tooltip);

function bin2Dec(binary) {
  if ([..."23456789"].some((num) => binary.includes(num))) {
    throw new Error(
      "Invalid input. Binary numbers are composed only by 0s and 1s."
    );
  } else {
    const bits = Math.abs(Number(binary));

    let total = 0;
    for (let bit of String(bits)) {
      total *= 2;
      total += Number(bit);
    }

    return bits === Number(binary) ? total : -total;
  }
}

function evts(elem, properties, pair, change) {
  const elemToChange = change || elem;
  if (properties.length === 1) {
    for (let [event, value] of Object.entries(pair)) {
      elem.addEventListener(event, () => {
        elemToChange[properties[0]] = value;
      });
    }
  } else if (properties.length > 1) {
    let elemProperty = elemToChange;
    for (let i = 0; i < properties.length - 1; i++) {
      elemProperty = elemProperty[properties[i]];
    }

    for (let [event, value] of Object.entries(pair)) {
      elem.addEventListener(event, () => {
        elemProperty[properties[properties.length - 1]] = value;
      });
    }
  }
}

evts(gitHubImg, ["src"], {
  mouseover: "./images/GitHub-Mark-Green-32px.png",
  mouseout: "./images/GitHub-Mark-Light-32px.png",
});

evts(
  inputField,
  ["style", "color"],
  { focus: "green", blur: "white" },
  inputText
);

let decimalNum = 0;

submitButton.addEventListener("click", () => {
  const binaryNum = inputField.value;

  try {
    decimalNum = bin2Dec(binaryNum);
    resultSpan.innerText = decimalNum;
    resultSpan.style.color = "green";
  } catch (err) {
    window.alert(err.message);
    resultSpan.innerText = "Invalid";
    resultSpan.style.color = "red";
  }
});

resultText.addEventListener("click", () => {
  copyToClipboard(decimalNum);
});

const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  // tooltip
  tooltip.style.display = "inline-block";

  window.setTimeout(() => {
    tooltip.style.display = "none";
  }, 3000);
};
