// Aufgabe
function Timer(min, sek) {
	this.min = min;
	this.sek = sek;
};

Timer.prototype.tick = function() {
	this.sek = this.sek-1;
	if (this.sek == -1) {
		this.min--;
		this.sek = 59;
	}
};

Timer.prototype.toString= function() {
	var result = "";
	// min
	if (this.min < 10) {
		result += "0";
	}
	result += this.min;
	result += ":";
	if (this.sek < 10) {
		result += "0";
	}
	result += this.sek;
	return result;
};

// Beispiel
var timer = new Timer(3, 3);
timer.tick();
timer.toString();	//
timer.tick();
timer.tick();
timer.toString();	//
timer.tick();
timer.toString();	//