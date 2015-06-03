function partial(funct) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function() {
	var allArguments = args.concat(Array.prototype.slice.call(arguments));
	return funct.apply(this, allArguments);
	};
}

// partial(console.log.bind(console), 4)();