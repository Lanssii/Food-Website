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
  const today = new Date().toISOString().split("T")[0];
  //   dateInput.min = new Date().toISOString().split("T")[0];

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
    isValid = false;
    phoneError.textContent = "Please enter a valid phone number.";
  }
  // date check
  if (dateInput.value.trim() === "") {
    isValid = false;
    dateError.textContent = "This field is required.";
  } else if (dateInput.value < today) {
    isValid = false;
    dateError.textContent = "Date cannot be in the past.";
  }
  // time check
  if (timeInput.value.trim() === "") {
    isValid = false;
    timeError.textContent = "This field is required.";
  } else if (timeInput.value < "10:00" || timeInput.value > "23:59") {
    isValid = false;
    timeError.textContent = "We work from 10:00 to 00:00.";
  }
  // totalPerson check
  if (totalPersonInput.value.trim() === "") {
    isValid = false;
    totalPersonError.textContent = "This field is required.";
  } else if (totalPersonInput.value < 1 || totalPersonInput.value > 10) {
    isValid = false;
    totalPersonError.textContent = "Enter between 1 and 10 people.";
  }

  if (isValid) {
    sendBtn.classList.add("success");
    sendBtn.textContent = "Form is sent!";

    form.reset();

    setTimeout(() => {
      sendBtn.classList.remove("success");
      sendBtn.textContent = "Send";
    }, 2000);
  }
});

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/(?!^\+)[^0-9 ]/g, "");
});
nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
});
