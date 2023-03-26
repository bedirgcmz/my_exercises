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
function renderToDoList() {
  cardBody.innerHTML = taskArray
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
    taskArray.push(listItem);
  }
  itemAddText.value = "";
  renderToDoList();
});

/**
 * Task done event
 */
const taskDone = (pIndex) => {
  const chooseTask = taskArray.find((item, index) => index === pIndex);
  if (chooseTask.done_task_text === "") {
    chooseTask.done_task_text = "task-done";
    chooseTask.done_task_icon = "task-done-icon";
    renderToDoList();
  } else {
    chooseTask.done_task_text = "";
    chooseTask.done_task_icon = "";
    renderToDoList();
  }
};

/**
 * Remove an item
 */
function removeItem(pItem) {
  taskArray.splice(pItem, 1);
  renderToDoList();
}
/**
 * Remove all item
 */
deleteAll.addEventListener("click", function () {
  cardBody.innerHTML = "";
  taskArray = [];
});
