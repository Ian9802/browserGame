function partial(funct) {
	var argArray = Array.prototype.slice.call(arguments, 1);
	return function() {
		var allArguments = argArray.concat(Array.prototype.slice.call(arguments));
		return funct.apply(this, allArguments);
	};
}

function createButton(location, name, content, funct, tag){
	var location = $(location);
	if(Array.isArray(location)){
		location = location[0];
	}
	var button = document.createElement("div");
	button.appendChild(document.createTextNode(name));
	button.onclick = function(){
		partial(funct, content)();
	};
	location.append(button);
}
