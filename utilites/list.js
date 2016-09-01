class List{
	constructor(){
		this.listSize = 0;
		this.pos = 0;
		this.dataStore = [];
	}

	clear(){
		delete this.dataStore;
		this.dataStore = [];
		this.listSize = this.pos = 0;
	}

	find(element){
		for(var i = 0, len = this.dataStore.length; i < len; ++i){
			if(this.dataStore[i] == element){
				return i;
			}
		}

		return -1;
	}

	toString(){
		return this.dataStore.toString();
	}

	insert(element, after){
		var insertPos = this.find(after);
		if(insertPos > -1){
			this.dataStore.splice(insertPos+1,0,element);
			++this.listSize;
			return true;
		}
		return false;
	}

	append(element){
		this.dataStore[this.listSize++] = element
	}

	remove(element){
		var foundAt = this.find(element);
		if(foundAt > -1){
			this.dataStore.splice(foundAt, 1);
			--this.listSize;
			return true;
		}
		return false;
	}

	front(){
		this.pos = 0;
	}

	end(){
		this.pos = this.listSize - 1;
	}

	prev(){
		if(this.pos > 0){
			--this.pos;
		}
	}

	next(){
		if(this.pos < this.listSize - 1){
			++this.pos;
		}
	}

	length(){
		return this.listSize;
	}

	currPos(){
		return this.pos;
	}

	moveTo(position){
		this.pos = position;
	}

	getElement(){
		return this.dataStore[this.pos];
	}

	contains(element){
		for(var i = 0, len = this.dataStore.length; i < len; ++i){
			if(this.dataStore[i] == element){
				return true;
			}	
		}
		return false;
	}
}

var list = new List();

list.append("Clayton");
list.append("Raymond");
list.append("Cynthia");
list.append("Jennifer");
list.append("Bryan");
list.append("Danny");

// for (list.front(); list.currPos() < list.length(); list.next()) {
// 	console.log(list.currPos());
// }

list.end();

console.log(list.currPos());

console.log(list.getElement());

list.prev();
console.log(list.currPos());

console.log(list.getElement());

list.prev();
console.log(list.currPos());

console.log(list.getElement());

list.prev();
console.log(list.currPos());

console.log(list.getElement());

list.prev();
console.log(list.currPos());

console.log(list.getElement());

list.prev();
console.log(list.currPos());

console.log(list.getElement());

console.log('----------------------------------');

// for(list.end(); list.currPos() >= 0; list.prev()) {
// 	console.log(list.currPos());
// }

