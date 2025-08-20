<!-----
layout: labold
exclude: true
----->


&nbsp;

# Week 04 | Lab Activity 

### Learning Objectives

- Be able to differentiate between *scales* and *axes*
- Understand the concept of *input domains* and *output ranges*
- Know how to create scale functions in D3
- Know how to group and transform SVG elements 
- Know how to use scales to create axes in D3

### Prerequisites

- You have read and **programmed** along with chapter 7 and 8 in *D3 - Interactive Data Visualization for the Web*.
- Watched the video tutorial for Week 4 lab

## Overview

In today's session ([download template](https://cnobre.github.io/W25-CSC316H/week-02/lab/Template.zip)). In this lab you will work on a scatterplot with flexible scales and axes. You will compare the lifetime expectancy (health) against the GDP per capita (wealth) of 188 countries. All activities in this lab are building on each other, so it is very important that you complete all tasks in order.

*Result:*

![Week 04 - Lab - Preview](assets/cs171-lab4-preview.png?raw=true "Week 04 - Lab - Preview")

***Data:*** ```Country``` | ```Income``` | ```LifeExpectancy``` | ```Population``` | ```Region```

- **Activity 1: Setting up the data**
   - Learn about how to load data, preprocess it, and create scales using it.

- **Activity 2: Draw the scales**
   - Learn how to adjust your scales and render them onto the visualization area. 

- **Activity 3: Graph the data points**
   - Apply what you learned last week with this week to graph the data points.

----

## Activity I

1. **Download the framework**

	[template](https://cnobre.github.io/W25-CSC316H/week-04/lab/week-04_lab_template.zip)
	
	We have included *Bootstrap*, *D3* and the dataset *wealth_health_data.csv*. The HTML document contains an empty *div* container for the scatterplot and the CSV import is implemented in the JS file ```main_presentation.js```.
 
2. **Analyze and prepare the data**

	* Use the web console to get a better idea of the dataset (e.g. quantitative or ordinal data?)
	* Convert numeric values to numbers. All the imported values are *Strings* and calculations with *Strings* will lead to errors.

3. **Append a new SVG area with D3**

	* The ID of the target div container in the html file is ```#chart-area```
	* Use the variables ```height``` and ```width``` for the SVG element
	* Save the new D3 selection in a variable (```let svg = d3.select("#chart-area")...```)

4. 	**Create linear scales by using the D3 scale functions**

	* You will need an *income* scale (x-axis) and a scale function for the *life expectancy* (y-axis). Call them ```incomeScale``` and ```lifeExpectancyScale```.
	* Use *d3.min()* and *d3.max()* for the *input domain*
	* Use the variables ```height``` and ```width``` for the *output range*

5. **Try the scale functions**

	*You can call the functions with example values and print the result to the web console.*
	
	```javascript
	// Examples:
	incomeScale(5000) 		// Returns: 23.2763
	lifeExpectancyScale(68)	// Returns: 224.7191
	```
	
	Hint: If you get different return values than the ones given make sure that you are using min/max for the input domain. Also, use zero to width for the output range of the income scale. For the output range of the life expectancy scale use 0 and height. However, you want small life expectancy values to map to the bottom of the chart, and high life expectancy values to map to the top of the chart. Think about how you can do that with a scale! 	
&nbsp;
	
6. **Map the countries to SVG circles**

	* Use D3 to bind the data to visual elements, as you have done before (using D3's ```select()```, ```data()```, ```enter()```, ```append()```, etc.). Use svg circles as marks.
	* Instead of setting the x- and y-values directly, you have to use your scale functions to convert the data values to pixel measures
	
		```javascript
		// Ice Cream Example
		.attr("cx", function(d){ return iceCreamScale(d.sales); })
		```

	* Specify the circle attributes: ```r```, ```stroke``` and ```fill```

7. **Refine the range of the scales**

	*You have used the min and max values of the dataset, which means that some circles are positioned exactly on the border of the chart and are getting cut off.*

	You can use a *padding* variable when setting the *range* of the scales. This is one option to push the elements away from the edges of your SVG drawing area:

	```javascript
	let padding = 30;
	
	// Modify range for x-axis
	let xScale = d3.scaleLinear()
		.domain(...)
		.range([padding, width - padding]);
	
	// Modify range for y-axis
	let yScale = d3.scaleLinear()
		.domain(...)
		.range([height - padding, padding]);
	```


-----

#### Activity II

1. **Use your scales (income and life expectancy) to create D3 axis functions**

2. **Append the x- and y-axis to your scatterplot**

	Add the axes to a group element that you add to the SVG drawing area. Change the axis (group) position with the SVG *translate()* property. You can use the padding variable from *Activity I*.
	
	*Of course, this is only one way to specify the spacing. You could also include margin variables for the whole SVG area or introduce separate padding variables for each axis. We will work with margin variables later in this lab.* 

3. **Refine the domain of the scales**
	
	You have used the min and max values of the dataset to define the domain. The axis component creates a visual representation of this scale and therefore some of the circles are positioned on the outer edges of your svg area.
	
	*You can include buffer values to widen the domain and to prevent circles and axes from overlapping:*
	
	```javascript
	//Ice Cream Example
	.domain([
		d3.min(data, function(d){ return d.sales }) - 100,
		d3.max(data, function(d){ return d.sales }) + 100
	])
	```

4. **Label your axes**

	Create titles/labels for your scatterplot axes. The label for the x-axis should be below the x-axis, the label for the y-axis should be left ot the y-axis. (For the y-axis label you will need to rotate your text by using the *transform* attribute.)
	
	Keep in mind that all the axis elements are grouped together in the ```g``` elements. Append an SVG text element and specify x and y coordinates, as well as transforms like translation or rotation that might be needed.


-----

#### Activity III


1. **Add a scale function for the circle radius**

	* Create a *population-dependent* linear scale function. The radius should be between 4 - 30px.
	* Then use the scale function to specify a dynamic radius
	
2. **Change the drawing order**

	*Larger circles should not overlap or cover smaller circles. Sort the countries by population before drawing them.*

3. **Color the circles (countries) depending on their regions**

	*Use a D3 color scale.* 
	
4. **Logarithmic scales**

	You can use ```d3.scaleLog()``` to create logarithmic scale functions. Try it out for one or two axes and check the differences in your web browser.
	
	*Be aware: log scales cannot handle zero values!*
	
	*Most likely you also have to modify the axis ticks.*


![Different Axis Scales](assets/cs171-different-axis-scales.png?raw=true "Different Axis Scales")


-----

### Bonus Activity (optional)

**Use the D3 margin convention in your scatterplot.**

The code snippets above should help you to easily modify your current solution.


-----


## Submission

Congratulations, you have now completed this week's lab!

Please submit your completed lab together with this week's homework until next Tuesday and use the following folder structure:



```
/submission_week_04_FirstnameLastname
    hw/
        css/ 		...folder with all CSS files
        js/ 		...folder with all JavaScript files\
        index.html
        sketches.pdf 
        
    lab/
		css/ 		
		js/ 
		index.html
    	
    dear_data/ (optional)
        [picture or spreadhseet with data]
		
```


