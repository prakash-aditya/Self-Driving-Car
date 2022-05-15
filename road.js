class Road{
	constructor(x, width, laneCount = 3) {
		this.x = x;
		this.width = width;
		this.laneCount = laneCount;

		this.left = this.x - width/2;
		this.right = this.x + width/2;

		const infinity = 9999999;
		this.top = -infinity;
		this.bottom = infinity;

		const topLeft = [this.left, this.top];
		const topRight = [this.right, this.top];
		const bottomLeft = [this.left, this.bottom];
		const bottomRight = [this.right, this.bottom];

		this.borders = [
			[topLeft, bottomLeft], 
			[topRight, bottomRight]
		];
	}

	getLaneCenter(laneIndex) {
		laneIndex = Math.min(laneIndex, this.laneCount-1);
		const laneWidth = this.width / this.laneCount;
		return this.left + laneWidth/2 + (laneIndex * laneWidth);
	}

	draw(ctx) {
		ctx.lineWidth = 5;
		ctx.strokeStyle = "white";

		// draw inner lanes
		for (let i=1; i <= this.laneCount - 1; i++) {
			const laneMarkPosition = this.left + (this.width / this.laneCount) * i; 
			ctx.setLineDash([20, 20]);
			ctx.beginPath();
			ctx.moveTo(laneMarkPosition, this.top);
			ctx.lineTo(laneMarkPosition, this.bottom);
			ctx.stroke();
		}

		// draw borders
		ctx.setLineDash([])
		this.borders.forEach(border=>{
			ctx.beginPath();
			ctx.moveTo(border[0][0], border[0][1]);
			ctx.lineTo(border[1][0], border[1][1]);
			ctx.stroke();
		});
	}
}