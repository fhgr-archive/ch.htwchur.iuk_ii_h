var ENV = 
(function(window, console) {
	var snapshot;
	
	var takeSnapshot = function() {
		snapshot = Object.getOwnPropertyNames(window);
	}

	var logDifference = function() {
		var actual = Object.getOwnPropertyNames(window);
		for (var index = 0; index<actual.length; index++) {
			var name = actual[index];
			if (snapshot.indexOf(actual[index]) === -1) {
				console.log(name);
			}
		}
	}
	
	return { takeSnapshot: takeSnapshot, logDifference: logDifference };
	
}) (window, console);
