var $ = require("jquery");

module.exports = function(elem, wrap, hasPartClass) {

	var target = $(elem, wrap).filter(function(i){
		var css = $(this).prop("class");
    	if(css.indexOf(hasPartClass) != -1)
    		return true;
	});
	return target;
}