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
	button.setAttribute("title", tag);
	button.classList.add("button");
	button.appendChild(document.createTextNode(name));
	button.onclick = function(){
		partial(funct, content)();
	};
	location.append(button);
}

function clearInput(){
	var location = $("#input");
	location.children().remove();
}

function refresh(){
	clearInput();
	displayArea(area);
}

function post(content){
	var location = $('#output');
	if(Array.isArray(location)){
		location = location[0];
	}
	var node = document.createElement("div");
	node.innerHTML = content;
	location.append(node);
	node.scrollIntoView(false);
}

function postRaw(node){
	var location = $('#output');
	if(Array.isArray(location)){
		location = location[0];
	}
	location.append(node);
	node.scrollIntoView(false);
}

function postImage(source){
	var node = document.createElement("img");
	node.setAttribute("src", source);
	postRaw(node);
}

function postImageAlt(source, altText){
	var node = document.createElement("img");
	node.setAttribute("src", source);
	node.setAttribute("alt", altText);
	postRaw(node);
}

function postImageRaw(source, altText, height, width){
	var node = document.createElement("img");
	node.setAttribute("src", source);
	node.setAttribute("alt", altText);
	node.setAttribute("height", height);
	node.setAttribute("width", width);
	postRaw(node);
}