// start ur code here
let modal = document.getElementById("modal");
let checkoutBtn = document.getElementById("Checkout-btn");
let modalCloseBtn = document.getElementById("modalCloseBtn");

checkoutBtn.addEventListener("click",function(){
    modal.style.display = "flex"
    cartmenu.classList.add('translate-x-full');
})
modalCloseBtn.addEventListener("click" , function(){
    modal.style.display = "none"
})
