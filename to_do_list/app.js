/**
 * Varaibles
 */
const cardBody = document.getElementById("card-body");
const itemAddText = document.querySelector("#list-item-input");
const itemAddButton = document.getElementById("list-item-add-button");
const deleteAll = document.querySelector("#delete-all");
let taskArray = [];

/**
 * Array render to do list "First task","Second task"
 */
function renderToDoList(pArray) {
  console.log(pArray[0]);
  if (pArray[0] === undefined) {
    cardBody.innerHTML = `<p class="not-todo">Have some fun today. You have nothing to do.<i class="fa-solid fa-hand-peace ms-2"></p>`;
  } else {
    cardBody.innerHTML = pArray
      .map((item, index) => {
        return `
            <div class="list-item">
                <li id="${index}" class="list-item-text ${item.done_task_text}">${item.text}</li>
                <div> 
                    <i onclick="removeItem(${index})" class="far fa-trash-alt"></i>
                    <i id="${index}icon" onclick="taskDone(${index})"  class="fa-solid fa-circle-check ${item.done_task_icon}"></i>
                </div>
            </div>
        `;
      })
      .join("");
  }
}
/**
 * Add new ask
 */

itemAddButton.addEventListener("click", function () {
  let inputValue = itemAddText.value;
  if (inputValue == "") {
    alert("This not a task!!");
  } else {
    const listItem = {
      text: inputValue,
      done_task_text: "",
      done_task_icon: "",
    };
    const taskArrayInLocal = getLocalStorage("todoList");
    taskArrayInLocal.push(listItem);
    setLocalStorage("todoList", taskArrayInLocal);
    const newTaskArray = getLocalStorage("todoList");
    renderToDoList(newTaskArray);
  }
  itemAddText.value = "";
});

/**
 * Task done event
 */
const taskDone = (pIndex) => {
  const taskArrayInLocal = getLocalStorage("todoList");
  const chooseTask = taskArrayInLocal.find((item, index) => index === pIndex);
  if (chooseTask.done_task_text === "") {
    chooseTask.done_task_text = "task-done";
    chooseTask.done_task_icon = "task-done-icon";
    setLocalStorage("todoList", taskArrayInLocal);
    const newTaskArray = getLocalStorage("todoList");
    renderToDoList(newTaskArray);
  } else {
    chooseTask.done_task_text = "";
    chooseTask.done_task_icon = "";
    setLocalStorage("todoList", taskArrayInLocal);
    const newTaskArray = getLocalStorage("todoList");
    renderToDoList(newTaskArray);
  }
};

/**
 * Remove an item
 */
function removeItem(pItem) {
  const taskArrayInLocal = getLocalStorage("todoList");
  taskArrayInLocal.splice(pItem, 1);
  setLocalStorage("todoList", taskArrayInLocal);
  const newTaskArray = getLocalStorage("todoList");
  renderToDoList(newTaskArray);
}
/**
 * Remove all item
 */
deleteAll.addEventListener("click", function () {
  cardBody.innerHTML = `<p class="not-todo">Have some fun today. You have nothing to do.<i class="fa-solid fa-hand-peace ms-2"></i></p>`;
  taskArray = [];
  setLocalStorage("todoList", taskArray);
});
/**
 * LocalStorage add and undo player list functions
 */
const setLocalStorage = (pStringKey, pArrar) => {
  localStorage.setItem(pStringKey, JSON.stringify(pArrar));
};
const getLocalStorage = (pStringKey) => {
  return JSON.parse(localStorage.getItem(pStringKey));
};

/*If there is no array in localstorage, it will be thrown there first,
It will be rendered later. If there is an array, it will be rendered directly.*/
if (localStorage.getItem("todoList") === null) {
  setLocalStorage("todoList", taskArray);
}

renderToDoList(getLocalStorage("todoList"));
