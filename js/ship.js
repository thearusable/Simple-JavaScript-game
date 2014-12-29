function Ship(){
	this.r = 0.04;
	this.rear_a = 50;
	this.angle = 0;
	this.center_x = VAR.W / 2;
	this.center_y = VAR.H / 2;
	this.points = [{},{},{}];
}

Ship.prototype.setPosition = function(xx,yy){
	if(xx > 0 && xx < VAR.W){
		this.center_x = xx;
	}
	if(yy > 0 && yy < VAR.H){
		this.center_y = yy;
	}
}

Ship.prototype.rotate = function(angle){
	this.angle += angle;
}

Ship.prototype.draw = function(){
	GAME.ctx.beginPath();
	for(var i=0; i < 3; i++){
		this.temp_a = i === 0 ? this.angle : (this.angle + 180 + (i==1 ? this.rear_a : -this.rear_a));
		this.temp_r = i === 0 ? this.r * 1 : this.r * 0.6;
		
		this.points[i].x = (Math.sin(Math.PI / 180 * this.temp_a) * this.temp_r * VAR.MIN) + this.center_x;
		this.points[i].y = (-Math.cos(Math.PI / 180 * this.temp_a) * this.temp_r * VAR.MIN) + this.center_y;
		//
		GAME.ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x, this.points[i].y);
	}
	GAME.ctx.closePath();
	GAME.ctx.stroke();
}