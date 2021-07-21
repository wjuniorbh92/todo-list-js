function setLocalStorage(id, item, checked) {
  objLocalStorage = { value: item, checked: checked };
  localStorage.setItem(id, JSON.stringify(objLocalStorage));
  sortList();
}

function removeLocalStorage(id) {
  localStorage.removeItem(id);
}

function getAllLocalStorage() {
  const items = { ...localStorage };
  for (var id in items) {
    const getValue = JSON.parse(items[id]).value;
    const getChecked = JSON.parse(items[id]).checked;
    renderApp(id, getValue, getChecked);
  }
  sortList();
}

function sortList() {
  // Funcao para filtrar os arrays e mandar eles para baixo da lista
  ulList = document.querySelector(".todoListApp");
  const elements = Array.from(ulList.children);
  elements
    .sort((a, b) => {
      const aClassName = a.querySelector("li").classList[0];
      const bClassName = b.querySelector("li").classList[0];
      return aClassName == bClassName
        ? 0
        : bClassName == "checkedItem"
        ? -1
        : 1;
    })
    .forEach((li) => ulList.appendChild(li));
}
