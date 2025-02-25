const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const warnPara = document.getElementById("warnPara");

let editTodo = null;

// Function to add todo
addBtn.addEventListener("click", () => {
  const inputText = inputBox.value.trim();

  if (inputText.length === 0) {
    warnPara.innerText = "Please write something in your Todo!";
    warnPara.style.fontWeight = "bold";
    return;
  }

  warnPara.innerText = "";

  if (addBtn.value === "Save Edit") {
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodos(inputText);
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    const createdlistItemEle = document.createElement("li");

    const createParaEle = document.createElement("p");
    createParaEle.innerHTML = inputText;

    createdlistItemEle.append(createParaEle);

    todoList.append(createdlistItemEle);

    const createdEditBtn = document.createElement("button");
    createdEditBtn.innerText = "Edit";
    createdEditBtn.classList.add("btn", "editBtn");
    createdlistItemEle.append(createdEditBtn);

    const createdDeleteBtn = document.createElement("button");
    createdDeleteBtn.innerText = "Delete";
    createdDeleteBtn.classList.add("btn", "deleteBtn");
    createdlistItemEle.append(createdDeleteBtn);

    todoList.append(createdlistItemEle);
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
});

// To update Todo i.e. edit and delete
todoList.addEventListener("click", (e) => {
  if (e.target.innerHTML === "Delete") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Save Edit";
    editTodo = e;
  }
});

// function for save todo in localstorage of browser
const saveLocalTodos = (todo) => {
  let todos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

// To show localstorage of todo
const getLocalTodos = () => {
  let todos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      const createdlistItemEle = document.createElement("li");
      const createParaEle = document.createElement("p");
      createParaEle.innerHTML = todo;
      createdlistItemEle.append(createParaEle);

      const createdEditBtn = document.createElement("button");
      createdEditBtn.innerText = "Edit";
      createdEditBtn.classList.add("btn", "editBtn");
      createdlistItemEle.append(createdEditBtn);

      const createdDeleteBtn = document.createElement("button");
      createdDeleteBtn.innerText = "Delete";
      createdDeleteBtn.classList.add("btn", "deleteBtn");
      createdlistItemEle.append(createdDeleteBtn);

      todoList.appendChild(createdlistItemEle);
    });
  }
};

// Function to delete todo from localstorage
const deleteLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  // console.log(todoIndex);
};

// function to edit todo from localstorage
const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", getLocalTodos);
