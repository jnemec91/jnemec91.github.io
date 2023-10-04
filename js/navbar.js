

function ToggleMenu(){
    let navbar = document.getElementById("navbar");
    let navbar_toggler = document.getElementById("navbar-toggler");
    
    navbar.classList.toggle('collapsed');

    if(navbar.classList.contains('collapsed')){
        navbar_toggler.style.display = "none";
    }else{
        navbar_toggler.style.display = "block";
    }
}