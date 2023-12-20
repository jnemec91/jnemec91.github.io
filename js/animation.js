function add_ball(){
    let par = document.getElementById('main')
    let posx = Math.floor(Math.random() * screen.width);
    let posy = window.scrollY;

    console.log(posx, posy, par)

    const ball = document.createElement("div");
    ball.classList.add('ball');
    par.appendChild(ball);


    ball.style.position = "absolute";
    ball.style.left = posx+'px';
    ball.style.top = posy+'px';

    let pos=posy
    let id;

    id = setInterval(frame, 3);

    function frame() {
    if (pos >= screen.height+ window.scrollY - 180 || pos < window.scrollY - 50) {
        clearInterval(id);
        ball.remove()
        let interval = Math.floor(Math.random() * 10000);            
        setTimeout(() => add_ball(), interval);
    } else {
        ball.style.top = pos+'px';
        pos = pos + 2
        }
    }
}

window.addEventListener("load", function(){
    for (let i = 0; i < 30; i++) {
        let maxballs = 0;
        if (maxballs < 30){
            let interval = Math.floor(Math.random() * 10000);            
            setTimeout(() => add_ball(), interval);
            maxballs = maxballs  + 1
        }
        
    }
    
});

