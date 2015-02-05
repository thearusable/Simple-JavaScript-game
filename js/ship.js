function Ship(){
	this.r = 0.03;
	this.scores = 0;

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

Ship.prototype.getPoints = function(){
	return this.points;
}

Ship.prototype.setPosition = function(xx,yy){
	if(xx > 0 && xx < VAR.W){
		this.center_x = xx;
	}
	if(yy > 0 && yy < VAR.H){
		this.center_y = yy;
	}
};

Ship.prototype.rotate = function(angle){
	this.angle += angle;
};

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

	//jesli przekroczy ekran
	if(this.center_x > VAR.W) this.center_x = 0;
	if(this.center_x < 0) this.center_x = VAR.W;
	if(this.center_y > VAR.H) this.center_y = 0;
	if(this.center_y < 0) this.center_y = VAR.H;

	//dodanie "predkosci"
	this.center_x+=this.modX;
	this.center_y+=this.modY;
	
};

Ship.prototype.hitTest = function(){
	// Jeśli żaden z puntów tworzących statek nie pokrywa się z żadnym z kamieni to wszystko jest OK
	for (var i = 0; i < this.points.length; i++) {
		for(var r=0; r<GAME.rocks.length; r++){
            var temp = this.points[i].x;
            var temp2 = this.points[i].y;
            if(isNaN(temp)){
                temp = -1;
            }
            if(isNaN(temp2)){
                temp2 = -1;
            }

			if(GAME.collision_CTX.getImageData(temp,temp2,1,1).data[0] == 255){ //sprawdzanie r
				// Jeśli się pokrywa rozwal kamien i zwróć true (co jednocześnie przerwie testowanie innych kamieni).
              // GAME.rocks[r].remove();
                console.log("Kolizja");
				return true
			}else{
                console.log("BRAK");
                return false
            }
		}
	}
	return false
};

Ship.prototype.draw = function(){
	if(this.hitTest()){
       GAME.endGame();
	}
	
	GAME.ctx.fillStyle = 'white';
	GAME.ctx.strokeStyle = 'white';
	GAME.ctx.lineWidth = 4;
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
		GAME.ctx.fillStyle = 'red';
		GAME.ctx.strokeStyle = 'yellow';
		GAME.ctx.lineWidth = 5;
		GAME.ctx.beginPath();
		for (i = 0; i < 3; i++) {
			this.tmp_a = i!=1 ? this.angle+180+(i===0 ? -this.rear_a+14 : this.rear_a-14) : this.angle+180;
			this.tmp_r = i==1 ? this.r : this.r*0.5;
			GAME.ctx[i===0?'moveTo':'lineTo'](
				(Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.MIN)+this.center_x,
				(-Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.MIN)+this.center_y);
		}
		GAME.ctx.closePath();
		GAME.ctx.stroke();
	}


}