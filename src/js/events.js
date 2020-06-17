const moreButtonHideSelector = "more-button_hide";
const bodyNotScrollSelector = "body_not-scroll";
const mainNavWrapperSelector = ".main-nav__wrapper";

function toggleShowButtonAndBrands({ show = true, repairButton = {} } = {}) {
  repairButton.classList.toggle(moreButtonHideSelector);
  repairButton.previousElementSibling
    .querySelector(".repair-wrapper")
    .classList.toggle("wrapper-show-all");
  if (show) {
    repairButton.textContent = "Показать всё";
  } else {
    repairButton.textContent = "Скрыть";
  }
}

function toggleMainNavVisibility() {
  const mainNav = document.getElementById("mainNav");
  if (mainNav.classList.contains("hidden")) {
    document.getElementById("mainNav").classList.toggle("hidden");
    document.querySelector(".body").classList.toggle(bodyNotScrollSelector);
    setTimeout(() => {
      mainNav.querySelector(mainNavWrapperSelector).style.transform =
        "translate(0)";
    }, 300);
  } else {
    if (window.innerWidth < 768) {
      mainNav.querySelector(mainNavWrapperSelector).style.transform =
        "translate(-100%)";
    } else {
      mainNav.querySelector(mainNavWrapperSelector).style.transform =
        "translate(-320px)";
    }

    setTimeout(() => {
      document.getElementById("mainNav").classList.toggle("hidden");
      document.querySelector(".body").classList.toggle(bodyNotScrollSelector);
    }, 300);
  }
}

function toggleModalVisibility(modal = {}) {
  const modalWrapper = modal.querySelector(".modal__wrapper");
  if (modal.classList.contains("hidden")) {
    modal.classList.toggle("hidden");
    setTimeout(() => {
      modalWrapper.style.transform = "translate(0)";
    }, 300);
  } else {
    if (window.innerWidth < 768) {
      modalWrapper.style.transform = "translate(100%)";
    } else {
      modalWrapper.style.transform = "translate(500px)";
    }

    setTimeout(() => {
      modal.classList.toggle("hidden");
    }, 300);
  }
  document.querySelector("body").classList.toggle(bodyNotScrollSelector);
}

document.getElementById("burgerButton").addEventListener("click", () => {
  toggleMainNavVisibility();
});

document.getElementById("close").addEventListener("click", () => {
  toggleMainNavVisibility();
});

document.querySelector(".main-nav").addEventListener("click", (event) => {
  if (event.target.id === "mainNav") {
    toggleMainNavVisibility();
  }
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
    toggleModalVisibility(event.target.closest(".modal"));
  });
});

document.querySelectorAll(".modal").forEach((item) => {
  item.addEventListener("click", (event) => {
    if (
      event.target.id === "feedbackModal" ||
      event.target.id === "callbackModal"
    ) {
      toggleModalVisibility(event.target.closest(".modal"));
    }
  });
});
document.querySelectorAll(".image-link_chat").forEach((item) => {
  item.addEventListener("click", () => {
    toggleModalVisibility(document.getElementById("feedbackModal"));
  });
});
document.querySelectorAll(".image-link_phone").forEach((item) => {
  item.addEventListener("click", () => {
    toggleModalVisibility(document.getElementById("callbackModal"));
  });
});
document
  .getElementById("readMoreDescriptionButton")
  .addEventListener("click", () => {
    document
      .querySelectorAll(".description__text:nth-of-type(n+3)")
      .forEach((item) => {
        item.classList.toggle("hidden");
      });
    const moreButton = document.getElementById("readMoreDescriptionButton");
    moreButton.classList.toggle(moreButtonHideSelector);
    if (moreButton.textContent === "Читать далее") {
      moreButton.textContent = "Скрыть";
    } else {
      moreButton.textContent = "Читать далее";
    }
  });
