// DATASETS

// Global variable with 1198 pizza deliveries
console.log(deliveryData);

// Global variable with 200 customer feedbacks
console.log(feedbackData.length);


// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART

createVisualization();

function createVisualization() {

    /* ************************************************************
     *
     * TODO: (Step 2) Display Dataset Summary
     *
     * 1) Extract and display the following key figures from the data:
     *    - Number of pizza deliveries
     *    - Total number of pizzas delivered (count)
     *    - Average delivery time
     *    - Total sales in USD
     *    - Total number of feedback entries
     *    - Number of feedback entries per quality category: low, medium, high
     *
     * 2) Update the HTML elements dynamically with these statistics.
     *
     * HINT: Use document.getElementById('some_id').innerText or innerHTML to set or get the values.
     *
     * ************************************************************/


    /* ************************************************************
     *
     * TODO: (Step 3) Render the Bar Chart
     *
     * 1) Call the function renderBarChart(deliveryData) to render a bar chart.
     * 2) Ensure that you have a div-container with the ID #chart-area in your HTML.
     *
     * HINT: This function groups and counts deliveries per day and visualizes them.
     *
     * ************************************************************/


    /* ************************************************************
     *
     * TODO: (Step 4) Filter Data Before Drawing the Bar Chart
     *
     * 1) Add select boxes to the HTML to filter by 'area' and 'order type'.
     * 2) Filter deliveryData based on the selected options from the select boxes.
     * 3) Update the visualization (key figures and bar chart) based on the filtered data.
     *
     * HINT: Use document.getElementById(...).value and document.getElementById(...).value
     *       to get the selected values, then filter deliveryData accordingly.
     *
     * ************************************************************/


    /* ************************************************************
     *
     * TODO: (Step 5) Global Data Filtering
     *
     * 1) Ensure that the dataset summary (Step 2) and bar chart (Step 3) are updated
     *    whenever the filter options are changed.
     *
     * 2) Use event listeners to detect changes in the select box values and
     *    re-call createVisualization() to update both the bar chart and the dataset summary.
     *
     * HINT: Add event listeners to the select elements to call createVisualization()
     *       when a filter option is changed.
     *
     * ************************************************************/
}
