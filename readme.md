# Responsive Slider JS

## RWD-Slider
> v 0.0.1


Simple script generate a slideshow component JS
 
### Features
+ Slider Responsive
+ Auto size items
+ Update size of items when "onResize"
+ Breakpoint for modify nbView 


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

if you should to modify the number of element you show, can you pass in parameter an object contain the limit of breakpoint and number of show item.

```
<script>
	new rwdSlider({
		wrapper : "#slider",
		nbView : 4,
        nbMove : 2,
        breakpint : {
        	px:768,
        	nb:2
        }
	});
</script>
```

### Roadmap
+ Add unit-tests
+ Breadcrum Automatic Generated
+ Remove jQuery 
+ Replace with Native JS Code and Sizzle for Selector Engine
+ Optimize method for step calculs
+ Add examples

### Browsers
> IE8+, Chrome, Firefox, Safari, Native Browser IOS & Android

### Licence 
> 2015 MIT-Licence


