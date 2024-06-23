
// Initialise empty array to store tasks
let taskList = [];
let popupForm = document.querySelector("#popup-form");
let overlay = document.querySelector(".overlay");
let defaultDisplay = document.querySelector("#tasks-empty");
let tasksSection = document.querySelector("#tasks");
let plusBtn = document.querySelector(".button_plus");
let closeBtn = document.querySelector(".btn-close");
let inputForm = document.querySelector(".input-form");
let statusDropDownMenus, currentStatusMenu;

// Task class
class Task {

  // class properties
  taskSupervisor;
  clubMember;
  taskPriority;
  taskDeadline;
  assignedTask;
  taskStatus;

  // initialise the constructor method of the Task object
  constructor(
    taskSupervisor,
    clubMember, 
    taskPriority,
    taskDeadline,
    assignedTask,
  ) 
  
  // initialise the instance variables of the Task object
  {
    this.taskSupervisor = taskSupervisor;
    this.clubMember = clubMember;
    this.taskPriority = taskPriority;
    this.taskDeadline = taskDeadline;
    this.assignedTask = assignedTask;
  }

  // initialise the getter methods
  getTaskSupervisor() { return this.taskSupervisor };
  getClubMember() { return this.clubMember };
  getTaskPriority() { return this.taskPriority };
  getTaskDeadline() { return this.taskDeadline };
  getAssignedTask() { return this.assignedTask };
  getTaskStatus() { return this.taskStatus};

  // initialise the setter methods
  setTaskStatus(status) {
    this.taskStatus = status;
  }

}

// Functions

// Hide default webpage
const hideDefaultTaskDisplay = () => {
  if(!defaultDisplay.classList.contains("hide")) {
    defaultDisplay.classList.add("hide");
  }
}

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
  for(i = 0; i < arr.length; i++) {
      if(arr[i].checked) {
        return arr[i].value;
      }
  }
}

// Create a new task
const createNewTask = () => {
  let supervisorName = document.querySelector("#supervisor").value;
  let clubMemberName = document.querySelector("#club-member").value;
  let priorityChoices = Array.from(document.querySelectorAll(".priority input"));
  let selectedPriority = getSelectedPriority(priorityChoices);
  let taskDeadline = document.querySelector("#task-deadline").value;
  let assignedTask = document.querySelector("#task-description").value;

  const task = new Task(supervisorName, clubMemberName, selectedPriority, taskDeadline, assignedTask);
  taskList.push(task);
  return taskList;
}

// Display tasks in library
const displayTask = (task, i) => {

  // Create task section
  let taskChildNode = document.createElement("section");
  taskChildNode.classList.add("task");
  let taskContent = `
    <div class="row">
      <div class="col-11"><h3><em>${task.getAssignedTask()}</em></h3></div>
      <div class="col-1">
        <button type="button" class="btn-close" aria-label="Close" id="delete-btn"></button>
      </div>
    </div>
    <div class="row row-cols-5">
      <div class="col title">Deadline</div>
      <div class="col title">Priority</div>
      <div class="col title">Status</div>
      <div class="col title">Assigned by</div>
      <div class="col title">Assigned to</div>
    </div>
    <div class="row row-cols-5">
      <div class="col deadline">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
        </svg>
        <p class="deadline">${task.getTaskDeadline()}</p>
      </div>
      <div class="col task-priority">
        <p class="current-priority">${task.getTaskPriority()}</p>
      </div>
      <div class="col" >
        <select class="form-select">
          <option selected value="0">Select Status</option>
          <option value="1">Not Started Yet</option>
          <option value="2">In Progress</option>
          <option value="3">Completed</option>
        </select>
      </div>
      <div class="col">
        <p class="supervisor">${task.getTaskSupervisor()}</p>
      </div>
      <div class="col">
        <p class="member">${task.getClubMember()}</p>
      </div>
    </div>
  `;
  taskChildNode.innerHTML = taskContent;

  // Append task child note to parent node
  let taskParentNode = document.querySelector("#tasks");
  taskParentNode.appendChild(taskChildNode);

  // Add event listener to drop-down menu
  const selectedElements = Array.from(document.querySelectorAll(".form-select"));
  const currentSelectedElement = selectedElements[i];
  const status = currentSelectedElement.value;
  currentSelectedElement.addEventListener("change", (event) => {
    
    if(event.target.value == '1') {
      task.setTaskStatus("Not Started Yet");
    } else if(event.target.value == '2') {
      task.setTaskStatus("In Progress");
    } else if(event.target.value == '3') {
      task.setTaskStatus("Completed");
    }

    updateStatusColour(task, currentSelectedElement);

  });

  // Add event listner to delete button
  const deleteButtons = Array.from(document.querySelectorAll("#delete-btn"));
  const deleteButton = deleteButtons[i];
  deleteButton.addEventListener("click", () => {
    taskList.splice(i, 1);
    displayAssignedTasks(taskList);
  })

}

// Update priority colour
const updatePriorityColour = (task, i) => {

  let priorityParagraphs = Array.from(document.querySelectorAll(".task-priority p"));
  let priorityParagraph = priorityParagraphs[i];

  if(task.getTaskPriority() == "Low") {
    priorityParagraph.classList.add("low");
  } else if(task.getTaskPriority() == "Medium") {
    priorityParagraph.classList.add("medium");
  } else if(task.getTaskPriority() == "High"){
    priorityParagraph.classList.add("high");
  }

}

// Update status colour
const updateStatusColour = (task, selectMenu) => {

  // reset status colour to default
  if(selectMenu.classList.contains("red")) {
    selectMenu.classList.remove("red");
  }

  if(selectMenu.classList.contains("yellow")) {
    selectMenu.classList.remove("yellow");
  }

  if(selectMenu.classList.contains("green")) {
    selectMenu.classList.remove("green");
  }

  // update status colour after reset
  if (task.getTaskStatus() == "Not Started Yet") {
    selectMenu.classList.add("red");
  } else if (task.getTaskStatus() == "In Progress") {
    selectMenu.classList.add("yellow");
  } else if (task.getTaskStatus() == "Completed") {
    selectMenu.classList.add("green");
  }

}

// Clear inner HTML of tasks section
const resetTaskGrid = () => {
  tasksSection.innerHTML = "";
}

// Loop through taskList and display each task
const displayAssignedTasks = (tasks) => {

  hideDefaultTaskDisplay(); // hide default task display
  resetTaskGrid();         // clear all tasks that are currently displayed

  // display tasks that are currently in tasks array
  for(i = 0; i < tasks.length; i++) {
    displayTask(tasks[i], i);
    updatePriorityColour(tasks[i], i);
  }

}

// Functionality to open pop-up form
plusBtn.addEventListener("click", displayPopupForm);

// Functionality to close pop-up form
closeBtn.addEventListener("click", closePopupForm);

// Funnctionality to display tasks
inputForm.addEventListener("submit", (event) => {

  event.preventDefault();
  taskList = createNewTask();
  displayAssignedTasks(taskList);
  inputForm.reset();
  closePopupForm();

});