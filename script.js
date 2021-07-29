// localStorage.clear();
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const selectEl = document.querySelector(".filter-todo");
const todoList = document.querySelector(".todo-list");
const dateInput = document.querySelector(".date-input");
dateInput.value = `${new Date().getFullYear()}-${
  new Date().getMonth() + 1 < 10
    ? "0" + (new Date().getMonth() + 1)
    : new Date().getMonth() + 1
}-${
  new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()
}`;

document.addEventListener("DOMContentLoaded", getTodos());
todoList.addEventListener("click", deleteCheck);
selectEl.addEventListener("click", filterTodo);

function sortByDate() {
  let todos, dates;
  if (localStorage.getItem("todos") === null) {
    todos = [];
    dates = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    dates = JSON.parse(localStorage.getItem("dates"));
  }
  var todosWithdDate = [];
  todos.forEach((todo, i) => {
    todosWithdDate[todo] = dates[i];
  });
  var sortable = [];
  for (var todo in todosWithdDate) {
    sortable.push([todo, todosWithdDate[todo]]);
  }

  sortable.sort(function (a, b) {
    return new Date(a[1]) - new Date(b[1]);
  });
  removeAllTodo();
  sortable.forEach(function (value) {
    createTodo(value[0], value[1]);
  });
}

function createTodo(userText, userDate) {
  let todoDiv = document.createElement("div");
  let spanText = document.createElement("span");
  spanText.innerText = userText;
  spanText.className = "user-text";
  let spanDate = document.createElement("span");
  spanDate.innerText = convert(userDate);
  spanDate.className = "user-date";
  todoDiv.className = "todo";

  const newTodo = document.createElement("li");
  newTodo.className = "todo-item";
  newTodo.appendChild(spanText);
  newTodo.appendChild(spanDate);
  todoDiv.appendChild(newTodo);

  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeBtn.className = "check-btn";
  todoDiv.appendChild(completeBtn);
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trashBtn.className = "trash-btn";
  todoDiv.appendChild(trashBtn);
  todoList.appendChild(todoDiv);
}

function removeAllTodo() {
  const todos = todoList.querySelectorAll(".todo");
  todos.forEach((el) => {
    el.parentNode.removeChild(el);
  });
  console.log(todos);
}

function deleteCheck(e) {
  const todo = e.target;
  let par = todo.parentElement;
  if (todo.classList[0] === "trash-btn") {
    par.classList.add("fall");
    let todoItem = par.childNodes[0];
    deleteTodoLS(todoItem.childNodes[0].innerText);
    par.addEventListener("transitionend", () => {
      par.remove();
    });
  }
  if (todo.classList[0] === "check-btn") {
    par.classList.toggle("completed");
  }
}
todoBtn.addEventListener("click", (e) => {
  addTodo(e);
});

function deleteTodoLS(el) {
  let todos, dates;
  if (localStorage.getItem("todos") === null) {
    todos = [];
    dates = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    dates = JSON.parse(localStorage.getItem("dates"));
  }
  let i = todos.indexOf(el);
  todos.splice(i, 1);
  dates.splice(i, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("dates", JSON.stringify(dates));
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function addTodo(e) {
  e.preventDefault();
  if (todoInput.value !== "") {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    if (todos.indexOf(todoInput.value) === -1) {
      let todoDiv = document.createElement("div");
      let spanText = document.createElement("span");
      spanText.innerText = todoInput.value;
      spanText.className = "user-text";
      let spanDate = document.createElement("span");
      spanDate.innerText = convert(dateInput.value);
      spanDate.className = "user-date";
      todoDiv.className = "todo";

      const newTodo = document.createElement("li");
      newTodo.className = "todo-item";
      newTodo.appendChild(spanText);
      newTodo.appendChild(spanDate);
      todoDiv.appendChild(newTodo);
      saveLocalTodos(todoInput.value, dateInput.value);

      const completeBtn = document.createElement("button");
      completeBtn.innerHTML = '<i class="fas fa-check"></i>';
      completeBtn.className = "check-btn";
      todoDiv.appendChild(completeBtn);
      const trashBtn = document.createElement("button");
      trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
      trashBtn.className = "trash-btn";
      todoDiv.appendChild(trashBtn);
      todoList.appendChild(todoDiv);
    }
    todoInput.value = "";
    sortByDate();
  }
}

function convert(date) {
  let curDate = new Date(date);
  curDate = `${
    curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate()
  }-${
    curDate.getMonth() + 1 < 10
      ? "0" + (curDate.getMonth() + 1)
      : curDate.getMonth() + 1
  }-${curDate.getFullYear()}`;
  return curDate;
}

function saveLocalTodos(todo, currentDate) {
  let todos, dates;
  if (localStorage.getItem("todos") === null) {
    todos = [];
    dates = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    dates = JSON.parse(localStorage.getItem("dates"));
  }
  dates.push(currentDate);
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("dates", JSON.stringify(dates));
}

function getTodos() {
  let todos, dates;
  if (localStorage.getItem("todos") === null) {
    todos = [];
    dates = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    dates = JSON.parse(localStorage.getItem("dates"));
  }
  todos.forEach(function (todo, i) {
    createTodo(todo, dates[i]);
  });
  sortByDate();
}
