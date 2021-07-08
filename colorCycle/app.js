const inputs = document.getElementsByTagName("input");

inputs.forEach(input => {
  input.addEventListener("change", (elem) => {
    console.log(elem.value);
  })
})
