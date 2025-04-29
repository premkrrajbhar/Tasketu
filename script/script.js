const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const warnPara = document.getElementById("warnPara");

let editTodo = null;

// Add Todo Functionality
addBtn.addEventListener("click", () => {
  const inputText = inputBox.value.trim();

  if (inputText.length === 0) {
    warnPara.innerText = "Please write something in your Todo!";
    return;
  }

  warnPara.innerText = "";

  // Save Edit Logic
  if (addBtn.innerText === "Save Edit") {
    const oldText = editTodo.querySelector("p").innerText;
    const newText = inputText;

    editTodo.querySelector("p").innerText = newText;
    editLocalTodos(oldText, newText);

    addBtn.innerText = "Add";
    inputBox.value = "";
    editTodo = null;
    return;
  }

  // Create new to-do item
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  const para = document.createElement("p");
  para.className = "mb-0 flex-grow-1";
  para.innerText = inputText;

  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeBtn.className = "btn btn-sm btn-outline-success me-2";

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editBtn.className = "btn btn-sm btn-outline-primary me-2";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.className = "btn btn-sm btn-outline-danger";

  li.appendChild(para);
  li.appendChild(completeBtn);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  saveLocalTodos(inputText, false);
  inputBox.value = "";
});

// Handle Edit/Delete/Complete
todoList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  const para = li?.querySelector("p");

  if (e.target.closest("button")?.innerHTML.includes("fa-trash")) {
    const todoText = para.innerText;
    todoList.removeChild(li);
    deleteLocalTodos(todoText);
  }

  if (e.target.closest("button")?.innerHTML.includes("fa-pen")) {
    editTodo = li;
    inputBox.value = para.innerText;
    inputBox.focus();
    addBtn.innerText = "Save Edit";
  }

  if (e.target.closest("button")?.innerHTML.includes("fa-check")) {
    para.classList.toggle("text-decoration-line-through"); // Apply strike-through
    updateCompletedState(para.innerText, para.classList.contains("text-decoration-line-through"));
  }
});

// LocalStorage functions
const saveLocalTodos = (todo, isCompleted = false) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push({ text: todo, completed: isCompleted });
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(({ text, completed }) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const para = document.createElement("p");
    para.className = "mb-0 flex-grow-1";
    para.innerText = text;

    if (completed) para.classList.add("text-decoration-line-through");

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeBtn.className = "btn btn-sm btn-outline-success me-2";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editBtn.className = "btn btn-sm btn-outline-primary me-2";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.className = "btn btn-sm btn-outline-danger";

    li.appendChild(para);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
};

const deleteLocalTodos = (todoText) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter((todo) => todo.text !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const editLocalTodos = (oldText, newText) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const index = todos.findIndex(todo => todo.text === oldText);
  if (index !== -1) {
    todos[index].text = newText;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const updateCompletedState = (todoText, isCompleted) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const index = todos.findIndex(todo => todo.text === todoText);
  if (index !== -1) {
    todos[index].completed = isCompleted;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

// Load todos on page load
document.addEventListener("DOMContentLoaded", getLocalTodos);


