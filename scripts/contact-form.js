// ===== SELECT ELEMENTS =====
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const sendBtn = document.querySelector(".send-btn");

// ===== ERROR MESSAGES =====
let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let subjectError = document.getElementById("subjectError");

// ===== FORM =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";

  let isValid = true;
  let namePattern = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;

  // name check
  if (nameInput.value.trim() === "") {
    nameError.textContent = "This Field is required.";
    isValid = false;
  } else if (!namePattern.test(nameInput.value.trim())) {
    nameError.textContent = "Please use only letters.";
    isValid = false;
  } else if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Name must have more than 2 characters.";
    isValid = false;
  }

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // email check
  if (emailInput.value.trim() === "") {
    emailError.textContent = "This Field is required.";
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email.";
    isValid = false;
  }

  // subject check
  if (subjectInput.value.trim() === "") {
    subjectError.textContent = "This Field is required.";
    isValid = false;
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
