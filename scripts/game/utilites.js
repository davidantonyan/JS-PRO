function elt(type) {
	var node = document.createElement(type);

	for(var i = 1, len = arguments.length; i < len; i++){
		var child = arguments[i];
		if(typeof child == 'string'){
			child = document.createTextNode(child); 
		}
		node.appendChild(child);
	}

	return node;
}


// Class _N Constructor

function _N(type){
	this.node = document.createElement(type);
	
	if(arguments.length > 1){
		for(var i = 1; i < arguments.length; i++){
			var child = arguments[i];

			if(child instanceof Object){
				for(var attr in child){
					this.node.setAttribute(attr,child[attr]);
				}
			}else if(typeof child == 'string'){
				this.node.textContent = child
			}
		}
	}

	return this;
}

_N.prototype.append = function(el) {
	if(el){
		var nodeList = document.querySelectorAll(el);
		var that = this.node;
		for(i = 0, len = nodeList.length; i < len; i++){
			nodeList[i].innerHTML = nodeList[i].innerHTML + this.node.outerHTML;
		}
		
	}else{
		document.body.appendChild(this.node);
	}
	return this;
}

_N.prototype.on = function(e,callback) {
	var node = this.node; 
	var el = node.nodeName.toLowerCase();

	if(node.id){
		el += '#' + node.id;
	}

	if(node.className){
		el += '.' + node.className.replace(/\s+/g,' ').split(' ').join('.');
	}

	var nodes = document.querySelectorAll(el);

	for(var i = 0, len = nodes.length; i < len; i++){
		e.split(' ').forEach(function(e){
			nodes[i].addEventListener(e,callback,false);
		});
	}

	return this;
};


