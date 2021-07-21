const addButtom = document.querySelector(".addButtom");
const todoApp = document.querySelector(".todoListApp");
const buttonEdit = document.querySelector(".submitEdit");
const closeEditBtn = document.getElementsByClassName("close")[0];
var editValueAux; // Variavel auxiliar para pegar o ID do Todo

function renderApp(id, value, checked) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const liTodo = document.createElement("li");
  liTodo.innerText = value;
  liTodo.id = id;
  todoDiv.appendChild(liTodo);

  // Botao de Check
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check fa-lg"></i>';
  checkButton.classList.add("checkButton");
  todoDiv.appendChild(checkButton);

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="far fa-edit fa-lg"></i>';
  editButton.classList.add("editButton");
  todoDiv.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-times fa-lg"></i>';
  deleteButton.classList.add("deleteButton");

  todoDiv.appendChild(deleteButton);
  todoApp.appendChild(todoDiv);
  checked ? liTodo.classList.add("checkedItem") : "";
}

function handleInputTask() {
  event.preventDefault();
  const inputValue = document.querySelector(".inputTodo");
  const id = Date.now();

  if (inputValue.value === "") {
    return null;
  }

  renderApp(id, inputValue.value);
  setLocalStorage(id, inputValue.value, false);
  inputValue.value = "";
}

function handleClickTodoApp(event) {
  item = event.target;

  if (item.classList[0] === "checkButton") {
    const todo = item.parentElement;
    const idLi = todo.querySelector("li").id;
    const valueLi = todo.querySelector("li").innerText;
    const checkedLi = todo.querySelector("li").classList[0];
    //Togle o Checked para poder marcar ou desmarcar daria para usar um ternario?????
    if (checkedLi === "checkedItem") {
      todo.querySelector("li").classList.remove("checkedItem");
      todo.querySelector("li").classList.add("unCheckedItem");
      setLocalStorage(idLi, valueLi, false);
    } else {
      checkedValue = true;
      todo.querySelector("li").classList.remove("unCheckedItem");
      todo.querySelector("li").classList.add("checkedItem");
      setLocalStorage(idLi, valueLi, true);
    }
  }

  if (item.classList[0] === "deleteButton") {
    if (window.confirm("Você realmente deseja excluir esse evento?")) {
      var todo = item.parentElement;
      const idLi = todo.querySelector("li").id;
      todo.remove();
      removeLocalStorage(idLi);
    }
  }
  if (item.classList[0] === "editButton") {
    const todo = item.parentElement;
    const idLi = item.parentElement.querySelector("li").id;
    editValueAux = idLi; // Pega o valor do ID para passar para a funçao de edit
    document.querySelector(".modal").style.display = "block"; //Mostra o modal box
  }
}

function handleInputEdit() {
  const editInputValue = document.querySelector(".inputModal").value;

  if (editInputValue === "") {
    document.getElementsByClassName("modal")[0].style.display = "none";
    return;
  }

  const todo = item.parentElement;
  todo.querySelector("li").classList.remove("checkedItem");
  todo.querySelector("li").classList.add("unCheckedItem");
  todo.querySelector("li").innerText = editInputValue;

  setLocalStorage(editValueAux, editInputValue, false);
  document.getElementsByClassName("modal")[0].style.display = "none";
  document.querySelector(".inputModal").value = "";
}

addButtom.addEventListener("click", handleInputTask);
todoApp.addEventListener("click", handleClickTodoApp);
buttonEdit.addEventListener("click", handleInputEdit);

window.onload = getAllLocalStorage();

// When the user clicks on <span> (x), close the modal
closeEditBtn.onclick = function () {
  document.getElementsByClassName("modal")[0].style.display = "none";
};
