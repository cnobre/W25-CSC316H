// make, what will later be visualization instances global variables
let areaChart, timeline;

// load data
d3.json("data/uk-household-purchases.json").then(jsonData => {

	// prepare data
	let data = prepareDataForStudents(jsonData)

	// instantiate visualization objects
	areaChart = new StackedAreaChart("stacked-area-chart", data.layers);
	timeline = new Timeline("timeline", data.years);

	// init visualizations
	timeline.initVis()
	areaChart.initVis()
})

// React to 'brushed' event and update domain (x-scale; stacked area chart) if selection is not empty
function brushed() {
	let selection = d3.brushSelection(d3.select(".brush").node());
	areaChart.x.domain(selection.map(timeline.x.invert));
	areaChart.wrangleData();
}

// helper function
function prepareDataForStudents(data){

	let parseDate = d3.timeParse("%Y");

	let preparedData = {};

	// Convert Pence Sterling (GBX) to USD and years to date objects
	preparedData.layers = data.layers.map( d => {
		for (let column in d) {
			if (d.hasOwnProperty(column) && column !== "Year") {
				d[column] = parseFloat(d[column]) * 1.481105 / 100;
			} else if(d.hasOwnProperty(column) && column === "Year") {
				d[column] = parseDate(d[column].toString());
			}
		}
	});

	//
	data.years.forEach(function(d){
		d.Expenditures = parseFloat(d.Expenditures) * 1.481105 / 100;
		d.Year = parseDate(d.Year.toString());
	});

	return data
}
