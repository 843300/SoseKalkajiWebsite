document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector("#hamburger");
  const navLinks = document.querySelector("#nav-links");
  const cancelButton = document.querySelector("#cancelButton");
  const carouselContent = document.querySelector(".carousel-content");
  const slides = document.querySelectorAll(".content-section");
  const prevArrow = document.querySelector(".arrow-left");
  const nextArrow = document.querySelector(".arrow-right");

  let isMenuOpen = false;
  let currentSlide = 0;
  const totalSlides = slides.length;
  let animationsEnabled = true; // Flag to enable/disable animations

  // Hamburger Menu Toggle
  hamburger.addEventListener("click", () => {
    if (!isMenuOpen) {
      gsap.to(navLinks, { right: 0, duration: 0.5, ease: "power2.inOut" });
      isMenuOpen = true;
    }
  });

  cancelButton.addEventListener("click", () => {
    if (isMenuOpen) {
      gsap.to(navLinks, {
        right: "-100%",
        duration: 0.5,
        ease: "power2.inOut",
      });
      isMenuOpen = false;
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.style.right = "0";
      isMenuOpen = false;
    } else if (!isMenuOpen) {
      navLinks.style.right = "-100%";
    }
  });

  // Carousel Functionality
  function showSlide(index) {
    const slideWidth = slides[0].offsetWidth;
    const newTransform = -slideWidth * index;

    gsap.to(carouselContent, {
      x: newTransform,
      duration: animationsEnabled ? 1 : 0, // Instant transition if animations are disabled
      ease: animationsEnabled ? "elastic.out(0.8,0.4)" : "none",
    });

    // Animate text content
    if (animationsEnabled) {
      gsap.to(slides[index].querySelectorAll(".animated-text"), {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "elastic.out",
        stagger: 0.3,
      });
    } else {
      // Keep the animated text visible when animations are disabled
      slides[index].querySelectorAll(".animated-text").forEach((text) => {
        text.style.opacity = 1; // Set opacity to 1
        text.style.transform = "translateY(0)"; // Reset Y translation
      });
    }

    // Reset other slides' text opacity
    slides.forEach((slide, i) => {
      if (i !== index) {
        slides[i].querySelectorAll(".animated-text").forEach((text) => {
          text.style.opacity = 0; // Set opacity to 0 for other slides
          text.style.transform = "translateY(50px)"; // Set Y translation for other slides
        });
      }
    });
  }

  // Event listeners for arrows
  nextArrow.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  });

  prevArrow.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  });

  // Keyboard Navigation
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextArrow.click();
    } else if (event.key === "ArrowLeft") {
      prevArrow.click();
    }
  });

  // Initial slide display
  showSlide(currentSlide);

  // Media content hover functionality
  document.querySelectorAll(".media-content").forEach((video) => {
    video.addEventListener("mouseenter", () => {
      video.play(); // Play video on hover
    });

    video.addEventListener("mouseleave", () => {
      video.pause(); // Pause video on mouse leave
    });
  });

  // Wheel animation
  window.addEventListener("wheel", function (dets) {
    if (!animationsEnabled) return; // Stop if animations are disabled
    if (dets.deltaY > 0) {
      gsap.to(".marque", {
        transform: "translateX(-200%)",
        duration: 5,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".marque img", {
        rotate: 180,
      });
    } else {
      gsap.to(".marque", {
        transform: "translateX(0%)",
        duration: 5,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".marque img", {
        rotate: 0,
      });
    }
  });

  // Cursor logic
  document.addEventListener("mousemove", (e) => {
    gsap.to("#cursor", {
      x: e.pageX,
      y: e.pageY,
      duration: 0.5,
      ease: "back.out(3.7)",
    });
  });

  // Function to toggle animations
  function toggleAnimations() {
    animationsEnabled = !animationsEnabled; // Toggle the state
    const buttonText = animationsEnabled
      ? "Disable Animations"
      : "Enable Animations";
    disableAnimationButton.textContent = buttonText; // Update button text

    if (!animationsEnabled) {
      disableAnimations();
    }
  }

  // Disable all animations except cursor and carousel
  function disableAnimations() {
    gsap.killTweensOf("*"); // Stop all GSAP tweens except the cursor
    carouselContent.style.transition = "none"; // Disable transitions for carousel
    navLinks.style.transition = "none"; // Disable transitions for nav
  }

  // Button to toggle animations
  const disableAnimationButton = document.querySelector(
    "#disableAnimationButton"
  );
  if (disableAnimationButton) {
    disableAnimationButton.addEventListener("click", toggleAnimations);
  }
});
