updateChart();

function updateChart() {
	// Fetching the current list of attractions from the dataset
	let attractions = attractionData;

	// TODO: Retrieve the selected category from the dropdown
	// Access the dropdown element and get the currently selected category
	let attractionCategoryElement = document.getElementById("attraction-category");
	let attractionCategory = attractionCategoryElement.value;

	// TODO: Filter the attractions array if a specific category is selected
	// Filter attractions to include only those that match the selected category, unless 'all' is selected
	if(attractionCategory !== "all") {
		attractions = attractions.filter((row, index) => {
			return row.Category === attractionCategory;
		});
	}

	// TODO: Sort the attractions by visitor numbers in descending order
	// Sort the possibly filtered list of attractions based on the number of visitors
	let sortedAttractions = attractions.sort((a, b) => {
		return b.Visitors - a.Visitors;
	});

	// TODO: Limit the result to the top 5 attractions
	// Slice the sorted array to get only the top 5 attractions for display
	let topAttractions = sortedAttractions.filter( (row, index) => {
		return index < 5;
	});

	// Alternative solution:
	// let topAttractions = sortedAttractions.slice(0, 5);

	// TODO: Call renderBarChart to update the chart with new data
	// Render the bar chart using the top 5 attractions
	renderBarChart(topAttractions);
}
