window.onload = function(){
	GAME.init();
}

VAR = {
	FPS: 60,
	W: 0,
	H: 0,
	LastTime: 0,
	rand: function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}

GAME = {
	init: function(){
		//to takie cos(canvas)
		GAME.canvas = document.createElement('canvas');
		//context
		GAME.ctx = GAME.canvas.getContext('2d');
		GAME.layout();
		window.addEventListener('resize',GAME.layout, false);
		window.addEventListener('keydown', GAME.onKeyDown, false);
		window.addEventListener('keyup', GAME.onKeyUp, false);

		document.body.appendChild(GAME.canvas);

		GAME.ship = new Ship();

		GAME.animeLoop();
	},

	onKeyDown: function(e){
		if(e.keyCode==37) GAME.key_left = true; //lewo
		if(e.keyCode==38) GAME.key_up = true; //gora
		if(e.keyCode==39) GAME.key_right = true; //prawo
		if(e.keyCode==40) GAME.key_down = true; //dol

	},

	onKeyUp: function(e){
		if(e.keyCode==37) GAME.key_left = false;
		if(e.keyCode==38) GAME.key_up = false;
		if(e.keyCode==39) GAME.key_right = false;
		if(e.keyCode==40) GAME.key_down = false;
	},

	layout: function(e){
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
		VAR.MIN = Math.min(VAR.W, VAR.H);

		GAME.canvas.width = VAR.W;
		GAME.canvas.height = VAR.H;

		GAME.ctx.fillStyle = 'white';
		GAME.ctx.strokeStyle = 'white';
		GAME.ctx.lineWidth = 3;
		GAME.ctx.lineJoin = 'round';

	},

	animeLoop: function(time){
		requestAnimationFrame(GAME.animeLoop);

		if(time - VAR.LastTime >= 1000/VAR.FPS){
			GAME.ship.update();
			VAR.LastTime = time;
			GAME.ctx.clearRect(0,0,VAR.W, VAR.H);
			GAME.ship.draw();

		}
	}

}