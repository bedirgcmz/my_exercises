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
function renderToDoList(){
    cardBody.innerHTML = taskArray.map((item,index) => {
    return `
        <div class="list-item">
            <li class="list-item-text">${item}</li>
            <i onclick="removeItem(${index})" class="far fa-trash-alt"></i>
        </div>
    `
    }).join("");
};
/**
 * Add new ask 
 */
itemAddButton.addEventListener("click", function (){
    let inputValue = itemAddText.value;
    if(inputValue == ""){
        alert("This not a task!!")
    }else{
        taskArray.push(inputValue)
    }
    itemAddText.value = ""
    renderToDoList();
})
/**
 * Remove an item
 */
function removeItem(pItem){
    taskArray.splice(pItem,1)
    renderToDoList();
}
/**
 * Remove all item
 */
deleteAll.addEventListener("click", function(){
    cardBody.innerHTML = "";
    taskArray = [];
});