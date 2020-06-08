function toggleMainNavVisibility() {
  const mainNav = document.getElementById("mainNav");
  const body = document.querySelector(".body");
  if (mainNav && mainNav.classList.contains("hidden")) {
    mainNav.classList.remove("hidden");
    body.classList.add("body_not-scroll");
  } else {
    mainNav.classList.add("hidden");
    body.classList.remove("body_not-scroll");
  }
}

document.getElementById("burgerButton").addEventListener("click", () => {
  toggleMainNavVisibility();
});

document.getElementById("close").addEventListener("click", () => {
  toggleMainNavVisibility();
});
