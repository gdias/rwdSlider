module.exports = function(n, stringify, posVirgule){
	if (typeof n === "number") {

		n = n.toFixed(2) // Fix numbers after point
		stringify = ""+n; // transform Value in String
		posVirgule = stringify.indexOf('.'); // find position of .

		return (posVirgule != -1) ? parseInt(stringify.substr(posVirgule+1), 10) : 0;
	} else {
		console.error(" This parameter is not a number (NaN)")
		return false;
	}
}
