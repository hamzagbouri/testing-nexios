// start ur code here
let modal = document.getElementById("modal");
let checkoutBtn = document.getElementById("Checkout-btn");
let modalCloseBtn = document.getElementById("modalCloseBtn");
let validationButton = document.getElementById("validation-btn");

checkoutBtn.addEventListener("click",function(){
    modal.style.display = "flex"
    cartmenu.classList.add('translate-x-full');
})
modalCloseBtn.addEventListener("click" , function(){
    modal.style.display = "none"
})


validationButton.addEventListener("click" , function(){

    isConfirme = confirm("Valid your cart !");

    if(isConfirme){
        modal.style.display = "flex"
        cartmenu.classList.add('translate-x-full');
    }
})