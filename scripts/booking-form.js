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

// ===== UI =====
// Date input Ui
dateInput.value = new Date().toISOString().split("T")[0];

// prevent entering past date
dateInput.min = new Date().toISOString().split("T")[0];

// Time input UI
const now = new Date();
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");

timeInput.value = `${hours}:${minutes}`;

// ===== FORM =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  let namePattern = /^[a-zA-Zა-ჰа-яА-ЯёЁ\s]+$/;
  const phonePattern = /^\+?[0-9]{9,12}$/;

  const today = new Date().toISOString().split("T")[0];

  nameError.textContent = "";
  dateError.textContent = "";
  timeError.textContent = "";
  phoneError.textContent = "";
  totalPersonError.textContent = "";

  // name check
  if (nameInput.value.trim() === "") {
    isValid = false;
    nameError.textContent = t("forms.errors.required", "This field is required.");
  } else if (!namePattern.test(nameInput.value.trim())) {
    isValid = false;
    nameError.textContent = t("forms.errors.lettersOnly", "Please use only letters.");
  } else if (nameInput.value.trim().length < 2) {
    isValid = false;
    nameError.textContent = t("forms.errors.nameLength", "Name must have at least 2 characters.");
  }
  // phone check
  if (phoneInput.value.trim() === "") {
    isValid = false;
    phoneError.textContent = t("forms.errors.required", "This field is required.");
  } else if (!phonePattern.test(phoneInput.value.trim())) {
    isValid = false;
    phoneError.textContent = t("forms.errors.invalidPhone", "Please enter a valid phone number.");
  }
  // date check
  if (dateInput.value.trim() === "") {
    isValid = false;
    dateError.textContent = t("forms.errors.required", "This field is required.");
  } else if (dateInput.value < today) {
    isValid = false;
    dateError.textContent = t("forms.errors.pastDate", "Date cannot be in the past.");
  }
  // time check
  if (timeInput.value.trim() === "") {
    isValid = false;
    timeError.textContent = t("forms.errors.required", "This field is required.");
  } else if (timeInput.value < "10:00" || timeInput.value > "23:59") {
    isValid = false;
    timeError.textContent = t("forms.errors.workingHours", "We work from 10:00 to 00:00.");
  }
  // totalPerson check
  if (totalPersonInput.value.trim() === "") {
    isValid = false;
    totalPersonError.textContent = t("forms.errors.required", "This field is required.");
  } else if (totalPersonInput.value < 1 || totalPersonInput.value > 10) {
    isValid = false;
    totalPersonError.textContent =
      t(
        "forms.errors.tooManyPeople",
        "Please contact us in order to discuss the booking for more than 10 people."
      );
  }

  if (isValid) {
    sendBtn.classList.add("success");
    sendBtn.textContent = t("forms.sent", "Form is sent!");

    form.reset();

    setTimeout(() => {
      sendBtn.classList.remove("success");
      sendBtn.textContent = t("common.bookTable", "Book A Table");
    }, 2000);
  }
});

phoneInput.addEventListener("input", () => {
  let digits = phoneInput.value.replace(/\D/g, "").slice(0, 12);

  if (digits.startsWith("995")) {
    digits = "+" + digits;
  }

  phoneInput.value = digits;
});

nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.replace(/[^a-zA-Zა-ჰа-яА-ЯёЁ\s]/g, "");
});
