// ==========================================
// HELIX CLINIC - COMPLETE JAVASCRIPT
// ==========================================

// ==========================================
// PAGE NAVIGATION SYSTEM
// ==========================================
function showPage(pageId) {
  // Hide all page sections
  const sections = document.querySelectorAll(".page-section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Show selected page
  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.classList.add("active");
  }

  // Update active nav link
  const navLinks = document.querySelectorAll(".nav-links > li > a");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Handle dropdown menu items
  const dropdownLinks = document.querySelectorAll(".dropdown-menu a");
  dropdownLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Close mobile menu if open
  const navLinksMenu = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  if (navLinksMenu && menuToggle) {
    navLinksMenu.classList.remove("active");
    menuToggle.classList.remove("active");
  }

  // Close any open dropdowns on mobile
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove("active");
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }
/*
  // Mobile Dropdown Toggle
  const dropdownToggles = document.querySelectorAll(".dropdown > a");
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = this.parentElement;
        
        // Close other dropdowns
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
          if (dropdown !== parent) {
            dropdown.classList.remove("active");
          }
        });
        
        parent.classList.toggle("active");
      }
    });
  });*/
  // Mobile & Touch Dropdown Toggle (FIXED)
const dropdownToggles = document.querySelectorAll(".dropdown > a");

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      e.preventDefault();
      const parent = this.parentElement;

      // Close other dropdowns
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        if (dropdown !== parent) {
          dropdown.classList.remove("active");
        }
      });

      parent.classList.toggle("active");
    }
  });
});


  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideNav = navLinks && navLinks.contains(event.target);
    const isClickOnToggle = menuToggle && menuToggle.contains(event.target);

    if (!isClickInsideNav && !isClickOnToggle && navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// ==========================================
// STICKY NAVIGATION ON SCROLL
// ==========================================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  if (navbar) {
    if (window.pageYOffset > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {
  if (scrollTopBtn) {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ==========================================
// GALLERY MODAL FUNCTIONS
// ==========================================
let currentGalleryImages = [];
let currentImageIndex = 0;

function openGalleryModal(imageSrc, caption) {
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");

  if (modal && modalImage && modalCaption) {
    modalImage.src = imageSrc;
    modalCaption.textContent = caption;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Get all visible images for navigation
    const visibleItems = document.querySelectorAll(".facility-item:not(.hidden)");
    currentGalleryImages = [];
    visibleItems.forEach((item, index) => {
      const img = item.querySelector("img");
      const overlay = item.querySelector(".facility-overlay h5");
      if (img && overlay) {
        currentGalleryImages.push({
          src: img.src,
          caption: overlay.textContent,
        });
        if (img.src.includes(imageSrc) || imageSrc.includes(img.getAttribute("src"))) {
          currentImageIndex = index;
        }
      }
    });
  }
}

function closeGalleryModal() {
  const modal = document.getElementById("galleryModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function navigateGallery(direction) {
  if (currentGalleryImages.length === 0) return;

  currentImageIndex += direction;

  if (currentImageIndex < 0) {
    currentImageIndex = currentGalleryImages.length - 1;
  } else if (currentImageIndex >= currentGalleryImages.length) {
    currentImageIndex = 0;
  }

  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");

  if (modalImage && modalCaption) {
    modalImage.src = currentGalleryImages[currentImageIndex].src;
    modalCaption.textContent = currentGalleryImages[currentImageIndex].caption;
  }
}

// Close modal on click outside or Escape key
document.addEventListener("click", function (e) {
  const modal = document.getElementById("galleryModal");
  if (modal && e.target === modal) {
    closeGalleryModal();
  }
});

document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("galleryModal");
  if (modal && modal.classList.contains("active")) {
    if (e.key === "Escape") {
      closeGalleryModal();
    } else if (e.key === "ArrowLeft") {
      navigateGallery(-1);
    } else if (e.key === "ArrowRight") {
      navigateGallery(1);
    }
  }
});

// ==========================================
// GALLERY FILTER FUNCTIONALITY
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize filters for all filter button groups
  const filterButtonGroups = document.querySelectorAll(".filter-buttons");

  filterButtonGroups.forEach((group) => {
    const filterBtns = group.querySelectorAll(".filter-btn");
    const section = group.closest("section");
    const galleryItems = section ? section.querySelectorAll(".facility-item") : [];

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Update active button
        filterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const filter = this.getAttribute("data-filter");

        galleryItems.forEach((item) => {
          const category = item.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            item.classList.remove("hidden");
            item.style.display = "block";
          } else {
            item.classList.add("hidden");
            item.style.display = "none";
          }
        });
      });
    });
  });
});

// ==========================================
// FORM SUBMISSION HANDLER
// ==========================================
function handleFormSubmit(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Validate phone number
  const phone = data.phone;
  if (!/^[0-9]{10}$/.test(phone)) {
    showNotification("Please enter a valid 10-digit mobile number", "error");
    return false;
  }

  // Validate date (should be today or future date)
  const selectedDate = new Date(data.collectionDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    showNotification("Please select today or a future date for collection", "error");
    return false;
  }

  // Send to WhatsApp
  sendToWhatsApp(data);

  // Show success message
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.classList.add("show");
    successMessage.style.display = "flex";
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Reset form after delay
  setTimeout(function () {
    event.target.reset();
  }, 1000);

  // Hide success message after 6 seconds
  setTimeout(function () {
    if (successMessage) {
      successMessage.classList.remove("show");
      successMessage.style.display = "none";
    }
  }, 6000);

  console.log("Form Data:", data);
  return false;
}

// ==========================================
// SEND BOOKING TO WHATSAPP
// ==========================================
function sendToWhatsApp(data) {
  const message = `🏥 *New Home Collection Booking*
━━━━━━━━━━━━━━━━━━━━━

👤 *Patient Details:*
• Name: ${data.fullName}
• Age: ${data.age} years
• Gender: ${data.gender || "Not specified"}
• Phone: ${data.phone}
• Email: ${data.email || "Not provided"}

📍 *Collection Address:*
${data.address}

🧪 *Test Details:*
• Test/Package: ${data.testType}
• Preferred Date: ${data.collectionDate}
• Time Slot: ${data.collectionTime}

📝 *Additional Instructions:*
${data.message || "None"}

━━━━━━━━━━━━━━━━━━━━━
_Booking from Helix Clinic Website_`;

  const whatsappNumber = "918318462292";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  console.log("Opening WhatsApp with booking details...");
  window.open(whatsappUrl, "_blank");
}

// ==========================================
// SET MINIMUM DATE FOR DATE PICKER
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("collectionDate");
  if (dateInput) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const minDate = yyyy + "-" + mm + "-" + dd;
    dateInput.setAttribute("min", minDate);
  }
});

// ==========================================
// FORM VALIDATION HELPERS
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
    });
  }

  const ageInput = document.getElementById("age");
  if (ageInput) {
    ageInput.addEventListener("input", function () {
      if (this.value > 120) this.value = 120;
      if (this.value < 0) this.value = 0;
    });
  }
});

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message, type = "success", duration = 4000) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((n) => n.remove());

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:10px;">
      <i class="fas fa-times"></i>
    </button>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #ef4444, #dc2626)"};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    animation: slideInRight 0.4s ease;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.4s ease forwards";
    setTimeout(() => notification.remove(), 400);
  }, duration);
}

// Add notification animations
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(notificationStyles);

// ==========================================
// ANIMATE ELEMENTS ON SCROLL
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all cards for animation
  const animatedElements = document.querySelectorAll(
    ".feature-card, .package-card, .wellness-card, .service-card, .testimonial-card, .team-card, .dept-card, .cert-card, .mission-card"
  );

  animatedElements.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const suffix = element.textContent.includes("+") ? "+" : "";

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString() + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString() + suffix;
    }
  }, 16);
}

document.addEventListener("DOMContentLoaded", function () {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statBoxes = entry.target.querySelectorAll(".stat-box h4");
          const values = [10000, 50, 100];
          statBoxes.forEach((stat, index) => {
            if (values[index]) {
              setTimeout(() => {
                animateCounter(stat, values[index], 2000);
              }, index * 200);
            }
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const aboutStats = document.querySelector(".about-stats");
  if (aboutStats) {
    statsObserver.observe(aboutStats);
  }
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// ==========================================
// PAGE LOAD EFFECTS
// ==========================================
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s";
    document.body.style.opacity = "1";
  }, 100);
});

// ==========================================
// WELCOME NOTIFICATION
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    showNotification("Welcome to Helix Clinic! Book your test today. 🏥", "success", 6000);
  }, 2000);
});

// ==========================================
// CONSOLE BRANDING
// ==========================================
console.log(
  "%c🏥 Helix Clinic & Diagnostic Labs",
  "color: #2563eb; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cLeading You To Better Health",
  "color: #8b5cf6; font-size: 16px; font-style: italic;"
);
console.log(
  "%c📞 Call: 8318462292, 7398687342",
  "color: #10b981; font-size: 14px;"
);
console.log(
  "%c🌐 Website loaded successfully!",
  "color: #fbbf24; font-size: 12px;"
);

// ==========================================
// ERROR HANDLING
// ==========================================
window.addEventListener("error", function (e) {
  console.error("An error occurred:", e.error);
});

// ==========================================
// LAZY LOAD IMAGES
// ==========================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}