class Sensor {
	constructor(car) {
		this.sensorCount = 5;
		this.sensorSpread = Math.PI / 2;
		this.sensorLength = 100;

		this.car = car;

		this.sensors = []
	}

	update() {
			this.#createSensorRays();
	}

	#createSensorRays() {
		this.sensors = [];
		for (let i=0; i<this.sensorCount; i++) {
			const angle = (this.sensorSpread/2) - (i* this.sensorSpread/(this.sensorCount-1)) + this.car.angle;
			console.log(angle, this.sensorSpread);
			this.sensors.push([
				{
					x: this.car.x,
					y: this.car.y,
				},
				{
					x: this.car.x - Math.sin(angle) * this.sensorLength,
					y: this.car.y - Math.cos(angle) * this.sensorLength
				}
			]);
		}
	}

	draw(ctx) {
		this.sensors.forEach(sensor => {
			ctx.lineWidth = 3;
			ctx.strokeStyle = "yellow";

			ctx.beginPath();
			ctx.moveTo(sensor[0].x, sensor[0].y);
			ctx.lineTo(sensor[1].x, sensor[1].y);
			ctx.stroke();
		});
	}
}