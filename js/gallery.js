const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,

  spaceBetween: 30,

  loop: true,

  autoplay: {
    delay: 3000,

    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",

    clickable: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },

    1024: {
      slidesPerView: 3,
    },
  },
});
