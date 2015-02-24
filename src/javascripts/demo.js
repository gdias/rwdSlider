var _h = require('handlebars');

// File for demo
module.exports = function(){

	


	global.dataRwdSlider = {
	    "article": [
		    {
		        "title": "my product #1",
		        "imgUrl": "http://static.fnac-static.com/multimedia/Images/FR/NR/ef/bd/5f/6274543/1539-1.jpg",
		        "desc": "Description of product #1"
		    }, 
		    {
		        "title": "my product #2",
		        "imgUrl": "http://static.fnac-static.com/multimedia/Images/FR/NR/75/46/5c/6047349/1539-1.jpg",
		        "desc": "Description of product #2"
		    },
		    {
		        "title": "my product #3",
		        "imgUrl": "http://static.fnac-static.com/multimedia/Images/FR/NR/33/a3/60/6333235/1539-1.jpg",
		        "desc": "Description of product #3"
		    }, 
		    {
		        "title": "my product #4",
		        "imgUrl": "http://static.fnac-static.com/multimedia/Images/FR/NR/0e/62/5b/5988878/1539-1.jpg",
		        "desc": "Description of product #4"
		    },
		    {
		        "title": "my product #5",
		        "imgUrl": "http://static.fnac-static.com/multimedia/Images/FR/NR/d0/94/5a/5936336/1539-1.jpg",
		        "desc": "Description of product #5"
		    }, 
		    {
		        "title": "my product #6",
		        "imgUrl": "http://static.fnac-static.com/multimedia/Images/FR/NR/45/37/2a/2766661/1539-4.jpg",
		        "desc": "Description of product #6"
		    },
		    {
		        "title": "my product #7",
		        "imgUrl": "http://static.fnac-static.com/multimedia/Images/FR/NR/ef/bd/5f/6274543/1539-1.jpg",
		        "desc": "Description of product #7"
		    }, 
		    {
		        "title": "my product #8",
		        "imgUrl": "http://static.fnac-static.com/multimedia/Images/FR/NR/ef/bd/5f/6274543/1539-1.jpg",
		        "desc": "Description of product #8"
		    },
		    {
		        "title": "my product #9",
		        "imgUrl": "http://static.fnac-static.com/multimedia/Images/FR/NR/ef/bd/5f/6274543/1539-1.jpg",
		        "desc": "Description of product #9"
		    }
	    ]
	};


//console.log(_h);

		var srcTemp = $("#article-list").html(),
			
			template = _h.compile(srcTemp),
			//console.log(dataRwdSlider.article);
		
			htmlContent = template(dataRwdSlider);

//			console.log(htmlContent);
		//console.log($("#article-list").html());
		$("#article-list").parent().html(htmlContent);

};


