

function ToggleMenu(){
    let navbar = document.getElementById("navbar")

    if(navbar.classList.contains("navbar-hidden")){
        navbar.classList.remove("navbar-hidden")
        navbar.classList.add("navbar-visible")
    }
    else{
        navbar.classList.remove("navbar-visible")
        navbar.classList.add("navbar-hidden")
    }
}