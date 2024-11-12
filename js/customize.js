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
            const gpu = data.products.filter(item => item.category === 'GPU');
            const cpu = data.products.filter(item => item.category === 'CPU');

            const memory = data.products.filter(item => item.category === 'memoire');
            function fetchGpu(id){
                for (let i=0; i<gpu.length;i++){
                    if (gpu[i].id == id){
                       return gpu[i]
                    }
                }
            
            }
            function fetchCpu(id){
                for (let i=0; i<cpu.length;i++){
                    if (cpu[i].id == id){
                        return cpu[i]
                    }
                }
                
            }
            function fetchMemoire(id){
                for (let i=0; i<memory.length;i++){
                    if (memory[i].id == id){
                        return memory[i]
                    }
                }
                
            }
            console.log(gpu,cpu,memory)
            if(pro.category === 'PC')
            {
                let proGpu = fetchGpu(pro.idGPU)
                let proCpu = fetchCpu(pro.idCPU)
                let proMem = fetchMemoire(pro.idMemoire)
                console.log(pro, proCpu, proGpu, proMem)
                pro.price = pro.priceMini + proCpu.price + proGpu.price + proMem.price

                productDetail.innerHTML=`
                     <div class="images flex gap-4 ">
                  
                    <div class="image 2">
                        <img class=" w-72 h-72md:h-full" src="${pro.imageUrl}" alt="">
                    </div>

                </div>
                <div class="content flex justify-center flex-col gap-2">
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
                            <p id="product-price" class="text-[#151875]">${pro.price}.00$</p>
                            <p class="line-through text-[#FB2E86]">${pro.price+99}.00$</p>
                        </div>
                    </div>
                    <div class=" flex flex-col gap-2">
                        <p id="product-description" class="text-[#A9ACC6]">${pro.description}. GPU: ${proGpu.serie} CPU: ${proCpu.serie} Memoire: ${proMem.marque}</p>
                        <div class="text-[#151875] flex gap-4">
                            <p>Color: </p>
                            <div class="flex gap-2">
                                <img src="../img/customize/apah.svg" alt="">
                                <img src="../img/customize/Ellipse 64.png" alt="">
                                <img src="../img/customize/Ellipse 65.png" alt="">
                            </div>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="flex gap-8">
                                <select class="bg-[#EEE8E8] p-2  pr-4 rounded-xl " onchange="show()" name="gpu" id="gpu" >
                                    <option value="" class="text-[#848484]" disabled selected>Choose a GPU</option>
                                    <option value="NVIDIA">NVIDIA</option>
                                    <option value="AMD">AMD</option>
                                    <option value="Intel">Intel</option>
                                    
                                  </select>
                                  <select class="bg-[#EEE8E8] p-2 pr-4 rounded-xl hidden " name="gpu-serie" id="gpu-serie" >
                                    <option value="" class="text-[#848484]" disabled selected>Choose a GPU Serie</option>
                                  
                                  </select>
                                </div>
                            <div class="flex gap-8">
                                <select class="bg-[#EEE8E8] p-2 pr-4 rounded-xl "  name="cpu" id="cpu" >
                                    <option value="" class="text-[#848484]" disabled selected>Choose a CPU</option>
                                    <option value="Intel">Intel</option>
                                    <option value="AMD">AMD</option>
                                  
                                  </select>
                                  <select class="bg-[#EEE8E8] p-2 pr-4 rounded-xl hidden" name="cpu-serie" id="cpu-serie" >
                                    <option value="" class="text-[#848484]" disabled selected>Choose a CPU Serie</option>
                                  
                                  </select>
                                </div>
                                <div class="flex gap-8">
                                    <select class="bg-[#EEE8E8] p-2 pr-4 rounded-xl " name="memoire" id="memoire" >
                                        <option value="" class="text-[#848484]" disabled selected>Choose a Memory</option>
                                        
                                    </select>
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
                        <div class="flex gap-8">
                            <p class="text-[#151875]">Categories : Laptops</p>
                            <p class="text-[#151875]">Tags : Pc , Good Quality</p>
                        </div>
                      
                    </div>
                </div> 
                `
                document.getElementById('gpu').addEventListener('change',  showGPU)
                document.getElementById('cpu').addEventListener('change', showCPU)
                document.getElementById('cpu-serie').addEventListener('change', changeCpu)
                document.getElementById('gpu-serie').addEventListener('change', changeGpu)
                document.getElementById('memoire').addEventListener('change', changeMem)


               
                const mem = document.getElementById("memoire");
                const gpuSerieInput = document.getElementById("gpu-serie");
                const gpuInput = document.getElementById("gpu");
                const cpuSerieInput = document.getElementById("cpu-serie");
                const cpuInput = document.getElementById("cpu");
                function showGPU(){
                    // GPU dropdown
                    if (gpu.value == "" ){
                        gpuSerieInput.style.display="none"} 
                    else {
                        gpuSerieInput.style.display="block"
                        if (gpuInput.value == 'AMD'){
                            document.getElementById("gpu-serie").innerHTML=`
                            <option value="" class="text-[#848484]" disabled selected>Choose a GPU Serie</option>
                       `
                            const gpuS = data.products.filter(item => item.marque === 'AMD' && item.category == 'GPU');
                            console.log(gpuS)
                            gpuS.forEach(item => {
                               
                                const option = document.createElement("option");
                               
                                option.value = item.id;        
                                option.textContent = item.serie;
                                document.getElementById("gpu-serie").appendChild(option);
                            });
                          
                        }
                        else if (gpuInput.value == 'NVIDIA')
                        {
                            document.getElementById("gpu-serie").innerHTML=`
                                     <option value="" class="text-[#848484]" disabled selected>Choose a GPU Serie</option>
                                `
                            const gpuS = data.products.filter(item => item.marque === 'NVIDIA' && item.category == 'GPU');
                            console.log(gpuS)
                            gpuS.forEach(item => {
                                
                                const option = document.createElement("option");
                                option.value = item.id;        
                                option.textContent = item.serie; 
                                document.getElementById("gpu-serie").appendChild(option);
                            });
                        }
                        else 
                        {
                            document.getElementById("gpu-serie").innerHTML=`
                            <option value="" class="text-[#848484]" disabled selected>Choose a GPU Serie</option>
                       `
                            const gpuS = data.products.filter(item => item.marque === 'Intel' && item.category == 'GPU');
                            console.log(gpuS)
                            gpuS.forEach(item => {
                                const option = document.createElement("option");
                                option.value = item.id;        // Use item.id or another unique identifier as the option value
                                option.textContent = item.serie; // Display the GPU name in the dropdown
                                document.getElementById("gpu-serie").appendChild(option);
                            }); 
                        }
                       
                       
                        

                    }
                }     
                 // CPU DROPDOWN
                function showCPU(){
                    if (cpuInput.value == "" ){
                        cpuSerieInput.style.display="none"} 
                    else {
                        cpuSerieInput.style.display="block"
                        if (cpuInput.value == 'AMD'){
                            document.getElementById("cpu-serie").innerHTML=`
                            <option value="" class="text-[#848484]" disabled selected>Choose a CPU Serie</option>
                       `
                            const cpuS = data.products.filter(item => item.marque === 'AMD' && item.category == 'CPU');
                            console.log(cpuS)
                            cpuS.forEach(item => {
                                const option = document.createElement("option");
                                option.value = item.id;        
                                option.textContent = item.serie; 
                                document.getElementById("cpu-serie").appendChild(option);
                            });
                            
                        }
                       
                        else 
                        {
                            document.getElementById("cpu-serie").innerHTML=`
                            <option value="" class="text-[#848484]" disabled selected>Choose a CPU Serie</option>
                       `
                            const cpuS = data.products.filter(item => item.marque === 'Intel' && item.category == 'CPU');
                            console.log(cpuS)
                            cpuS.forEach(item => {
                                const option = document.createElement("option");
                                option.value = item.id;        // Use item.id or another unique identifier as the option value
                                option.textContent = item.serie; // Display the cpu name in the dropdown
                                document.getElementById("cpu-serie").appendChild(option);
                            }); 
                        }
                }      
            }    
                
                memory.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.id;        // Use item.id or another unique identifier as the option value
                    option.textContent = item.marque; // Display the GPU name in the dropdown
                    mem.appendChild(option);
                });
                function changeCpu(){
                    const newCpu = document.getElementById('cpu-serie').value
                        pro.price -= proCpu.price
                        proCpu = allProducts[newCpu-1]
                        console.log(proCpu)
                        pro.price += proCpu.price
                        console.log(pro.price)
                        document.getElementById("product-price").innerText = pro.price + ".00$"
                        document.getElementById("product-description").innerText = pro.description + " GPU: " + proGpu.marque +" " + proGpu.serie + " CPU: " + proCpu.marque +" "+ proCpu.serie + " Memoire: " + proMem.marque
                        
                        

                }
                function changeGpu(){
                    const newGpu = document.getElementById('gpu-serie').value
                    pro.price -= proGpu.price
                    proGpu = allProducts[newGpu-1]
                    console.log(proGpu)
                    pro.price += proGpu.price
                    console.log(pro.price)
                    document.getElementById("product-price").innerText = pro.price + ".00$"
                    document.getElementById("product-description").innerText = pro.description + " GPU: " + proGpu.marque +" " + proGpu.serie + " CPU: " + proCpu.marque +" "+ proCpu.serie + " Memoire: " + proMem.marque

                }
                function changeMem(){
                    const newMem = document.getElementById('memoire').value
                    pro.price -= proMem.price
                    proMem = allProducts[newMem-1]
                    console.log(proMem)
                    pro.price += proMem.price
                    console.log(pro.price)
                    document.getElementById("product-price").innerText = pro.price + ".00$"
                    document.getElementById("product-description").innerText = pro.description + " GPU: " + proGpu.marque +" " + proGpu.serie + " CPU: " + proCpu.marque +" "+ proCpu.serie + " Memoire: " + proMem.marque


                }

            } else {
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

            }
           
            document.getElementById("addToCartt").addEventListener("click", () => addToCart(pro))

        } else {
            console.error("Error fetching data: " + connection.status);
        }
        
        
    }
}

function showOnCart(cart){
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
function updateQuantity(id, element){
    console.log(element)
    const carrt = JSON.parse(localStorage.getItem('cart') )|| [];
    for(let i =0; i< carrt.length;i++){
        if (carrt[i].id == id){
            carrt[i].Bquantity=parseInt(element.value)
            console.log()
            
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





