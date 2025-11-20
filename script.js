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
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Set active class on clicked link
  event.target.classList.add("active");

  // Close mobile menu if open
  const navLinksMenu = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  navLinksMenu.classList.remove("active");
  menuToggle.classList.remove("active");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  const isClickInsideNav = navLinks.contains(event.target);
  const isClickOnToggle = menuToggle.contains(event.target);

  if (
    !isClickInsideNav &&
    !isClickOnToggle &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  }
});

// ==========================================
// STICKY NAVIGATION ON SCROLL
// ==========================================
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ==========================================
// FORM SUBMISSION HANDLER
// ==========================================
// FORM SUBMISSION HANDLER - ✅ CORRECTED
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
    alert("Please enter a valid 10-digit mobile number");
    return false;
  }

  // Validate date (should be today or future date)
  const selectedDate = new Date(data.collectionDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert("Please select today or a future date for collection");
    return false;
  }

  // ✅ SEND TO WHATSAPP IMMEDIATELY
  sendToWhatsApp(data);

  // Show success message
  const successMessage = document.getElementById("successMessage");
  successMessage.classList.add("show");

  // Scroll to success message
  successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

  // Reset form after 1 second
  setTimeout(function () {
    event.target.reset();
  }, 1000);

  // Hide success message after 6 seconds
  setTimeout(function () {
    successMessage.classList.remove("show");
  }, 6000);

  // Log form data
  console.log("Form Data:", data);

  return false;
}

// ==========================================
// SEND BOOKING TO WHATSAPP - ✅ CORRECTED
// ==========================================
function sendToWhatsApp(data) {
  const message = `🏥 *New Home Collection Booking*

👤 *Name:* ${data.fullName}
📅 *Age:* ${data.age} years
📱 *Phone:* ${data.phone}
📧 *Email:* ${data.email || "Not provided"}
📍 *Address:* ${data.address}
🧪 *Test/Package:* ${data.testType}
📆 *Preferred Date:* ${data.collectionDate}
⏰ *Time Slot:* ${data.collectionTime}
📝 *Additional Instructions:* ${data.message || "None"}

_Booking request from Helix Clinic website_`;

  // ✅ CORRECT PHONE NUMBER - Use your actual WhatsApp number
  const whatsappNumber = "916388110321"; // Replace with your WhatsApp number

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  // Open WhatsApp in new window
  console.log("Opening WhatsApp with message...");
  window.open(whatsappUrl, "_blank");
}

// ==========================================
// SET MINIMUM DATE FOR DATE PICKER
// ==========================================
window.addEventListener("DOMContentLoaded", function () {
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
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
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
// ANIMATE ELEMENTS ON SCROLL (OPTIONAL)
// ==========================================
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
document
  .querySelectorAll(
    ".feature-card, .package-card, .wellness-card, .service-card, .testimonial-card"
  )
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString() + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString() + "+";
    }
  }, 16);
}

// Animate stats when visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statBoxes = entry.target.querySelectorAll(".stat-box h4");
        statBoxes.forEach((stat, index) => {
          const values = [10000, 50, 100]; // Corresponding to stats
          setTimeout(() => {
            animateCounter(stat, values[index], 2000);
          }, index * 200);
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

// ==========================================
// FORM VALIDATION HELPERS
// ==========================================
const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
  });
}

const ageInput = document.getElementById("age");
if (ageInput) {
  ageInput.addEventListener("input", function (e) {
    if (this.value > 120) this.value = 120;
    if (this.value < 0) this.value = 0;
  });
}

// ==========================================
// PRELOADER (OPTIONAL)
// ==========================================
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s";
    document.body.style.opacity = "1";
  }, 100);
});

// ==========================================
// PRINT FUNCTIONALITY (OPTIONAL)
// ==========================================
function printPage() {
  window.print();
}

// ==========================================
// COOKIE CONSENT (OPTIONAL)
// ==========================================
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Lazy load images (if you add actual images later)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
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

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log(
  "%c🏥 Helix Clinic & Diagnostic Labs",
  "color: #2563eb; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cLeading You To Better Health",
  "color: #8b5cf6; font-size: 14px; font-style: italic;"
);
console.log(
  "%c📞 Call: 6388110321,6388110321",
  "color: #10b981; font-size: 12px;"
);

// ==========================================
// TRACK USER ENGAGEMENT (OPTIONAL)
// ==========================================
let pageViewTime = 0;
setInterval(() => {
  pageViewTime++;
  // Send analytics data every minute (optional)
  if (pageViewTime % 60 === 0) {
    console.log(
      "User has been on page for " + Math.floor(pageViewTime / 60) + " minutes"
    );
  }
}, 1000);

// ==========================================
// ERROR HANDLING
// ==========================================
window.addEventListener("error", function (e) {
  console.error("An error occurred:", e.error);
  // You can send error logs to your server here
});

// ==========================================
// PREVENT RIGHT CLICK (OPTIONAL - FOR CONTENT PROTECTION)
// ==========================================
// Uncomment if needed
// document.addEventListener('contextmenu', event => event.preventDefault());

// ==========================================
// AUTO-HIDE ALERTS/NOTIFICATIONS
// ==========================================
function showNotification(message, type = "success", duration = 3000) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
                <i class="fas fa-${
                  type === "success" ? "check-circle" : "exclamation-circle"
                }"></i>
                <span>${message}</span>
            `;
  notification.style.cssText = `
                position: fixed;
                
                top: 100px;
                right: 20px;
                background: ${type === "success" ? "#fbbf24" : "#ef4444"};
                color: black;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideInRight 0.4s ease;
            `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.4s ease";
    setTimeout(() => notification.remove(), 400);
  }, duration);
}

// Add CSS for notification animations
const style = document.createElement("style");
style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
document.head.appendChild(style);

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("Helix Clinic website loaded successfully!");

  // Show welcome notification after 2 seconds
  setTimeout(() => {
    showNotification(
      "Welcome to Helix Clinic! Book your test today.",
      "success",
      4000
    );
  }, 2000);
});
