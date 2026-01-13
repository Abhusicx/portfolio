'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile (safe)
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}


// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function (safe)
const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
};

// add click event to all modal items (safe)
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    // If modal structure isn't present, do nothing (prevents script crash)
    if (!modalImg || !modalTitle || !modalText || !modalContainer || !overlay) return;

    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");

    if (avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt || "";
    }
    if (title) modalTitle.innerHTML = title.innerHTML;
    if (text) modalText.innerHTML = text.innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button (safe)
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");

// FIX: Correct attribute selector (was [data-selecct-value])
const selectValue = document.querySelector("[data-select-value]");

const filterBtn = document.querySelectorAll("[data-filter-btn]");

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// NEW: empty state section selector (add data-portfolio-empty to the empty section in HTML)
const emptyPortfolioSection = document.querySelector("[data-portfolio-empty]");

// NEW: toggle empty state only when no project is visible
const updatePortfolioEmptyState = function () {
  if (!emptyPortfolioSection) return;

  // Store a "show" display value once.
  // If CSS currently hides it (display: none), fallback to "block" so UI actually appears.
  if (!emptyPortfolioSection.dataset.originalDisplay) {
    const computed = window.getComputedStyle(emptyPortfolioSection).display;
    emptyPortfolioSection.dataset.originalDisplay = (computed && computed !== "none") ? computed : "block";
  }

  const activeCount = document.querySelectorAll("[data-filter-item].active").length;

  if (activeCount === 0) {
    emptyPortfolioSection.style.display = emptyPortfolioSection.dataset.originalDisplay;
  } else {
    emptyPortfolioSection.style.display = "none";
  }
};

// select toggle (safe)
if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }

  // NEW: update empty state after filtering (no other behavior change)
  updatePortfolioEmptyState();
};

// add event in all select items (safe)
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();

    // If selectValue doesn't exist, don't crash; still filter and close select safely.
    if (selectValue) selectValue.innerText = this.innerText;

    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// add event in all filter button items for large screen (safe)
let lastClickedBtn = filterBtn.length ? filterBtn[0] : null;

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();

    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field (safe)
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (!form || !formBtn) return;

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link (same behavior, but avoids nested `i` reuse)
for (let n = 0; n < navigationLinks.length; n++) {
  navigationLinks[n].addEventListener("click", function () {
    const target = this.innerHTML.toLowerCase();

    for (let p = 0; p < pages.length; p++) {
      if (target === pages[p].dataset.page) {
        pages[p].classList.add("active");
        navigationLinks[p].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[p].classList.remove("active");
        navigationLinks[p].classList.remove("active");
      }
    }
  });
}

updatePortfolioEmptyState();
