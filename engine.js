var areas = [];
// area.js
var items = [];
// item.js
var statuses = [];
// list of statuses
var actions = [];
// action.js
var area;
// current area id
var areaState;
// current areaState
var status;
var noItemsFound = "There are no items of importance here.";
var itemsFound = "In sight there ";
var plural = "are : ";
var singular = "is a ";

// allows sorting by id's.
function idSort(a, b) {
	if(a.id < b.id){
		return -1;
	}else if(b.id < a.id){
		return 1;
	}else{
		return 0;
	}
}

function setAreaState(areaID){
	var location = getLocation(areas, areaID);
	areaState = areas[location].areaState;
}

// descibes the area and available items and actions
function displayArea(areaID){
	print(describeArea(areaID));
	var found = displayItem(areaID);
	if(found.length == 0){
		print(noItemsFound);
	}else if(found.length == 1){
		print(itemsFound + singular + found[0]);
	}else{
		var list = "";
		for(var i=0; i<found.length; i++){
			list += found[i]
			if(i != found.length-1){
				list += ", ";
				if(i == found.length-2){
					list += "and "
				}
			}

			 
		}
		print(itemsFound + plural);
	}
	print("hello");
	setAreaState(areaID);
	displayActions();

}

// specialized displayItem
function checkInventory(){
	print(displayItem(0));
}

// finds all items within an area and calls describe with them
function displayItem(areaID){
	found = [];
	for (var i = 0; i < items.length; i++) {
		if(items[i].location == areaID){
			found += describe(items[i]);
		}
	}
	return found;
}

function displayActions(areaID, stateID){
	for(var i = 0; i < actions.length; i++){
		var valid = false;
		if(actions[i].location[0].area == 0){
			valid = true;
		}else{
			for(var j = 0; j < actions[i].location.length; j++){
				if(actions[i].location[j].area == areaID){
					if(actions[i].location[j].state.contains(stateID)){
						valid = true;
						break;
					}
				}
			}
		}
		if(valid){
			action.perform();
		}
	}
}

// finds an area by it's id and calls describe with it
function describeArea(areaID){
	var location = getLocation(areas, areaID);
	if(location != -1){
		return describe(areas[location]);
	}
	return "";
}

// finds an item by it's id and calls describe with it
function describeItem(itemID){
	var location = getLocation(items, itemID);
	if(location != -1){
		return describe(items[location]);
	}
	return "";
}

// finds an item by it's id and calls describe with it
function describeAction(actionID){
	var location = getLocation(actions, actionID);
	if(location != -1){
		return describe(items[location]);
	}
	return "";
}

function getLocation(array, ID){
	for (var i = 0; i < array.length; i++) {
		if(array[i].id == ID){
			return i;
		}else if(array[i].id > ID){
			return -1;
		}
	}
	return -1;
}

// compiles the description for things.
function describe(zozo){
	var core = zozo[statuses[status]];
	if(!core){
		core = zozo[statuses[zozo.base]];
	}
	var content = core.root;
	if(core.state){
		content += core.state[zozo.areaState];
	}
	return content;
}

// sets the location for an item
// takes the item id number and the area to set it to
function setItemLocation(number, area){
	for(var i = 0; i < items.length; i++){
		if(items[i].id < number){
			break;
		}else if(items[i].id == number){
			items[i].location = area;
		}
	}
}
