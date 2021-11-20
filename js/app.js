let navbarLinks = document.querySelector(".links");

let sections = [...document.querySelectorAll(".section")];

// Creating a fake fragment to hold the li items with links inside
let fakeFragment = document.createDocumentFragment();

// Looping through sections to add links dynamically
for (let section of sections) {
  let navItem = document.createElement("li");
  let link = document.createElement("a");

  // Adding active class to first link
  section.dataset.name === "Header" ? link.classList.add("active") : null;

  navItem.classList.add("navbar_item");
  link.setAttribute("href", `#${section.id}`);
  link.textContent = `${section.dataset.name}`;
  navItem.appendChild(link);

  // Setting click eventListener to each Navbar Item
  navItem.addEventListener(
    "click",
    (e) => {
      toggelActiveButton();
      e.target.classList.add("active");
    },
    true
  );
  fakeFragment.appendChild(navItem);
}

navbarLinks.appendChild(fakeFragment);

// Function to add remove class active from all links to be added to clicked one only
function toggelActiveButton() {
  navbarLinks.querySelectorAll("a").forEach((link) => {
    link.classList.remove("active");
  });
}

document.querySelector(".upBtn").addEventListener("click", (e) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.onscroll = function () {
  if (document.documentElement.scrollTop > 100) {
    document.querySelector(".upBtn").style.display = "block";
  } else {
    document.querySelector(".upBtn").style.display = "none";
  }

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top < window.innerHeight / 3) {
      toggelActiveButton();
      navbarLinks
        .querySelector(`[href="#${section.id}"]`)
        .classList.add("active");
    }
  });
};
