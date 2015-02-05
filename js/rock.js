function Rock(){
	this.r = (Math.random() * 0.1) + 0.02;
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

Rock.prototype.randomMovement = function(){
	this.r = Math.random() * 0.2;
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
Rock.prototype.test_collision = function(x,y){
        //console.log(Math.round(x),Math.round(y));
    if(this.x-this.r*VAR.d<x && this.x+this.r*VAR.d>x && this.y-this.r*VAR.d<y && this.y+this.r*VAR.d>y){
        //
        // Jeśli pocisk się mieści w kwadracie przechodzimy do precyzyjnego testu
        //
        // W canvas stworzonej do przeprowadzania testów czyszczę kwadrat, który zajmuje kamień.
        // Nie trzeba czyścić nic więcej, a czyszczenie mniejszych pól jest szybsze
        GAME.collision_CTX.clearRect(this.x-this.r*VAR.d,this.y-this.r*VAR.d,this.r*VAR.d*2,this.r*VAR.d*2)
        // Rysuję kopię kamienia wypełnioną. Będzie ona wypełniona na czerowno.
        // Rysowanie takie jak w metodzie draw() instancji obiektu Rock
        GAME.collision_CTX.beginPath()
        for (var i = 0; i < this.points.length; i++) {
            GAME.collision_CTX[i===0 ? 'moveTo' : 'lineTo'](this.points[i].x*VAR.d+this.x, this.points[i].y*VAR.d+this.y)
        }
        GAME.collision_CTX.closePath()
        GAME.collision_CTX.fill()
        // Tutaj następuje cała magia.
        // Metoda contextu 2D getImageData pobiera 4 parametry. Pozycję prostokąta z którego będą pobierane dane i jego wysokość i szerokość.
        // Zostanie zwrócona tablica z warotściami R, G, B i A każdego piksela znajdującego się we wskazanym prostokącie.
        // jeśli wartość pierwszego piksela będzie równa 255 (składowe czeronego koloru to R:255, G:0, B:0 i jeśli jest w pełni kryjący to A:1, nas interesuje tylko pierwsza wartość, która tutaj może się równać 255 albo 0) to oznacza, że w tym punkcie jest testowany kamień.
        if( GAME.collision_CTX.getImageData(x,y,1,1).data[0]==255){
            // Jeśli testowany punkt trafił na kamień funkcja zwraca prawdę.
            // Po słowie return kończy się odtwarzanie funkcji.
            return true
        }
    }
    // w innym wypadku funkcja zwraca false
    return false
    };


Rock.prototype.draw = function(){

	GAME.ctx.fillStyle = 'grey';
	GAME.ctx.strokeStyle = 'grey';
	GAME.ctx.lineWidth = 10;
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


}