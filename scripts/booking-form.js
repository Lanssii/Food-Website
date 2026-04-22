// ===== SELECT ELEMENTS =====
const form = document.getElementById("form");
const dateInput = document.getElementById("meeting-date");
const timeInput = document.getElementById("meeting-time");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const totalPersonInput = document.getElementById("total-person");
const sendBtn = document.querySelector(".send-btn");

// ===== ERROR MESSAGES =====
let nameError = document.getElementById("nameError");
let dateError = document.getElementById("dateError");
let timeError = document.getElementById("timeError");
let phoneError = document.getElementById("phoneError");
let totalPersonError = document.getElementById("totalPersonError");

// ===== FORM =====
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
