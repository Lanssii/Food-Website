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

  let isValid = true;
  let namePattern = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
  const phonePattern = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;

  nameError.textContent = "";
  dateError.textContent = "";
  timeError.textContent = "";
  phoneError.textContent = "";
  totalPersonError.textContent = "";

  // name check
  if (nameInput.value.trim() === "") {
    isValid = false;
    nameError.textContent = "This field is required.";
  } else if (!namePattern.test(nameInput.value.trim())) {
    isValid = false;
    nameError.textContent = "Please use only letters.";
  } else if (nameInput.value.trim().length < 2) {
    isValid = false;
    nameError.textContent = "Name must have more than 2 characters.";
  }
  // phone check
  if (phoneInput.value.trim() === "") {
    isValid = false;
    phoneError.textContent = "This field is required.";
  } else if (!phonePattern.test(phoneInput.value.trim())) {
    phoneError.textContent = "Please enter a valid phone number.";
  }
  // date check
  if (dateInput.value.trim() === "") {
    isValid = false;
    dateError.textContent = "This field is required.";
  }
  // time check
  if (timeInput.value.trim() === "") {
    isValid = false;
    timeError.textContent = "This field is required.";
  }
  // totalPerson check
  if (totalPersonInput.value.trim() === "") {
    isValid = false;
    totalPersonError.textContent = "This field is required.";
  } else if (totalPersonInput.value < 1 || totalPersonInput.value > 10) {
    totalPersonError.textContent = "Enter between 1 and 10 people.";
  }
});

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/[^0-9+ ]/g, "");
});
nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
});

sendBtn.addEventListener("click", () => {});
