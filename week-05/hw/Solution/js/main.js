// SVG drawing area

let margin = {top: 40, right: 40, bottom: 60, left: 60};

let width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Date parser
let formatDate = d3.timeFormat("%Y");
let parseDate = d3.timeParse("%Y");

// Scales
let x = d3.scaleTime()
    .range([0, width]);

let y = d3.scaleLinear()
    .range([height, 0]);

// Axes
let xAxis = d3.axisBottom()
    .scale(x);

let yAxis = d3.axisLeft()
    .scale(y);

let xAxisGroup = svg.append("g")
    .attr("class", "x-axis axis")
    .attr("transform", "translate(0," + height + ")");

let yAxisGroup = svg.append("g")
    .attr("class", "y-axis axis");


// Line function
let linegraph = svg.append("path")
    .attr("class", "line");

let line = d3.line()
    .x(function (d) {
        return x(d.YEAR);
    })
    .y(function (d) {
        return y(d[selectedOption]);
    })
    .curve(d3.curveLinear);


// Chart data
let chartOptions = [];
chartOptions["GOALS"] = "Goals";
chartOptions["AVERAGE_GOALS"] = "Average Goals";
chartOptions["MATCHES"] = "Matches";
chartOptions["TEAMS"] = "Teams";
chartOptions["AVERAGE_ATTENDANCE"] = "Average Attendance";

// Create select box with chart options
for (let key in chartOptions) {
    d3.select("#chart-option").append("option")
        .attr("value", key)
        .text(chartOptions[key]);
}

let selectedOption = "GOALS";


// Initialize data
loadData();

// FIFA world cup
let data;

let slider;

// Load CSV file
function loadData() {
    d3.csv("data/fifa-world-cup.csv", row => {
        row.YEAR_RAW = +row.YEAR;
        row.YEAR = parseDate(row.YEAR);
        row.TEAMS = +row.TEAMS;
        row.MATCHES = +row.MATCHES;
        row.GOALS = +row.GOALS;
        row.AVERAGE_GOALS = +row.AVERAGE_GOALS;
        row.AVERAGE_ATTENDANCE = +row.AVERAGE_ATTENDANCE;
        return row
    }).then(csv => {

        // Store csv data in global variable
        data = csv;


        // Get full time period
        let originalTimePeriod = d3.extent(data, function (d) {
            return d.YEAR_RAW;
        });

        // Initialize range slider
        slider = document.getElementById("time-period-slider");

        noUiSlider.create(slider, {
            start: [originalTimePeriod[0], originalTimePeriod[1]],
            connect: true,
            behaviour: "drag",
            step: 1,
            margin: 1,
            range: {
                'min': originalTimePeriod[0],
                'max': originalTimePeriod[1]
            }

        });

        updateRangeSliderValues(originalTimePeriod);

        slider.noUiSlider.on('slide', function (values, handle) {
            updateRangeSliderValues(values);
            updateVisualization();
        });


        // Draw the visualization for the first time
        updateVisualization();
    });
}


// Render visualization
function updateVisualization() {

    // Get the selected chart option
    selectedOption = d3.select("#chart-option").property("value");

    // Get selected time period (or default values)
    let timePeriodMin = slider.noUiSlider.get()[0];
    let timePeriodMax = slider.noUiSlider.get()[1];

    let filteredData = data.filter(function (d) {
        return formatDate(d.YEAR) >= timePeriodMin && formatDate(d.YEAR) <= timePeriodMax;
    });


    // Update input domains
    x.domain(d3.extent(filteredData, function (d) {
        return d.YEAR;
    }));
    y.domain([0, d3.max(filteredData, function (d) {
        return d[selectedOption];
    })]);


    svg.select(".line")
        .transition()
        .duration(800)
        .attr("d", line(filteredData))


    // Circles (anchor points for tooltips)
    let circles = svg.selectAll(".tooltip-circle")
        .data(filteredData, keyfunc);

    circles.enter().append("circle")
        .attr("class", "tooltip-circle")
        .attr('stroke', "#1d291d")
        .merge(circles)
        .on('click', function (e, d) {
            showEdition(d);
        })
        .on('mouseover', function (e,d) {
            d3.select(this).style("fill", '#1d291d')
        })
        .on('mouseout', function (e,d) {
            d3.select(this).style("fill", '#5C865B')
        })

        .transition()
        .duration(800)
        .attr("cx", function (d) {
            return x(d.YEAR);
        })
        .attr("cy", function (d) {
            return y(d[selectedOption]);
        })
        .attr("r", 6);

    circles.exit().remove();


    // Draw axes
    xAxisGroup = svg.select(".x-axis")
        .transition()
        .duration(800)
        .call(xAxis);

    yAxisGroup = svg.select(".y-axis")
        .transition()
        .duration(800)
        .call(yAxis);
}

function keyfunc(d) {
    return d.YEAR;
}

function showEdition(d) {
    d3.select("#world-cup-edition").style("display", "block");
    d3.select("#details-edition").text(d.EDITION);
    d3.select("#details-winner").text(d.WINNER);
    d3.select("#details-matches").text(d.MATCHES);
    d3.select("#details-goals").text(d.GOALS);
    d3.select("#details-teams").text(d.TEAMS);
    d3.select("#details-avg-goals").text(d.AVERAGE_GOALS);
    d3.select("#details-attendance").text(d.AVERAGE_ATTENDANCE);
}

function updateRangeSliderValues(values) {
    document.getElementById('time-period-min').innerText = parseInt(values[0]);
    document.getElementById('time-period-max').innerText = parseInt(values[1]);
}
