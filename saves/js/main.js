const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const particlesArray = [];

console.log(ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

const mouse = {
	x: null,
	y: null,
};

canvas.addEventListener("mousemove", (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});
console.log(ctx);

class Particle {
	constructor() {
		//this.x = mouse.x;
		//this.y = mouse.y;
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.size = Math.random() * 5 + 1;
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	draw() {
		ctx.fillStyle = "blue";
		ctx.strokeStyle = "green";
		ctx.lineWidth = 15;
		ctx.beginPath();
		ctx.arc(this.x, this.y, 60, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fill();
	}
}

function init() {
	for (let i = 0; i < 100; i++) {
		particlesArray.push(new Particle());
	}
}
init();
console.log(particlesArray);

function handleParticles() {
	particlesArray.forEach((particle) => {
		particle.update();
		particle.draw();
	});
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	handleParticles();
	requestAnimationFrame(animate);
}
animate();
