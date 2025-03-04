
/*
 * CountVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the actual data: perDayData
 */

class CountVis {


	constructor(_parentElement, _data) {
		this.parentElement = _parentElement;
		this.data = _data;

		this.initVis();
	}


	/*
	 * Initialize visualization (static content, e.g. SVG area or axes)
	 */

	initVis() {
		let vis = this;

		vis.margin = { top: 40, right: 0, bottom: 60, left: 60 };

		vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right,
			vis.height = 300 - vis.margin.top - vis.margin.bottom;

		// SVG drawing area
		vis.svg = d3.select("#" + vis.parentElement).append("svg")
			.attr("width", vis.width + vis.margin.left + vis.margin.right)
			.attr("height", vis.height + vis.margin.top + vis.margin.bottom)
			.append("g")
			.attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


		// Scales and axes
		vis.x = d3.scaleTime()
			.range([0, vis.width]);

		vis.y = d3.scaleLinear()
			.range([vis.height, 0]);

		vis.xAxis = d3.axisBottom()
			.scale(vis.x);

		vis.yAxis = d3.axisLeft()
			.scale(vis.y)
			.ticks(6);


		// Set domains
		let minMaxY = [0, d3.max(vis.data.map(function (d) { return d.count; }))];
		vis.y.domain(minMaxY);

		let minMaxX = d3.extent(vis.data.map(function (d) { return d.time; }));
		vis.x.domain(minMaxX);


		vis.svg.append("g")
			.attr("class", "x-axis axis")
			.attr("transform", "translate(0," + vis.height + ")");

		vis.svg.append("g")
			.attr("class", "y-axis axis");

		// Axis title
		vis.svg.append("text")
			.attr("x", -50)
			.attr("y", -8)
			.text("Votes");


		// Append a path for the area function, so that it is later behind the brush overlay
		vis.timePath = vis.svg.append("path")
			.attr("class", "area area-time");

		// Define the D3 path generator
		vis.area = d3.area()
			.curve(d3.curveStep)
			.x(function (d) {
				return vis.x(d.time);
			})
			.y0(vis.height)
			.y1(function (d) { return vis.y(d.count); });


		// Initialize brushing component

		// *** TO-DO ***


		// Append brush component here

		// *** TO-DO ***


		// (Filter, aggregate, modify data)
		vis.wrangleData();
	}



	/*
	 * Data wrangling
	 */

	wrangleData() {
		let vis = this;

		this.displayData = this.data;

		// Update the visualization
		vis.updateVis();
	}



	/*
	 * The drawing function - should use the D3 update sequence (enter, update, exit)
	 * Function parameters only needed if different kinds of updates are needed
	 */

	updateVis() {
		let vis = this;


		// Call brush component here

		// *** TO-DO ***


		// Call the area function and update the path
		// D3 uses each data point and passes it to the area function.
		// The area function translates the data into positions on the path in the SVG.
		vis.timePath
			.datum(vis.displayData)
			.attr("d", vis.area);


		// Call axis functions with the new domain 
		vis.svg.select(".x-axis").call(vis.xAxis);
		vis.svg.select(".y-axis").call(vis.yAxis);
	}
}