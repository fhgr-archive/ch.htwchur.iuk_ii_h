"use strict";

// discs
var DISC_YELLOW = "y";
var DISC_RED = "r";
var NO_DISC = "_";

// create field
var field = new Array(7);
for (var column = 0; column < 7; column++) {
    field[column] = new Array(6);
}

/**
 * Create a string representation of the field.
 * 
 * @param field the field
 * @returns {String} the string representation.
 */
function toString(field) {
	var result = "";
	for (var rowNo = 0; rowNo < field[0].length; rowNo++) {
		for (var columnNo = 0; columnNo < field.length; columnNo++) {
			var disc = field[columnNo][rowNo];
	    	result += disc + " ";
	    }
	    result += "\n";
	}
	return result;
}

console.log(toString(field));

/**
 * Init field.
 * 
 * @param field the field
 */
function init(field) {
	for (var columnNo = 0; columnNo < field.length; columnNo++) {
	    for (var rowNo = 0; rowNo < field[columnNo].length; rowNo++) {
	        field[columnNo][rowNo] = NO_DISC;
	    }
	}
}

init(field);
console.log(toString(field));

/**
 * Drop the disc to specified column.
 * 
 * @param disc the disc; must be either DISC_YELLOW or DISC_RED
 * @param {Integer} columnNo the column number
 * @return {Boolean} returns true on success
 */
function drop(field, disc, columnNo) {
	var 
		column = field[columnNo],
		emptyRowNo;
	
	emptyRowNo = column.lastIndexOf(NO_DISC);
	if (emptyRowNo === -1) {
		return false;
	}
	column[emptyRowNo] = disc;
	return true;
}


drop(field, DISC_YELLOW, 4);
drop(field, DISC_RED, 3);
drop(field, DISC_YELLOW, 4);
console.log(toString(field));

/**
 * Count the number of discs in the given column.
 * 
 * @param field the field 
 * @param {Integer} columnNo the column
 * @returns {Integer} the number of discs 
 */
function countDiscsInColumn(field, columnNo) {
	var column = field[columnNo];
	var column01 = column.map(function(disc) { return disc === NO_DISC ? 0 : 1; }); 
    return column01.reduce(function(a,b) { return a+b; });
}

console.log(countDiscsInColumn(field, 4));
