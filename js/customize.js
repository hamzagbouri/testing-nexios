const id = localStorage.getItem('id')
const productDetail = document.getElementById('product-detail')
console.log(id)

let connection = new XMLHttpRequest();
let cart = []
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
                            <p  class="cursor-pointer hover:underline">Add to Cart</p>
                            <p>Categories : Laptops</p>
                            <p>Tags : Pc , Good Quality</p>
                        </div>
                    </div>
            `
        } else {
            console.error("Error fetching data: " + connection.status);
        }
        
        
    }
}







cartclose.addEventListener('click', () => {
    cartmenu.classList.add('translate-x-full'); 
});