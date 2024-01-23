function ToggleMenu(){
    let screen_width = window.innerWidth;
    let navbar = document.getElementById("navbar");
    let navbar_toggler = document.getElementById("navbar-toggler");
    
    if(screen_width < 1420){

        navbar.classList.toggle('collapsed');

        if(navbar.classList.contains('collapsed')){
            navbar_toggler.style.display = "none";
        }else{
            navbar_toggler.style.display = "block";
        }
    }
}