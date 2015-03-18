"use strict";

/**
 * Create a new Field with given column and row count.
 *
 * @param columnCount {Integer} the number of columns
 * @param rowCount {Integer} the number of rows
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
 * Get the number of columns
 * 
 * @returns {Integer} the number of columns
 */
Field.prototype.getColumnCount = function() {
	return this.field.length;
};

/**
 * Get the number of rows
 * 
 * @returns {Integer} the number of rows
 */
Field.prototype.getRowCount = function() {
	return this.field[0].length;
};

/**
 * Get the disc at the given column and row no.
 *
 * @param {Integer} columnNo the column no
 * @param {Integer} rowNo the row no
 * @returns the disc; either Field.DISC_YELLOW, Field.DISC_RED pr Field.NO_DISC
 */
Field.prototype.getDisc = function(columnNo, rowNo) {
	return this.field[columnNo][rowNo];
};


/**
 * Create a string representation of this field.
 * 
 * @returns {String} the string representation.
 */
Field.prototype.toString = function() {
	var 
		result = "", 
		rowNo, 
		columnNo, 
		disc;
	for (rowNo = 0; rowNo < this.field[0].length; rowNo++) {
		for (columnNo = 0; columnNo < this.field.length; columnNo++) {
			disc = this.getDisc(columnNo, rowNo);
			result += disc + " ";
		}
		result += "\n";
	}
	return result;
};

/**
 * Init this field.
 */
Field.prototype.init = function() {
	var
		columnNo,
		rowNo;
	for (columnNo = 0; columnNo < this.getColumnCount(); columnNo++) {
		for (rowNo = 0; rowNo < this.getRowCount(); rowNo++) {
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
	var column01 = column.map(function(disc) {
		return disc === NO_DISC ? 0 : 1;
	});
	return column01.reduce(function(a, b) {
		return a + b;
	});
};

/**
 * Toggle disc.
 *
 * @param disc the disc; must be either DISC_YELLOW or DISC_RED
 * @return the toggled disc
 */
Field.toggleDisc = function(disc) {
	return disc === Field.DISC_YELLOW ? Field.DISC_RED : Field.DISC_YELLOW;
};


/**
 * Create a new table representation of the given field, 
 * i.e. for every cell in field there is a <td> element in a <tbody> element.
 * 
 * @param field the field to represent
 */
function FieldAsTable(field) {
	var 
		columnNo;
	
	this.field = field;	
	
	// create an empty array for the td elements
	this.tds = new Array(this.field.getColumnCount());
	for (columnNo = 0; columnNo < this.field.getColumnCount(); columnNo++) {
		this.tds[columnNo] = new Array(this.field.getRowCount());
	}
}

/**
 * Create the <tbody> element.
 *
 * @return the <tbody> element
 */
FieldAsTable.prototype.createElement = function() {
	var 
		rows = document.createElement("tbody"),
		row,
		td,
		rowNo,
		columnNo,
		disc;

	for (rowNo = 0; rowNo < this.field.getRowCount(); rowNo++) {
		row = document.createElement("tr");
		for (columnNo = 0; columnNo < this.field.getColumnCount(); columnNo++) {
			td = document.createElement("td");
			td.setAttribute("columnNo", columnNo);
			td.setAttribute("rowNo", rowNo);

			this.tds[columnNo][rowNo] = td;
						
			row.appendChild(td);
		}
		rows.appendChild(row);
	}
	return rows;
};

/**
 * Add a click handler for every <td> element. The click handler is called with the following three arguments: <td>, columnNo, rowNo.
 * 
 * @param {Function} handler the click handler
 */
FieldAsTable.prototype.addClickHandler = function(handler) {
	var columnNo, rowNo, td, hx;
	for (columnNo = 0; columnNo < this.field.getColumnCount(); columnNo++) {
		for (rowNo = 0; rowNo < this.field.getRowCount(); rowNo++) {
			td = this.tds[columnNo][rowNo];
			hx = (function (td, columnNo, rowNo) {
				return (function() { 
					return handler.apply(td, [td, columnNo, rowNo]);
				});
			} (td, columnNo, rowNo));
			td.addEventListener('click', hx);
		}
	}
};


/**
 * Update the table representation
 */
FieldAsTable.prototype.update = function() {
	var columnNo, rowNo, td, disc;
	for (columnNo = 0; columnNo < this.field.getColumnCount(); columnNo++) {
		for (rowNo = 0; rowNo < this.field.getRowCount(); rowNo++) {
			td = this.tds[columnNo][rowNo];

			disc = this.field.getDisc(columnNo, rowNo);
			switch (disc) {
			case Field.DISC_YELLOW:
				td.className = "yellow";
				break;
			case Field.DISC_RED:
				td.className = "red";
				break;
			case Field.NO_DISC:
				td.className = "";
				break;
			default:
				td.className = "";
			}
		}
	}
};

