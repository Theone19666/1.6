const moreButtonHideSelector = "more-button_hide";

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

function toggleShowButtonAndBrands({ show = true, repairButton = {} } = {}) {
  if (show) {
    repairButton.textContent = "Показать всё";
    repairButton.classList.remove(moreButtonHideSelector);
    // document.querySelector(".brands").classList.remove("brands_show-all-brand");
    repairButton.previousElementSibling
      .querySelector(".repair-wrapper")
      .classList.remove("wrapper-show-all");
  } else {
    repairButton.textContent = "Скрыть";
    repairButton.classList.add(moreButtonHideSelector);
    //document.querySelector(".brands").classList.add("brands_show-all-brand");
    repairButton.previousElementSibling
      .querySelector(".repair-wrapper")
      .classList.add("wrapper-show-all");
  }
}

document.getElementById("burgerButton").addEventListener("click", () => {
  toggleMainNavVisibility();
});

document.getElementById("close").addEventListener("click", () => {
  toggleMainNavVisibility();
});

document.querySelectorAll(".repair__more-button").forEach((item) => {
  item.addEventListener("click", (event) => {
    const repairButton = event.target.closest(".repair__more-button");
    if (repairButton.classList.contains(moreButtonHideSelector)) {
      toggleShowButtonAndBrands({ repairButton, show: true });
    } else {
      toggleShowButtonAndBrands({ repairButton, show: false });
    }
  });
});
document.querySelectorAll(".modal__close").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.target.closest(".modal").classList.add("hidden");
  });
});
document.querySelectorAll(".image-link_chat").forEach((item) => {
  item.addEventListener("click", () => {
    document.getElementById("feedbackModal").classList.remove("hidden");
  });
});
document.querySelectorAll(".image-link_phone").forEach((item) => {
  item.addEventListener("click", () => {
    document.getElementById("callbackModal").classList.remove("hidden");
  });
});
