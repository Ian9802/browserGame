// wraps console.log because consoles don't pass well.
function print(content){
	console.log(content);
}

function makeButton(name, data, funct, tag){
	print(name);
	print(data);
	print(funt);
	print(tag);
	createButton("body", name, data, funct, tag);
}