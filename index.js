// Define Task class
class Task {

  // initialise the constructor method of the Task object
  constructor(
    taskSupervisor,
    clubMember, 
    taskPriority,
    taskDeadline,
    assignedTask,
    taskStatus
  ) 
  
  // initialise the instance variables of the Task object
  {
    this.taskSupervisor = taskSupervisor;
    this.clubMember = clubMember;
    this.taskPriority = taskPriority;
    this.taskDeadline = taskDeadline;
    this.assignedTask = assignedTask;
  }

  // initialise the setter methods
  // method to set the status of the current task
  setTaskStatus(status) {
    this.taskStatus = status;
  }
}

// Initialisation
let taskList = [];  // initialise an empty array
let popupForm = document.querySelector("#popup-form");
let overlay = document.querySelector(".overlay");


// Define functions
// Display popup form when plus button is clicked
const displayPopupForm = () => {
  popupForm.classList.add("show");
  popupForm.classList.remove("hide");
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