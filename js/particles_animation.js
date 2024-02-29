const canvas = document.getElementById('animation-canvas');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const direction = [-1, 1];
const color = '#BF4526';
const numberOfParticles = 8;
// console.log(numberOfParticles);
const maxRadius = window.innerHeight / 100;
const minRadius = window.innerHeight / 1000;
const maxVelocity = 1;
// console.log(maxRadius);

const particles = [];
let collision = false;




// console.log(Math.random()*color.length)
// console.log(color)



class Particle{
    constructor(x, y, radius, particle_color){
        this.x = x;
        this.y = y;
        this.points = [];
        this.radius = Math.random() * maxRadius + minRadius;;
        this.color = color;
        this.directionX = direction[Math.round(Math.random() * 1)];
        this.directionY = direction[Math.round(Math.random() * 1)];
        this.velocityX = Math.ceil(Math.random() * maxVelocity);
        this.velocityY = Math.ceil(Math.random() * maxVelocity);
    }

    move(){
        this.x += this.velocityX * this.directionX;
        this.y += this.velocityY * this.directionY;
        if(this.x + this.radius > canvas.width || this.x - this.radius/3 < 0){
            this.directionX *= -1;
        }
        if(this.y + this.radius > canvas.height || this.y - this.radius/3 < 0){
            this.directionY *= -1;
        }
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    getPoints(){
        this.points = [];
        for (let i = 0; i < this.radius*Math.PI/2; i+=0.2){
            const x = Math.ceil(this.x + this.radius * Math.cos(i));
            const y = Math.ceil(this.y + this.radius * Math.sin(i));

            this.points.push([x, y]);
        
            // ctx.beginPath();
            // ctx.rect(x, y, 1, 1);
            // ctx.fillStyle ='white';
            // ctx.fill();
            // ctx.closePath();
            
        }
    }
}

function init(){
    for(let i = 0; i < numberOfParticles; i++){
        const x = ((canvas.width/numberOfParticles)*i)+20;
        const y = 100;
        particles.push(new Particle(x, y, color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.getPoints();
        collision = false;

        particles.forEach(particle2 => {
            if (particle != particle2){
                for (let i = 0; i < particle.points.length; i++){
                    for (let j = 0; j < particle2.points.length; j++){
                        if (particle.points[i][0] == particle2.points[j][0] && particle.points[i][1] == particle2.points[j][1]){
                            // console.log('collision');
                            collision = true;
                        }
                    }
                }
            }
        });
        if (collision){
            particle.directionX *= -1;
            particle.directionY *= -1;
        }

        particle.draw();
        particle.move(); 
        allPoints = {};
    });
}

init();
animate();