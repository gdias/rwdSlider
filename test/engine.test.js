// permet de tester la méthode de calcul des steps

var should = require("should");
var extractFloat = require("../src/javascripts/modules/extractFloating");
var extend = require("../src/javascripts/modules/extends");

var methodToTest = function(obj) {

	var pad = parseInt(obj._itemWidth * obj.options.nbMove),
		nbStepRest = parseInt(obj._nbTotalItem - obj._nbView),
		nbStepRestByMove = parseFloat(nbStepRest / obj.options.nbMove),
		nbStepHiddenRestToStart = parseFloat(nbStepRestByMove + (obj._nbView / obj.options.nbMove)) - (parseFloat(obj._nbView / obj.options.nbMove)),
		intNbSteps = parseInt(nbStepHiddenRestToStart),
		restStep = extractFloat(nbStepHiddenRestToStart); // Extract floating number, return 0 if not floating result

	obj._steps = []; // set empty Array();
	
	obj._steps.unshift(0) // addFirst Steps

	for (var i = 1; i <= intNbSteps; i++) {
		obj._steps.push(parseInt(i*pad)); // add step on tab
	}
	
	if (restStep) {
		var rRest = parseFloat(restStep/10);
		var lastStep = obj._steps[obj._steps.length-1] + (rRest*pad);
		obj._steps.push(lastStep);
	}

	obj._nbSteps = obj._steps.length;

	return obj;
}

describe('Steps generated', function(){

	var o = {
			_itemWidth : 150,
			_nbView : 0,
			_nbTotalItem: 5,
			_steps : [],
			_nbSteps : 0
		};

	it('Return steps for : view 5 - total 10 - move 2 = 4', function(){
		var p = {
			_nbView : 5,
			_nbTotalItem: 10,
			options : { nbMove : 2 }
		};
		var q = extend(o, p);
		methodToTest(q);
		q._nbSteps.should.equal(4);
	});

	it('Return steps for : view 4 - total 9 - move 2 = 4', function(){
		var p = {
			_nbView : 4,
			_nbTotalItem: 9,
			options : { nbMove : 2 }
		};
		var q = extend(o, p);
		methodToTest(q);
		q._nbSteps.should.equal(4);
	});


	it('Return steps for : view 3 - total 9 - move 3 = 3', function() {
		var p = {
			_nbView : 3,
			_nbTotalItem: 9,
			options : { nbMove : 3 }
		};
		var q = extend(o, p);
		methodToTest(q);
		q._nbSteps.should.equal(3);
	});

	it('Return steps for : view 3 - total 6 - move 3 = 2', function() {
		var p = {
			_nbView : 3,
			_nbTotalItem: 6,
			options : { nbMove : 3 }
		};
		var q = extend(o, p);
		methodToTest(q);
		q._nbSteps.should.equal(2);
	});

	it('Return steps for : view 4 - total 6 - move 2 = 2', function() {
		var p = {
			_nbView : 4,
			_nbTotalItem: 6,
			options : { nbMove : 2 }
		};
		var q = extend(o, p);
		methodToTest(q);
		q._nbSteps.should.equal(2);
	});

	it('Return steps for : view 4 - total 7 - move 2 = 3', function() {
		var p = {
			_nbView : 4,
			_nbTotalItem: 7,
			options : { nbMove : 2 }
		};
		var q = extend(o, p);
		methodToTest(q);
		q._nbSteps.should.equal(3);
	});

	it('Return steps for : view 5 - total 10 - move 1 = 5', function() {
		var p = {
			_nbView : 5,
			_nbTotalItem: 10,
			options : { nbMove : 1 }
		};
		var q = extend(o, p);
		methodToTest(q);
		q._nbSteps.should.equal(6);
	});

	it('Return steps for : view 13 - total 15 - move 2 = 2', function() {
		var p = {
			_nbView : 13,
			_nbTotalItem: 15,
			options : { nbMove : 2 }
		};
		var q = extend(o, p);
		methodToTest(q);
		q._nbSteps.should.equal(2);
	});

	it('Return steps for : view 6 - total 20 - move 6 = 4', function() {
		var p = {
			_nbView : 6,
			_nbTotalItem: 20,
			options : { nbMove : 6 }
		};
		var q = extend(o, p);
		methodToTest(q);
		q._nbSteps.should.equal(4);
	});


});