const summaryItems = document.querySelector("main#container ul#summary");
const articleInformation = document.querySelector("article#information");
const articleInformationUl = document.querySelector(
  "article#information div ul"
);
const spanName = document.querySelector("span#name");

for (let person of people) {
  const newLi = document.createElement("li");
  newLi.textContent = person.name;
  summaryItems.appendChild(newLi);
  newLi.addEventListener("click", () => {
    for (let i = 0; i < summaryItems.children.length; i++) {
      summaryItems.children[i].style.cssText = "";
    }

    newLi.style.cssText = "text-shadow: -3px -3px 10px gray, -2px -2px 10px gray, 0px 0px 10px gray, 1px 1px 10px gray, 2px 2px 10px gray, 3px 3px 10px gray;";
    articleInformationUl.innerHTML = "";
    for (let info in person) {
      if (!["name", "imageURL"].includes(info)) {
        const newLiInfo = document.createElement("li");
        newLiInfo.textContent = `${info}: ${person[info]}`;
        articleInformationUl.appendChild(newLiInfo);
      } else if (info === "name") {
        spanName.textContent = person[info];
      } else if (info === "imageURL") {
        if (articleInformation.lastChild.tagName === "IMG") {
          articleInformation.removeChild(articleInformation.lastChild);
        }
        const newImg = document.createElement("img");
        newImg.src = person[info];
        newImg.alt = `${person.name} image`;
        articleInformation.appendChild(newImg);
      } else {
        console.log("Error. Invalid property for person.");
      }
    }
  });
}
