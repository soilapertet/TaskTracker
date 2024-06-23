// Initialisation
let taskList = [];  // initialise an empty array

// Task class
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

// Functions
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

// Return the selected task priority
const getSelectedPriority = (arr) => {
  for(i = 0; i < arr.length(); i++) {
      if(arr[i].checked) {
        return arr[i].value;
      }
  }
}

// Create a new task
const createNewTask = () => {
  let supervisorName = document.querySelector("#supervisor");
  let clubMemberName = document.querySelector("#club-member");
  let priorityChoices = Array.from(document.querySelectorAll(".priority input"));
  let selectedPriority = getSelectedPriority(priorityChoices);
  let assignedTask = document.querySelector("#task-description");
  let taskStatus = "Not Started";
  
  const task = new Task(supervisorName, clubMemberName, selectedPriority, assignedTask, taskStatus);
  taskList.push(task);
  return taskList;
}

// Initialisation
let popupForm = document.querySelector("#popup-form");
let overlay = document.querySelector(".overlay");

// Functionality to open pop-up form
let plusBtn = document.querySelector(".button_plus");
plusBtn.addEventListener("click", displayPopupForm);

// Functionality to close pop-up form
let closeBtn = document.querySelector(".btn-close");
closeBtn.addEventListener("click", closePopupForm);