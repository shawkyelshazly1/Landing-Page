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

// Creating dynamic nav links based on sections in html
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

/*
 * Detecting active section in view port while scrolling
 * Accepts sections variable to loop through and check if each in view port to set active class
 * adds active class to the link relative to the section in viewport while setting rest of links inactive
 */
function detectActiveSectionOnScroll(sections) {
  sections.forEach((section) => {
    let rect = section.getBoundingClientRect();
    if (section.id == "section2") {
      console.log(rect.bottom);
    }
    let isInViewPort =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= viewportHeight * 1.5 &&
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

// Helper function to remove active class from inactive links
function removeActiveFromOtherLinks(activeLink) {
  let links = document.querySelectorAll(".menu__link");
  links.forEach((link) => {
    if (link !== activeLink) {
      link.classList.remove("active");
    }
  });
}

// function to set active links
function setActiveLink(activelink) {
  activelink.classList.add("active");
  removeActiveFromOtherLinks(activelink);
}

/*
 * Function to hide navbar based on scroll stop
 * checking if scroll stop every 1.5s using Settimeout
 */
function hideNavOnScrollStop() {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    document.querySelector(".navbar__menu").classList.add("hidden");
  }, 1500);
}

/*
 * Function to hide & show scrollToTop button based on scrolled value
 */

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
