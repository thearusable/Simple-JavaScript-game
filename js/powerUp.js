function PowerUp(){
	this.r;
	this.center_x;
	this.center_y;

	this.random();
}


PowerUp.prototype.random = function(){
	this.r = (Math.random() * 10) + 3; 
	this.center_x = (Math.random() * (VAR.W - 100) + 50);
	this.center_y = (Math.random() * (VAR.H - 100) + 50);
 }

PowerUp.prototype.draw = function(){
	GAME.ctx.fillStyle = 'blue';
	GAME.ctx.strokeStyle = 'blue';
	GAME.ctx.beginPath();
	GAME.ctx.arc(this.center_x, this.center_y , this.r, 0 , 360, false);
	GAME.ctx.closePath();
	GAME.ctx.stroke();
	GAME.ctx.fill();
}