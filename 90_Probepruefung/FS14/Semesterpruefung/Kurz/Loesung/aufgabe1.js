// Aufgabe
function ggT(a,b) {
	if (a == 0) {
		return b;
	} else {
		while (b != 0) {
			if (a > b) {
				a = a-b;
			} else {
				b = b-a;
			}
		}
		return a;		
	}
}

// Beispiel
ggT(24,18);	// 6