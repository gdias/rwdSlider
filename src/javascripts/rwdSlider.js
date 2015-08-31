"use strict";

var extend = require('./modules/extends')
var extractF = require('./modules/extractFloating')
var transitionValue = require("./modules/contructTransitionValue")
var findElemClass = require("./modules/findElementByHasClass")
var _ = require("lodash")

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

   	slider.prototype.init = function(self){

   		extend(this.options, opts) // merge with options passed in parameter

        self = this // closure

        this._sliderWidth // width of view
        this._itemWidth // width of item
        this._totalWidth // total width (all items)
        this._nbTotalItem // total number of item
        this._steps = [] // Array contain value of step
        this._nbSteps = 0 // number of steps in slider
        this._position = 0 // position of client
        this._nbView = this.options.nbView // Number of element viewing
        this._rest = 0 // rest of quotien
        this._decalage = 0 // rest of movement (for last item if necessary)
        this._pad = 0 // Number of pixels who represent a movement
        this._stepsUpdated = false // true if steps has been updated by the back way

        if (typeof self.options.breakpoint.px === "undefined") {
          self.getSizes() // call method getAllSizes()
          self.generateSteps() // construct selfect of moves
        } else {
          self.responsive()
        }

        self.bindEvents() // bind events
        self.checkViewControls() // check arrows
   	}

    /* adjust and set width() on slider */
   	slider.prototype.getSizes = function(self, wrapper) {
      self = this
      wrapper = document.querySelector(self.options.wrapper)
      self._sliderWidth = document.querySelector(self.options.wrapper).clientWidth
      self._nbTotalItem = wrapper.querySelectorAll(self.options.item).length
      self._itemWidth = parseInt(self._sliderWidth / self._nbView, 10)
      self._totalWidth = parseInt(self._itemWidth * self._nbTotalItem, 10)

      // set width on all items
      _.map(wrapper.querySelectorAll(self.options.item), function(v, i){
        v.style.width = self._itemWidth+"px"
      })
      // set width of wrapper
      wrapper.querySelector(self.options.container).style.width = self._totalWidth+"px"
   	}

    /* Calculate steps of moves */
    slider.prototype.generateSteps = function(self, pad, nbStepRest, nbStepRestByMove, nbStepHiddenRestToStart, intNbSteps, restStep){
        self = this
        pad = self._pad = parseInt(self._itemWidth * self.options.nbMove, 10)
        nbStepRest = parseInt(self._nbTotalItem - self._nbView, 10)
        nbStepRestByMove = parseFloat(nbStepRest / self.options.nbMove)  //1.25

        nbStepHiddenRestToStart = parseFloat(nbStepRestByMove + (self._nbView / self.options.nbMove)) - (parseFloat(self._nbView / self.options.nbMove))
        intNbSteps = parseInt(nbStepHiddenRestToStart, 10)
        restStep = extractF(nbStepHiddenRestToStart) // Extract floating number, return 0 if not floating result

        self._steps = []; // set empty Array();
        self._steps.unshift(0) // addFirst Steps
        for (var i = 1; i <= intNbSteps; i++) {
          self._steps.push(parseInt(i*pad, 10)) // add step on tab
        }

        if (restStep) {
          self._rest = (self._nbTotalItem - (intNbSteps * self._nbView))
          var rRest = self._decalage = parseFloat(restStep/100)
          var lastStep = self._steps[self._steps.length-1] + (rRest * pad)
          self._steps.push(lastStep)
        }
        self._nbSteps = self._steps.length
        self._stepsUpdated = false
    }

    slider.prototype.bindEvents = function(self, wrap, btnNext, btnPrev, renewPosition) {

      self = this
      wrap = self.options.wrapper
      btnNext = findElemClass("a", wrap, "next")
      btnPrev = findElemClass("a", wrap, "prev")
      renewPosition = function(){self.responsive()}

      btnNext.click(function() {
        if (self._position === 0 && !!self._stepsUpdated) // reset way after change once
          self.generateSteps()

        self.move(true) // move left
      });

      btnPrev.click(function() {
         if (self._position === self._steps.length - 1 && !self._stepsUpdated) // backWay if at the end
            self.updateStepsBackWay()

          self.move(false) // move right
      });

      // resize window event
      window.addEventListener("resize", _.throttle(renewPosition, 200));

    }

    slider.prototype.updateStepsBackWay = function(self, steps, indexTabInt, nbSteps) {
      self = this
      steps = self._steps.splice(1,self._steps.length-2)
      indexTabInt = 1
      nbSteps = steps.length;

      for (var c in steps) {
        var valToUpdate = steps[c]
        var decalage = ((1 - self._decalage) * self._pad)
        var newStep = parseInt(valToUpdate - decalage, 10)

        self._steps.splice(indexTabInt, 0, newStep);
        indexTabInt++;
      }

      self._stepsUpdated = true // changed positions
    }


    slider.prototype.move = function(way, self){
      self = this
      if (way) { // btn next
        if (self._position < (self._nbSteps-1))
          self._position = self._position + 1;
        else
          return;
      } else { // btn prev
        if (self._position > 0)
          self._position = self._position - 1;
        else
          return;
      }

      self.setPosition(self._position); // get Step position in M
      self.checkViewControls() // check arrows by this._position
    }

    slider.prototype.setPosition = function(position, self, posX, wrapper, container) {
      self = this
      posX = transitionValue("-",self._steps[position],"px");
      wrapper = document.querySelector(self.options.wrapper)
      container = wrapper.querySelector(self.options.container)

      // setPosition
      container.style.transform = "translateX("+posX+")"

      /*
      if (document.addEventListener) // if > IE8
        $(self.options.wrapper).find(self.options.container).css("transform","translateX("+posX+")");
      else {
        $(self.options.wrapper).find(self.options.container).animate({"left":posX})
      }
      */
    }

    slider.prototype.responsive = function(self, breakP) {
      self = this
      breakP = (document.addEventListener ? window.matchMedia("(max-width:"+self.options.breakpoint.px+"px)").matches : (document.documentElement.clientWidth > self.options.breakpoint.px ? false : true))

      self._nbView = (breakP ? self.options.breakpoint.nb : self.options.nbView)
      self._position = 0
      self.setPosition(self._position)
      self.getSizes()
      self.generateSteps()
    }

    slider.prototype.checkViewControls = function(self, wrap, btnNext, btnPrev){
      self = this
      wrap = self.options.wrapper
      btnNext = findElemClass("a", wrap, "next")[0]
      btnPrev = findElemClass("a", wrap, "prev")[0]

      if (self._position === 0) {
        btnPrev.classList.add("desactive")
      } else if (self._position === self._steps.length - 1) {
        btnNext.classList.add("desactive")
      } else {
        btnNext.classList.remove("desactive")
        btnPrev.classList.remove("desactive")
      }
    }

   	// start
    this.init()

}

module.exports = slider;
