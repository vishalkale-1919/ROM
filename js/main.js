// Scroll Progress Bar

window.addEventListener("scroll", () => {
  const winScroll = document.documentElement.scrollTop;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

  document.getElementById("progress-bar").style.width = scrolled + "%";
});

// Smooth Active Navigation

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const id = section.getAttribute("id");

    if (window.scrollY >= sectionTop && id) {
      current = id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Navbar Scrolled State

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
