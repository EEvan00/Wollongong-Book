'use strict';



/**
 * add event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toogle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);



/**
 * active header & back top btn when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElemOnScroll);



/**
 * filter functionality
 */

const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedBtn = filterBtn[0];

const filter = function () {
  lastClickedBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (filterItems[i].dataset.filter === this.dataset.filterBtn) {
      filterItems[i].style.display = "block";
    } else {
      filterItems[i].style.display = "none";
    }
  }
}

addEventOnElem(filterBtn, "click", filter);


// Modal controller toggles auth dialog and tabbed forms
(() => {
  const openBtns = document.querySelectorAll("[data-modal-open]");
  const closeSelectors = "[data-modal-close]";
  const tabSelector = ".tab-btn";
  const activeClass = "active";
  const hiddenClass = "hidden";

  const escHandler = event => {
    if (event.key !== "Escape") return;
    const openModal = document.querySelector(".modal.active");
    if (openModal) closeModal(openModal);
  };

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add(activeClass);
    modal.setAttribute("aria-hidden", "false");
    const firstField = modal.querySelector("input, button");
    if (firstField) firstField.focus();
    document.addEventListener("keydown", escHandler);
  }

  function closeModal(modal) {
    modal.classList.remove(activeClass);
    modal.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", escHandler);
  }

  openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-modal-open");
      if (id) openModal(id);
    });
  });

  document.addEventListener("click", event => {
    const closeEl = event.target.closest(closeSelectors);
    if (!closeEl) return;
    const modal = event.target.closest(".modal") || document.querySelector(".modal.active");
    if (modal) closeModal(modal);
  });

  document.addEventListener("click", event => {
    const tabBtn = event.target.closest(tabSelector);
    if (!tabBtn) return;
    const modal = tabBtn.closest(".modal");
    if (!modal) return;
    const targetTab = tabBtn.getAttribute("data-tab");

    modal.querySelectorAll(tabSelector).forEach(btn => {
      btn.classList.toggle(activeClass, btn === tabBtn);
    });

    modal.querySelectorAll("[data-tab-content]").forEach(form => {
      const match = form.getAttribute("data-tab-content") === targetTab;
      form.classList.toggle(hiddenClass, !match);
    });
  });
})();
