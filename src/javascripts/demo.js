'use strict';

// handlebars
var _h = require('handlebars');

// File for demo
module.exports = function(srcTemp, template){

	global.dataRwdSlider = {
	    "article": [
		    {
		        "title": "Product #1",
		        "imgUrl": "img/1539-1.jpg",
		        "desc": "Description of product #1"
		    },
		    {
		        "title": "Product #2",
		        "imgUrl": "img/1539-2.jpg",
		        "desc": "Description of product #2"
		    },
		    {
		        "title": "Product #3",
		        "imgUrl": "img/1539-3.jpg",
		        "desc": "Description of product #3"
		    },
		    {
		        "title": "Product #4",
		        "imgUrl": "img/1539-4.jpg",
		        "desc": "Description of product #4"
		    },
		    {
		        "title": "Product #5",
		        "imgUrl": "img/1539-5.jpg",
		        "desc": "Description of product #5"
		    },
		    {
		        "title": "Product #6",
		        "imgUrl": "img/1539-6.jpg",
		        "desc": "Description of product #6"
		    },
		    {
		        "title": "Product #7",
		        "imgUrl": "img/1539-7.jpg",
		        "desc": "Description of product #7"
		    },
		    {
		        "title": "Product #8",
		        "imgUrl": "img/1539-8.jpg",
		        "desc": "Description of product #8"
		    },
		    {
		        "title": "Product #9",
		        "imgUrl": "img/1539-9.jpg",
		        "desc": "Description of product #9"
		    }
	    ]
	};

	srcTemp = document.querySelector("#article-list").innerHTML
	template = _h.compile(srcTemp)

	document.querySelector("#article-list").parentNode.innerHTML = template(dataRwdSlider)

};
