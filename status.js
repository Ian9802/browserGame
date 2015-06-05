var testStatus1 = {
	id: 1,
	name: "normal",
	base: 1,
	normal: {
		root: "normal"
	},
	crazy: {
		root: "weirdo"
	}
}
// statuses start at 1 for non-devs.
// yes this makes me a little sad. 

var testStatus2 = {
	id: 2,
	name: "crazy",
	base: 1,
	normal: {
		root: "weirdo"
	},
	crazy: {
		root: "normal"
	}
}

statuses.push(testStatus1);
statuses.push(testStatus2);
status = 1;