
// Path to local dataset
let url = "data/buildings.csv";

// Append SVG drawing space (500 x 500 px) -> no margin conventions expected, yet
let svg = d3.select("#chart-area").append("svg")
	.attr("width", 500)
	.attr("height", 800);

// load data -> using promises
d3.csv(url, (row) => {
	// convert
	row.height_m = + row.height_m;
	row.height_px = + row.height_px;
	return row
}).then( (data) => {
	// check out the data
	console.log(data)

	// call updateBarChart
	drawBarChart(data);
})

function drawBarChart(data){

	// Sort dataset descending by building height
	data = data.sort(function(a,b){
		return b.height_m - a.height_m;
	});

	// Add bars (+ event listener)
	svg.selectAll("rect.building-name")
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("fill", "#0a085c")
		.attr("width", d => d.height_px)
		.attr("height", 34)
		.attr("x", 185)
		.attr("y", (d, index) => index * 40)
		.on("click", function(event, d){
			console.log('clicked', event, d)
			setBuildingContent(d);
		});

	// Add labels: building name (+ event listener)
	svg.selectAll("text.building-name")
		.data(data)
		.enter()
		.append("text")
		.text(d => d.building)
		.attr("class", "building-name")
		.attr("x", 170)
		.attr("y", (d, index) => index * 40 + 20)
		.on("click", function(event, d){
			console.log('clicked', event, d)
			setBuildingContent(d);
		});

	// Add labels: building height
	svg.selectAll("text.building-height")
		.data(data)
		.enter()
		.append("text")
		.text(function(d){ return d.height_m; })
		.attr("class", "building-height")
		.attr("x", function(d){
			return d.height_px + 175;
		})
		.attr("y", (d, index) => index * 40 + 20)

	// Add a single label to show the height unit
	svg.append("text")
		.text("→ Building height specified in meters (m)")
		.style("text-anchor", "start")
		.style("font-style", "italic")
		.attr("fill", "#888")
		.attr("y", 610)
		.attr("x", 10);

}

// Update the DOM tree (with jQuery) if the user selects a building
function setBuildingContent(d) {
	
	// Set image
	document.getElementById('building-image').innerHTML = '<img src="img/' + d.image + '" />';

	// Iterate over all building attributes and display the result
	let buildingAttributes = ["building", "height_m", "country", "city", "floors", "completed"];

	buildingAttributes.forEach(function(i){
		document.getElementById('building-'+i).innerText = d[i]
	});
	document.getElementById('building-wikipedia').innerHTML = '&raquo; <a href="https://en.wikipedia.org/wiki/' + escape(d.building) + '" target="_blank">Read more on Wikipedia</a>';

	// Display the building details (default: hidden)
	document.getElementById('building-card').style.display = 'block';
}