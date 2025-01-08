/*
 * StackedAreaChart - ES6 Class
 * @param  parentElement 	-- the HTML element in which to draw the visualization
 * @param  data             -- the data the that's provided initially
 * @param  displayData      -- the data that will be used finally (which might vary based on the selection)
 *
 * @param  focus            -- a switch that indicates the current mode (focus or stacked overview)
 * @param  selectedIndex    -- a global 'variable' inside the class that keeps track of the index of the selected area
 */

class StackedAreaChart {

    // constructor method to initialize StackedAreaChart object
    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        this.focus = false;
        this.selectedIndex = 0

        let colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a'];

        // grab all the keys from the key value pairs in data (filter out 'year' ) to get a list of categories
        this.dataCategories = Object.keys(this.data[0]).filter(d => d != "Year")

        // prepare colors for range
        let colorArray = this.dataCategories.map((d, i) => {
            return colors[i % 10]
        })
        // Set ordinal color scale
        this.colorScale = d3.scaleOrdinal()
            .domain(this.dataCategories)
            .range(colorArray);
    }

    /*
     * Method that initializes the visualization (static content, e.g. SVG area or axes)
     */
    initVis() {
        let vis = this;

        vis.margin = {top: 40, right: 40, bottom: 60, left: 40};

        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;


        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // Overlay with path clipping
        vis.svg.append("defs").append("clipPath")
            .attr("id", "clip")

            .append("rect")
            .attr("width", vis.width)
            .attr("height", vis.height);

        // Scales and axes
        vis.x = d3.scaleTime()
            .range([0, vis.width])
            .domain(d3.extent(vis.data, d => d.Year));

        vis.y = d3.scaleLinear()
            .range([vis.height, 0]);

        vis.xAxis = d3.axisBottom()
            .scale(vis.x);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")");

        vis.svg.append("g")
            .attr("class", "y-axis axis");


        // Stack data
        vis.stackedData = d3.stack().keys(vis.dataCategories)(vis.data);

        console.log('stacked', vis.stackedData)

        // Stacked area layout
        vis.area = d3.area()
            .curve(d3.curveCardinal)
            .x(function (d) {
                return vis.x(d.data.Year);
            })
            .y0(function (d) {
                return vis.y(d[0]);
            })
            .y1(function (d) {
                return vis.y(d[1]);
            });

        // Basic area layout
        vis.basicArea = d3.area()
            .x(function (d) {
                return vis.x(d.data.Year);
            })
            .y0(vis.height)
            .y1(function (d) {
                return vis.y(d[1] - d[0]);
            });


        // Tooltip placeholder
        vis.tooltip = vis.svg.append("text")
            .attr("class", "focus")
            .attr("x", 20)
            .attr("y", 0)
            .attr("dy", ".35em");


        // (Filter, aggregate, modify data)
        vis.wrangleData();
    }

    /*
     * Data wrangling
     */
    wrangleData() {
        let vis = this;

        // if vis.focus is an empty string
        if (vis.focus) {

            console.log("Applying filter " + vis.filter + " at " + vis.filter);
            vis.displayData = [vis.stackedData[vis.selectedIndex]];
        } else {
            vis.displayData = vis.stackedData;
        }

        // Update the visualization
        vis.updateVis();
    }

    /*
     * The drawing function - should use the D3 update sequence (enter, update, exit)
     * Function parameters only needed if different kinds of updates are needed
     */
    updateVis() {
        let vis = this;

        // Update domain
        vis.y.domain([0, d3.max(vis.displayData, function (d) {
            return d3.max(d, function (e) {
                if (vis.focus) {
                    return e[1] - e[0];
                } else {
                    return e[1];
                }
            });
        })
        ]);

        // Draw the layers
        let categories = vis.svg.selectAll(".area")
            .data(vis.displayData);

        categories.enter().append("path")
            .attr("class", "area")
            .merge(categories)
            .style("fill", d => {
                return vis.colorScale(d)
            })
            .attr("d", d => {
                if (vis.focus) {
                    return vis.basicArea(d)
                } else {
                    return vis.area(d)
                }
            })
            .on("click", function (event, d) {

                // set filter
                vis.filter = vis.dataCategories[d.index]

                // updating focus
                vis.focus ? vis.focus = false : vis.focus = true

                // lastly, call wangleData
                vis.wrangleData();
            })
            .on("mouseover", function (event, d) {
                // always
                vis.selectedIndex = d.index
                // update tooltip text
                vis.tooltip.text(vis.dataCategories[d.index]);
            })
            .on("mouseout", function (d) {
                // empty tooltip
                vis.tooltip.text("");
            });

        categories.exit().remove();

        // Call axis functions with the new domain
        vis.svg.select(".x-axis").call(vis.xAxis);
        vis.svg.select(".y-axis").call(vis.yAxis);
    }
}