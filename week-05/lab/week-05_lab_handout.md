<!-----
layout: labold
exclude: true
----->

&nbsp;

# Week 05 | Lab Handout

### Learning Objectives

- Learn the D3 update pattern (enter, update, exit)
- Load dynamic datasets and implement flexible scales and axes
- Handle mouse click events and changes of UI components
- Add D3 transitions

### Prerequisites

- Chapter 9 in *D3 - Interactive Data Visualization for the Web*.
- Optional reading: Chapter 10 in *D3 - Interactive Data Visualization for the Web*.
- Optional reading: [Mike Bostock's 'Thinking with Joins'](http://bost.ocks.org/mike/join/) and Case 1 of [https://medium.com/@mbostock/what-makes-software-good-943557f8a488](https://medium.com/@mbostock/what-makes-software-good-943557f8a488)).


## Dynamic updates with D3 

By now you have learned how to load external data and how to map it to visual elements like e.g., a bar chart. But very often you have to deal with a continuous data stream rather than a static CSV file. Dynamic data often requires more sophisticated user interfaces that allow users to interact with the data (e.g. filter, sort).

→ ***Instead of removing and redrawing visualizations each time new data arrives, update only affected components and focus on loading times and smooth transitions.***

→ ***We will accomplish this by using the D3 update pattern (enter → update → exit).***

### *"Updating data"* means *"joining data"*

A data-join is followed by operations on the three virtual selections: **enter**, **update** and **exit**.

This means that we are merging new data with existing elements. In the merging process we have to consider:

- What happens to new data values without existing, associated DOM elements (enter)
- What happens to existing elements which have changed (update)
- What happens to existing DOM elements which are not associated with data anymore (exit)

![Data Join](assets/cs171-data-join.png?raw=true "Data Join")

*To take care of the update pattern you have to change the sequence of your D3 code a little bit. Instead of chaining everything together, some code snippets must be separated.*

&nbsp;

We create an SVG drawing space as usual:

```javascript
let svg = d3.select("body").append("svg")
	.attr("width", 600)
	.attr("height", 200);
```

And bind the data to SVG circles:

```javascript
let circle = svg.selectAll("circle")
    .data([5, 10, 15]);
```

The length of the dataset is 3 and we select all SVG circles in the document. That means, if there are 3 or more existing circles, the **enter selection** is empty, otherwise it contains placeholders for the missing elements.

The page is empty because we have not appended any circles yet. We can access the *enter selection* and append a new circle for each placeholder with the following statement:

```javascript
circle = circle.enter().append("circle")
	.attr("r", d=>d)
	.attr("cx", (d,index)=> (index * 80) + 50 )
	.attr("cy", 80);
```

(You might have noticed that we've actually already used this pattern multiple times in previous labs.)

But often you want to do the exact opposite operation. If someone filters the dataset you may want to remove existing elements. In this case, you have to use the ```exit``` selection. ```exit``` contains the leftover elements for which there is no corresponding data anymore.

We call the drawing function again with new data:

```javascript
let circle = svg.selectAll("circle")
    .data([20, 30]);  
```

The new dataset contains 2 elements but on the website there are currently 3 circles. We can access the *exit selection* and remove the element that has no data-binding anymore:

```javascript
circle.exit().remove();
```

There is still one problem left: *dynamic properties*. We are using a data-dependent radius and the values in the new dataset have been changed. For this reason, we have to update the dynamic properties (that we previously set in the *enter selection*) every time we update the data. To do this we use the *merge* function to apply changes to the *enter and update selection*:

```javascript
let circle = svg.selectAll("circle")
	.data(data);
``` 
The result of the  ```data()``` method returns the updated selection.

Putting everything together:

```javascript
let svg = d3.select("body").append("svg")
	.attr("width", 600)
	.attr("height", 200);

// Call visualization with 2 datasets sequentially
updateChart([5, 10, 15]);
updateChart([20, 30]);

function updateChart(data) {
	// Data-join (circle now contains the update selection)
	let circle = svg.selectAll("circle")
		.data(data);
	
	// Enter (initialize the newly added elements)
	circle.enter().append("circle")
		.attr("class", "dot")
		.attr("fill", "#707086")
	
	// Enter and Update (set the dynamic properties of the elements)
		.merge(circle)
		.attr("r", d=>d)
		.attr("cx",(d,index)=>(index * 80) + 50 )
		.attr("cy", 80);
	
	// Exit
	circle.exit().remove();
}
```
*Result:*

![Update Pattern Example](assets/cs171-enter-update-exit.png?raw=true "Update Pattern Example")


### Key function

Before continuing with Activity 1 we will go one step back and look again at the data join. For the sake of clarity and simplicity, we have not mentioned an important detail - the *key function* - in the last example.

**The key function defines which datum should be assigned to which element.**

```javascript
let circle = svg.selectAll("circle")
	.data([5, 10, 15]);
```

The code ```.selectAll("circle")``` selects all circle-elements and if we chain it with ```.data([5, 10, 15])``` we are joining the given data with the selected circles. The default key function applies and the keys are assigned by index. In our example it will use the first three circles that it finds. The first datum (first item in our array) and the first circle have the key "0", the second datum and circle have the key "1", and so on.

Assume, that we have implemeted the "enter, update, exit"-pattern and appended the three circles to the webpage.

We can now start the pipeline again, with a slightly different array:

```javascript
let circle = svg.selectAll("circle")
	.data([10, 15]);
```

![Key Function (1)](assets/cs171-key-function-1.png?raw=true "Key Function (1)")

The index will be used again as the default key to match the new data to the actual circles. There are three circles on the webpage and two items in the new dataset. Therefore, the last circle will be removed and the other two circles will be bound to the new data.

This is the simplest method of joining data and often sufficient. However, when the data and the elements are not in the same order, joining by index is insufficient. In this case, you can specify a key function as the second argument (callback function). The key function returns the key for a given datum or element:

```javascript
// use the actual data value as key function
let circle = svg.selectAll("circle")
	.data([5, 10, 15], d=>d)
	
// enter, update, exit

circle = svg.selectAll("circle")
	.data([10, 15], d=>d)

// enter, update, exit
```

In the above example, the key function allows us to map the data value directly instead of the default by-index behavior:

![Key Function (2)](assets/cs171-key-function-2.png?raw=true "Key Function (2)")

This means, we can update the appropriate elements without having to delete and re-add elements. We can update them in place!

> Additionally, a comment from Mike Bostock regarding *key functions*:
> 
> *"The key function also determines the enter and exit selections: the new data for which there is no corresponding key in the old data become the enter selection, and the old data for which there is no corresponding key in the new data become the exit selection. The remaining data become the default update selection."*

If you are still unclear about the concept of key functions, we encourage you to look at [Carlos Scheidegger's explanation](http://cscheid.net/courses/spr15/cs444/lectures/week5.html) at home.



### Extra Info: Enter, Update, Exit & Merge vs. Join

When you see `selectAll()` followed by `.data()` we are selecting all matching elements, for each
  one that exists, we bind an item from the data array to it. The use of `.data()` returns what is called the update selection: it contains existing elements (if any) with the newly supplied data bound to those existing items.
   
   However, if the number of selected elements does not match the number of items¹, then .data() creates an enter selection or an exit selection. If we have excess data items, then we have an enter selection with one element for every item we need to add in order to have an equal number of DOM elements and data array items. Conversely, if we have excess DOM elements, then we have an exit selection.
   
   Calling `.enter()` on the update selection returns the enter selection. This selection contains placeholders ("Conceptually, the enter selection’s placeholders are pointers to the parent element docs"), which we can use .append("tagname") with to add the elements we need.
   
   Conversely, calling `.exit()` on the update selection returns the exit selection, which often is simply removed with `.exit().remove()`;
   
   This pattern generally looks something like this:
   
    let circle = svg.selectAll("circle")
       .data([1,2,3,4])
   
    circle.exit().remove();    
   
    circle.enter()
       .append("circle") 
       .attr...
   
     circle.attr(...
   First we select the all the circles, let's say there are 2 circles to select.
   
   Second we remove excess elements using `selection.exit()` : however, since we have four data items and only two matching DOM elements there is nothing to remove, so the selection is empty and nothing is removed.
   
   Third we add elements as required to ensure that the number of matching DOM elements is the same as the number of data array items. As we have four data items and only two matching DOM elements the enter selection contains two placeholders (pointers to the parent). We append circles to them and style them as we want.
   
   Lastly we use the update selection containing the two pre-existing circles and style them as we want based on the new data.
   
   Often we want to style new elements and existing elements the same, so we could use the merge method to combine the enter and update selections:
   
    let circle = svg.selectAll("circle")
       .data([1,2,3,4])
   
    circle.exit().remove();    
   
    circle.enter()
       .append("circle") 
       .merge(circle)
       .attr(...
   This simplifies our code a bit as we don't need to duplicate styling for both enter and update separately.
   
   #### Join
   
   So where does `.join()` come in? It's for convenience. In its simplest form: .join("elementTagName") .join replaces the above code with:
   
    let circle = svg.selectAll("circle")
       .data([1,2,3,4])
       .join("circle")
       .attr(...
       
   Here the join method removes the exit selection and returns a merged update selection and enter selection (containing new circles), which we can now style as needed. It is essentially a short hand method that allows you to right more concise code, but is functionally the same as the 2nd code block.
   
   ***We recommend to use .enter() .merge() .exit() methods at this point to get fully familiar
    with what's going on underneath the hood. Later on, feel free to play around with .join
    ().***


## JS Array method: *map()*

Up to this point, we have seen a few different *array functions*. In this lab you will get more practice with the popular ***map()*** method.

→ *The map() method creates a new array by calling a function on every element in an existing array.*

*Example 1:*

```javascript
// Multiply each element by 10
let numericData = [1, 2, 3];
let numericDataMultiplied = numericData.map( d=> d * 10 );
numericDataMultiplied	 // Returns: [10, 20, 30]
```

*Example 2:*

```javascript
// Define the callback function.
function areaOfCircle(radius) {
    let area = Math.PI * (radius * radius);
    return area.toFixed(0);
}

// Create an array
let radii = [10, 20, 30];

// Get the areas from the radii
let areas = radii.map(areaOfCircle);

areas	 // Returns: [314, 1257, 2827]
```

*Example 3:*

```javascript
// Caffeine (mg) per 100g
let data = [
	{ "item": "Brewed Coffee", "caffeine": 72 },
	{ "item": "Brewed Tea", "caffeine": 36 },
	{ "item": "Coke", "caffeine": 30 },
	{ "item": "Red Bull", "caffeine": 77 }
];

// Create ordinal scale
let x = d3.scaleOrdinal();

// Use map() to compute the data for an ordinal scale automatically
x.domain(data.map(d=>d.item));

x.domain()	 // Returns: ["Brewed Coffee", "Brewed Tea", "Coke", "Red Bull"]
```

&nbsp;

*Before you start with the next activity, here are a few pointers for updating scales and axes.*

## Updating scales and axes

Whenever you get new data or your existing data change, you need to recalibrate your scales, otherwise elements will get clipped, or the visualization will show the wrong information.

Last week you learned to create a basic linear scale like this:

```javascript
let y = d3.scaleLinear()
	.domain([0, d3.max(data,d=> d.price )])
	.range([0, height]);
```

When the data changes, the **range** does not have to be updated, because the visual size of your chart usually does not change. You do need to update the **domain**, though, because the minimum and maximum of the data might change.

```javascript
// Initialize the axis once
let y = d3.scaleLinear()
	.range([0, height]);

function update(data) {
	// Update the scale's input domain to match the new data
	y.domain([0, d3.max(data, d=> d.price)]);
	
	// Update visualization
	...
}
```

***We can use a similar principle for updating axes.***

First we have to initialize the axis function and pass in the scale function:

```javascript
let yAxis = d3.axisLeft()
    .scale(y);
```

And then we append a *group element* to the SVG drawing area:

```javascript
let yAxisGroup = svg.append("g")
    .attr("class", "y-axis axis");
```

In comparison to last week (without using the *update pattern*) we don't call the y-axis function immediately. We select the *group* and call the axis function afterwards, every time the data change.

```javascript
function update(data) {
	// Update scales and visual elements
	...

	// Update axis by calling the axis function
	svg.select(".y-axis")
		.call(yAxis);
}
```
This guarantees that the axis component uses the correct scale (adjusted to match the new input domain).

&nbsp;


## Transitions 

To change the color of all circles to blue, use the following D3 statement:

```javascript
d3.selectAll("circle").attr("fill", "blue");
```

We selected all *circles* and changed the *fill color*.

D3 evaluates every *attr()* statement immediately, so the changes happen right away. But sometimes it is important to show the user what's happening between the states and not just the final result. D3 provides the ***transition()*** method that makes it easy to create these smooth, animated transitions between states:

```javascript
d3.selectAll("circle").transition().attr("fill", "blue");
```

When you add transition(), ***D3 interpolates between the old values and the new values***, meaning it normalizes the beginning and ending values, and calculates all their in-between states.

In our second example, the circle color changes from red to blue over time. The default time span is 250 milliseconds but you can specify a custom value by simply using the ***duration()*** method directly after *transition()*.

The result shows the animation from red to blue (3 seconds):

```javascript
d3.selectAll("circle")
	.transition()
	.duration(3000)
	.attr("fill", "blue");
```
![Transition with duration](assets/cs171-transition-duration.gif?raw=true "Transition with duration")

#### Transitions Are Per-Element and Exclusive

> *"Each element transitions independently. When you create a transition from a selection, think of it as a set of transitions, one per element, rather than a single mega-transition running on multiple elements. Different elements can have different delays and duration, and even different easing and tweens. Additionally, transition events are dispatched separately for each element. When you receive an end event for a given element, its transition has ended, but other transitions may still be running on other elements."* - (Mike Bostock, [http://bost.ocks.org/mike/transition/](http://bost.ocks.org/mike/transition/))

If you need to delay an animation, you can add the ***delay()*** method right after *transition()*.


&nbsp;

> ### Animation for Visualization
>
> If done right, animations make a visualization better and help engage the user. If done wrong (i.e., you don't follow key principles), you will achieve exactly the opposite results.
> 
> #### Pros
> 
> - Transitions show what is happening between states, adding a sense of continuity and finer resolution to your visualization
> - Animations can draw the user's attention to specific elements or aspects
> - Animations can provide the user with interactive feedback
> 
> 
> #### Cons
> - Too many transitions will confuse the user (e.g., overused PowerPoint effects) 
> - If the transition is not continuous, animations look funny and can even be deceiving based on the interpolation used.
> - Animation across many states is the least effective use case for
data analysis. In this case, use a static comparison of several charts/images (e.g., small multiples) instead of creating video-like animations.

&nbsp;


**Resources**

- Chapter 9 in *D3 - Interactive Data Visualization for the Web* by Scott Murray
- Case 1 of [https://medium.com/@mbostock/what-makes-software-good-943557f8a488](https://medium.com/@mbostock/what-makes-software-good-943557f8a488)

<!--
- [http://blog.visual.ly/creating-animations-and-transitions-with-d3-js/](http://blog.visual.ly/creating-animations-and-transitions-with-d3-js/)
- [http://bost.ocks.org/mike/circles/](http://bost.ocks.org/mike/circles/)
- [http://bost.ocks.org/mike/transition/](http://bost.ocks.org/mike/transition/)
-->
