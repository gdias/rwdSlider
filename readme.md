# Responsive Slider JS

## RWD-Slider
> v 0.0.2

Generate a responsive slideshow component in native JavaScript.

### Features
+ Slider Responsive
+ Auto size items
+ Update size of items when "onResize"
+ Breakpoint for modify nbView
+ Css classes for state of arrows
+ Without jQuery

#### DEMO
Clone this repository and get a DEMO
In CLI >
> npm install
> gulp

### HTML
This plugin have need a structure as like that :
```
<div id="wrapper">
	<a class="btn-prev"></a>
	<ul>
		<li>item #01</li>
		<li>[...]</li>
		<li>item #09</li>
	</ul>
	<a class="btn-next"></a>
</div>
```

### JS
```
<script>
	new rwdSlider({
		wrapper : "#slider",
		nbView : 4,
        nbMove : 2
	});
</script>
```

### Binding control
For button prev & next, just use this term in your choice of className.
Ex : btn-next, BtnNext ...

### Parameters

| Name of parameter |  Type  | Default 		| Description 							 							  |
|-------------------|--------|--------------|---------------------------------------------------------------------|
| wrapper 			| String | null	   		| Selector of wrapper passed at sizzle selector (Necessary)			  |
| container         | String | ul      		| Selector of content items of slider 								  |
| item   			| String | li 	   		| Selector of items 												  |
| nbView   			| Number | 4 	   		| Number items visible												  |
| nbMove   			| Number | 2 	   		| Number items slide											   	  |
| breakpoint   		| Object |px:0, nb:0    | Object contain breakpoint in px (max-width) and nbView Parameters   |


#### UseCase with breakpoint

If you should to modify the number of element you show, you can pass in parameter an object containing the limit of breakpoint and number of show item.

```
<script>
	new rwdSlider({
		wrapper : "#slider",
		nbView : 4,
        nbMove : 2,
        breakpoint : {
        	px:768,
        	nb:2
        }
	});
</script>
```

### Roadmap
+ add mobile friendly mode
+ Add unit-tests for calcul position method
+ Breadcrum Automatic Generated
+ Add examples

### Browsers
> IE9+, Chrome, Firefox, Safari, Native Browser IOS & Android

### Licence
> 2015 MIT-Licence
