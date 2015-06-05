/*
*	Areas
*/

// creates an area and adds it to the list of areas
// TODO: explain.
function createArea(roomName, baseStatus, localState, statusList, connectedList, directionList){
	var area = {};
	area.id = areaPoint;
	areaPoint += 1;
	area.name = roomName;
	area.base = baseStatus;
	area.areaState = localState;
	for(var i = 0; i < statusList; i++){
		area[statusList[i].name] = {
			root: statusList[i].root,
			state: statusList[i].state
		}
	}
	area.connected = connectedList;
	area.direction = directionList;
	areas.push(area);
}

// sets value in area
function setValueArea(areaID, value, data){
	var location = getLocation(areas, areaID);
	if(location != -1){
		areas[location][value] = data;
	}
}

// renames an area, areaID & new name as inputs
function renameArea(areaID, name){
	setValueArea(areaID, "name", name);
}

// changes the local state of the area. areaID and areaState [number] to change to
function changeStateArea(areaID, state){
	setValueArea(areaID, "areaState", state);
}

// sets the status [if it already exists it's overwritten].
function setStatusArea(areaID, status, name){
	setValueArea(areaID, name, status);
}

// sets status according to statusID
function setStatusIDArea(areaID, status, statusID){
	var location = getLocation(statuses, statusID);
	setValueArea(areaID, statuses[location].name, status);
}

// creates a path from the fromID area to the toID area with the path discription
function createPath(fromID, toID, path){
	var location = getLocation(areas, fromID);
	areas[location].connected.push(toID);
	areas[location].direction.push(path);
}

// creates a bidirectional path, desc1 area1 ⇒ area2, desc area2 ⇒ area1
function createBidirectionalPath(area1, area2, desc1, desc2){
	createPath(area1, area2, desc1);
	createPath(area2, area1, desc2);
}

// removes a path and description from the list, takes the first it sees. 
function removePath(fromID, toID){
	var location = getLocation(areas, fromID);
	var point = $.inArray(toID, areas[location].connected);
	if(point != -1){
		areas[location].connected.splice(point, 1);
		areas[location].direction.splice(point, 1);
	}
}

// removes a bidirections path, takes the first found on each
function removeBidirectionalPath(area1, area2){
	removePath(area1, area2);
	removePath(area2, area1);
}

/*
*	Items
*/

// creates an item and adds it to the list of items
// TODO: explain.
function createItem(itemName, baseStatus, statusList, location, hiddenInHand, hidden){
	var item = {};
	item.id = itemPoint;
	itemPoint += 1;
	item.name = itemName;
	item.base = baseStatus;
	for(var i = 0; i < statusList; i++){
		item[statusList[i].name] = {
			root: statusList[i].root,
		}
	}
	item.location = location;
	item.hiddenInHand = hiddenInHand;
	item.hidden = hidden;
}

// sets the location of the item given to the area given
// takes the item id number and the area ID to set it to
function setItemLocation(itemID, areaID){
	var position = getLocation(items, itemID);
	if(position != -1){
		items[position].location = areaID;
	}
}

// places item of ID given into the inventory
function addItemToInv(itemID){
	setItemLocation(itemID, 0);
}

// fires an item into the void [places it nowhere]
function removeItem(itemID){
	setItemLocation(itemID, null);
}

/*
*	Actions
*/

// creates an action and adds it to the list of actions
// TODO: explain.
function createAction(name, baseStatus, statusList, locationList, itemRestrictions, stateList, performance){
	var action = {};
	action.id = actionPoint;
	actionPoint += 1;
	action.name = name;
	action.base = baseStatus;
	for(var i = 0; i < statusList; i++){
		action[statusList[i].name] = {
			root: statusList[i].root
		}
	}
	action.location = locationList;
	action.item = itemRestrictions;
	action.status = stateList;
	action.perform = performance;
}

function makeButton(name, data, funct, tag){
	createButton("body", name, data, funct, tag);
}