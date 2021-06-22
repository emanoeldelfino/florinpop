const topRightBorder = document.querySelector("input#top-right");
const downRightBorder = document.querySelector("input#down-right");
const downLeftBorder = document.querySelector("input#down-left");
const topLeftBorder = document.querySelector("input#top-left");
const previewer = document.querySelector("div#previewer");
const submitButton = document.querySelector("button#submit");
const copyButton = document.querySelector("span#copy-icon");
const tooltipCopy = document.querySelector("span#tooltip-copy");

const style = getComputedStyle(previewer);

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
};

copyButton.addEventListener("click", () => {
  /* Get the CSS of border-radius */
  const borderRadiusCSS = style.borderRadius;
  copyToClipboard(`
    border-radius: ${borderRadiusCSS};`);

  console.log(tooltipCopy.style.display);
  tooltipCopy.style.display = "block";

  setTimeout(() => {
    tooltipCopy.style.display = "none";
  }, 3000);
});

submitButton.addEventListener("click", () => {
  const borders = [
    topRightBorder,
    downRightBorder,
    downLeftBorder,
    topLeftBorder,
  ];
  const bordersValue = borders.map((elem) => elem.value);

  const cssValue = bordersValue.join(" ");
  previewer.style.borderRadius = cssValue;
});
