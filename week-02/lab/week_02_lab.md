<!-----
layout: labold
exclude: true
----->

&nbsp;

# Week 2 - Lab

## Introduction

### Welcome to the first lab of CSC316!

Our labs are designed as work-books in the style of a self-guided tutorial. We ask you to read and work through the given example problems, and to hand in the code of your completed lab at the end of each week, together with your homework.

We embrace the concept of learning by doing. To truly master new programming and development skills, you have to spend the time to figure things out and to try different approaches and examples.
However, you are not alone in this! CSC316 staff is available for any questions that pop up along the way. We encourage you to pester them with questions, but at the same time, make sure that you come to the lab prepared and ready to code!

### Prerequisites

- You have installed a code editor such as *Webstorm* ([https://www.jetbrains.com/webstorm/](https://www.jetbrains.com/webstorm/)). The free educational license can be obtained [here](https://www.jetbrains.com/community/education/#students). (You are free to use your own IDE, but we will only officially support Webstorm.)
- You have read Chapter 3 (up to page 36) in *D3 - Interactive Data Visualization for the Web* (Second Edition) by Scott Murray.
- We encourage you to use [Google Chrome](https://www.google.com/chrome/browser/desktop/) or [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/) as your primary web browser during all labs and homeworks. Those are the browsers we will use for grading.
<!-- We also encourage you to take a look at Alex Lex's [interactive lecture on html](http://dataviscourse.net/2015/lectures/lecture-html/) at the University of Utah.-->

### Setup
During the next weeks, you will be working through the book *D3 - Interactive Data Visualization for the Web* (Second Edition) by Scott Murray.
The book provides a lot of sample code (see page 5 of the book, *Using Sample Code*). Don't worry about the fact that the book shows D3 version 4 examples - conceptually, not much has changed between v4 and v7, the current version.

- Download and extract the sample code for the book now. It can be found [here](https://github.com/alignedleft/d3-book/releases).
- Set up a directory on your computer for the sample code and remember its location.
- Starting next week, while working through the book, you should look at and run the sample code. It will help you prepare for labs and homeworks!

## Learning Objectives

After completing this lab you will be able to:

- Set up, structure, and modify HTML documents
- Distinguish between HTML elements and DOM manipulation.
- Apply CSS rules for styling web pages and manage layouts using Bootstrap.
- Execute JavaScript functions, utilize array methods, and interact with the console for debugging and data manipulation.
- Integrate HTML, CSS, and JavaScript to create your first interactive website using client-side scripting.
- Utilize web development tools effectively, including Webstorm, Chrome/Firefox developer tools, and the browser-integrated console.

## Agenda

In today's session ([download template](https://cnobre.github.io/W25-CSC316H/week-02/lab/Template.zip)), we will be working with a dataset that provides global attractions data to build a themed website.

![Lab 2 - Preview](assets/week-02_lab_preview.png?raw=true "Lab 2 - Preview")

- **Activity 1: HTML & CSS Foundations**
	- Learn the basics of HTML and CSS to start laying out our attractions website. (5 mins intro, 15 mins lab)

- **Activity 2: JavaScript Fundamentals**
	- Learn how to use JavaScript to manipulate data and explore it in the console. (10 mins intro, 15 mins lab)

- **Activity 3: Synthesizing and Applying Skills**
	- Apply the HTML, CSS, and JavaScript skills acquired in the previous activities to create a dynamic, interactive website that effectively presents global attractions data. (2 min intro, 25 mins lab)

-----

## Activity 1: Background, Concepts & Resources

### HTML
Understanding web development begins with HTML (HyperText Markup Language), the skeleton of all web pages. HTML uses a system of tags to markup text, which tells the browser how to structure the web page.

- **HTML Basics**: Every HTML document starts with a basic structure, or 'HTML boilerplate'. This includes elements like `doctype`, `html`, `head`, and `body`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

- **Tags and Attributes**: HTML tags can contain attributes, providing additional information about the elements. Common attributes include id, class, style, and event listeners like onclick, which will be discussed later.
  - **ID Attribute**: Unique identifier for an element, used for targeting with JavaScript and CSS.
  - **Class Attribute**: Used to define equal styles for multiple elements or for targeting groups of elements with JavaScript.
  - **Style Attribute**: Allows for inline styling of elements, although for maintainability and scalability, we generally use CSS files.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id='my-div' class="my-custom-div-class" style="height: 50px; width: 500px; background: red"></div>
</body>
</html>
```
This approach to structuring content using tags and attributes is what defines HTML as a markup language — we are essentially "marking up" plain text with tags that instruct the browser on how to display it.

### CSS
CSS (Cascading Style Sheets) is used to create visually engaging web pages by styling the HTML structure. CSS can be embedded directly into HTML files in various ways, ensuring flexibility and control over the appearance of web content.

- **Integrating CSS with HTML**:
	- **Inline Styling**: Directly within HTML elements using the `style` attribute. Suitable for quick, one-off styles but not recommended for larger projects due to maintenance challenges.
	- **Internal CSS**: Within the `<head>` section of the HTML document, using `<style>` tags. This method keeps styles within the same file but can clutter the HTML document.
	- **External CSS**: The most common and recommended approach, where CSS is written in separate `.css` files and linked to the HTML document via the `<link>` tag. This keeps styles organized and separate from HTML structure, promoting reusability and maintainability.

```html
<!-- Linking an external CSS file -->
<link rel="stylesheet" href="style.css">
```

**CSS Selectors**:
- **ID Selectors**: Target a unique element identified by an attribute id. Ideal for styling that should only apply to a single element.

```css
/* Styling an element with a specific ID */
#my-div {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 20px;
}
```
- **Class Selectors**: Target all elements that share a common class attribute. Useful for applying uniform styles to groups of elements.
```css
/* Styling all elements with a specific class */
.my-custom-div-class {
    color: navy;
    font-size: 18px;
    margin: 10px;
}
```

These CSS integration methods and selectors allow developers to define how elements are presented visually on the web page, offering the flexibility to customize styles efficiently and effectively.

### Bootstrap
After learning the basics of CSS and seeing how it can be used to style HTML elements, it's important to note that in practical web development, we don't always need to start from scratch. Bootstrap is a powerful front-end framework that provides a rich set of pre-designed styles and components. This allows developers to focus more on implementing features rather than defining all styling details manually.

- **Why Bootstrap?**
Bootstrap simplifies web development by providing a comprehensive and customizable suite of design tools. It includes responsive grids and styles for typography, forms, buttons, tables, navigation, modals, image carousels, and more. This reduces the time and effort needed to build aesthetically pleasing and responsive websites. While Bootstrap still remains popular, there has been some shift towards alternatives that offer more flexibility and reduced file sizes. (e.g. Tailwind CSS, Bulma, etc...)

- **Setting Up Bootstrap**:
To incorporate Bootstrap into your project, you need to include its CSS and JavaScript files. This can be done by linking to the Bootstrap Content Delivery Network (CDN) in your HTML files. Place the `<link>` tag in the `<head>` to embed bootstrap's CSS, and the `<script>` tag for bootstrap JavaScript bundle (including Popper for positioning dropdowns, poppers, and tooltips) before the closing `</body>`.

```html
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Bootstrap demo</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
<h1>Hello, world!</h1>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
```

- **The Grid System**: One of Bootstrap's most powerful features is its grid system, which uses a series of containers, rows, and columns to layout and align content. This grid system is built with flexbox and is fully responsive, meaning it adjusts your web page layout dynamically to fit different screen sizes and orientations. The grid divides the screen into up to 12 equal columns, making it easy to create sophisticated layouts that are consistent across devices.

```html
<!-- Example of a simple Bootstrap grid layout -->
<div class="container">
  <div class="row">
    <div class="col-md-8">.col-md-8</div>
    <div class="col-md-4">.col-md-4</div>
  </div>
</div>
```

```html
<!-- Example of a nested Bootstrap grid layout -->
<div class="container">
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-4">.col-sm-4 left-left</div>
                <div class="col-sm-4">.col-sm-4 left-middle</div>
                <div class="col-sm-4">.col-sm-4 left-right</div>
            </div>
        </div>
        <div class="col-sm-6">.col-sm-6 right</div>
    </div>
</div>
```
- **Bonus - Explore Bootstrap Documentation**: To fully leverage Bootstrap’s capabilities, we highly recommend reading through the Bootstrap documentation. It provides detailed guidance on how to use various components like buttons, carousels, cards, and navbars, and also offers tips on functionalities such as centering text and more.

This grid framework provides a robust foundation for designing responsive web pages and helps in managing spatial relationships and alignment with minimal CSS. By utilizing Bootstrap, developers can achieve complex designs quickly and with less code.


### Project Folder Structure

A well-organized folder structure is essential for efficient web project management and scalability. Below is the recommended setup for your CSC316 projects.
- **Root Directory**: Contains the `index.html` file, which is the main entry point of the website.
- **CSS Folder**: Stores all CSS files, including a custom stylesheet and the Bootstrap framework stylesheet.
- **JS Folder**: Contains various JavaScript files, each serving different parts of the project, plus the Bootstrap JavaScript file.
- **Images Folder**: Used to store all the images used in the project.
- **Fonts Folder**: Holds custom font files used across the project, enhancing the visual typography.

```plaintext
week-02/lab/
│
├── index.html       	# Main HTML file
│
├── css/             	# Folder for CSS files
│   ├── style.css    		# Main custom stylesheet
│   └── bootstrap.css		# Bootstrap framework stylesheet
│
├── js/              	# Folder for JavaScript files
│   ├── activity_2.js      	# JavaScript for Activity 2
│   ├── activity_3.js      	# JavaScript for Activity 3
│   ├── barchart.js        	# JavaScript for bar chart functionality
│   ├── bootstrap.js       	# Bootstrap framework JavaScript file
│   └── global-attractions.js 	# JavaScript for global attractions functionality
│
├── img/             	# Folder for images
│   ├── logo.png     		# Example image
│   └── banner.jpg   		# Example image
│
└── fonts/          	# Folder for custom fonts
    ├── example.ttf  		# Example font file
    └── readme.txt   		# Documentation for font usage
```
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

## Activity 2: Background, Concepts & Resources

### JavaScript & HTML
JavaScript is an essential web programming language that, when integrated with HTML, enables the creation of interactive and dynamic user experiences. It operates on the client side, directly within the user’s browser, without the need for constant server-side interaction.

- **Embedding JavaScript**: JavaScript can be embedded directly into HTML documents in three main ways:
	- **Inline**: Directly in HTML elements via event attributes like `onclick`.
	- **Internal**: Within `<script>` tags in the HTML document.
	- **External**: Linked to HTML through external `.js` files, which is the recommended practice for cleaner code and better maintainability.

```html
<!-- External JavaScript -->
<script src="main.js"></script>
```

### JavaScript Basics

Understanding the basics of JavaScript is crucial for any web developer. This section covers the core components such as variables, data types, functions, and control structures.


#### Variables
In modern JavaScript, `let` and `const` are preferred for declaring variables due to their block scope limitations, which enhance code readability and reduce errors:

- `let`: Allows you to declare variables that can be changed later. It is block-scoped, meaning it exists only within the nearest set of curly braces (`{}`).
- `const`: Used to declare variables meant to remain constant. A `const` variable cannot be reassigned, and like `let`, it is block-scoped.

```javascript
let message = "Hello, world!";
const pi = 3.14;
```

#### Data Types

JavaScript is a loosely typed language, meaning you don't have to declare the type of variable ahead of time. The language automatically determines the data types during execution. Here are some common types:

```javascript
// String
let name = "Alice";

// Number
let age = 30;

// Boolean
let isStudent = true;

// Array
let fruits = ["Apple", "Banana", "Cherry"];

// Object / Dictionary
let person = {
    firstName: "John",
    lastName: "Doe",
    age: 50
};
```

#### Functions 

Functions are blocks of code that perform specific tasks and are executed when called. They help keep code modular and reusable.

```javascript
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Alice"));
```

#### Control Structures

Control structures manage the flow of your program’s execution based on conditions. The most common type is the if-else statement.



```javascript
if (age > 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}
```


### JavaScript Array Methods

Array methods in JavaScript provide powerful tools for processing and manipulating array data. Below, we'll explore some essential array methods including `forEach`, `map`, `sort`, and `filter` with illustrative examples.  For these examples, we'll start with a simple list of strings. Then, we'll use a list of dictionaries (objects in JavaScript) for more complex examples:

```javascript
const people = [
	{ name: "Alice", age: 25 },
	{ name: "Bob", age: 30 },
	{ name: "Charlie", age: 35 }
];
```

#### forEach
The forEach method executes a provided function once for each array element. It's great for performing actions with each item.

```javascript
people.forEach(function(person) {
    console.log(person.name + " is " + person.age + " years old.");
});
// Output:
// 'Alice is 25 years old.'
// 'Bob is 30 years old.'
// 'Charlie is 35 years old.'
```

#### map
The map method creates a new array populated with the results of calling a provided function on every element in the calling array.

```javascript
const names = people.map(function(person) {
    return person.name;
});
console.log(names);
// Output:
// ['Alice', 'Bob', 'Charlie']

```

#### sort
The `sort` method sorts the elements of an array in place and returns the array. Sorting can be customized using a comparison function that defines the sort order.

```javascript
const sortedPeopleByAge = people.sort(function(a, b) {
    return a.age - b.age;
});
console.log(sortedPeopleByAge.map(person => person.name + " is " + person.age));
// Output:
// 'Alice is 25', 'Bob is 30', 'Charlie is 35'
```

#### filter

The filter method creates a new array with all elements that pass the test implemented by the provided function.

```javascript
const olderThan28 = people.filter(function(person) {
    return person.age > 28;
});
console.log(olderThan28.map(person => person.name));
// Output:
// ['Bob', 'Charlie']
```

### Debugging with the Console and Developer Tools

Debugging is a critical skill in web development, allowing developers to understand and fix issues that arise in their code. The JavaScript console, along with browser developer tools, provides a powerful environment for diagnosing and resolving problems, bridging the gap between the visible elements (HTML) and the invisible logic (JavaScript). 

#### The Role of the Console in Debugging
The console is more than just a place to log messages. It's a comprehensive tool that allows developers to interact with the JavaScript running on the page, inspect variables, and execute code in real-time.

- **Logging and Inspecting**: Use `console.log()` to print out values, helping to track down where things might be going wrong in your code. The console also allows you to inspect objects and arrays in detail, showing their properties and methods available.

```javascript
console.log('Current value:', variable);
```
- Error Reporting: JavaScript errors are automatically logged in the console, providing a stack trace that helps in locating the source of the error quickly.

#### Developer Tools for a Deeper Insight
Browser developer tools offer several functionalities that complement the console by providing a visual interface to the underpinnings of a web page:

- **Elements Panel**: Directly inspect and manipulate the HTML and CSS of a page. This is particularly useful for understanding how JavaScript changes affect the DOM and visual layout.
- **Sources Panel**: View and edit JavaScript files directly, set breakpoints, and step through the code to observe its execution in real-time.
- **Network Panel**: Monitor network requests made by your page, inspect the data being sent and received, and understand the performance implications of your scripts.
- **Performance Panel**: Analyze the runtime performance of your page, identify slow-running scripts, and optimize accordingly.

#### Best Practices for Effective Debugging
- **Consistent Logging**: Establish a habit of logging important checkpoints within your code, which can help in quickly identifying where things go wrong.
- **Use Breakpoints**: Instead of using console.log() excessively, set breakpoints where you suspect issues to step through the code and inspect variables at specific points in execution.

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

## Activity 3: Background, Concepts & Resources

### Template
The following files and folders have been provided:
- **css**: You have already worked with this in Activity 1 when you styled your `index.html`.
- **js**:
	- `global-attractions.js`: Contains the global attractions dataset.
	- `barchart.js`: Contains the function `renderBarChart()` that you will call after filtering the data.
	- `activity_3.js`: Includes the empty function `updateBarChart()`, that you will have to populate. The function should 
  be triggered through an event listener, filter the attractions data, and, lastly, call `renderBarChart()`.
- **index.html**: Serves as the canvas for your visualization and initially included some boilerplate HTML. In Activity 1, you've added a bootstrap grid as well as headings.

### Data
The dataset provided includes details on 60 global attractions. Each entry in the JSON array, stored in the `attractionData` global variable, includes:
- **Location**: Name, city, and country of the attraction.
- **Category**: Type of attraction (theme park, water park, or museum).
- **Visitors**: Annual visitor count for 2013.
- **Entry**: Indicates whether entry is paid or free.

### Event Listeners
Event listeners are crucial for making web pages interactive. They allow you to define how your page should respond to user actions, such as clicks, changes, or mouse movements. You can attach event listeners directly in your HTML (inline) or through your JavaScript code, and each method has its uses depending on the scenario.

#### Inline Event Listeners

Inline event listeners are added directly within your HTML elements. This method can be straightforward for simple interactions and helps visually connect the HTML structure with its interactive behaviors.

```html
<select id="communicationMethod" onchange="updatePreference()">
	<option value="email">Email</option>
	<option value="phone">Phone</option>
	<option value="text">Text Message</option>
</select>
```
In this example, this.value within the inline onchange attribute refers to the value of the currently selected option, which is passed directly to the updatePreference() function.

#### JavaScript Event Listeners

Alternatively, you can attach event listeners using JavaScript. This approach is generally preferred for more complex applications because it keeps your JavaScript separate from your HTML, aligning with modern web development practices that favor separation of concerns.

```javascript
document.getElementById('communicationMethod').addEventListener('change', function() {
	updatePreference();
});
```

### Retrieving

When dealing with `<select>` elements, it's essential to know how to retrieve the selected value effectively. Here are two common methods:

1. **Using `this.value` as an Argument**
   
	When an event handler is called, this refers to the element that received the event, unless the function uses an arrow function, in which case this does not bind to the event target. You can pass this.value directly to a function when setting up inline event handlers.

	```html
	<select id="communicationMethod" onchange="updatePreference(this.value)">
	    <option value="email">Email</option>
	    <option value="phone">Phone</option>
	    <option value="text">Text Message</option>
	</select>
	```

	```javascript
	function updatePreference(selectedValue) {
    console.log("Selected communication method:", selectedValue);
	}
	```

2. **Retrieving the Value with getElementById**
   For a more explicit retrieval, especially useful in JavaScript files where you might want to keep HTML clean of JavaScript logic, you can use getElementById to access the select element and then get its value.

   ```html
   <select id="communicationMethod" onchange="updatePreference()">
       <option value="email">Email</option>
       <option value="phone">Phone</option>
       <option value="text">Text Message</option>
   </select>
   ```
   
	```javascript
	function updatePreference() {
    let selectBox = document.getElementById('communicationMethod');    
    let selectedValue = selectBox.value;
    console.log("Selected communication method:", selectedValue);
	}
	```

-----

## Activity 3: Tasks

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
