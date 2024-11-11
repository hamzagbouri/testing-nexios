const id = localStorage.getItem('id')
const productDetail = document.getElementById('product-detail')
console.log(id)
let firstTime = true;

let connection = new XMLHttpRequest();
connection.open("GET", 'https://www.brofortech.com/data.json', true);
connection.send();

connection.onreadystatechange = function () {
    if (connection.readyState === 4) {
        if (connection.status === 200) {
           
            let data = JSON.parse(connection.responseText);
            const allProducts = data.products
            const pro = allProducts[id-1]
            console.log(allProducts[id-1])
            productDetail.innerHTML = `
              <div class="images flex gap-4 w-1/3 h-full">
                      
                        <div class="image 2  bg-red">
                            <img class=" " src="${pro.imageUrl}" alt="">
                        </div>

                    </div>
                    <div class="content flex justify-center flex-col gap-4">
                        <div class="flex flex-col gap-4">
                            <h3 class="text-[#101750] font-bold text-3xl">${pro.marque}</h3>
                            <span class="flex items-center gap-2">
                                <div>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                </div>
                                <p> (22)</p>
                            </span>
                            <div class="flex gap-8">
                                <p class="text-[#151875]">${pro.price}.00$</p>
                                <p class="line-through text-[#FB2E86]">${pro.price+99}.00$</p>
                            </div>
                        </div>
                        <div class="text-[#151875] flex flex-col gap-4">
                            <p class="text-[#A9ACC6]">${pro.description}.</p>
                            <div class="flex gap-4">
                                <p>Color: </p>
                                <div class="flex gap-2">
                                    <img src="../img/customize/Ellipse 63.png" alt="">
                                    <img src="../img/customize/Ellipse 64.png" alt="">
                                    <img src="../img/customize/Ellipse 65.png" alt="">
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                    <label for="quantity" class="text-[#151875]">Quantity:</label>
                                    <input 
                                        type="number" 
                                        id="quantity" 
                                        min="1" 
                                       value="1"
                                        class="border border-gray-300 rounded w-16 text-center" 
                                    />
                                    <a id="addToCartt" class="cursor-pointer hover:underline text-[#1A0B5B]">Add to Cart</a>
                                </div>
                            <p>Categories : Laptops</p>
                            <p>Tags : Pc , Good Quality</p>
                        </div>
                    </div>
            `
            document.getElementById('addToCartt').addEventListener("click",()=> addToCart(pro))

        } else {
            console.error("Error fetching data: " + connection.status);
        }
        
        
    }
}
function showOnCart(cart){
    document.getElementById('item-list').innerHTML = ``
   console.log("aa", cart)
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
                                        id="cart-quantity" 
                                        min="1" 
                                       value="${item.Bquantity}"
                                       onchange="updateQuantity(${item.Bquantity}${item.id})"
                                        class="border border-gray-300 rounded w-16 text-center" 
                                    /> </div>
                         </div>
                        <span>${item.price * item.Bquantity} </span>`
        document.getElementById('item-list').appendChild(li)
    })
}
function updateQuantity(q,i){
    const carrt = JSON.parse(localStorage.getItem('cart') )|| [];
    for(let i =0; i< carrt.length;i++){
        if (carrt[i].id == i){
            carrt[i].Bquantity=parseInt(document.getElementById("cart-quantity").value)
            break;
        }
   }
   showOnCart(carrt)

    localStorage.setItem("cart", JSON.stringify(carrt))

}
function addToCart(pro){
    console.log(pro)
    const carrt = JSON.parse(localStorage.getItem('cart') )|| [];
   let quantity = parseInt(document.getElementById("quantity").value);

  
   
    const it = {
        id: pro.id,
        name: pro.marque,
        price: pro.price,
        Bquantity: quantity
    }
    let found = false
    let j
   for(let i =0; i< carrt.length;i++){
        if (carrt[i].id == it.id){
            found = true;
            j=i
        }
   }
   if(found){
    carrt[j].Bquantity +=  parseInt(document.getElementById("quantity").value)
   } else{
    carrt.push(it)
   }
   
    showOnCart(carrt)

    localStorage.setItem("cart", JSON.stringify(carrt))

    
        cartmenu.style.transform = "translateX(0)"
    
        document.getElementById('cart-close').addEventListener("click", function(){
              cartmenu.style.transform = "translateX(100%)"
        })


}





cartclose.addEventListener('click', () => {
    cartmenu.classList.add('translate-x-full'); 
});