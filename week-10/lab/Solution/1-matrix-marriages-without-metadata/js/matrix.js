/*
 * Matrix - Object constructor function
 * @param _parentElement 					-- the HTML element in which to draw the visualization
 * @param _dataFamilyAttributes		-- attributes for the 16 Florentine families
 * @param _dataMarriage						-- marriage data stored in a symmetric adjacency matrix
 * @param _dataBusiness						-- business relations stored in a symmetric adjacency matrix
 */

Matrix = function (_parentElement, _dataFamilyAttributes, _dataMarriages, _dataBusiness) {
    this.parentElement = _parentElement;
    this.dataFamilyAttributes = _dataFamilyAttributes;
    this.dataMarriages = _dataMarriages;
    this.dataBusiness = _dataBusiness;
    this.displayData = [];

    this.initVis();
};


/*
 * Initialize visualization (static content; e.g. SVG area, axes)
 */

Matrix.prototype.initVis = function () {
    var vis = this;

    vis.margin = {top: 80, right: 20, bottom: 20, left: 80};

    vis.size = 600;

    vis.width = vis.size - vis.margin.left - vis.margin.right,
        vis.height = vis.size - vis.margin.top - vis.margin.bottom;

    vis.cellPadding = vis.width / vis.dataFamilyAttributes.length / 3;
    vis.cellHeight = vis.cellPadding * 2;
    vis.cellWidth = vis.cellHeight;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    // (Filter, aggregate, modify data)
    vis.wrangleData();
};


/*
 * Data wrangling
 */

Matrix.prototype.wrangleData = function () {
    var vis = this;

    vis.displayData = vis.dataMarriages;

    console.log(vis.displayData);


    // Update the visualization
    vis.updateVis();
};


/*
 * The drawing function
 */

Matrix.prototype.updateVis = function () {
    var vis = this;


    // Draw matrix rows (and y-axis labels)
    var row = vis.svg.selectAll(".matrix-row")
        .data(vis.displayData)
        .enter()
        .append("g")
        .attr("class", "matrix-row")
        .attr("transform", function (d, index) {
            return "translate(0," + (vis.cellHeight + vis.cellPadding) * index + ")";
        });

    row.append("text")
        .attr("class", "matrix-label matrix-row-label")
        .attr("x", -10)
        .attr("y", vis.cellHeight / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function (d, index) {
            return index;
        })
        .style('opacity', 1);


    console.log(row);

    // Draw marriage triangles
    var cellMarriage = row.selectAll(".matrix-cell-marriage")
        .data(function (d, i) {
            return d;
        })
        .enter().append("rect")
        .attr("class", "matrix-cell matrix-cell-marriage")
        .attr("height", vis.cellHeight)
        .attr("width", vis.cellWidth)
        .attr("x", function (d, index) {
            return (vis.cellWidth + vis.cellPadding) * index
        })
        .attr("fill", function (d) {
            return d == 0 ? "#ddd" : "#8686bf";
        });


    // Draw x-axis labels
    var columnLabel = vis.svg.selectAll(".matrix-column-label")
        .data(vis.displayData);

    columnLabel.enter().append("text")
        .attr("class", "matrix-label matrix-column-label")
        .attr("text-anchor", "middle")
        .attr("transform", function (d, i) {
            return "translate(" + (i * (vis.cellWidth + vis.cellPadding) + (vis.cellWidth) / 2) + ",-8)"
        })
        .text(function (d, i) {
            return i;
        });
};

