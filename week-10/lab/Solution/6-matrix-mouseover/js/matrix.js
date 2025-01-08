/*
 * Matrix - Object constructor function
 * @param _parentElement 					-- the HTML element in which to draw the visualization
 * @param _dataFamilyAttributes		-- attributes for the 16 Florentine families
 * @param _dataMarriage						-- marriage data stored in a symmetric adjacency matrix
 * @param _dataBusiness						-- business relations stored in a symmetric adjacency matrix
 */

class Matrix {
    constructor(parentElement, dataFamilyAttributes, dataMarriages, dataBusiness) {
        // Initialize properties from constructor parameters
        this.parentElement = parentElement;
        this.dataFamilyAttributes = dataFamilyAttributes;
        this.dataMarriages = dataMarriages;
        this.dataBusiness = dataBusiness;
        this.displayData = []; // Array to hold processed data for visualization

        // Initialize the visualization
        this.initVis();
    }

    /**
     * Sets up the visualization area, defines margins, dimensions, and creates an SVG.
     */
    initVis() {
        const vis = this; // Assign 'this' context to vis

        // Define colors for different types of relationships
        vis.colorMarriage = "#8686bf";
        vis.colorBusiness = "#fbad52";
        vis.colorNoRelation = "#ddd";

        // Set up margin and size parameters
        vis.margin = {top: 80, right: 20, bottom: 20, left: 80};
        vis.size = 600;

        vis.width = vis.size - vis.margin.left - vis.margin.right;
        vis.height = vis.size - vis.margin.top - vis.margin.bottom;

        // Define cell dimensions based on data attributes
        vis.cellPadding = vis.width / vis.dataFamilyAttributes.length / 3;
        vis.cellHeight = vis.cellPadding * 2;
        vis.cellWidth = vis.cellHeight;

        // Create the SVG container and a group element for translation
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // Call function to process and filter data
        vis.wrangleData();
    }

    /**
     * Processes and organizes data for visualization, calculating relationships for each family.
     */
    wrangleData() {
        const vis = this; // Assign 'this' context to vis

        vis.dataMarriages.forEach((d, index) => {
            const marriages = d3.sum(d);
            const businessTies = d3.sum(vis.dataBusiness[index]);
            const allRelations = marriages + businessTies;

            // Create an object representing each family with relevant relationship info
            const family = {
                "index": index,
                "name": vis.dataFamilyAttributes[index].Family,
                "wealth": +vis.dataFamilyAttributes[index].Wealth,
                "numberPriorates": +vis.dataFamilyAttributes[index].NumberPriorates,
                "marriages": marriages,
                "businessTies": businessTies,
                "allRelations": allRelations,
                "marriageValues": d,
                "businessValues": vis.dataBusiness[index]
            };

            vis.displayData.push(family);
        });

        // Trigger update to visualization with the default ordering
        vis.updateVis("index");
    }

    /**
     * Updates the visualization based on ordering type. Draws matrix cells and labels.
     * @param {string} orderingType - Type of sorting to apply to display data.
     */
    updateVis(orderingType) {
        const vis = this; // Assign 'this' context to vis

        // Sort the display data based on the specified ordering type
        vis.displayData.sort((a, b) => {
            return orderingType === "index" ? a[orderingType] - b[orderingType] : b[orderingType] - a[orderingType];
        });

        // Bind data to row groups, each representing a row in the matrix
        const dataJoin = vis.svg.selectAll(".matrix-row")
            .data(vis.displayData, d => d.name);

        // Enter selection: Create groups for new rows
        const rowsGroups = dataJoin.enter()
            .append("g")
            .attr("class", (d, i) => "matrix-row matrix-row-" + i)
            .attr("matrix-row-index", (d, i) => i);

        // Add text labels for each row (family names)
        rowsGroups.append("text")
            .attr("class", "matrix-label matrix-row-label")
            .attr("x", -10)
            .attr("y", vis.cellHeight / 2)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(d => d.name)
            .merge(dataJoin.select(".matrix-row-label")); // Merge ENTER and UPDATE selections

        // Update row positioning with animation
        rowsGroups.merge(dataJoin)
            .style('opacity', 0.5)
            .transition()
            .duration(1000)
            .style('opacity', 1)
            .attr("transform", (d, index) => "translate(0," + (vis.cellHeight + vis.cellPadding) * index + ")");

        // Draw marriage triangles
        rowsGroups.selectAll(".matrix-cell-marriage")
            .data(d => d.marriageValues)
            .enter().append("path")
            .attr("class", (d, i) => "matrix-cell matrix-cell-marriage matrix-col-" + i)
            .attr('d', (d, index) => {
                const x = (vis.cellWidth + vis.cellPadding) * index;
                const y = 0;
                return `M ${x} ${y} l ${vis.cellWidth} 0 l 0 ${vis.cellHeight} z`;
            })
            .attr("fill", d => d === 0 ? vis.colorNoRelation : vis.colorMarriage)
            .on("mouseover", function(d, index) {
                const row = +this.parentNode.getAttribute("matrix-row-index");
                vis.mouseoverCol(row, index);
            })
            .on("mouseout", () => vis.mouseoutCell());

        // Draw business triangles
        rowsGroups.selectAll(".matrix-cell-business")
            .data(d => d.businessValues)
            .enter().append("path")
            .attr("class", "matrix-cell matrix-cell-business")
            .attr('d', (d, index) => {
                const x = (vis.cellWidth + vis.cellPadding) * index;
                return `M ${x} 0 l 0 ${vis.cellHeight} l ${vis.cellWidth} 0 z`;
            })
            .attr("fill", d => d === 0 ? vis.colorNoRelation : vis.colorBusiness)
            .on("mouseover", function(d, index) {
                const row = +this.parentNode.getAttribute("matrix-row-index");
                vis.mouseoverCol(row, index);
            })
            .on("mouseout", () => vis.mouseoutCell());

        // Add column labels (family names)
        vis.svg.selectAll(".matrix-column-label")
            .data(vis.dataFamilyAttributes)
            .enter().append("text")
            .attr("class", "matrix-label matrix-column-label")
            .attr("text-anchor", "start")
            .attr("transform", (d, index) => `translate(${index * (vis.cellWidth + vis.cellPadding) + (vis.cellWidth + vis.cellPadding) / 2}, -8) rotate(270)`)
            .text(d => d.Family);
    }

    /**
     * Handles mouseover events on a specific column.
     */
    mouseoverCol(row, col) {
        const vis = this; // Assign 'this' context to vis

        d3.selectAll(".matrix-cell")
            .transition()
            .duration(300)
            .attr("fill-opacity", 0.2);

        d3.selectAll(".matrix-col-" + col)
            .transition()
            .duration(600)
            .attr("fill-opacity", 1);

        d3.selectAll(".matrix-row-" + row + " path")
            .transition()
            .duration(600)
            .attr("fill-opacity", 1);
    }

    /**
     * Resets cell opacity on mouseout.
     */
    mouseoutCell() {
        d3.selectAll(".matrix-cell")
            .transition()
            .duration(300)
            .attr("fill-opacity", 1);
    }
}
