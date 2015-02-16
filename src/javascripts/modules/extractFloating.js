module.exports = function(n){
	
	var stringify = ""+n; // transform Value in String
	var posVirgule = stringify.indexOf('.'); // find position of .

		return parseInt(stringify.substr(posVirgule+1)); // return only floating number
}