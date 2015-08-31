'use strict';

var _h = require('handlebars');

// File for demo
module.exports = function(){

	global.dataRwdSlider = {
	    "article": [
		    {
		        "title": "my product #1",
		        "imgUrl": "img/1539-1.jpg",
		        "desc": "Description of product #1"
		    },
		    {
		        "title": "my product #2",
		        "imgUrl": "img/1539-2.jpg",
		        "desc": "Description of product #2"
		    },
		    {
		        "title": "my product #3",
		        "imgUrl": "img/1539-3.jpg",
		        "desc": "Description of product #3"
		    },
		    {
		        "title": "my product #4",
		        "imgUrl": "img/1539-4.jpg",
		        "desc": "Description of product #4"
		    },
		    {
		        "title": "my product #5",
		        "imgUrl": "img/1539-5.jpg",
		        "desc": "Description of product #5"
		    },
		    {
		        "title": "my product #6",
		        "imgUrl": "img/1539-6.jpg",
		        "desc": "Description of product #6"
		    },
		    {
		        "title": "my product #7",
		        "imgUrl": "img/1539-7.jpg",
		        "desc": "Description of product #7"
		    },
		    {
		        "title": "my product #8",
		        "imgUrl": "img/1539-8.jpg",
		        "desc": "Description of product #8"
		    },
		    {
		        "title": "my product #9",
		        "imgUrl": "img/1539-9.jpg",
		        "desc": "Description of product #9"
		    }
	    ]
	};


//console.log(_h);

		var srcTemp = $("#article-list").html(),
			template = _h.compile(srcTemp),
			htmlContent = template(dataRwdSlider);

		$("#article-list").parent().html(htmlContent);

};
