// start ur code here
// start ur code here
let scroller = document.getElementById("scroller");
let hieght = document.documentElement.scrollHeight - document.documentElement.clientHeight

window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop
    
    scroller.style.width = `${(scrollTop / hieght) * 100}%`
})