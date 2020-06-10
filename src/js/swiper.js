import Swiper from "swiper";

function createSwiper(selector = ".swiper-container", width = 240) {
  return new Swiper(selector, {
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
    },
    speed: 400,
    //spaceBetween: 16,
    width,
  });
}

if (window.innerWidth < 768) {
  if (document.querySelector(".swiper-container")) {
    createSwiper(".swiper-container:not(.prices-swiper-container)");
  }
  if (document.querySelector(".prices-swiper-container")) {
    createSwiper(".prices-swiper-container", 260);
  }
}
