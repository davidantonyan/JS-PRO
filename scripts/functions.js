// 
function sendMessage(msg, obj) {
	if(arguments.length == 2){
		obj.handleMsg(msg);
	}else{
		alert(msg);
	}
}

// call sendMessage 1 param 
sendMessage('Hello World!');

// call sendMessage 2 params
sendMessage('How Are you?',{
	handleMsg: function(msg){
		alert('This is custom message: ' + msg);
	}
});


// Displaying Error Message
function displayError(msg){
	if(typeof msg == 'undefined'){
		msg = 'An error occured.';
	}

	alert(msg);
}


// simple function makeArray
function makeArray(){
	var arr = [];

	for(var i = 0, len = arguments.length; i < len; i++){
		arr.push(arguments[i]);
	}

	return arr;
}

// call makeArray
makeArray('a','1','1000'); // ['a','1','1000']
