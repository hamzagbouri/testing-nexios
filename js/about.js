// start ur code here
let scroller = document.getElementById("scroller");
let hieght = document.documentElement.scrollHeight - document.documentElement.clientHeight

window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop
    
    scroller.style.width = `${(scrollTop / hieght) * 100}%`
})
const menutoggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const carttoggle = document.getElementById('cart-toggle');
const cartmenu = document.getElementById('cart-menu');
const cartclose = document.getElementById('cart-close');
menutoggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
function openCard(){
    cartmenu.style.transform = "translateX(0)"
 const cart = JSON.parse(localStorage.getItem('cart') )|| [];

        document.getElementById('item-list').innerHTML = ``
       console.log("aa", cart)
       let total =0;
        cart.forEach(item => {
            
            const li = document.createElement('li')
            li.className = 'flex justify-between text-sm text-gray-600'
            li.innerHTML = `
                            <div class="flex flex-col">
                             <span>${item.name} (${item.Bquantity})</span>
                             <div class="flex gap-4">
                              <label for="cart-quantity" >Quantity:</label>
                                        <input 
                                            type="number" 
                                            id="cart-quantity-${item.id}" 
                                            min="1" 
                                           value="${item.Bquantity}"
                                           onchange="updateQuantity(${item.id}, this)"
                                            class="border border-gray-300 rounded w-16 text-center" 
                                        /> </div>
                             </div>
                            <span>${item.price * item.Bquantity}.00$ </span>`
            document.getElementById('item-list').appendChild(li)
            total += item.price * item.Bquantity
        })
        document.getElementById("total-p").innerText = total + ".00$" 
    
}
function closeCard(){
    cartmenu.style.transform = "translateX(100%)"

}


cartclose.addEventListener('click', () => {
});