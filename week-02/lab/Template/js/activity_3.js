updateChart();

function updateChart() {
	// Initial log to confirm the file is connected properly
	console.log('Hello from your js file. Good luck with the labold!');

	// Retrieve the full list of attractions to start the filtering process
	let attractions = attractionData;
	console.log('List of attractions:', attractions);

	/* **************************************************
     * TODO: Start by sorting the attractions array by the number of visitors in descending order.
     * 1. Use the array sort method to sort attractions based on the 'Visitors' attribute.
     *
     * TODO: Limit the array to only the top 5 attractions.
     * 2. Use array slice method to select only the top 5 elements.
     *
     * TODO: Call renderBarChart(data)
     * - 'data' should be the sorted and sliced array of JSON objects.
     * - The max. length of 'data' is 5.
     *
     * TODO: Add a dropdown menu to your HTML for selecting attraction categories.
     * 3. Implement the dropdown in index.html with options for different categories.
     *
     * TODO: Attach an event listener to the dropdown to update the chart on change.
     * 4. Use document.getElementById to access the dropdown element.
     * 5. Add an event listener that calls this function whenever the selected option changes.
     *
     * TODO: Modify this function to filter attractions based on the selected category from the dropdown before sorting and filtering.
     * 6. Retrieve the selected category from the dropdown.
     * 7. Filter the attractions array to show only attractions that match the selected category, or all if 'all' is selected.
     * **************************************************/
}
