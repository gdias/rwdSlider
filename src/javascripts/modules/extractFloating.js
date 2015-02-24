module.exports = function(n){
	
	var stringify = ""+n; // transform Value in String
	var posVirgule = stringify.indexOf('.'); // find position of .
	return (posVirgule != -1) ? parseInt(stringify.substr(posVirgule+1)) : 0;
}