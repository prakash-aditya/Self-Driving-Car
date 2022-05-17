class Car {
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.maxSpeed = 3;
		this.acceleration = 0.2;
		this.friction = 0.05;

		this.angle = 0;
		this.rotateStep = 0.03;

		this.controls = new Controls();
		this.sensor = new Sensor(this);
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(-this.angle)

		ctx.beginPath();
		ctx.rect(
			- this.width/2,
			- this.height/2,
			this.width,
			this.height
		);
		ctx.fill();

		ctx.restore();

		this.sensor.draw(ctx);
	}

	update() {
		this.#move();
		this.sensor.update();
	}

	#move() {
		// accelerate
		if (this.controls.forward) {
			this.speed += this.acceleration;
		} else if (this.controls.reverse) {
			this.speed -= this.acceleration;
		}

		// cap max speed
		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed;
		} else if (this.speed < -this.maxSpeed) {
			this.speed = -this.maxSpeed;
		}

		// decelerate
		if (this.speed > 0) {
			this.speed -= this.friction;
		} else if (this.speed < 0) {
			this.speed += this.friction;
		}
		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}
		
		// move right / left
		if (this.speed != 0) {
			const shouldFlipControl = this.speed > 0 ? 1 : -1;
			if (this.controls.left) {
				this.angle += this.rotateStep * shouldFlipControl;
			} else if (this.controls.right) {
				this.angle -= this.rotateStep * shouldFlipControl;
			}
		}
		
		// move in right direction
		this.x -= Math.sin(this.angle) * this.speed;
		this.y -= Math.cos(this.angle) * this.speed;
	}
}