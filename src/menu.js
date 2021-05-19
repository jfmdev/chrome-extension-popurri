document.addEventListener("DOMContentLoaded", async function () {
  const titles = document.getElementsByTagName('h1');
  if(titles.length > 0) {
    titles[0].innerHTML = "Menu";
  }
});
