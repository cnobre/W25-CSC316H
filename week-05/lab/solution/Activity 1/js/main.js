
// SVG drawing area
let svg = d3.select("#chart-area").append("svg")
	.attr("width", 600)
	.attr("height", 200);

// Placeholder for number of orders
let label = svg.append("text")
	.attr("x", 50)
	.attr("y", 65)
	.attr("text-anchor", "middle");

// Render visualization
function updateVisualization(orders) {

	// Update label
	label.text("Orders: " + orders.length);

	// Data join
	let circle = svg.selectAll("circle")
		.data(orders);

    // Enter
    circle.enter().append("circle")

		// Enter and Update
		.merge(circle)
		.attr("r", 20)
		.attr("cx", function(d, index){ return (index * 50) + 120})
		.attr("cy", 60)
		.attr("fill", function(d) { 
			return d.product === 'coffee' ? 'red':'blue'
		});

    // Exit
    circle.exit().remove();
}
