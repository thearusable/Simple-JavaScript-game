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
		GAME.HI = 0;

		var score = localStorage.getItem("HI");
		if(score != null) GAME.HI = score;

		GAME.PlayerScore = 0;
		VAR.FPS = 60;
		GAME.replay = false;
		
		GAME.canvas = document.createElement('canvas');
		GAME.collision_canvas = document.createElement('canvas'); 
		GAME.HUD = document.createElement('canvas');

		GAME.ctx = GAME.canvas.getContext('2d');
		GAME.collision_CTX = GAME.collision_canvas.getContext('2d'); 
		GAME.HUD_CTX = GAME.HUD.getContext('2d');

		GAME.HUD_CTX.font = "20px Georgia";
		GAME.HUD_CTX.textAlign = 'center'; 

		GAME.layout();
		window.addEventListener('resize',GAME.layout, false);
		window.addEventListener('keydown', GAME.onKeyDown, false);
		window.addEventListener('keyup', GAME.onKeyUp, false);


		document.body.appendChild(GAME.canvas);
		//document.body.appendChild(GAME.collision_canvas); // debug na czerwono
		document.body.appendChild(GAME.HUD);

		GAME.powerUp = new PowerUp();

		GAME.rocks = new Array();
		GAME.rocks[0] = new Rock();
		GAME.rocks[1] = new Rock();
		GAME.rocks[2] = new Rock();
		GAME.rocks[3] = new Rock();
		GAME.rocks[4] = new Rock();
		GAME.rocks[5] = new Rock();
		GAME.rocks[6] = new Rock();
		GAME.rocks[7] = new Rock();
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

		GAME.collision_canvas.width = VAR.W;
		GAME.collision_canvas.height = VAR.H; 

		GAME.HUD.width = VAR.W;
		GAME.HUD.height = 80;

		GAME.ctx.fillStyle = 'white';
		GAME.ctx.strokeStyle = 'white';
		GAME.ctx.lineWidth = 3;
		GAME.ctx.lineJoin = 'round';

	},

	animeLoop: function(time){
			requestAnimationFrame(GAME.animeLoop);

			if(time - VAR.LastTime >= 1000/VAR.FPS){
				//update
           		GAME.ship.update();

           		for(var i = 0; i < GAME.rocks.length; i++){
           			GAME.rocks[i].update();
           		}
				
           		GAME.PlayerScore += 0.016;

				VAR.LastTime = time;

				GAME.ctx.clearRect(0,0,VAR.W, VAR.H);
				GAME.collision_CTX.clearRect(0,0,VAR.W, VAR.H);
				GAME.HUD_CTX.clearRect(0,0,VAR.W,80);

				for(var i = 0; i < GAME.rocks.length; i++){
           			GAME.rocks[i].draw();
           		}

				GAME.powerUp.draw();
            	GAME.ship.draw();

            	GAME.updateHUD();
			}
	},

	endGame: function(e){

		document.getElementById('reset-btn').onclick = function(){
			document.location.reload(true);
		}

		if(GAME.PlayerScore > GAME.HI){
			localStorage.setItem("HI", GAME.PlayerScore.toFixed(0));
		}

		document.getElementById('endText').innerHTML = "Twój Wynik: " + GAME.PlayerScore.toFixed(0);
        document.getElementById('end').style.display="block";
        document.getElementById('reset-btn').style.display = "block";

        VAR.FPS = 0;
    },

    updateHUD: function(){
    	GAME.HUD_CTX.font = "20px Verdana";
		GAME.HUD_CTX.fillStyle = "blue";
    	GAME.HUD_CTX.fillText("Punkty: " + GAME.PlayerScore.toFixed(0), 200, 30); 
    	if(GAME.HI > 0){
    		GAME.HUD_CTX.fillText("REKORD: " + GAME.HI, 10, 30); 
    	}
    }
}
