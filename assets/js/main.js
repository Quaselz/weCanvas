const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const particlesArray = [];
let hue = 0;
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

canvas.addEventListener("click", (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
	for (let i = 0; i < 10; i++) {
		particlesArray.push(new Particle());
	}
});

canvas.addEventListener("mousemove", (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
	for (let i = 0; i < 2; i++) {
		particlesArray.push(new Particle());
	}
});
//console.log(ctx);

class Particle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		//this.x = Math.random() * canvas.width;
		//this.y = Math.random() * canvas.height;
		this.size = Math.random() * 30 + 1;
		//this.size = this.size;
		//this.size * 2 = this.size * 2;
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
		this.color = `hsl(${hue}, 100%, 50%)`;
		//this.size * 1.5 * 0.3 = this.size * 1.5 * 0.3;
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) this.size -= 0.1;
	}
	draw() {
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		// * draw circle
		//ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		// * draw heart
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.moveTo(this.x, this.y + this.size * 1.5 * 0.3);
		ctx.bezierCurveTo(
			this.x,
			this.y,
			this.x - this.size / 2,
			this.y,
			this.x - this.size / 2,
			this.y + this.size * 1.5 * 0.3
		);
		ctx.bezierCurveTo(
			this.x - this.size / 2,
			this.y + (this.size * 2 + this.size * 1.5 * 0.3) / 2,
			this.x,
			this.y + (this.size * 2 + this.size * 1.5 * 0.3) / 2,
			this.x,
			this.y + this.size * 2
		);
		ctx.bezierCurveTo(
			this.x,
			this.y + (this.size * 2 + this.size * 1.5 * 0.3) / 2,
			this.x + this.size / 2,
			this.y + (this.size * 2 + this.size * 1.5 * 0.3) / 2,
			this.x + this.size / 2,
			this.y + this.size * 1.5 * 0.3
		);
		ctx.bezierCurveTo(
			this.x + this.size / 2,
			this.y,
			this.x,
			this.y,
			this.x,
			this.y + this.size * 1.5 * 0.3
		);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}
}

/* function init() {
	for (let i = 0; i < 100; i++) {
		particlesArray.push(new Particle());
	}
}
init(); */
//console.log(particlesArray);

function handleParticles() {
	for (let index = 0; index < particlesArray.length; index++) {
		particlesArray[index].update();
		particlesArray[index].draw();

		for (let i = index; i < particlesArray.length; i++) {
			const dx = particlesArray[index].x - particlesArray[i].x;
			const dy = particlesArray[index].y - particlesArray[i].y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 100) {
				ctx.beginPath();
				ctx.strokeStyle = particlesArray[index].color;
				ctx.lineWidth = 0.2;
				ctx.moveTo(particlesArray[index].x, particlesArray[index].y);
				ctx.lineTo(particlesArray[i].x, particlesArray[i].y);
				ctx.stroke();
				ctx.closePath();
			}
		}
		if (particlesArray[index].size <= 0.3) {
			particlesArray.splice(index, 1);
			index--;
		}
	}
}

function animate() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "rgba(0,0,0,0.04)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	handleParticles();
	hue += 1;
	requestAnimationFrame(animate);
}
animate();
