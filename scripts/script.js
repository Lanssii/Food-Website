// ===== COOKIES =====

// ===== SELECT ELEMENTS =====
const banner = document.getElementById("cookie-banner");
const button = document.getElementById("accept-cookies");

if (!localStorage.getItem("cookiesAccepted")) {
  banner.style.display = "block";
}

button.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "true");
  banner.style.display = "none";
});

// ===== BURGER MENU =====

// ===== SELECT ELEMENTS =====
const headerNav = document.querySelector(".header-nav");
let headerNavContainer = document.querySelector(".header-nav-container");
let hamburgerMenu = document.querySelector(".hamburger-menu");
let sidebar = document.querySelector(".sidebar");
let overlay = document.querySelector(".overlay");
let closeBtn = document.querySelector(".close-btn");

// ===== RESPONSIVE NAVIGATION =====
// Moves navigation into sidebar on mobile
function checkWidth() {
  if (window.innerWidth <= 768) {
    headerNavContainer.style.display = "none";
    sidebar.appendChild(headerNav);
    hamburgerMenu.classList.add("show");
  } else {
    hamburgerMenu.classList.remove("show");
    headerNavContainer.style.display = "flex";
    headerNavContainer.appendChild(headerNav);
    overlay.classList.remove("show");
  }
}

checkWidth();
window.addEventListener("resize", checkWidth);

// ===== OPEN MENU =====
hamburgerMenu.addEventListener("click", () => {
  sidebar.classList.add("show");
  overlay.classList.add("show");
});

// ===== CLOSE MENU =====
function closeMenu() {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
}

// Close when clicking overlay
overlay.addEventListener("click", (e) => {
  e.stopPropagation();
  closeMenu();
});

// Close when clicking close button
closeBtn.addEventListener("click", closeMenu);

// Close when clicking outside menu
document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !hamburgerMenu.contains(e.target)) {
    closeMenu();
  }
});
