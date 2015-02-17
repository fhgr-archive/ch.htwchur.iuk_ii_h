// Aufgabe

// Teilaufgabe a) Konstruktor

// Teilaufgabe b) Methode tick

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
timer.toString();	// 03:02
timer.tick();
timer.tick();
timer.toString();	// 03:00
timer.tick();
timer.toString();	// 02:59