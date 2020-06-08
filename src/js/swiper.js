import Swiper from "swiper";

const moreButtonHideSelector = "more-button_hide";

function createSwiper() {
  return new Swiper(".swiper-container", {
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
    },
    speed: 400,
    //spaceBetween: 16,
    width: 240,
  });
}

function toggleShowButtonAndBrands({ show = true, repairButton = {} } = {}) {
  if (show) {
    repairButton.textContent = "Показать всё";
    repairButton.classList.remove(moreButtonHideSelector);
    document.querySelector(".brands").classList.remove("brands_show-all-brand");
  } else {
    repairButton.textContent = "Скрыть";
    repairButton.classList.add(moreButtonHideSelector);
    document.querySelector(".brands").classList.add("brands_show-all-brand");
  }
}

if (window.innerWidth < 768 && document.querySelector(".swiper-container")) {
  createSwiper();
}

document
  .querySelector(".repair__more-button")
  .addEventListener("click", (event) => {
    const repairButton = event.target.closest(".repair__more-button");
    if (repairButton.classList.contains(moreButtonHideSelector)) {
      toggleShowButtonAndBrands({ repairButton, show: true });
    } else {
      toggleShowButtonAndBrands({ repairButton, show: false });
    }
  });
