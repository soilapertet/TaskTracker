// Initialisation
let taskList = [];  // initialise an empty array

// Define functions

// Display popup form when plus button is clocked
const displayPopupForm = () => {
  let popupForm = document.querySelector("#popup-form");
  let overlay = document.querySelector(".overlay");
  popupForm.classList.add("show");
  overlay.classList.add("show");
}

// Functionality to open pop-up form
let plusBtn = document.querySelector(".button_plus");
plusBtn.addEventListener("click", displayPopupForm);
