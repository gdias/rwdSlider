module.exports = function(percent, elem) {

	// Calcul la position en % par rapport au conteneur
	// Return la valeur d'entrée en pixels

	var globalSize = $(elem).width(),
		calculPosition = parseInt((percent*globalSize)/100);

		//console.log("$(elem).width() : ",$(elem).width()," // Calcul : ",calculPosition);

		return calculPosition;
}