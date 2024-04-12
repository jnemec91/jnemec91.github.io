const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');
const direction = [-1, 1];
const color = '#BF4526';
const numberOfParticles = 50;
const maxRadius = canvas.width / 180;
const minRadius = canvas.width / 300;
const maxVelocity = 1;

const particles = [];

class Particle {
    constructor(x, y, radius, particle_color) {
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

    move() {
        this.x += this.velocityX * this.directionX;
        this.y += this.velocityY * this.directionY;
        if (this.x + this.radius > canvas.width || this.x - this.radius / 3 < 0) {
            this.directionX *= -1;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius / 3 < 0) {
            this.directionY *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    getPoints() {
        this.points = [];
        for (let i = 0; i < this.radius * Math.PI / 2; i += 0.1) {
            const x = Math.ceil(this.x + this.radius * Math.cos(i));
            const y = Math.ceil(this.y + this.radius * Math.sin(i));

            this.points.push([x, y]);
        }
    }

    checkCollision(particle) {
        const dx = particle.x - this.x;
        const dy = particle.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + particle.radius) {
            const angle = Math.atan2(dy, dx);
            const sine = Math.sin(angle);
            const cosine = Math.cos(angle);

            const vx1 = this.velocityX * cosine + this.velocityY * sine;
            const vy1 = this.velocityY * cosine - this.velocityX * sine;
            const vx2 = particle.velocityX * cosine + particle.velocityY * sine;
            const vy2 = particle.velocityY * cosine - particle.velocityX * sine;

            this.velocityX = vx2;
            this.velocityY = vy2;
            particle.velocityX = vx1;
            particle.velocityY = vy1;
        }
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        const x = ((canvas.width / numberOfParticles) * i) + 20;
        const y = 100;
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.getPoints();
        particles.forEach(particle2 => {
            if (particle !== particle2) {
                particle.checkCollision(particle2);
            }
        });
        particle.draw();
        particle.move();
    });
}

init();
animate();
