/*
 * levelPlan w:22,h:9
 * x - стены
 * пробел - пустое место
 * ! - лава
 * @ - начальная позиция игрока
 * o - монетки
 * = - блок движущийся лавы
 * | - кусочки лавы двигающиеся по вертикали
 * v - падающая лава
 */ 

var levelPlan = [
	"                      ",
	"                      ",
	"  x              = x  ",
	"  x         o o    x  ",
	"  x @      xxxxx   x  ",
	"  xxxxx            x  ",
	"      x!!!!!!!!!!!!x  ",
	"      xxxxxxxxxxxxxx  ",
	"                      "
];

var actorChars = {
	'@': Player,
	'o': Coin,
	'=': Lava,
	'|': Lava,
	'v': Lava
};

// Class Player
function Player(pos) {
	this.pos   = pos.plus(new Vector(0,-0.5));
	this.size  = new Vector(0.8,1.5);
	this.speed = new Vector(0,0);
}

Player.prototype = {
	type: 'player'
};

// End Class Player

// Class Lava
function Lava(pos,ch) {
	this.pos  = pos;
	this.size = new Vector(1,1);
	if(ch == '='){
		this.speed = new Vector(2,0);
	}else if(ch == '|'){
		this.speed = new Vector(0,2);
	}else if(ch == 'v'){
		this.speed = new Vector(0,3);
		this.repeatPos = pos;
	}
}

Lava.prototype = {
	type: 'lava'
};
// End Class Lava

// Class Coin
function Coin(pos) {
	this.basePos = this.pos = pos.plus(new Vector(0.2,0.1));
	this.size    = new Vector(0.6,0.6);
	this.wobble  = Math.random() * Math.PI * 2; 
}

Coin.prototype = {
	type: 'coin'
};
// End Class Coin

// Class Vector
function Vector(x,y) {
	this.x = x;
	this.y = y;
}

Vector.prototype = {
	plus: function(other) {
		return new Vector(this.x + other.x, this.y + other.y);
	},
	times: function(factor){
		return new Vector(this.x * factor, this.y * factor);
	}
};
// End Class Vector

// Level class
function Level(plan) {
	this.width  = plan[0].length;
	this.height = plan.length;
	this.grid   = [];
	this.actors = [];

	for(var y = 0; y < this.height; y++){
		var line = plan[y], gridLine = [];

		for(var x = 0; x < this.width; x++){
			var ch = line[x], fieldType = null;
			var Actor = actorChars[ch];

			if(Actor){
				this.actors.push(new Actor(new Vector(x,y),ch))
			}else if(ch == 'x'){
				fieldType = 'wall';
			}else if(ch == '!'){
				fieldType = 'lava';
			}

			gridLine.push(fieldType);
		}

		this.grid.push(gridLine);
	}

	this.player = this.actors.filter(function(actor){
		return actor.type == 'player';
	})[0];

	this.status = this.finishDelay = null;
}

Level.prototype = {
	isFinished: function(){
		return this.status != null && this.finishDelay < 0
	}
};

// End Level Class

var scale = 20;

function elt(name, className){
	var elt = document.createElement(name);
	if(className) elt.className = className;
	return elt;
}


// Class DOMDisplay
function DOMDisplay(parent,level){
	this.wrap  = parent.appendChild(elt('div','game'));
	this.level = level;

	this.wrap.appendChild(this.drawBackground());
	this.actorLayer = null;
	this.drawFrame();
}

DOMDisplay.prototype = {
	drawBackground: function(){
		var table = elt('table','background');
		table.style.width = this.level.width * scale + 'px';
		this.level.grid.forEach(function(row){
			var rowElt = table.appendChild(elt('tr'));
			rowElt.style.height = scale + 'px';
			row.forEach(function(type){
				rowElt.appendChild(elt('td',type))
			});
		});

		return table;
	},
	drawFrame: function(){
		if(this.actorLayer){
			this.wrap.removeChild(this.actorLayer);
		}
		this.actorLayer = this.wrap.appendChild(this.darwActors());
		this.wrap.className = 'game ' + (this.level.status || '');
		this.scrollPlayerIntoView();
	},
	darwActors: function(){
		var wrap = elt('div');
		this.level.actors.forEach(function(actor){
			var rect = wrap.appendChild(elt('div','actor '+actor.type));

			rect.style.width  = actor.size.x * scale + 'px';
			rect.style.height = actor.size.y * scale + 'px';
			rect.style.left   = actor.pos.x  * scale + 'px';
			rect.style.top    = actor.pos.y  * scale + 'px';
		});

		return wrap;
	},
	scrollPlayerIntoView: function(){
		var width  = this.wrap.clientWidth;
		var height = this.wrap.clientHeight;
		var margin = width / 3;

		var left = this.wrap.scrollLeft, right  = left + width;
		var top  = this.wrap.scrollTop,  bottom = top + height;

		var player = this.level.player;
		var center = player.pos.plus(player.size.times(0.5)).times(scale);

		if(center.x < left + margin){
			this.wrap.scrollLeft = center.x - margin;
		}else if(center.x > right - margin){
			this.wrap.scrollLeft = center.x + margin - width;
		}

		if(center.y < top + margin){
			this.wrap.scrollTop = center.y - margin;
		}else if(center.y > bottom - margin){
			this.wrap.scrollTop = center.y + margin - height;
		}
	},
	clear: function(){
		this.wrap.parentNode.removeChild(this.wrap);
	}

}


