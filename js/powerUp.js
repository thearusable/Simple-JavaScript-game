function PowerUp(){
	this.r;
	this.center_x;
	this.center_y;

	this.random();
}

PowerUp.prototype.rand = function(min,max){
	return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

PowerUp.prototype.random = function(){
	this.r = this.rand(10,15);
	this.center_x = (Math.random() * (VAR.W - 100) + 50);
	this.center_y = (Math.random() * (VAR.H - 100) + 50);
 }

PowerUp.prototype.draw = function(){

	GAME.ctx.fillStyle = 'blue';
	GAME.ctx.strokeStyle = 'blue';
	GAME.collision_CTX.fillStyle = 'blue';
	GAME.collision_CTX.strokeStyle = 'blue';
	GAME.collision_CTX.lineWidth = 10;

	GAME.ctx.beginPath();
	GAME.collision_CTX.beginPath();
	GAME.ctx.arc(this.center_x, this.center_y , this.r, 0 , 360, false);
	GAME.collision_CTX.arc(this.center_x, this.center_y , this.r, 0 , 360, false);
	GAME.ctx.closePath();
	GAME.collision_CTX.closePath();

	GAME.ctx.stroke();
	GAME.ctx.fill();
	GAME.collision_CTX.stroke();
	GAME.collision_CTX.fill();
}