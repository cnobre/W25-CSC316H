/*
 * BarChart - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the bar charts
 * @param _data						-- the dataset 'household characteristics'
 * @param _config					-- variable from the dataset (e.g. 'electricity') and title for each bar chart
 */

class BarChart {

    constructor(parentElement, data, config) {
        this.parentElement = parentElement;
        this.data = data;
        this.config = config;
        this.displayData = data;

        console.log(this.displayData);

        this.initVis();
    }

    /*
     * Initialize visualization (static content; e.g. SVG area, axes)
     */

    initVis() {
        let vis = this;

        vis.margin = {top: 20, right: 50, bottom: 20, left: 100};

        // Get width of parent element with jQuery -->  responsive webpage


        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.righ;
        vis.height = 150 - vis.margin.top - vis.margin.bottom;


        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement)
            .append("div")
            .attr("class", "barchart barchart-" + vis.config.key)
            .append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


        // Scales and axes
        vis.x = d3.scaleLinear()
            .range([0, vis.width]);

        vis.y = d3.scaleBand()
            .rangeRound([vis.height, 0])
            .paddingInner(0.2);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        vis.svg.append("g")
            .attr("class", "y-axis axis");


        // Headline
        vis.svg.append("text")
            .attr("class", "barchart-headline")
            .attr("x", -100)
            .attr("y", -10)
            .attr("dy", ".35em")
            .text(vis.config.title);


        // (Filter, aggregate, modify data)
        vis.wrangleData();
    }


    /*
     * Data wrangling
     */

    wrangleData() {
        let vis = this;

        // Group data by key variable (e.g. 'electricity') and count leaves
        let nestedData = d3.rollup(vis.displayData, leaves => leaves.length, d => d[vis.config.key]);

        vis.nestedData = Array.from(nestedData, ([key, value]) => ({key, value}))

        console.log(vis.nestedData)
        // Sort columns descending
        vis.nestedData.sort(function (a, b) {
            return a.value - b.value;
        })

        console.log(vis.nestedData);

        // Update the visualization
        vis.updateVis();
    }

    /*
     * The drawing function - should use the D3 update sequence (enter, update, exit)
     */

    updateVis() {
        var vis = this;

        // Update domain
        vis.y.domain(vis.nestedData.map(function (d) {
            return d.key;
        }));
        vis.x.domain([0, d3.max(vis.nestedData, function (d) {
            return d.value;
        })]);


        // Draw rectangles
        let bars = vis.svg.selectAll(".bar")
            .data(vis.nestedData);

        bars.enter().append("rect")
            .attr("class", "bar")

            .merge(bars)
            .transition()
            .attr("x", 0)
            .attr("width", function (d) {
                return vis.x(d.value);
            })
            .attr("y", function (d) {
                return vis.y(d.key);
            })
            .attr("height", function (d) {
                return vis.y.bandwidth();
            });

        bars.exit().remove();


        // Draw labels
        let barLabels = vis.svg.selectAll(".bar-label")
            .data(vis.nestedData);

        barLabels.enter().append("text")
            .attr("class", "bar-label")

            .merge(barLabels)
            .transition()
            .attr("x", function (d) {
                return vis.x(d.value) + 5;
            })
            .attr("y", function (d) {
                return vis.y(d.key) + vis.y.bandwidth() / 2;
            })
            .attr("dy", ".35em")
            .text(function (d) {
                return d.value;
            });

        barLabels.exit().remove();


        // Update the y-axis
        vis.svg.select(".y-axis").call(vis.yAxis);
    }

    /*
     * Filter data when the user changes the selection
     * Example for brushRegion: 07/16/2016 to 07/28/2016
     */

    selectionChanged(brushDomain) {
        let vis = this;

        // Filter data accordingly without changing the original data
        vis.displayData = vis.data.filter(function (d) {
            return d.date >= brushDomain[0] && d.date <= brushDomain[1];
        });

        // Update the visualization
        vis.wrangleData();
    }

} 
