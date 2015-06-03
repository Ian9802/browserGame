function print(content){
	console.log(content);
}

$(function(){
	console.log('before');
	createButton("body", "button", "4", print, createButton);
	console.log('end');
});