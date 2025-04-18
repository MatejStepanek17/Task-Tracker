const taskInput = document.querySelector(".task_input");
const submitButton = document.querySelector(".submit_button");

const emptyInput = document.querySelector(".empty_input");
const taskItems = document.querySelector(".task_items");

window.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
      createTaskElement(task.text, task.completed);
  });
}

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask(e);
  }
});
submitButton.addEventListener("click", function (e) {
  addTask(e);
});


function addTask(e) {
    e.preventDefault();
    if (taskInput.value === "") {
        emptyInput.innerHTML = "Please enter a task";
        emptyInput.classList.remove("fade-out");
        setTimeout(() => emptyInput.classList.add("fade-out"), 10);
        setTimeout(() => {
            emptyInput.innerHTML = ""; 
            emptyInput.classList.remove("fade-out"); 
        }, 2600);
    }
    else {
      createTaskElement(taskInput.value, false);
      saveTask(taskInput.value, false);
      taskInput.value = "";
  }
}

function createTaskElement(text, completed) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = completed;
  checkbox.addEventListener("click", markTaskComplete);
  li.appendChild(checkbox);

  const taskText = document.createElement("span");
  taskText.classList.add("task_text");
  taskText.appendChild(document.createTextNode(text));
  li.appendChild(taskText);

  if (completed) li.classList.add("task_completed");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete_button");
  deleteButton.addEventListener("click", deleteTask);
  li.appendChild(deleteButton);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("trash_icon");
  deleteIcon.innerHTML = "<i class='fas fa-trash-alt'></i>";
  deleteButton.appendChild(deleteIcon);

  li.classList.add("task_item");
  taskItems.appendChild(li);
}

function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function markTaskComplete(e) {
  const li = e.target.parentElement;
  li.classList.toggle("task_completed");

  const text = li.querySelector(".task_text").innerText;
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task =>
      task.text === text ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e) {
  const li = e.target.closest("li");
  const text = li.querySelector(".task_text").innerText;
  li.remove();

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}