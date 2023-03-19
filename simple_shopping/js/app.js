/**
 * varaibles
 */
const addButton = document.querySelector("#btn-add");
const btnRight = document.querySelector("#btn-right");
const btnLeft = document.querySelector("#btn-left");
const shopList = document.querySelector("#shopping-list-container");
const cartList = document.querySelector("#cart-container");
const input = document.querySelector("#input-product");
const shoppingProductList = [];
const cartProductList = [];
/**
 * Render product for shopping list
 */
function renderShoppingProductList(){
    shopList.innerHTML = shoppingProductList.map((item,index) => {
        return `
        <li class="list-group-item">
            ${item}
            <i class="fas fa-plus-circle text-primary float-end" onclick="addProductCartList(${index})"></i>
        </li>
        `
    }).join("");
    
};
/**
 * Add product to cart list from shopping list
 * @param {*} pIndex 
 */
function addProductCartList(pIndex){
    let selectProduct = shoppingProductList[pIndex];
    cartProductList.push(selectProduct);    
    shoppingProductList.splice(pIndex,1);
    renderShoppingProductList();
    renderCartProductList();
};
/**
 * Render product for cart list
 */
function renderCartProductList(){
    cartList.innerHTML = cartProductList.map((item,index) => {
        return `
        <li class="list-group-item">
            ${item}
            <i class="fas fa-trash-alt text-danger float-end" onclick="addProductShoppingList(${index})"></i>
        </li>
        `
    }).join("");
};
/**
 * Add product to shopping list from cart list
 * @param {*} pIndex 
 */
function addProductShoppingList(pIndex){
    let selectProduct = cartProductList[pIndex];
    shoppingProductList.push(selectProduct);  
    cartProductList.splice(pIndex,1);
    renderShoppingProductList();
    renderCartProductList();
};
/**
 * Add button event
 */
addButton.addEventListener("click", function(){
    let inputValue = input.value.trim();
    if(inputValue !== ""){
        shoppingProductList.push(inputValue);
    };
    renderShoppingProductList();
    input.value = "";
});
/**
 * Right button event
 */
btnRight.addEventListener("click", function(){
    shoppingProductList.map(item => {
        cartProductList.push(item)
    });
    let productLenght = shoppingProductList.length
    shoppingProductList.splice(0,productLenght);
    renderCartProductList();
    renderShoppingProductList();
});
/**
 * Left button event
 */
btnLeft.addEventListener("click", function(){
    cartProductList.map(item => {
        shoppingProductList.push(item);
    });
    let productLenght = cartProductList.length
    cartProductList.splice(0,productLenght);
    renderCartProductList();
    renderShoppingProductList();
});
/**
 * Call function
 */
renderCartProductList();
renderShoppingProductList();