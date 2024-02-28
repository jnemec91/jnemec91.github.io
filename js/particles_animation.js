const direction = [-1, 1];
let color = ['#BF4526'];
const numberOfParticles = screen.width/10;
// console.log(numberOfParticles);
const maxRadius = screen.width/50;
const maxVelocity = screen.width/80000;
// console.log(maxRadius);
const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');
let spaceMap = {};
let queue = [];
let delete_queue = [];

// console.log(Math.random()*color.length)
// console.log(color)



class Particle{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = Math.random() * maxRadius/10 + 1;;
        this.color = color[Math.round(Math.random() * color.length)];
        this.directionX = direction[Math.round(Math.random() * 1)];
        this.directionY = direction[Math.round(Math.random() * 1)];
        this.velocityX = Math.random() * maxVelocity+1;
        this.velocityY = Math.random() * maxVelocity+1;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    explode(){
        this.radius = Math.random() * 10 + this.radius;
        setTimeout(() => {
            this.radius = this.radius*2;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }, 1000);

        this.draw();
        particles.splice(particles.indexOf(this), 1);
    }

    update(){
        this.draw();
    }

    getPoints(){
        for (let p = 0; p < Math.PI*2; p+=0.1){
            this.points = [];
            let x = Math.ceil(this.x + (Math.cos(p)*this.radius));
            let y = Math.ceil(this.y + (Math.sin(p)*this.radius));

            if (spaceMap[x + "_" + y] === undefined){
                spaceMap[x + "_" + y] = [this];
            }

            else{
                spaceMap[x + "_" + y].push(this);

                for (let i = 0; i < spaceMap[x + "_" + y].length; i++){
                    if (spaceMap[x + "_" + y][i] === undefined){
                        continue;
                    }

                    if (spaceMap[x + "_" + y][i].radius < this.radius){
                        this.radius += spaceMap[x + "_" + y][i].radius/5;

                        let planet_mass = spaceMap[x + "_" + y][i] - spaceMap[x + "_" + y][i].radius;

                        spaceMap[x + "_" + y][i].explode();
                        // delete spaceMap[x + "_" + y][i];
                        delete_queue.push(particles.indexOf(spaceMap[x + "_" + y][i]))

                        while (planet_mass > 0){
                            let particle_mass = Math.random() * planet_mass + 0.1;
                            queue.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, particle_mass, color));
                            planet_mass = planet_mass - particle_mass;
                        }

                        this.directionX = this.directionX * -1;
                        break;
                    }

                    else if (spaceMap[x + "_" + y][i].radius > this.radius){
                        spaceMap[x + "_" + y][i].radius += this.radius/2;

                        let planet_mass = this.radius;

                        this.explode();
                        // delete spaceMap[x + "_" + y][spaceMap[x + "_" + y].indexOf(this)];
                        delete_queue.push(particles.indexOf(this))
                        
                        console.log(planet_mass)

                        spaceMap[x + "_" + y][i].direction = spaceMap[x + "_" + y][i].direction * -1;

                        while (planet_mass > 0){
                            let particle_mass = Math.random() * planet_mass + 0.1;
                            queue.push(new Particle(0, Math.random()*canvas.width, particle_mass, color));
                            planet_mass = planet_mass - particle_mass;
                        }

                        spaceMap[x + "_" + y][i].directionX = spaceMap[x + "_" + y][i].directionX * -1;
                        break;
                    }

                    // else{
                    //     this.directionX = this.directionX * -1;
                    //     }
                    }
                }
                

            // // debug
            // ctx.beginPath();
            // ctx.rect(x, y, 1, 1);
            // ctx.fillStyle = "white";
            // ctx.fill();
            // ctx.closePath();

        }
    }

}


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

for(let i = 0; i < numberOfParticles; i++){
    particles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, Math.random() * 2 + 0.5, color));
}

function animate(){
    for (let i=0; i<delete_queue.length; i++){
        delete particles[delete_queue[i]];
    }
    delete_queue = [];

    requestAnimationFrame(animate);
    spaceMap = {};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    new_star = queue.shift();

    if (new_star !== undefined){
        particles.push(new_star);
    }

    for(let i = 0; i < particles.length; i++){
        particles[i].getPoints();
        if (particles[i] !== undefined){
            particles[i].y += particles[i].velocityX * particles[i].directionX;
            particles[i].x += particles[i].velocityY * particles[i].directionY;
            particles[i].update();
    
            if (particles[i].x > canvas.width){
                particles[i].x = 0;
            }
            if (particles[i].y > canvas.height){
                particles[i].y = 0;
            }
            if (particles[i].x < 0){
                particles[i].x = canvas.width;
            }
            if (particles[i].y < 0){
                particles[i].y = canvas.height;
            }
            
            if (particles[i].radius > maxRadius){
                let mass = particles[i].radius;
                particles[i].explode();
    
                while(mass > 0){
                    particle_mass = Math.random() * mass + 0.1;
                    queue.push(new Particle(particles[i].x, particles[i].y, particle_mass, color));
    
                    mass = mass - particle_mass;
                }
    
            }
            
        }
    }
        
}

animate();