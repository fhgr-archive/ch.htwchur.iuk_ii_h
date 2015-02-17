"use strict";

/**
 * Create a new Field with given column and row count.
 *
 * @param {Integer} columnCount the number of columns
 * @param {Integer} rowCount the number of rows
 */
function Field(columnCount, rowCount) {
	var 
		columnNo;

	// create 2 dimensional field
	this.field = new Array(columnCount);
	for (columnNo = 0; columnNo < columnCount; columnNo++) {
		this.field[columnNo] = new Array(rowCount);
	}
	this.init();
}

// discs
Field.DISC_YELLOW = "y";
Field.DISC_RED = "r";
Field.NO_DISC = "_";

/**
 * Create a string representation of this field.
 * 
 * @returns {String} the string representation.
 */
Field.prototype.toString = function() {
	var result = "";
	for (var rowNo = 0; rowNo < this.field[0].length; rowNo++) {
		for (var columnNo = 0; columnNo < this.field.length; columnNo++) {
			var disc = this.field[columnNo][rowNo];
	    	result += disc + " ";
	    }
	    result += "\n";
	}
	return result;
};

/**
 * Init this field.
 * 
 */
Field.prototype.init = function() {
	for (var columnNo = 0; columnNo < this.field.length; columnNo++) {
	    for (var rowNo = 0; rowNo < this.field[columnNo].length; rowNo++) {
	    	this.field[columnNo][rowNo] = Field.NO_DISC;
	    }
	}
};

/**
 * Drop the disc to specified column.
 * 
 * @param disc the disc; must be either DISC_YELLOW or DISC_RED
 * @param {Integer} columnNo the column number
 * @return {Boolean} returns true on success
 */
Field.prototype.drop = function(disc, columnNo) {
	var 
		column = this.field[columnNo],
		emptyRowNo;
	
	emptyRowNo = column.lastIndexOf(Field.NO_DISC);
	if (emptyRowNo === -1) {
		return false;
	}
	column[emptyRowNo] = disc;
	return true;
};

/**
 * Count the number of discs in the given column.
 * 
 * @param {Integer} columnNo the column
 * @returns {Integer} the number of discs 
 */
Field.prototype.countDiscsInColumn = function(columnNo) {
	var column = this.field[columnNo];
	var column01 = column.map(function(disc) { return disc === NO_DISC ? 0 : 1; }); 
    return column01.reduce(function(a,b) { return a+b; });
};


//
// Example code 
//

var field = new Field(5,5);
console.log(field.toString());
field.drop(Field.DISC_YELLOW, 4);
field.drop(Field.DISC_RED, 3);
field.drop(Field.DISC_YELLOW, 4);
console.log(field.toString());
