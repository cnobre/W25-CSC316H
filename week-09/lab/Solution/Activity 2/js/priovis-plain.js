
/*
 * CountVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the actual data 
 */

PrioVis = function(_parentElement, _data, _metaData){
	this.parentElement = _parentElement;
  this.data = _data;
  this.metaData = _metaData;
  this.displayData = []; // see data wrangling

  this.initVis();
}


/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

PrioVis.prototype.initVis = function(){
	var vis = this;

	vis.margin = { top: 20, right: 0, bottom: 60, left: 60 };

	vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right,
  vis.height = 400 - vis.margin.top - vis.margin.bottom;

  // SVG drawing area
	vis.svg = d3.select("#" + vis.parentElement).append("svg")
	    .attr("width", vis.width + vis.margin.left + vis.margin.right)
	    .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


	// Scales and axes
	vis.x = d3.scale.ordinal()
			.rangeBands([0, vis.width], .1)
			.domain(d3.range(0,15));
  
  vis.y = d3.scale.linear()
  		.range([vis.height,0]);

	vis.xAxis = d3.svg.axis()
		  .scale(vis.x)
		  .orient("bottom");

	vis.yAxis = d3.svg.axis()
	    .scale(vis.y)
	    .orient("left");

	vis.svg.append("g")
	    .attr("class", "x-axis axis")
	    .attr("transform", "translate(0," + vis.height + ")");

	vis.svg.append("g")
			.attr("class", "y-axis axis");
 

	// (Filter, aggregate, modify data)
  vis.wrangleData();
}



/*
 * Data wrangling
 */

PrioVis.prototype.wrangleData = function(){
	var vis = this;

	// Create an array of values for age 0 - 99
  var votesPerPriority = d3.range(0,15).map(function() {
		return 0;
  });

  // Iterate over each day
  vis.data.forEach(function(day){

	  // Sum all the values/votes for each age
	  d3.range(0,15).forEach(function(i){
			votesPerPriority[i] += day.prios[i];
	  });

	});

  vis.displayData = votesPerPriority;

	// Update the visualization
  vis.updateVis();
}



/*
 * The drawing function
 */

PrioVis.prototype.updateVis = function(){
	var vis = this;

	// Update domains
  vis.y.domain([0, d3.max(vis.displayData)]);

  var bars = vis.svg.selectAll(".bar")
  		.data(this.displayData)

  bars.enter().append("rect")
  		.attr("class", "bar");

  bars
	  	.attr("width", vis.x.rangeBand())
	  	.attr("height", function(d){
	  		return vis.height - vis.y(d);
	  	})
			.attr("x", function(d, index){
				return vis.x(index);
			})
			.attr("y", function(d){
				return vis.y(d);
			});

  bars.exit().remove();

	// Call axis function with the new domain 
	vis.svg.select(".x-axis").call(vis.xAxis);
	vis.svg.select(".y-axis").call(vis.yAxis);
}
