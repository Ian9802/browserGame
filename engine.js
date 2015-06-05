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

var areaPoint = 1;
var itemPoint = 1;
var actionPoint = 1;

var noItemsFound = "There are no items of importance here.";
var itemsFound = "In sight there ";
var plural = "are : ";
var singular = "is a ";

// wraps console.log because consoles don't pass well.
function log(content){
	console.log(content);
}

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
	log(describeArea(areaID));
	var found = displayItems(areaID);
	if(found.length == 0){
		log(noItemsFound);
	}else if(found.length == 1){
		log(itemsFound + singular + found[0]);
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
		log(itemsFound + plural);
	}
	setAreaState(areaID);
	displayActions(areaID, areaState);

}

// specialized displayItems
// function checkInventory(){
// 	log(displayItems(0));
// }

// finds all items within an area and calls describe with them
function displayItems(areaID){
	found = [];
	for (var i = 0; i < items.length; i++) {
		if(items[i].location == areaID){
			found += describe(items[i]);
		}
	}
	return found;
}

// evaluates if items restrictions are met
function itemEvaluation(itemRestriction){
	if(itemRestriction.val == 0){
		return true;
	}else if(itemRestriction.val == -1){
		return false;
	}else{
		if(inHand(itemRestriction.val)){
			if(itemRestriction.and){
				if(itemEvaluation(itemRestriction.and)){
					return true;
				}else{
					return false;
				}
			}else{
				return true;
			}
		}else{
			if(itemRestriction.or){
				if(itemEvaluation(itemRestriction.or)){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}
	}
}

// checks to see if the item is in hand
function inHand(itemID){
	var position = getLocation(items, itemID);
	if(items[position].location == 0){
		return true;
	}else{
		return false;
	}
}

function displayActions(areaID, statusID){
	for(var i = 0; i < actions.length; i++){
		var valid = false;
		log(actions[i].status);
		if(actions[i].status.indexOf(statusID) != -1 || actions[i].status.indexOf(0) != -1){
			if(actions[i].location[0].area == 0){
				valid = true;
			}else{
				for(var j = 0; j < actions[i].location.length; j++){
					if(actions[i].location[j].area == areaID){
						itemEvaluation(actions[i].item);
						valid = true;
						break;
					}
				}
			}
		}
		if(valid){
			actions[i].perform(actions[i].id);
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
		return describe(actions[location]);
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
	var currentStatus = statuses[getLocation(statuses, status)].name;
	var core = zozo[currentStatus];
	if(!core){
		core = zozo[currentStatus];
	}
	var content = core.root;
	if(core.state){
		content += core.state[zozo.areaState];
	}
	return content;
}
