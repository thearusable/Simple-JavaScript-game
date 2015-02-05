function Rock(){
	this.r;
	this.angle = 0;
	this.countVertex =  Math.floor(Math.random()*5) + 7;
	this.points = [{}];
	this.vertexAngle = 360 / this.countVertex;
	this.realRadus;

	for(var i=1; i < this.countVertex; i++){
		this.points.push({});
	}

	this.randomMovement();
}

Rock.prototype.rand = function(min,max){
	return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

Rock.prototype.randomMovement = function(){
	this.r = (Math.random() * 0.1) + 0.05;
	//pozucja
	this.center_x = Math.random() * VAR.W;
	this.center_y = -100;

	//poruszanie sie
	this.modX = (Math.random() * -6) + 3;
	this.modY = (Math.random() * 3) +2;
	this.modAngle = (Math.random() * -12) + 6;

}

Rock.prototype.update = function(){
	this.center_x += this.modX;
	this.center_y += this.modY;
	this.angle += this.modAngle;

	//sprawdzanie x
	if(this.center_x > VAR.W + 100 || this.center_x < -100) this.randomMovement();
	//sprawdzanie y
	if(this.center_y > VAR.H + 100) this.randomMovement();
};

Rock.prototype.draw = function(){

	GAME.ctx.fillStyle = 'grey';
	GAME.ctx.strokeStyle = 'grey';
	GAME.ctx.lineWidth = 10;
	GAME.collision_CTX.fillStyle = 'red';
	GAME.collision_CTX.strokeStyle = 'red';
	GAME.collision_CTX.lineWidth = 10;

	GAME.ctx.beginPath();
	GAME.collision_CTX.beginPath();
	for(var i=0; i < this.countVertex; i++){

		this.temp_angle = this.vertexAngle * i + this.angle;
		
		this.points[i].x = (Math.sin(Math.PI / 180 * this.temp_angle) * this.r * VAR.MIN) + this.center_x;
		this.points[i].y = (-Math.cos(Math.PI / 180 * this.temp_angle) * this.r * VAR.MIN) + this.center_y;

		GAME.ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x, this.points[i].y);
		GAME.collision_CTX[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x, this.points[i].y);
	}
	GAME.ctx.closePath();
	GAME.ctx.stroke();

	GAME.collision_CTX.closePath();
	GAME.collision_CTX.fill();
	GAME.collision_CTX.stroke();


}