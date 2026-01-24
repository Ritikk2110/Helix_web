// ==========================================
// HELIX CLINIC - COMPLETE JAVASCRIPT (FIXED)
// ==========================================

// ==========================================
// PAGE NAVIGATION SYSTEM
// ==========================================
function showPage(pageId) {
  document.querySelectorAll(".page-section").forEach(section => {
    section.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageId);
  if (selectedPage) selectedPage.classList.add("active");

  document.querySelectorAll(".nav-links a, .dropdown-menu a").forEach(link => {
    link.classList.remove("active");
  });

  const navLinksMenu = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  if (navLinksMenu && menuToggle) {
    navLinksMenu.classList.remove("active");
    menuToggle.classList.remove("active");
  }

  document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// DOM READY
// ==========================================
document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  // =========================
  // MOBILE MENU TOGGLE
  // =========================
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // =========================
  // DROPDOWN FIX (TOUCH SAFE)
  // =========================
  const dropdownToggles = document.querySelectorAll(".dropdown > a");

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      if (isTouchDevice) {
        e.preventDefault();
        const parent = this.parentElement;

        document.querySelectorAll(".dropdown").forEach(dropdown => {
          if (dropdown !== parent) dropdown.classList.remove("active");
        });

        parent.classList.toggle("active");
      }
    });
  });

  // =========================
  // CLICK OUTSIDE TO CLOSE
  // =========================
  document.addEventListener("click", function (e) {
    if (
      navLinks &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
      document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("active"));
    }
  });
});

// ==========================================
// STICKY NAVBAR
// ==========================================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 100);
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle("show", window.scrollY > 300);
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// GALLERY MODAL
// ==========================================
let currentGalleryImages = [];
let currentImageIndex = 0;

function openGalleryModal(imageSrc, caption) {
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");

  if (!modal) return;

  modalImage.src = imageSrc;
  modalCaption.textContent = caption;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  currentGalleryImages = [];
  document.querySelectorAll(".facility-item:not(.hidden)").forEach((item, i) => {
    const img = item.querySelector("img");
    const cap = item.querySelector("h5");
    if (img && cap) {
      currentGalleryImages.push({ src: img.src, caption: cap.textContent });
      if (img.src === imageSrc) currentImageIndex = i;
    }
  });
}

function closeGalleryModal() {
  const modal = document.getElementById("galleryModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function navigateGallery(dir) {
  if (!currentGalleryImages.length) return;
  currentImageIndex =
    (currentImageIndex + dir + currentGalleryImages.length) %
    currentGalleryImages.length;

  document.getElementById("modalImage").src =
    currentGalleryImages[currentImageIndex].src;
  document.getElementById("modalCaption").textContent =
    currentGalleryImages[currentImageIndex].caption;
}

// ==========================================
// FORM SUBMISSION
// ==========================================
function handleFormSubmit(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

  if (!/^\d{10}$/.test(data.phone)) {
    showNotification("Enter valid 10-digit mobile number", "error");
    return;
  }

  sendToWhatsApp(data);
  showNotification("Booking sent successfully!", "success");
  e.target.reset();
}

// ==========================================
// SEND TO WHATSAPP
// ==========================================
function sendToWhatsApp(data) {
  const msg = `🏥 *Helix Clinic Booking*

Name: ${data.fullName}
Phone: ${data.phone}
Test: ${data.testType}
Date: ${data.collectionDate}
Time: ${data.collectionTime}

Address:
${data.address}`;

  window.open(
    `https://wa.me/918318462292?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

// ==========================================
// NOTIFICATIONS
// ==========================================
function showNotification(msg, type = "success", time = 4000) {
  const n = document.createElement("div");
  n.className = `notification ${type}`;
  n.textContent = msg;
  document.body.appendChild(n);
  setTimeout(() => n.remove(), time);
}

// ==========================================
// IMAGE LAZY LOAD
// ==========================================
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.src = e.target.dataset.src;
        io.unobserve(e.target);
      }
    });
  });
  document.querySelectorAll("img[data-src]").forEach(img => io.observe(img));
}

// ==========================================
// WELCOME MESSAGE
// ==========================================
setTimeout(() => {
  showNotification("Welcome to Helix Clinic 🏥", "success", 5000);
}, 2000);
