<!-----
layout: labold
exclude: true
----->



&nbsp;

# Week 03 | Lab Activity

## Learning Objectives

- Know how to use basic shape elements in SVG
- Advanced JS: *method chaining*; *anonymous functions*; first intuition about asynchronous execution & callbacks
- Know how to include D3 in your project
- Know the structure and syntax of a basic D3 visualization
- Know how to load data into D3
- Know how to bind data to visual elements

## Prerequisites

- Have D3 version 7 set up
- You have read chapter 3 (p. 52-62) and chapter 5 (p. 67-72, p. 79-87)  in *D3 - Interactive Data Visualization for the Web*.
- Watched the Week 3 tutorial video


*This is a brief overview of how to set up a basic D3 project. This should not be completely new but it might help you to solve the activity later.*

Your file and folder structure for D3 projects should look like the following:

```
project/
    index.html
    data/
        data.csv
        ..
    css/
        style.css
        ..
    js/
        main_presentation.js
        (other_js_libs.js)
        ..
```

## Overview

In today's session ([download template](https://cnobre.github.io/W25-CSC316H/week-02/lab/Template.zip)), we will be working with basic D3 functionalities.

- **Activity 1: Using SVG drawing area**
   - Learn about how to render shapes and texts within an SVG drawing area.

- **Activity 2: Drawing shapes dynamically**
   - Learn how to apply previous skills on drawing shapes and apply arrow functions within D3. 

- **Activity 3: Creating a simple scatter plot with D3**
   - Apply what you've learned by loading a file using D3 and display a scatter plot like visualization using the information in the data file.


-----

## Activity I

1. **Download the Template for this week.**

2. **Navigate to 'activity_1' and set up a new (D3) project inside the folder.**

   *At this point it might also be a good idea to create a boilerplate template project (i.e., directory structure) that you can copy every time you create a new project. The template project should include the directory structure for your project and all the files and boilerplate you usually need (e.g., D3 libraries, Bootstrap, etc.).

3. **Add an SVG drawing area (canvas) to the HTML document manually**

   *CSS: width: 400px; height: 200px; background: black*

4. Add a rectangle in the center of your SVG canvas.
   *CSS: width: 200px; height: 100px; background: beige*

5. Add a circle in the center of your rectangle.
   *CSS: radius: 20px; background: blue*

6. **Create and embed a .js file and use D3 to add a ```div```-container with the text "Blue Circle on Beige Canvas in Dark Room" to the DOM dynamically**

   *do this task in a separate JS file (e.g. main.js) that you embed in your HTML document*



![D3 - Bind Data 1](assets/cs171-activity-1.png?raw=true "D3 - Bind Data 1")

-----


## Activity II

1. **Navigate to 'activity_2' and create a new D3 project inside the folder.**

2. **Append a new SVG drawing area to your HTML document with D3** (Width: 500px, Height: 500px)

3. **Draw circles with D3 dynamically!**

   *use the code snippets that we've provided above to append a new **SVG circle** for every object in the following array:*

   ```javascript
   let sandwiches = [
        { name: "Thesis", price: 7.95, size: "large" },
        { name: "Dissertation", price: 8.95, size: "large" },
        { name: "Highlander", price: 6.50, size: "small" },
        { name: "Just Tuna", price: 6.50, size: "small" },
        { name: "So-La", price: 7.95, size: "large" },
        { name: "Special", price: 12.50, size: "small" }
   ];
   ```
4. **Define dynamic properties**

	- Set the x/y coordinates and make sure that the circles don't overlap each other
	- Radius: *large sandwiches* should be twice as big as small ones
	- Colors: use two different circle colors. One color (```fill```) for cheap products < 7.00 USD and one for more expensive products
	- Add a border to every circle (SVG property: ```stroke```)
   
   
*The result might look like the following:*

![D3 - Result Activity 2](assets/cs171-d3-activity-2.png?raw=true "Result Activity 2")

-----

## Activity III

1. **Navigate to 'activity_3' and create a new D3 project inside the folder.**

   *notice that there's already a folder called 'data' that contains your dataset for this exercies, i.e. `cities.csv`*

2. **Use D3 to load the CSV file**

   Write the data to the *web console* and inspect it in your browser:

	- In which format is the information stored now?
	- Which properties are available?
	- Check the types of the variables in the console

3. **Prepare the data**

   *You might have noticed that each value of the CSV file is stored as a string, including numerical values.*

	- Convert all numerical values to *numbers*. (Otherwise you might see unexpected behavior when making calculations.)
	- We recommend iterating over each row to convert strings into floats. You can use this neat line of code:

    ```javascript
            d.age = +d.age;
   ```

	- Formerly, you had to write an actual loop to iterate over each element in the array, i.e. each row in the csv. However, ever since switching to promises in d3 v5, [d3.csv](https://github.com/d3/d3-fetch) also allows for a callback during the process of loading the csv row by row. Thus, Mike Bostock, calls this an 'optional row conversion function':

   ```javascript
   d3.csv(url, (row) => {
   		// convert
   		row.value = +row.value
   		return row
   }).then( (data) => {
   	// check out the data and do whatever you want with it
   		console.log(data)
   })
   ```

4. **Filter the dataset**

   We are only interested in cities that are part of the *European Union (EU)*. In the remainder of the activity use the filtered dataset.

5. **Append a new paragraph to your HTML document**

   Count all elements in the filtered dataset and use D3 methods to write the result (i.e., the number of EU countries) to your webpage.

5. **Draw one SVG circle for each row in the filtered dataset**

	- All the elements (drawing area + circles) should be added dynamically with D3
	- SVG container: width = 700px, height = 550px
	- Use the x/y coordinates from the dataset to position the circles

7. **Dynamic circle properties**

   Change your default radius to a data-dependent value:

	- The radius should be **4px** for all cities with a population lower than 1.000.000.
	- The radius for all the other cities should be **8px**.

8. **Assign labels with the names of the European cities**

	- Use the *SVG text* element
	- All the elements should have the same class: ```city-label```
	- The labels should be only visible for cities with a population equal or higher than 1.000.000. You can use the SVG property ```opacity``` to solve this task.

9. **Styling**

   *Create a new external stylesheet if you have not done it yet.*

   Add proper styles to your webpage but include at least these CSS rules for the class ```city-label```:

	- Font size = 11px
	- Text anchor = middle

*Your result should look similar to this screenshot:*
![Activity 3 Result](assets/cs171-activity-3.png?raw=true "Activity 3 Result")


*Important notice: This example is not intended to be a best practice example of how to work with D3 scales. It was designed to help you to get a better understanding of different basic concepts in D3.*

Next week you will learn how to create real scales for different types of data, you will work with more flexible size measurements and you will learn how to use D3 axes in your visualizations.

Later in this course you will also learn how to create interactive maps.

&nbsp;

-----

### Bonus Activities (optional!)

Add a **D3 click event listener**.

  The d3 method .on() adds or removes a listener to each selected element for the specified event typenames.
  The typenames is a string event type, such as click, mouseover, or submit. When a specified event is dispatched
  on a selected element, the specified listener will be evaluated for the element, being passed the current event
  (event) and the current datum (d), with this as the current DOM element (event.currentTarget). In order to have access
  to this, however, we cannot use arrow functions. Have a look at this event listener:

    ```javascript
    .on("click", function(event, d){
        console.log('check out what you have access to', event, d, this)
    });
    ```

  Of course, you can do more than just writing something to the console here. For example, you could call other functions and pass along
  some information from the current selection.


Change the **hover style** of the SVG circles.

&nbsp;


-----


## Submission

Congratulations, you have now completed this week's lab!

Please submit your completed lab together with this week's homework until next Tuesday and use the following folder structure:


```
/submission_week_03_FirstnameLastname
    hw/
        css/ 		...folder with all CSS files
        js/ 		...folder with all JavaScript files\
        index.html
    lab/
        activity_1
            index.html
        activity_2
            js/ 		
            index.html
        activity_3
            css/ 		
            js/ 
            index.html
    class_activity/
    	[ pdf of class activities]
    	[Tableau workbook (as packaged .twbx file)]

```
*See you next week!*

