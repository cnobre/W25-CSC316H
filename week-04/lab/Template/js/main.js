
// SVG Size
let width = 700,
	height = 500;

// Load CSV file
d3.csv("data/wealth_health_data.csv", row => {

	// console.log(row)
	// TODO: convert values where necessary in this callback (d3.csv reads the csv line by line. In the callback,
	//  you have access to each line (or row) represented as a js object with key value pairs. (i.e. a dictionary).
	return row;
}).then( data => {
	// Analyze the dataset in the web console
	console.log(data);
	console.log("Countries: " + data.length)

	// TODO: sort the data
	// TODO: Call your separate drawing function here, i.e. within the .then() method's callback function

});

// TODO: create a separate function that is in charge of drawing the data, which means it takes the sorted data as an argument

// function drawChart() {
//
// }


// let promiseObject = d3.csv("data/wealth_health_data.csv")

// console.log(promiseObject)