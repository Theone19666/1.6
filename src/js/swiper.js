import Swiper from "swiper";

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

if (window.innerWidth < 768 && document.querySelector(".swiper-container")) {
  createSwiper();
}
