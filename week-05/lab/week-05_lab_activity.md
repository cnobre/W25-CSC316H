<!-----
layout: labold
exclude: true
----->

&nbsp;

# Week 05 | Lab Activity

### Learning Objectives

- Learn the D3 update pattern (enter, update, exit)
- Load dynamic datasets and implement flexible scales and axes
- Handle mouse click events and changes of UI components
- Add D3 transitions

### Prerequisites

- Chapter 9 in *D3 - Interactive Data Visualization for the Web*.
- Optional reading: Chapter 10 in *D3 - Interactive Data Visualization for the Web*.
- Optional reading: [Mike Bostock's 'Thinking with Joins'](http://bost.ocks.org/mike/join/) and Case 1 of [https://medium.com/@mbostock/what-makes-software-good-943557f8a488](https://medium.com/@mbostock/what-makes-software-good-943557f8a488)).

## Overview

In today's session ([download template](https://cnobre.github.io/W25-CSC316H/week-02/lab/Template.zip)). In this lab you will work on a bar graph with flexible scales and axes that are sortable and allow for filtering. You will be working with a dataset of coffee house chains. All activities in this lab are building on each other, so it is very important that you complete all tasks in order.

*Result:*

![Activity 4 - Basic](assets/cs171-activity4-basic.gif?raw=true "Activity 4 - Basic")


- **Activity 1: Coffee shop queue simulation**
   - This task is separate from the other two. Here you learn about how to create a dynamic visualization to simulate a coffee shop queue.

- **Activity 2: Creating an interactive bar graph**
   - Learn how to create an interactive bar graph of coffee chains, apply what you learned to add interactivity.  

- **Activity 3: Transitions!**
   - Apply transitions to the bar graph to make it more visually appealing.


-----

## Activity I

In this activity you will visualize how customer orders are processed at a coffee shop.

1. **Download the framework**

	[template1.zip](https://cnobre.github.io/W25-CSC316H/week-05/lab/template1.zip)

	The framework includes:

	- A basic D3 project with a script that simulates the order queue
	- an index.html file with a headline and an empty container for the visualization
	
	*You should implement the following steps in the file: ```main.js```*
	
2. **Analyze the data stream**

	The function ```updateVisualization()``` is called every time an order comes in or an order was processed.
	
	The script includes a debugging message function - open the webpage in a browser and check the web console to see information on unprocessed orders.

3. **Append an SVG drawing area for the visualization** (with at least 600 x 200px)

	Keep in mind that ```updateVisualization()``` is called every couple of seconds, so be careful that you create the SVG area only once (otherwise this becomes a very expensive process).

4. **Create the dynamic visualization**

	The visualization should consist of a label that indicates the current number of orders and *x* SVG circles that show the order queue.
	
	*You can use the following animation as a guide:*	
	![Basic Queue Example](assets/cs171-basic-queue.gif?raw=true "Basic Queue Example")
	
	- The current order queue is stored in the variable ```orders```. You can access the data in the function ```updateVisualization()```. The function is called automatically by our script every few seconds.
	- Implement the D3 update pattern and make sure to append new elements for new orders and delete elements after orders are processed (default key function; map by index).
	- The design decisions are up to you but please choose appropriate circle radii and spacings.
	- The SVG text label should be updated too. Don't append a new label every time the queue changes, just update the text. (Hint: Create the label once, but update it every time ```updateVisualization``` is called.)

5. **Change the circle color**

	You should use two different fill colors depending on the drink ordered: ***coffee*** or ***tea***. Then, if the queue is long enough, you can see that it follows the priority principle: first-come, first-serve (i.e., first in, first out or FIFO).
	
*Note: Right now the visualization is still slightly confusing: The queue gets filled from the right, and emptied from the left. However, since there is no transition or animation when new elements come in or are removed, it is very difficult to grasp what is going on. We will cover transitions later in the lab!*


-----

## Activity II

In this activity you will create an interactive bar chart showing a ranking of leading coffee house chains. 

1. **Download the framework**

	[template2.zip](https://cnobre.github.io/W25-CSC316H/week-05/lab/template2.zip)

	The framework is based on Bootstrap and D3. You should use it for the remainder of this lab. The template includes:
	
	- ```index.html``` - HTML structure with a headline, a select box and an empty container for your visualization
	- ```style.css``` - CSS file with a few rules for the webpage and the bar chart
	- ```main.js``` - JS file that should contain your visualization code. We have already started to implement the bar chart (e.g. load the CSV data) but you should integrate the enter, update, exit sequence and the interactive components.
	- ```coffee-house-chains.csv``` - The table consists of three columns: *company name*, *revenue in billion U.S. dollars*, *number of stores worldwide*

2. **Analyze the provided framework and the CSV data**
	
	*main.js*
	
	- We have created a new SVG drawing area (using the D3 margin convention)
	- We have used an ordinal scale function for the x-axis (listing all coffee shops) and a linear scale function for the y-axis (number of stores). You don't necessarily need an ordinal scale for a bar chart but it makes your code much cleaner. You can use the JS array method ***map()*** to set *domains* for ordinal scales:

		```javascript
		x.domain(data.map(d=> d.company));
		```
		
	- We have separated the loading of the CSV file and the actual drawing of the bar chart. The function ```loadData()``` reads the data and saves it in the variable ```data```. The function ```updateVisualization()``` should include all the dynamic chart elements and should be called every time something changes.

3. **Implement the bar/column chart**

	*Show the coffee house chains and their number of stores worldwide. Your result should look similar to the screenshot below.*
	
	![Barchart example](assets/cs171-barchart-example.png?raw=true "Barchart")

	- Specify the ***domains*** for the two scales
	- Consider that the data or at least the sorting of the data will change. You have to implement the ***enter***-***update***-***exit*** sequence
	- These properties will help you to position the elements (note that     `bandwidth()` is a particular function of *d3.scaleBand* that helps us to divide the space evenly and automatic into bands across a specific range):
		
		```javascript
		.attr("x", d=> x(d.company))
	    .attr("y", d=> y(d.stores))
	    .attr("width", x.bandwidth())
	    .attr("height", d=> height - y(d.stores))
		```
	
	- Use the HTML class attribute ```bar``` for the columns/bars of the chart so it matches the stylesheet.
	- We will draw axes for the bar chart later (see Activity II, point 6).

4. **Create a ranking**

	*Sort the coffee house chains by number of stores, and display the sorted data in the bar chart.*
	
	We provide you with the code below, but you need to decide where to best integrate it in your code:
	
	```javascript
	data.sort((a,b)=> b.stores - a.stores);
	```

5. **React to the user's selection**

	There is a select box in the HTML document that should enable the user to switch the ranking from *"number of stores"* to *"revenue"*.
	
	- Listen to an event (select-box option change) with D3 or HTML/JS:

		```javascript
		// option 1: D3
		d3.select("#select-box").on("change", doSomething);
		
		// option 2: HTML
		<select id="select-box" onchange="doSomething()">
			...
		</select>
		```
	
	- Get the currently selected option in D3:
	
		```javascript
		d3.select("#select-box").property("value");
		```
		
	- Change the scales, the sorting and the dynamic properties in a way that they correspond to the selected option (*stores* or *revenue*).

		*Hint: You can access JS object properties either with the familiar dot notation (```product.price```) or with the bracket notation (```product["price"]```).* 

6. **Append dynamic axes**

	Similar to scales, you should first initialize axis components (only once) and then update them every time the data changes.
	
	Integrate these HTML class attributes to make use of the pre-configured CSS rules:
	
	* **x-axis** and **axis** for the x-axis
	* **y-axis** and **axis** for the y-axis

	*You can optionally append a title for the y-axis.*
	
*Result:*
![Activity 2 - Result](assets/cs171-activity2.gif?raw=true "Activity 2 - Result")


-----

## Activity III

1. **Add transitions to the bars/rectangles of your chart**
	
	*Try also different time spans and examine it in the web browser.*

2. **Add transitions to the x- and y-axis**

3. **Think about the different animations. Which transitions are useful? Would it be better to omit some of them?**
	We want you to think about the pros and cons of transitions, but you don't have to hand anything in for this question.

-----

## Bonus Activity (optional)

*In this activity you will implement a button that reverses the sort order of your bar chart.*

1. **HTML button to enable user interactions**

	The HTML snippet is already prepared. Uncomment the button in ```index.html``` (line 31).

2. **Use D3 to listen to click events**
	
	```javascript
	d3.select("#change-sorting").on("click", function() {
		// do something
	});
	```

3. **Change the sorting**

	*Create a boolean variable that represents the sorting state. Every time the user clicks on the button, change the state and reverse the sort order.*
	
	Generally, there are two different ways to process the new sorting:
	
	- Call *updateVisualization()* every time the user clicks on the button. It will process the data-join and run through the enter-update-exit sequence
	- Don't call *updateVisualization()* and select the SVG rectangles directly without running through the *update pattern*.

	***In both cases you have to update the input domain of your ordinal scale and you have to call the x-axis function to redraw the axis.***
	
4. **Use a key function for the data-join and opacity during the transition**
	
	```javascript
	svg.selectAll("circle")
   		.style("opacity", 0.5)
    	.transition()
    	.duration(1000)
    	...
   ```

	Make sure to not only lower the opacity during a transition, but to also re-set it after the transition (in another transition). Don't forget: You can chain transitions together!

	During the last activities you have probably used the default key function to bind data to the rectangles. This leads to a distorted and difficult to follow transition. As you have learned at the beginning of this lab you can add a key function (callback-function) to the ```.data()``` property to specify a custom key, instead of an index.

*Result (basic: assign keys by index):*

![Activity 4 - Basic](assets/cs171-activity4-basic.gif?raw=true "Activity 4 - Basic")


*Result (advanced: custom key function):*

![Activity 4 - Advanced](assets/cs171-activity4-advanced.gif?raw=true "Activity 4 - Advanced")



-----

## Submission

Congratulations, you have now completed this week's lab!

As always, please submit your completed lab together with this week's homework until next Tuesday - exact instructions are in the homework markdown!

