
/*
 * AreaChart - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the area chart
 * @param _data						-- the dataset 'household characteristics'
 */


 class AreaChart {

	constructor(parentElement, data) {
		this.parentElement = parentElement;
		this.data = data;
		this.displayData = [];

		this.initVis();


 } 


/*
 * Initialize visualization (static content; e.g. SVG area, axes, brush component)
 */

initVis(){
	let vis = this;

	vis.margin = { top: 20, right: 10, bottom: 20, left: 40 };

	// Get width of parent element with jQuery --> responsive webpage
	vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right,
	vis.height = 250 - vis.margin.top - vis.margin.bottom;


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

	vis.yAxis = d3.axisLeft()
			.scale(vis.y);

	vis.xAxis = d3.axisBottom()
			.scale(vis.x)
			.ticks(6);

	vis.svg.append("g")
			.attr("class", "y-axis axis");

	vis.svg.append("g")
			.attr("class", "x-axis axis")
			.attr("transform", "translate(0," + vis.height + ")");


	// Append a path for the area function, so that it is later behind the brush overlay
	vis.timePath = vis.svg.append("path")
			.attr("class", "area");
 

	// Initialize brushing component
	vis.brush = d3.brushX()
        .extent([[0, 0], [vis.width, vis.height]])
			.on("brush", brushed);

	// Append brush component here
	/*
	vis.svg.append("g")
			.attr("class", "brush")
			.call(vis.brush)
		.selectAll('rect')
			.attr("y", -1)
			.attr("height", vis.height);
*/
    vis.svg.append("g")
        .attr("class", "x brush")
        .call(vis.brush)
        .selectAll("rect")
        .attr("y", d=> {console.log('this', this); return -6})
        .attr("height", vis.height + 7);

	// (Filter, aggregate, modify data)
	vis.wrangleData();
}


/*
 * Data wrangling
 */

wrangleData(){
	let vis = this;

	// Group data by date and count survey results for each day
	let displayData = d3.rollup(vis.data,leaves=> leaves.length, d=>d.survey);

	vis.displayData  = Array.from(displayData, ([key, value]) => ({key, value}))


	// Convert key (= date) from string into a date object
	vis.displayData.forEach(function(d){
		d.date = parseDate(d.key);
	});

	// Sort data by day
	vis.displayData.sort(function(a,b){
		return a.date - b.date;
	})

	// Update the visualization
	vis.updateVis();
}


/*
 * The drawing function
 */

updateVis(){
	let vis = this;

	// Update domain
	vis.x.domain(d3.extent(vis.displayData, function(d) { return d.date; }));
	vis.y.domain([0, d3.max(vis.displayData, function(d) { return d.value; })]);


	// D3 area path generator
	vis.area = d3.area()
			.curve(d3.curveCardinal)
			.x(function(d) { return vis.x(d.date); })
			.y0(vis.height)
			.y1(function(d) { return vis.y(d.value); });


	// Call the area function and update the path
	// D3 uses each data point and passes it to the area function. The area function translates the data into positions on the path in the SVG.
	vis.timePath
			.datum(vis.displayData)
			.attr("d", vis.area);


	// Update axes
	vis.svg.select(".y-axis").call(vis.yAxis);
	vis.svg.select(".x-axis").call(vis.xAxis);
}
 }

