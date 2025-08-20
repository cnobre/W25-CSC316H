<!-----
layout: labold
exclude: true
----->

&nbsp;

# Week 2 - Lab Activities

## Learning Objectives

After completing this lab you will be able to:

- Set up, structure, and modify HTML documents
- Distinguish between HTML elements and DOM manipulation.
- Apply CSS rules for styling web pages and manage layouts using Bootstrap.
- Execute JavaScript functions, utilize array methods, and interact with the console for debugging and data manipulation.
- Integrate HTML, CSS, and JavaScript to create your first interactive website using client-side scripting.
- Utilize web development tools effectively, including Webstorm, Chrome/Firefox developer tools, and the browser-integrated console.

### Prerequisites

- You have installed a code editor such as *Webstorm* ([https://www.jetbrains.com/webstorm/](https://www.jetbrains.com/webstorm/)). The free educational license can be obtained [here](https://www.jetbrains.com/community/education/#students). (You are free to use your own IDE, but we will only officially support Webstorm.)
- You have read Chapter 3 (up to page 36) in *D3 - Interactive Data Visualization for the Web* (Second Edition) by Scott Murray.
- We encourage you to use [Google Chrome](https://www.google.com/chrome/browser/desktop/) or [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/) as your primary web browser during all labs and homeworks. Those are the browsers we will use for grading.


## Overview

In today's session ([download template](https://cnobre.github.io/W25-CSC316H/week-02/lab/Template.zip)), we will be working with a dataset that provides global attractions data to build a themed website.

![Lab 2 - Preview](assets/week-02_lab_preview.png?raw=true "Lab 2 - Preview")

- **Activity 1: HTML & CSS Foundations**
	- Learn the basics of HTML and CSS to start laying out our attractions website. 

- **Activity 2: JavaScript Fundamentals**
	- Learn how to use JavaScript to manipulate data and explore it in the console. 

- **Activity 3: Synthesizing and Applying Skills**
	- Apply the HTML, CSS, and JavaScript skills acquired in the previous activities to create a dynamic, interactive website that effectively presents global attractions data.

-----

## Activity 1: Tasks

1. **Download the Template**: Start by downloading the [template](https://cnobre.github.io/W25-CSC316H/week-02/lab/Template.zip) for this week's lab.
2. **Explore `index.html`**: Open and review the `index.html` file included in the template to familiarize yourself with the basic structure.
3. **Include Bootstrap**: Integrate Bootstrap's CSS and JS into your `index.html` to facilitate responsive design and utilize utility classes.
    
   ```html
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    ```
   
4. **Create a 3-Column Layout**: Set up a grid layout with three columns using Bootstrap grid classes. The central column should have a width ratio of 8, while the two side columns should each have a ratio of 2. Make sure to follow the hierarchy: container -> row -> column

5. **Design Three Rows in the Center Column**:
	- Layout your page with three distinct rows in the central column to segment the content effectively.
6. **Include Headings**:
	- Place an `<h2>` heading "Theme Parks, Water Parks and Museums" in your first row.
	- Directly underneath, add an `<h1>` heading "Global Attractions Attendance".
7. **Insert Dropdown Menu**:
	- In the second row, add a dropdown menu to enable category selection for attractions:
    
   ```html
    <div class="row">
        <div class="col text-center user-control">
            <div class="form-group">
                <label for="attraction-category">Choose Category:</label>
                <select id="attraction-category" class="form-control">
                    <option value="all">All Attractions</option>
                    <option value="Water Park">Water Park</option>
                    <option value="Museum">Museum</option>
                    <option value="Theme Park">Theme Park</option>
                </select>
            </div>
        </div>
    </div>
    ```
8. **Prepare Chart Area**:
	- Designate an area for displaying the chart in the third row, setting a background color for distinction.
    
   ```html
    <div class="row" style="background: #e0e4e8">
        <div class="col">
            <div id="chart-area"></div>
        </div>
    </div>
    ```
   
9. **Create and Style `style.css`**:
	- Create a `style.css` file in the `css` folder.
	- Apply styles to your headings and rows. Set `font-family`, `font-weight`, `font-size` for headings and `height`, `background` for rows to visually organize your layout.
   
-----

## Activity 2: Tasks

1. **Setup Environment:**
	- Browse to your `js` folder and create a new file named `activity_2.js`.
	- Include `activity_2.js` in your `index.html` file. Ensure it is loaded after `global-attractions.js` to make use of the data defined there.

2. **Initial Exploration:**
	- Open `global-attractions.js` to review the structure and content of the data provided.
	- Add a `console.log` statement in `activity_2.js` to log all the attractions:
	- Use the browser’s console and developer tools to explore the logged attractions. Familiarize yourself with the data types and structure.

3. **Implement `forEach` to Display Names:**
	- Write a `forEach` loop in `activity_2.js` that logs the name of each attraction with more than 10 million visitors:

4. **Filtering Data:**
	- Use the `filter` method to create a new array, `filteredData`, that includes only those attractions with visitors greater than 10 million:

5. **Sorting the Filtered Data (Introducing a Common Issue):**
	- Attempt to sort `filteredData` based on the number of visitors in descending order.
    - Compare if there is a difference between the filtered and the sorted log output.
	- Notice how even `filteredData` is now permanently sorted. Reflect on why this might not always be desirable.

6. **Using `map` to Prevent Unintended Side Effects:**
	- Introduce a `map` operation between the filtering and sorting to create a shallow copy of the array and then sort the copy:
	- **Explanation on Shallow vs. Deep Copying**:
		- A **shallow copy** (as done above) copies the immediate values of the array, but if those values are objects (as in our case), the copied values still reference the same objects. This is sufficient for our sorting scenario because we are not modifying the objects themselves.
		- A **deep copy** would be necessary if we needed to duplicate every level of object nested within the array, ensuring completely independent arrays and objects.

-----

## Activity 3

### Template
The following files and folders have been provided:
- **css**: You have already worked with this in Activity 1 when you styled your `index.html`.
- **js**:
	- `global-attractions.js`: Contains the global attractions dataset.
	- `barchart.js`: Contains the function `renderBarChart()` that you will call after filtering the data.
	- `activity_3.js`: Includes the empty function `updateBarChart()`, that you will have to populate. The function should 
  be triggered through an event listener, filter the attractions data, and, lastly, call `renderBarChart()`.
- **index.html**: Serves as the canvas for your visualization and initially included some boilerplate HTML. In Activity 1, you've added a bootstrap grid as well as headings.


### Tasks

1. **Familiarize Yourself with `activity_3.js`**:
	- Begin by reviewing the `activity_3.js` file to understand the structure and existing code. Pay close attention to any `TO DO` comments that outline incomplete sections needing your input.

2. **Render Initial BarChart**:
	- Modify the `updateChart` function in `activity_3.js` to automatically display the top 5 attractions based on visitor count when the page first loads. This involves sorting the data and selecting the top items before passing them to the `renderBarChart` function.

3. **Add Event Listener to Dropdown**:
	- Add an `onchange` event listener to the dropdown menu in your `index.html`. This listener should call the `updateChart` function whenever the user selects a new category.

4. **Enhance the `updateChart` Function**:
	- Update the `updateChart` function to dynamically read the selected category from the dropdown menu.
	- Implement logic within `updateChart` to filter the attractions array based on the selected category.
	- After filtering, ensure that the function continues to sort and limit the array to the top 5 attractions, then calls `renderBarChart` with this filtered data.

5. **Debug and Test**:
   - Ensure that the `updateChart` function is properly connected to the dropdown's event listener, allowing the chart to update dynamically with each change in selection.
   - Test the updated functionality by selecting different categories from the dropdown to ensure the chart updates accordingly.
   - Debug any issues that arise, such as the chart not updating correctly or displaying incorrect data.

-----

## Submission

Congratulations, you have now completed this week's lab!

Please submit your completed lab together with this week's homework by next Tuesday and use the following folder structure:


```
/submission_week_02_FirstnameLastname
    hw/
        css/ 		...folder with all CSS files
        js/ 		...folder with all JavaScript files\
        index.html
        design_critique.pdf
    lab/
        css/ 		...folder with all CSS files
        js/ 		...folder with all JavaScript files\
        index.html
    class_activity/
    	[ pdf of class activities]
    	[Tableau workbook (as packaged .twbx file)]
```
 *See you next week!*
