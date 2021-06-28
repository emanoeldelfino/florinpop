const buttonsElems = document.querySelectorAll("div.button");
const resultSpan = document.querySelector("div#result span");

const re = /-?\d*\.?\d+|[\+-÷x\^]/g;
let result = 0;

buttonsElems.forEach((buttonElem) => {
  buttonElem.addEventListener("click", () => {
    // move the scroll to the right side
    resultSpan.parentElement.scrollLeft = resultSpan.parentElement.scrollWidth;

    resultSpan.innerHTML =
      resultSpan.innerHTML !== "ERR" ? resultSpan.innerHTML : "";
    let button = buttonElem.textContent;
    let numsOperations = resultSpan.textContent.match(re) || [];
    numsOperations.forEach((numOperation, index) => {
      let current = numOperation;
      let next = numsOperations[index + 1];
      if (numsOperations.length - 1 !== index) {
        if (isNumber(current) && isNumber(next)) {
          numsOperations.splice(index + 1, 0, "+");
        }
      }
    });
    let lastChar = resultSpan.textContent.slice(-1);
    if (isNumber(button)) {
      if (resultSpan.innerHTML === "0") {
        resultSpan.innerHTML = button;
      } else {
        resultSpan.innerHTML += button;
      }
    } else if (~"+-÷x^".indexOf(button)) {
      if (lastChar && !~"+-÷x^".indexOf(lastChar)) {
        resultSpan.innerHTML += button;
      }
    } else if (button === "C") {
      resultSpan.innerHTML = resultSpan.textContent.slice(0, -1);
    } else if (button === "AC") {
      resultSpan.innerHTML = "0";
    } else if (button === "=") {
      replace(numsOperations, ["÷", "x", "^"], ["/", "*", "**"]);
    
      if (lastChar && !~"+-÷x^".indexOf(lastChar) && numsOperations.length > 1) {
        ["**", "/", "*", "+", "-"].forEach((operation) => {
          while (~numsOperations.indexOf(operation)) {
            let indexOperation = numsOperations.indexOf(operation);
            let num1Index = indexOperation - 1;
            let num2Index = indexOperation + 1;
            let num1 = Number(numsOperations[num1Index]);
            let num2 = Number(numsOperations[num2Index]);
    
            if (operation === "**") {
              result = num1 ** num2;
            } else if (operation === "/") {
              if (num2 === 0) {
                resultSpan.innerHTML = "ERR";
                window.alert("Invalid operation: Division by zero.");
                break;
              }
              result = num1 / num2;
            } else if (operation === "*") {
              result = num1 * num2;
            } else if (operation === "+") {
              result = num1 + num2;
            } else if (operation === "-") {
              result = num1 - num2;
            }
            numsOperations.splice(num1Index, num2Index + 1, result);
          }
        });
        decimalPlacesQt =
          decimalPlaces(result / 1) >= 6 ? 6 : decimalPlaces(result / 1);
        resultSpan.innerHTML =
          resultSpan.innerHTML !== "ERR"
            ? Number(Number(result).toFixed(decimalPlacesQt))
            : "ERR";
      }      
    } else if (button === ".") {
      if (
        numsOperations.length === 0 ||
        !~String(numsOperations[numsOperations.length - 1]).indexOf(".")
      ) {
        resultSpan.innerHTML += button;
      }
    } else if (button === "+/-") {
      let lastValue = numsOperations[numsOperations.length - 1];
      if (isNumber(lastValue)) {
        let beforeLastValue = numsOperations[numsOperations.length - 2];
        let end = -String(Math.abs(lastValue)).length;
        let start, replaceSign;
        if (beforeLastValue === "+") {
          start = -String(Math.abs(lastValue)).length - 1;
          replaceSign = isPositive(lastValue) ? "-" : "+";
        } else if (
          beforeLastValue === undefined ||
          numsOperations.length === 0
        ) {
          start = -String(Math.abs(lastValue)).length - 1;
          replaceSign = isPositive(lastValue) ? "-" : "";
        } else if (beforeLastValue !== "+") {
          start = -String(Math.abs(lastValue)).length;
          replaceSign = "-";

          if (!isPositive(lastValue)) {
            start -= 1;
            replaceSign = "";
          }
        } else {
          start = -String(Math.abs(lastValue)).length;
          replaceSign = isPositive(lastValue) ? "-" : "";
        }
        resultSpan.textContent = spliceStr(
          resultSpan.textContent,
          start,
          end,
          replaceSign
        );
      }
    }
  });
});

function replace(arr, items, newItems) {
  if (items.length === newItems.length && arr) {
    items.forEach((item, index) => {
      while (~arr.indexOf(item)) {
        arr[arr.indexOf(item)] = newItems[index];
      }
    });
  }
}

function isFloat(num) {
  return num % 1 !== 0;
}

function decimalPlaces(num) {
  if (isFloat(num)) {
    return String(num).split(".")[1].length;
  } else {
    return 0;
  }
}

function spliceStr(str, start, end, add) {
  return str.slice(0, start) + add + str.slice(end);
}

function isNumber(num) {
  return !isNaN(num);
}

function isPositive(num) {
  return Math.abs(Number(num)) === Number(num);
}
