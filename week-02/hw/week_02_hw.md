<!-----
layout: labold
exclude: true
----->

<!-- <img src="assets/cs171-logo.png" width="200"> -->

&nbsp;
# Week 02 | Homework

In this assignment, you’ll use HTML, CSS, and JavaScript to create a small dashboard for a local pizza delivery company. This dashboard will help the company to gain meaningful insights into their collected data and evaluate their performance. A template will be provided as your starting point.

This homework assumes that you have read and programmed along with Chapter 3 (up to page 53) in *D3 - Interactive Data Visualization for the Web* (Second Edition) by Scott Murray.

![Homework Week 02](assets/week-02-solution-screenshot.png?raw=true)

&nbsp;

-----

## 1. PizzaWorld - Insights & Statistics (6 points)

### Template

A small template with *Bootstrap* already included is provided for this homework. It is similar to the framework used in this week's lab and should help you get started. You can download the framework for this week's homework from Quercus:
[here's the link](https://cnobre.github.io/W25-CSC316H/week-02/hw/week_02_hw_template.zip)

Upon exploring the folder structure and its contents, you will find that all necessary files are provided. Your tasks are to understand the code and extend the following files:

- ```index.html```
- ```css/style.css```
- ```js/main.js```

### Data

Two datasets from *PizzaWorld* are included in the framework. One dataset consists of 1198 rows detailing pizza deliveries, and the other contains 200 rows of corresponding customer feedback.

The data (arrays with JSON objects) are pre-loaded into these two global variables:

- ```deliveryData```
- ```feedbackData```

*The variables are accessible in the JS file ```main.js``.*

*To start, write these variables to the web console and inspect their structure.*

#### Delivery Data

- ```delivery_id```
- ```date```
- ```area``` (Boston | Cambridge | Somerville)
- ```price``` (in USD)
- ```count``` (number of delivered pizzas)
- ```driver```
- ```delivery_time``` (minutes)
- ```temperature```
- ```drinks_ordered``` (true | false)
- ```order_type``` (web | phone)


#### Feedback Data

- ```delivery_id``` (matches the deliveries)
- ```punctuality``` (medium | low | high)
- ```quality``` (medium | low | high)
- ```wrong_pizza``` (true | false)

### Implementation

1. **Download template**

   If you haven't done so already, please download the template [here](https://cnobre.github.io/W25-CSC316H/week-02/hw/week_02_hw_template.zip)

2. **Display dataset summary**

   Open ```main.js```. You'll find an empty function ```createVisualization()``` that you'll populate in order to update the DOM dynamically. You should do all of that (extracting numbers and adding labels to HTML) directly in JavaScript. Update the DOM dynamically with JavaScript, too!
   Start by extracting the following numbers from the provided data and append them with meaningful labels to the HTML document:

   - Number of pizza deliveries 
   - Number of all delivered pizzas (*count*)
   - Average delivery time 
   - Total sales in USD 
   - Number of all feedback entries 
   - Number of feedback entries per quality category: *low*, *medium*, *high*

   *JS & HTML Hints*:
   - Use `document.getElementById('some_id')` to access an HTML element by its ID. Once you've selected the element, you can manipulate its content. 
   ```js
    // Get the text from an HTML element
    let elemText = document.getElementById('stats-deliveries').innerText;
    
    // Set new text to an HTML element
    document.getElementById('stats-deliveries').innerText = '100';
    ``` 
   *Code Design Hints*:
    - If your code is already longer than a couple of lines, extract it into a separate
       function and call that function within *createVisualization()*.*
    - Think about calculating the above numbers at the same time (e.g., inside a single loop), if possible. That will make the code shorter and easier to read, as well as faster.*
    - Make sure you use consistent spacing, layout, self-explanatory variable names, and code comments! If you do this as you progress in your coding project, this will save you a lot of time later!*


3. **Call the function: **renderBarChart(deliveryData)**

   So far, you should have done all your DOM manipulation inside of ```createVisualization()```. If you call *renderBarChart()* our script will automatically group (and count) the deliveries per day. Subsequently a bar chart will be added to the container: ```#chart-area```.

   Requirements:
   - You need a div-container with the id ```#chart-area``` in your HTML document
   - As a **function parameter**, you have to include a JSON array with deliveries (each delivery is an object and must include at least the property: ```date```). Try to call *renderBarChart()* (inside ```createVisualization```) with the argument ```deliveryData```.

      → You should now see a basic bar chart on your page.


4. **Filter the data before drawing the bar chart**

   In the next task, you should filter the ```deliveryData``` array depending on the selected options, before calling *renderBarChart()*. Add two **select-boxes** to your HTML document. The user should be able to select:

   - ```area``` (*All*, *Boston*, *Cambridge* or *Somerville*)
   - ```order type``` (*All*, *Web* or *Phone*).

   Make sure to set the callback function of the select boxes to the function that updates and creates our visualization! If the user selects an option, filter the variable ```deliveryData``` accordingly and then call *renderBarChart()* again. Every time you call this function, it will analyze all changes in your array and update the chart with D3.


5. **Global Data Filtering:**
   - The filter options should also affect the dataset summary displayed from step 2.
   - Update both the bar chart and the dataset summary whenever a filter option is changed. 


6. **Style Your Webpage:**
   - Adjust the provided CSS or the dynamically generated HTML elements to create a visually appealing and easy-to-read webpage.
   - Include a tooltip div in your DOM, which is configured to work out-of-the-box in the provided CSS

-----

## 2. What's the Question (4 points)

As we discussed in class, different questions about your data can lead to different visualization types. Statistician and visualization expert Nathan Yau emphasizes the importance of guiding your data to focus and get to the point, akin to steering a conversation to avoid rambling and irrelevance.

### Task Overview:

a. **Read Nathan Yau's Blog Post**:
- Explore the blog post "One Dataset, Visualized 25 Ways" by Nathan Yau available here: [One Dataset, Visualized 25 Ways](https://flowingdata.com/2017/01/24/one-dataset-visualized-25-ways/). The post utilizes life expectancy data by country from the World Health Organization covering the years 2000 to 2015. While reviewing the 25 different visualizations, consider the following:
  - What is the structure of the data?
  - Are there correlations, relationships, distributions, outliers?
  - How does the design of each visualization affect its clarity and data density?
  - Who is the intended audience, and what questions might they have about the data?

b. **Analyze a Chosen Visualization**:
- Select one visualization from the article that particularly stands out to you and determine what specific question it answers effectively. Go beyond the obvious (e.g., "It shows life expectancy by country.") and elaborate on why this visualization is well-suited to answer this particular question.
- Compare your chosen visualization with another from the same set that you find less effective. Discuss why the second visualization does not communicate the data as effectively as the first one.

c. **Document Your Analysis**:
- Create a Word document and set up a two-column table:
  - In the **left column**, insert screenshots of both the first and second visualizations.
  - In the **right column**, answer the following questions:
    - What specific question does the first visualization answer well?
    - Why is it effective at answering that question?
    - Describe the data shown, specifying data types (Nominal - N, Ordinal - O, Quantitative - Q) and whether they are discrete (D) or continuous (C).
    - How is each data type visually encoded in the visualization?
    - Why is the second visualization less effective at answering the same question?

Ensure your document clearly contrasts the two visualizations, providing insightful analysis on the effectiveness of each in the context of the questions they aim to answer.

-----

## 3. Submit Homework on Quercus

1. Navigate to `Quercus` -> `Week 2 | HW Submission`.
2. Please submit your homework together with this week's lab and class activities until next Monday. Please use the following folder structure and compress it into a zip file:

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
Note that you should add your name to the filename using CamelCase style, e.g., ```submission_week2_JohnDoe.zip``` if your name is John Doe. The folder structure and the naming convention is mandatory and crucial for our semi-automated grading process!

**Congratulations on finishing Homework 2! See you in class!**