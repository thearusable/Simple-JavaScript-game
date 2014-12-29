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

		document.body.appendChild(GAME.canvas);
		GAME.animeLoop();
		GAME.ship = new Ship();

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
			VAR.LastTime = time;
			GAME.ctx.clearRect(0,0,VAR.W, VAR.H);
			GAME.ship.draw();

		}
	}

}