gsap.registerPlugin(ScrollTrigger);

// Hero Entrance Animations

if (sessionStorage.getItem("invitationOpened") === "true") {
  gsap.from(".hero-monogram", {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.5)"
  });

  gsap.from(".hero-pretitle", {
    y: 30,
    opacity: 0,
    duration: 1.2,
    delay: 0.2
  });

  gsap.from(".hero-title", {
    y: 80,
    opacity: 0,
    duration: 1.5,
    delay: 0.4
  });

  gsap.from(".hero-subtitle", {
    y: 40,
    opacity: 0,
    duration: 1.5,
    delay: 0.6
  });

  gsap.from(".hero-date", {
    y: 40,
    opacity: 0,
    duration: 1.5,
    delay: 0.8
  });

  gsap.from(".hero-btn", {
    scale: 0.9,
    opacity: 0,
    duration: 1.2,
    delay: 1.0
  });
}

// Couple Cards

gsap.from(".bride-card", {
  scrollTrigger: {
    trigger: ".bride-card",

    start: "top 80%",
  },

  x: -150,

  opacity: 0,

  duration: 1.3,
});

gsap.from(".groom-card", {
  scrollTrigger: {
    trigger: ".groom-card",

    start: "top 80%",
  },

  x: 150,

  opacity: 0,

  duration: 1.3,
});

// Timeline

gsap.from(".timeline-item", {
  scrollTrigger: {
    trigger: ".timeline",

    start: "top 80%",
  },

  stagger: 0.25,

  y: 100,

  opacity: 0,

  duration: 1,
});

// Events

gsap.from(".event-card", {
  scrollTrigger: {
    trigger: ".events",

    start: "top 80%",
  },

  stagger: 0.2,

  scale: 0.8,

  opacity: 0,

  duration: 1,
});

// Gallery

gsap.from(".swiper-slide", {
  scrollTrigger: {
    trigger: ".gallery",

    start: "top 80%",
  },

  stagger: 0.15,

  y: 100,

  opacity: 0,

  duration: 1,
});

// RSVP

gsap.from("#rsvpForm", {
  scrollTrigger: {
    trigger: "#rsvpForm",

    start: "top 80%",
  },

  y: 80,

  opacity: 0,

  duration: 1.2,
});

// Floating Flowers

gsap.to(".flower1", {
  y: -120,

  repeat: -1,

  yoyo: true,

  duration: 4,
});

gsap.to(".flower2", {
  y: -150,

  repeat: -1,

  yoyo: true,

  duration: 5,
});

gsap.to(".flower3", {
  y: -100,

  repeat: -1,

  yoyo: true,

  duration: 3,
});

// Parallax

gsap.to(".parallax", {
  backgroundPosition: "50% 100%",

  ease: "none",

  scrollTrigger: {
    trigger: ".parallax",

    scrub: true,
  },
});
