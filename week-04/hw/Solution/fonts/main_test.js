// loading in data using d3.csv
let parseTime = d3.timeParse("%Y-%m-%d");

// SVG Size
let margin = {top: 50, right: 50, bottom: 50, left: 50};

let width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// callback function, needs to load data before returning result
d3.csv("data/data.csv", (row) => {
    // convert date to date object
    row.date = parseTime(row.date);
    row.population = +row.population;
    return row
})
    // then = callback function that works only when csv is loaded
    .then(function (data) {

            // assigning data and sorting
            let z_data = data;
            // console.log(z_data);

            // defining svg container
            let svg = d3.select("#area-container").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g") // everything else that sits within group is moved
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // calling functions to create webpage
            drawArea(z_data, svg);
            drawbar();
        }
    );

function drawArea(z_data, svg) {

    // creating x-axis time scale
    let x = d3.scaleTime()
        .domain(d3.extent(z_data, d => d.date))
        .range([0, width]);

    // creating x-axis
    let xAxis = d3.axisBottom()
        .scale(x)
        .tickFormat(d3.timeFormat("%b %Y"));

    // appending x-axis
    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(27," + (height) + ")")
        .attr("text-anchor", "end")
        .call(xAxis);

    // creating y-axis population scale
    let y = d3.scaleLinear()
        .domain([0, d3.max(z_data, d => d.population)])
        .range([height, 0]); // 0 should be at the top

    // creating y-axis
    let yAxis = d3.axisLeft()
        .scale(y);

    // appending y-axis
    svg.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(" + (margin.left - 22) + ", 0)")
        .call(yAxis)

    // debug
    // console.log(x('Tue Jul 30 2013 00:00:00 GMT-0700 (Pacific Daylight Time)'));
    // console.log(x(z_data[280].date))
    // console.log(y(68000));

    // AREA CHART: mapping pop data to area
    let area = d3.area()
        .x(d => x(d.date) + margin.left - 20)
        .y1(d => y(d.population))
        .y0(y(0));

    // appending to svg
    svg.append("path")
        .datum(z_data)
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", "#cce5df")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5);

    // appending title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2 - 10)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("Camp Population");

    // TOOLTIP
    // creating a tooltip group, moved around
    let tooltip = svg.append("g")
        .attr("class", "tooltips")
        .attr("display", "none")

    // append line
    tooltip.append("line")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", height);

    // append circle at the intersection
    tooltip.append("circle")
        .attr("class", "circle")
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("r", 4)

    // append date
    tooltip.append("text")
        .attr("transform", "translate(10, 10)")
        .attr("class", "date-label")
        .text();

    // append population
    tooltip.append("text")
        .attr("transform", "translate(10, 10)")
        .attr("class", "pop-label")
        .text();

    // rectangle to capture mouse movements, rectangle should never move with tooltip
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        // .attr("transform", "translate(" + margin.left + ",0)")
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function () {
            tooltip.attr("display", null);
        })
        .on("mouseout", function () {
            tooltip.attr("display", "none");
        })
        .on("mousemove",
            function mousemove(event) {

                let bisectDate = d3.bisector(d => d.date).left;

                let x_pointer = d3.pointer(event)[0],
                    x_date = x.invert(x_pointer),
                    index = bisectDate(z_data, x_date);

                svg.select(".tooltips")
                    .attr("transform", "translate(" + (x_pointer + margin.left) + ",0)");

                let numberformat = d3.format(",");

                svg.select(".pop-label")
                    .text(numberformat(z_data[index].population))
                    .attr("transform",
                    "translate(0, " +
                        (y(z_data[index].population) + 20) + ")")

                let timeformat = d3.timeFormat("%m-%d-%Y");

                svg.select(".date-label")
                    .text(timeformat(z_data[index].date))
                    .attr("transform",
                        "translate(0, " +
                        y(z_data[index].population) + ")")

                svg.select(".circle")
                    .attr("transform",
                        "translate(0, " +
                        y(z_data[index].population) + ")")

            });
}

function drawbar() {

    let svg = d3.select("#bar-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let type1 = {
        name: "Caravans",
        percent: 79.68
    }

    let type2 = {
        name: "Combination",
        percent: 10.81
    }

    let type3 = {
        name: "Tents",
        percent: 9.51
    }

    let shelters = [type1, type2, type3]
    console.log(shelters)

    // setting x scale
    let xbar = d3.scaleBand()
        .domain(shelters.map(d => d.name))
        .rangeRound([0, width]);

    // setting y scale
    let ybar = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]); // 0 should be at the top

    // creating y axis
    let yAxis = d3.axisLeft()
        .scale(ybar)
        .tickFormat(d => (d + "%"));

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(" + (margin.left - 30) + ", 0)")
        .attr("text-anchor", "end")
        // TODO: rotate
        .call(yAxis);

    // creating x axis
    let xAxis = d3.axisBottom()
        .scale(xbar);

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(20," + (height) + ")")
        .call(xAxis);

    // creating bars
    svg.selectAll("rect")
        .data(shelters) // data binding, associating with elements in sandwiches
        .enter() // circles don't exist yet, d3 applies following on all circles
        .append("rect")
        .attr("width", xbar.bandwidth() - 25)
        .attr("height", d => height - ybar(d.percent))
        .attr("fill", "palevioletred")
        .attr("x", d => xbar(d.name) + 25)
        .attr("y", d => ybar(d.percent))
        .on('mouseover', function (d, i) { // don't use arrow function so you can see actual element in console
            console.log(d, i, this)
        })

    svg.selectAll("text.percent")
        .data(shelters)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", d => xbar(d.name) + xbar.bandwidth() / 2 + 10)
        .attr("y", d => ybar(d.percent) - 10)
        .text(d => d.percent + "%");

    // appending title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2 - 10)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("Types of Shelter");

}


// TODO: fix timescale output
// TODO: area - https://www.d3-graph-gallery.com/graph/area_basic.html
// TODO: rotate x-axis
// TODO: fix margin repeats
// TODO: tweak axes positions
// TODO: style