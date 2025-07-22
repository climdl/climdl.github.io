// === Loader ===
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// === DOM Content Ready ===
document.addEventListener("DOMContentLoaded", function () {
  // Toggle mobile menu
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".navbar ul");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Slideshow logic
  const slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 4500);
  }
});

const reel = document.querySelector(".carousel .reel");
let scrollAmount = 0;

setInterval(() => {
  if (!reel) return;
  scrollAmount += 1;
  reel.scrollLeft = scrollAmount;
  if (scrollAmount >= reel.scrollWidth - reel.clientWidth) {
    scrollAmount = 0; // reset when end reached
  }
}, 30); // adjust speed as needed
