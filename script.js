const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 300;

// mesure title element
let titleElement = document.getElementById("title1"),
    titleMeasurement = titleElement.getBoundingClientRect(),
    title = {
        x: titleMeasurement.left,
        y: titleMeasurement.top,
        width: titleMeasurement.width,
        height: 10,
    };

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 1;
        this.weight = Math.random() * 1 + 1;
        this.directionX = -2;
    }
    update() {
        if (this.y > canvas.height - this.size) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 1 + 1;
            this.x = Math.random() * canvas.width * 1.3;
        }
        this.weight += 0.01;
        this.y += this.weight;
        this.x += this.directionX;

        // chech for collision between each particles and title element
        if (
            this.x + this.size > title.x &&
            this.x < title.x + title.width &&
            this.y + this.size > title.y &&
            this.y < title.y + title.height
        ) {
            this.y -= 3;
            this.weight *= -0.5;
        }
    }
    draw() {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }
}
function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(
            new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            )
        );
    }
}

init();

function animate() {
    ctx.fillStyle = "rgba(255,0,255,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    ctx.fillRect(title.x, title.y, title.width, title.height);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
