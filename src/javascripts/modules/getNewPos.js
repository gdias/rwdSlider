
var getLeft = require("./getLeft");
var tpinpx = require("./transformPinPx");

module.exports = function(orient, elem, css_prefix) {

	var newPos = 0,
		oldPos = getLeft(elem);
		console.log(oldPos);

	if (orient) { // next
		if (oldPos === 0)
			newPos = 1;
		else if(oldPos == -tpinpx("50", elem))
			newPos = 2;
		else if(oldPos == -tpinpx("100", elem))
			newPos = 3;
		else if(oldPos == -tpinpx("125", elem))
			newPos = 4;
		;

	} else { // prev
		if (oldPos === "0")
			return
		else if(oldPos === tpinpx("50", elem))
			newPos = 1;
		else if(oldPos === tpinpx("100", elem))
			newPos = 2;
		else if(oldPos === tpinpx("125", elem))
			newPos = 3;
		else
			return;
	}

	console.log(newPos);

	return css_prefix+newPos;
}