const matrix_symbols = ['ﾊ', 'ﾐ', 'ﾋ', 'ｰ', 'ｳ', 'ｼ', 'ﾅ', 'ﾓ', 'ﾆ', 'ｻ', ' ',' ',' ',' ',' ',' ',' ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ', 'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ', '日', 'ｦ', 'ｲ', 'ｸ', 'ｺ', 'ｿ', 'ﾁ', 'ﾄ', 'ﾉ', 'ﾌ', 'ﾔ', 'ﾖ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾝ', ' ', ':', '・', '.', '"', '=', '*', '+', '-', '<', '>', '¦', '｜', 'ﾘ', 'ç']
let current_columns = 0;
const rotations = [45 ,90, 135]
const rotationDirections = ['Y', 'X']
const ways = ['down', 'down','up']
let par = document.getElementById('welcome-section')
let nav = document.getElementById('navbar')
const max_columns = 20
const max_speed = 20

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// create rows of symbols in column
function add_rows(col){
    let posx = (screen.width-30) / max_columns * col
    let id;
    let speed = Math.floor(Math.random() * max_speed)+2;
    let way = ways[Math.floor(Math.random() * ways.length)]
    let posy;
    let waiting = false
    const column = document.createElement('div')

    if (way === 'up'){
        posy = 0 + (par.offsetHeight)
    }
    else if (way === 'down'){
        posy = 0 - (par.offsetHeight)
    }    

    column.classList.add('matrix-column')
    par.appendChild(column);
    
    column.style.width = (Math.random() * ((screen.width-30) / 10)) + 10 + 'px'
    column.style.height = par.offsetHeight + 'px'
    // column.style.border = '1px solid #000'
    column.style.zIndex = '1'
    column.style.position = 'absolute'
    column.style.left = posx + 'px'
    column.style.top = posy + 'px'


    for (let i=0; i<Math.ceil(par.offsetHeight/(par.offsetHeight / 25)); i++){
        const symbol = document.createElement('div')
        
        symbol.classList.add('matrix-symbol')
        symbol.innerHTML = matrix_symbols[Math.floor(Math.random() * matrix_symbols.length)]
        column.appendChild(symbol)

        symbol.style.transform = 'rotate'+rotationDirections[Math.floor(Math.random() * rotationDirections.length)]+'(' + rotations[Math.floor(Math.random() * rotations.length)] + 'deg);'
        symbol.style.fontSize = Math.floor(Math.random() * 5) +0.5 + 'rem'

    }

    function animate(){
        // js animation
        if (current_columns < max_columns){
            current_columns = current_columns + 1
            clearInterval(id);
            id = setInterval(frame, 200, way, speed);

            function frame(way, speed){
                if (window.scrollY < par.offsetHeight){
                    if (way === 'up'){
                        posy = posy - speed            
                        column.style.top = posy + 'px'
                    }
                    else if (way === 'down'){
                        posy = posy + speed
                        column.style.top = posy + 'px'
                    }

                    if (posy >= par.offsetHeight || posy <= 0 - par.offsetHeight){
                            if (current_columns < max_columns){
                                waiting = false
                                removeAllChildNodes(column)
                                column.remove()
                                add_rows(col)
                                clearInterval(id);
                            }
                            else{
                                if (waiting === false){
                                    waiting = true
                                    current_columns = current_columns - 1
                                }
                            }
                        
                    }
                }
            }
        }
        else{
            setTimeout(animate, 5000)
        }
    }

    animate();

}

window.addEventListener("load", function(){
    for (let column=0; column<max_columns; column++){
        setTimeout(add_rows(column),5000*column);
    }

});
