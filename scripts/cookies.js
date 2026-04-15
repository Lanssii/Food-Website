const banner = document.getElementById("cookie-banner");
const button = document.getElementById("accept-cookies");

if (!localStorage.getItem("cookiesAccepted")) {
  banner.style.display = "block";
}

button.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "true");
  banner.style.display = "none";
});
