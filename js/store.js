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




let connection = new XMLHttpRequest();
let product_container = document.getElementById('product');
const limit = 12;
function customizeItem( id){
    localStorage.setItem("id", id)  
    window.location.href = "./customize.html"
}


connection.open("GET", 'https://www.brofortech.com/data.json', true);
connection.send();

connection.onreadystatechange = function () {
    if (connection.readyState === 4) {
        if (connection.status === 200) {
            let data = JSON.parse(connection.responseText);
            let filter = data.products.filter((item => item.id <= 35));
            function pagination(number_page) {
                const start = (number_page - 1) * limit;
                const end =    number_page * limit;
                const paginate_item = filter.slice(start, end);
                product_container.innerHTML = '';
                paginate_item.forEach(item => {
                    product_container.innerHTML += `
                    <div>
                        <img class="w-full h-50" src="${item.imageUrl}" alt="Dell Laptop">
                        <div class="flex justify-between items-center flex-wrap w-full space-y-3">
                            <p class="text-2xl text-[#1A0B5B] w-1/2 ">${item.marque}</p>
                            <p class="text-2xl text-[#1A0B5B] w-1/2 text-right">${item.price}.00$</p>
                            <a id='cut-btn' href="#" onclick="customizeItem(${item.id})"  class="w-1/2 text-[#1A0B5B] text-lg underline pl-4">Customize</a>
                            <button type="button" class="w-1/4 text-lg p-2 mr-8 bg-[#1A0B5B] text-white hover:bg-[#150a42] focus:outline-none focus:ring-2 focus:ring-[#FB2E86] focus:ring-opacity-50">
                                Add to cart
                            </button>                    
                        </div>
                    </div>
                    `;
                });
            }
            
           
            pagination(1);
            const totalPages = Math.ceil(35 / limit);
            console.log('Total Pages:', totalPages);
            const paginationContainer = document.getElementById('pagination-buttons');
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = `${i}`;
                pageButton.onclick = function () {
                    pagination(i);
                };
                paginationContainer.appendChild(pageButton);
            }
        } else {
            console.error("Error fetching data: " + connection.status);
        }
    }
}
