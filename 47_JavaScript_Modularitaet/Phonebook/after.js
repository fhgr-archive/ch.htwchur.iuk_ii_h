var PHONEBOOK = {};

/**
 * Create a new Entry with given first name, last name and number.
 *
 * @constructor
 * @param {string} firstName the first name
 * @param {string} lastName the last name
 * @param {string} number the phone number
 */
PHONEBOOK.Entry = function(firstName, lastName, number) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.number = number;
};
	
/**
 * Add this entry to the given HTML element as <li>...</li>.
 *
 * @param element the HTML element to add this entry to.
 */
PHONEBOOK.Entry.prototype.addLiToElement = function(element) {
	var li = element.ownerDocument.createElement("li");
	li.innerHTML = this.firstName + " " + this.lastName + ": " + this.number;
	element.appendChild(li);
};

/**
 * Does this entry contain the given last name?
 *
 * @param {string} lastName the last name to test for
 * @return true if this entries last name contains the given last name, false otherwise
 */
PHONEBOOK.Entry.prototype.lastNameContains = function(lastName) {
	return this.lastName.indexOf(lastName) !== -1;
};


/**
 * Create a new phonebook with given entries.
 *
 * @param {Array} entries the array of entries.
 */
PHONEBOOK.Phonebook = function(entries) {
	this.entries = entries;
};
	
/**
 * Add all phonebook entries as <li>...</li> elements to the HTML element with given id.
 *
 * @param {string} id the id to add the entries to.
 */
PHONEBOOK.Phonebook.prototype.addLisToElementWithId = function(id) {
	var element = document.getElementById(id);
	element.innerHTML = "";
	this.entries.forEach(function(entry) { entry.addLiToElement(element); });
};

/**
 * Add phonebook entries which contain given last name as <li>...</li> elements to the HTML element with given id.
 *
 * @param {string} id the id to add the entries to.
 * @param {string} lastName the last name to filter the entries.
 */
PHONEBOOK.Phonebook.prototype.addLisToElementWithIdWithLastNameContaining = function(id, lastName) {
	var element = document.getElementById(id);
	element.innerHTML = "";
	var entriesWithLastName = this.entries.filter(function(entry) { return entry.lastNameContains(lastName); });
	entriesWithLastName.forEach(function(entry) { entry.addLiToElement(element); });
};
