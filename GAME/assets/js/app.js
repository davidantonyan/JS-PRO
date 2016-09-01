(function() {
	"use strict";

	var Game = {
		canvas: undefined,
		ctx: undefined,
		backgroundSprite : undefined,
		balloonSprite : undefined,
		balloonPosition: {
			x: 0, 
			y: 50
		},
		balloonPosition2: {
			x: 0, 
			y: 250
		},
		balloonPosition3: {
			x: 0, 
			y: 450
		}
	};

	Game.start = function(){
		Game.canvas = document.getElementById('game-canvas');
		Game.ctx = Game.canvas.getContext('2d');
		Game.ballonSprite = new Image();
		Game.ballonSprite.src = 'assets/img/balloon.png';
		Game.backgroundSprite = new Image();
		Game.backgroundSprite.src = 'assets/img/background.jpg'
		window.setTimeout(Game.mainLoop, 500);
	};

	Game.drawImage = function(sprite,pos){
		Game.ctx.save();
		Game.ctx.translate(pos.x,pos.y);
		Game.ctx.drawImage(sprite, 0, 0, sprite.width, sprite.height, 0, 0, sprite.width, sprite.height);
		Game.ctx.restore();
	}

	Game.update = function(){
		var d = new Date();
		Game.balloonPosition.x = (d.getTime() * 0.3) % Game.canvas.width;
		Game.balloonPosition2.x = (d.getTime() / 2) % Game.canvas.width;
		Game.balloonPosition3.x = (d.getTime() / 8) % Game.canvas.width;
	};

	Game.draw = function(){
		Game.drawImage(Game.backgroundSprite, { x: 0, y: 0 });
		Game.drawImage(Game.ballonSprite, Game.balloonPosition);
		Game.drawImage(Game.ballonSprite, Game.balloonPosition2);
		Game.drawImage(Game.ballonSprite, Game.balloonPosition3);
	};


	Game.clearCanvas = function(){
		Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
	}

	Game.mainLoop = function(){
		Game.clearCanvas();
		Game.update();
		Game.draw();
		window.setTimeout(Game.mainLoop, 1000 / 60);
	};

	window.addEventListener('DOMContentLoaded',Game.start);

})();