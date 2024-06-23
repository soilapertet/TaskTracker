// Initialisation
let taskList = [];  // initialise an empty array
let popupForm = document.querySelector("#popup-form");
let overlay = document.querySelector(".overlay");

// Define functions
// Display popup form when plus button is clicked
const displayPopupForm = () => {
  popupForm.classList.add("show");
  overlay.classList.add("show");
}

// Close popup form when close button is clicked
const closePopupForm = () => {
  popupForm.classList.remove("show");
  popupForm.classList.add("hide");
  overlay.classList.remove("show");
}

// Functionality to open pop-up form
let plusBtn = document.querySelector(".button_plus");
plusBtn.addEventListener("click", displayPopupForm);

// Functionality to close pop-up form
let closeBtn = document.querySelector(".btn-close");
closeBtn.addEventListener("click", closePopupForm);