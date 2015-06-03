// design of area;

statuses = ["normal", "crazy"];

var testArea1 = {
	id: 1,
	// id 0 reserved for held
	// See item.js/action.js: location
	name: "testRoom",
	base: 0,
	// what status decides the normal look of this area
	normal: {
		root: "this is a room, ",
		state: ["everything is upright",
			"everythingisupsidedown"],
	},
	crazy: {
		root: "room is squigly",
		state: ["Q", "R"]
	},
	// really basic idea of how the descriptions will work
	// If there isn't a description available for a status it will use the base
	areaState: 0,
	// areas have states that are appended to the look
	connected: [1, 2, 3, 4],
	// id of rooms it's connected to
	direction: ["N", "S", "E", "W"]
	// What the path is to get there?
	// <You drag yourself up the stairs> [whole thing is direction]
	// adding/removing paths is an action.
}

var testArea2 = {
	id: 2,
	name: "testRoom2",
	base: 0,
	normal: {root: "this is a room also",
		state: ["everything is upright",
			"everythingisupsidedown"],
	},
	crazy: {
		root: "room is squigly also",
		state: ["Q", "R"]
	},
	areaState: 1,
	connected: [1, 2, 3, 4],
	direction: ["N", "S", "E", "W"]
}

areas.push(testArea1);
areas.push(testArea2);