function Ship(){
	this.r = 0.04;
	this.rear_a = 50;
	this.angle = 0;
	this.center_x = VAR.W / 2;
	this.center_y = VAR.H / 2;
	this.points = [{},{},{}];

	this.draw_thrust = false;

	//vector ruchu
	this.modX = 0;
	this.modY = 0;
	// max szybkosc ruchu
	this.maxMod = 0.019;
	//przyspieszenie
	this.acc = 0.001;
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

Ship.prototype.update = function(){
	if(GAME.key_left) this.rotate(-7); //lewo
	if(GAME.key_right) this.rotate(7); //prawo
	//przyspieszenie
	if(GAME.key_up){
		this.draw_thrust = true;
		this.modX = Math.max(-this.maxMod*VAR.MIN, Math.min(this.maxMod*VAR.MIN, this.modX+Math.sin(Math.PI/180*this.angle)*this.acc*VAR.MIN));
		this.modY = Math.max(-this.maxMod*VAR.MIN, Math.min(this.maxMod*VAR.MIN, this.modY-Math.cos(Math.PI/180*this.angle)*this.acc*VAR.MIN));
	}else this.draw_thrust = false;

	//hamowanie
	if(GAME.key_down){
		this.modX = this.modX * 0.95;
		this.modX = Math.abs(this.modX)<0.2 ? 0 : this.modX;
		this.modY = this.modY * 0.95;
		this.modY = Math.abs(this.modY)<0.2 ? 0 : this.modY;
	}

	this.center_x+=this.modX;
	this.center_y+=this.modY;
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

	// rysowanie odrzutu
	if(this.draw_thrust){
		GAME.ctx.beginPath();
		for (i = 0; i < 3; i++) {
			this.tmp_a = i!=1 ? this.angle+180+(i===0 ? -this.rear_a+14 : this.rear_a-14) : this.angle+180;
			this.tmp_r = i==1 ? this.r : this.r*0.5;
			GAME.ctx[i===0?'moveTo':'lineTo'](
				(Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.MIN)+this.center_x,
				(-Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.MIN)+this.center_y);
		}
		GAME.ctx.stroke();
	}
}