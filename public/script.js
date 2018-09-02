// responsive navbar
var toggler    = document.querySelector(".toggler");
var responsive = document.querySelector(".nav-responsive");
toggler.addEventListener("click", function(){
    responsive.classList.toggle("nav-is-visible");
});
window.addEventListener("resize", function(){
    if(responsive.classList.contains("nav-is-visible") && window.innerWidth > 768){
        responsive.classList.remove("nav-is-visible");
    }
});