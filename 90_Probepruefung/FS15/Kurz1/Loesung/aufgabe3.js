// Aufgabe
var personen = 
	[ { vorname: "Hans", nachname: "Huber", plz: "7000", ort: "Chur"},
	  { vorname: "Thomas", nachname: "Tanner", plz: "7304", ort: "Maienfeld" },
	  { vorname: "Arnold", nachname: "Amacker", plz: "8000", ort: "Zürich" }];
	  
// Teilaufgabe a)
personen.forEach(function(p) { console.log(p.vorname + " " + p.nachname + " wohnt in " + p.plz + " " + p.ort + "."); });

// Teilaufgabe b)
var sortiert = personen.sort(function(p1, p2) { return p1.nachname.localeCompare(p2.nachname); });
