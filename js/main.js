const menutoggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const carttoggle = document.getElementById('cart-toggle');
const cartmenu = document.getElementById('cart-menu');
const cartclose = document.getElementById('cart-close');

menutoggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

carttoggle.addEventListener('click', () => {
    cartmenu.classList.toggle('translate-x-full'); 
});

cartclose.addEventListener('click', () => {
    cartmenu.classList.add('translate-x-full'); 
});