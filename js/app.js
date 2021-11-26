/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

let navBarList = document.querySelector("#navbar__list");
let sectionsList = document.querySelectorAll("[data-nav]");
let tempFragment = document.createDocumentFragment();
let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
let viewportHeight =
  window.innerHeight || document.documentElement.clientHeight;
let isScrolling;
let scrollTopBtn = document.querySelector(".scroll__top");
/**
 * End Global Variables
 */

function createNavItems(sections) {
  sections.forEach((section) => {
    let item = document.createElement("li");
    item.innerText = section.dataset.nav;
    item.setAttribute("data-item", section.dataset.nav);
    item.classList.add("menu__link");
    tempFragment.appendChild(item);
  });

  return tempFragment;
}

function detectActiveSectionOnScroll(sections) {
  sections.forEach((section) => {
    let rect = section.getBoundingClientRect();
    let isInViewPort =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= viewportHeight &&
      rect.right <= viewportWidth;

    if (isInViewPort) {
      section.classList.add("active");
      let link = document.querySelector(`[data-item="${section.dataset.nav}"]`);
      setActiveLink(link);
    } else {
      section.classList.remove("active");
    }
  });
}

function removeActiveFromOtherLinks(activeLink) {
  let links = document.querySelectorAll(".menu__link");
  links.forEach((link) => {
    if (link !== activeLink) {
      link.classList.remove("active");
    }
  });
}

function setActiveLink(activelink) {
  activelink.classList.add("active");
  removeActiveFromOtherLinks(activelink);
}

function hideNavOnScrollStop() {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    document.querySelector(".navbar__menu").classList.add("hidden");
  }, 1500);
}

function showScrollTopButton(scrolledValue) {
  if (scrolledValue > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
}

// build the nav

navBarList.appendChild(createNavItems(sectionsList));

// Add class 'active' to section when near top of viewport

document.addEventListener("scroll", (e) => {
  detectActiveSectionOnScroll(sectionsList);
  document.querySelector(".navbar__menu").classList.remove("hidden");
});

// Scroll section into view on nav item click
document.querySelectorAll(".menu__link").forEach((link) => {
  link.addEventListener("click", () => {
    let section = document.querySelector(`[data-nav="${link.innerText}"]`);
    section.scrollIntoView({ behavior: "smooth" });
    setActiveLink(link);
  });
});

// Hide navbar when scrolling stops
window.addEventListener(
  "scroll",
  (e) => {
    hideNavOnScrollStop();
    showScrollTopButton(window.scrollY);
  },
  false
);

// scroll to top on up button click
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
