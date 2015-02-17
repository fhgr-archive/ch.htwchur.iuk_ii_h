"use strict";

/**
 * Create new contact.
 * 
 * @param name {string} the name
 * @param telNo {string} the telefon number
 */
function Contact(name, telNo) {
	this.name = name;
	this.telNo = telNo;
}

/**
 * Compare to contacts according to their name.
 * 
 * @param {Contact} contact1
 * @param {Contact} contact2
 * @return {number}
 */
Contact.compareTo = function(contact1, contact2) {
	return contact1.name.localeCompare(contact2.name);
};

/**
 * Key for local storage
 */
Contacts.KEY = "contacts";

/**
 * Create new contacts. 
 * Use the contacts stored in local storage, or the default contacts otherwise.
 *
 * @param defaultContacts the array of default contacts
 */
function Contacts(defaultContacts) {
	this.contacts = [];
	this.init(defaultContacts);
};

/**
 * Init contacts.
 *
 * @param defaultContacts the array of default contacts
 */
Contacts.prototype.init = function(defaultContacts) {
	if (this.read()) {
		this.load();
	} else {
 		this.contacts = defaultContacts.slice(0);
 	}
};

/**
 * Get the (sorted) contacts.
 */
Contacts.prototype.getContacts = function() {
	return this.contacts.slice(0);
};

/**
 * Set the contacts.
 */
Contacts.prototype.setContacts = function(contacts) {
	this.contacts = contacts.slice(0);
	this.contacts.sort(Contact.compareTo);
};

/**
 * Add new contact.
 *
 * @param contact {Contact} the contact to add
 */
Contacts.prototype.add = function(contact) {
	this.contacts.push(contact);
	this.contacts.sort(Contact.compareTo);
};

/**
 * Read contact string from local storage.
 */
Contacts.prototype.read = function () {
	return localStorage.getItem(Contacts.KEY);
};

/**
 * Store contacts to local storage.
 */
Contacts.prototype.store = function() {
	localStorage.setItem(Contacts.KEY, JSON.stringify(this.contacts));
};

/**
 * Load contacts from local storage.
 */
Contacts.prototype.load = function () {
	var stored = this.read();
	this.contacts = JSON.parse(stored);
	this.contacts.sort(Contact.compareTo);
};
