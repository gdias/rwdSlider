"use strict";

var extend = require('./modules/extends');
var extractF = require('./modules/extractFloating');
var transitionValue = require("./modules/contructTransitionValue");
var findElemClass = require("./modules/findElementByHasClass");

var slider = function(opts) {

	 // Options module
    this.options = {
    	nbMove : 2,
    	nbView : 4,
    	wrapper : "",
      container : "ul",
    	item : "li",
    	breakpoint : {px:0, nb:0} // object contain breakpoints (number) / nbView (number)
   	}

   	slider.prototype.init = function(){

   		extend(this.options, opts); // merge with options passed in parameter

      var obj = this; // closure

        this._sliderWidth, // width of view
        this._itemWidth, // width of item
        this._totalWidth, // total width (all items)
        this._nbTotalItem, // total number of item
        this._steps = [], // Array contain value of step
        this._nbSteps = 0, // nbStep in slider
        this._position = 0, // position of client
        this._nbView = this.options.nbView, // Number of element viewing
        this._rest = 0; // rest of quotien

   		//$(function(){
     		obj.getSizes(); // call method getAllSizes()
        obj.generateSteps(); // construct object of moves 
        obj.bindEvents(); // bind events

        if (obj.options.breakpoint.px)
          obj.responsive();

      //});

   	}

    /* adjust and set width() on slider */
   	slider.prototype.getSizes = function() { 
   		var obj = this;
   		    obj._sliderWidth = $(obj.options.wrapper).width();
   		    obj._nbTotalItem = $(obj.options.item, obj.options.wrapper).size();
          obj._itemWidth = parseInt(obj._sliderWidth / obj._nbView);
          obj._totalWidth = parseInt(obj._itemWidth * obj._nbTotalItem);
      
   		$(obj.options.item, obj.options.wrapper).each(function(){
   		  $(this).width(obj._itemWidth);
   		});

      $(obj.options.wrapper).find(obj.options.container).width(obj._totalWidth);
   	}

    /* Calculate steps of moves */
    slider.prototype.generateSteps = function(){
      
      var pad = parseInt(this._itemWidth * this.options.nbMove),
          nbStepRest = parseInt(this._nbTotalItem - this._nbView),
          nbStepRestByMove = parseFloat(nbStepRest / this.options.nbMove),
          nbStepHiddenRestToStart = parseFloat(nbStepRestByMove + (this._nbView / this.options.nbMove)) - (parseFloat(this._nbView / this.options.nbMove)),
          intNbSteps = parseInt(nbStepHiddenRestToStart),
          restStep = extractF(nbStepHiddenRestToStart); // Extract floating number, return 0 if not floating result

        this._steps = []; // set empty Array();
        
        this._steps.unshift(0) // addFirst Steps

        for (var i = 1; i <= intNbSteps; i++) {
          this._steps.push(parseInt(i*pad)); // add step on tab
        }
        
        if (restStep) {
          this._rest = (this._nbTotalItem - (intNbSteps*this._nbView))
          var rRest = parseFloat(restStep/10);
          var lastStep = this._steps[this._steps.length-1] + (rRest*pad);
          this._steps.push(lastStep);
        }

        this._nbSteps = this._steps.length;
    }

    slider.prototype.bindEvents = function() {
      
      var obj = this,
          wrap = this.options.wrapper,
          btnNext = findElemClass("a", wrap, "next"),
          btnPrev = findElemClass("a", wrap, "prev");

      btnNext.click(function() {
        if (obj._position === 0) // reset way after change once
          obj.generateSteps();

        obj.move(true); // move left
      });

      btnPrev.click(function() { 
         if (obj._position === obj._steps.length-1) // backWay if at the end 
            obj.updateStepsBackWay();

          obj.move(false); // move right
      });

      window.onresize = function() {
        obj.responsive();
      }
    }

    slider.prototype.updateStepsBackWay = function() {

      var steps = this._steps.splice(1,this._steps.length-2),
          indexTabInt = 1;
      
      for (var c in steps) {

        var valToUpdate = steps[c],
            decalage = parseInt(this._rest*this._itemWidth),
            newStep = parseInt(valToUpdate-decalage);
        
        this._steps.splice(indexTabInt, 0, newStep);
        
        indexTabInt++;

      }
    }


    slider.prototype.move = function(way){
      
      if (way) { // btn next
        if (this._position < (this._nbSteps-1))
          this._position = this._position + 1;
        else
          return;
      } else { // btn prev
        if (this._position > 0)
          this._position = this._position - 1;
        else
          return;
      }

      // get Step position in M
      this.setPosition(this._position);

    }

    slider.prototype.setPosition = function(position) {
      
      var posX = transitionValue("-",this._steps[position],"px");

      if (document.addEventListener) // if > IE8
        $(this.options.wrapper).find(this.options.container).css("transform","translateX("+posX+")");
      else {
        $(this.options.wrapper).find(this.options.container).animate({"left":posX})
      }

    }

    slider.prototype.responsive = function() {

      if (document.addEventListener) // if > IE8
        var breakP = window.matchMedia("(max-width:"+this.options.breakpoint.px+"px)").matches;
      else
        var breakP = ($(document).width() > this.options.breakpoint.px) ? false : true;

      if (breakP) {
        this._nbView = this.options.breakpoint.nb; // Mobile
      } else {
        this._nbView = this.options.nbView; // Desktop
      }

      this._position = 0;
      this.setPosition(this._position);
      this.getSizes();
      this.generateSteps();
    }

   	// start
    this.init(); 

}

module.exports = slider;