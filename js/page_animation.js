let maxbees = 0;
let cursor_x = 0;
let cursor_y = 0;

document.onmousemove = function(event)
{
 cursor_x = event.pageX;
 cursor_y = event.pageY;
}

function create_bee(){
    let par = document.getElementById('main')
    let posx = cursor_x;
    let posy = cursor_y;

    const bee = document.createElement("div");

    const body = document.createElement('div');
    body.classList.add('bee_body');

    const leg1 = document.createElement('div');
    leg1.classList.add('leg');
    leg1.classList.add('leg-left');
    leg1.classList.add('leg-left-top');

    const leg2 = document.createElement('div');
    leg2.classList.add('leg');
    leg2.classList.add('leg-right');
    leg2.classList.add('leg-right-top');

    const leg3 = document.createElement('div');
    leg3.classList.add('leg');
    leg3.classList.add('leg-left');
    leg3.classList.add('leg-left-middle');

    const leg4 = document.createElement('div');
    leg4.classList.add('leg');
    leg4.classList.add('leg-right');
    leg4.classList.add('leg-right-middle');

    const leg5 = document.createElement('div');
    leg5.classList.add('leg');
    leg5.classList.add('leg-left');
    leg5.classList.add('leg-left-bottom');

    const leg6 = document.createElement('div');
    leg6.classList.add('leg');
    leg6.classList.add('leg-right');
    leg6.classList.add('leg-right-bottom');

    body.appendChild(leg1);
    body.appendChild(leg2);
    body.appendChild(leg3);
    body.appendChild(leg4);
    body.appendChild(leg5);
    body.appendChild(leg6);

    const head = document.createElement('div');
    head.classList.add('bee_head');

    const eye1 = document.createElement('div');
    eye1.classList.add('eye');
    eye1.classList.add('eye-left');

    const eye2 = document.createElement('div');
    eye2.classList.add('eye');
    eye2.classList.add('eye-right');

    head.appendChild(eye1);
    head.appendChild(eye2);

    const tail = document.createElement('div');  
    tail.classList.add('tail');

    const stripe1 = document.createElement('div');
    stripe1.classList.add('stripe');
    stripe1.classList.add('stripe-top');

    const stripe2 = document.createElement('div');
    stripe2.classList.add('stripe');
    stripe2.classList.add('stripe-bottom');

    tail.appendChild(stripe1);
    tail.appendChild(stripe2);

    const wing1 = document.createElement('div');
    wing1.classList.add('wing');
    wing1.classList.add('wing-left');

    const wing2 = document.createElement('div');
    wing2.classList.add('wing');
    wing2.classList.add('wing-right');

    bee.appendChild(body);
    bee.appendChild(head);
    bee.appendChild(tail);
    bee.appendChild(wing1);
    bee.appendChild(wing2);
    
    bee.classList.add('bee');
    par.appendChild(bee);


    bee.style.position = "absolute";
    bee.style.left = posx+'px';
    bee.style.top = posy+'px';

    let id;
    let angle = Math.random() * 2 * Math.PI;
    let speed = Math.floor(Math.random() * 2)+0.5;
    let last_posy = 0;
    let bee_angle;


    id = setInterval(frame, 3);

    function frame() {
    if (posy >= screen.height+ window.scrollY || posy < window.scrollY - 50 || parseInt(bee.style.left, 10) > screen.width || parseInt(bee.style.right, 10) < screen.width) {
        clearInterval(id);
        bee.remove()
        maxbees = maxbees - 1;

    } else {
        if (wing1.style.transform == "rotate(45deg)"){
            wing1.style.transform = "rotate(0deg)";
            wing1.style.top = "10px";
        }
        else if (wing1.style.transform == "rotate(0deg)"){
            wing1.style.transform = "rotate(-45deg)";
        }
        else{
            wing1.style.transform = "rotate(45deg)";
            wing1.style.top = "18px";
        }


        if (wing2.style.transform == "rotate(135deg)"){
            wing2.style.transform = "rotate(180deg)";
            wing2.style.top = "10px";
        }
        else if (wing2.style.transform == "rotate(180deg)"){
            wing2.style.transform = "rotate(225deg)";
        }
        else{
            wing2.style.transform = "rotate(135deg)";
            wing2.style.top = "18px";
        }

        last_posy = posy

        posx = posx + Math.cos(angle) * speed;
        posy = posy + Math.sin(angle) * speed;

        if (posy < last_posy){
            bee_angle = Math.cos(angle)
            bee_angle = bee_angle * 180 / Math.PI
        }
        else{
            bee_angle = Math.cos(angle) * -1
            bee_angle = bee_angle * 180 / Math.PI + 180
        }
        
        speed = Math.floor(Math.random() * 2)+0.5;
        
        for (let rotation = 0; rotation < bee_angle; rotation++){
            bee.style.transform = "rotate(" + rotation + "deg)";
        }
        
        bee.style.top = posy+'px';
        bee.style.left = posx+'px';


        angle += (Math.random() - 0.5) * 0.5;
        }
    }
}

let document_main = document.getElementById('hive');

document_main.addEventListener("click", function(){
        if (maxbees < 6){          
            create_bee();
            maxbees = maxbees  + 1
        }
    });
