/* * * * * * * * * * * * * *
*          MapVis          *
* * * * * * * * * * * * * */


class MapVis {

    constructor(parentElement, airportData, geoData) {
        this.parentElement = parentElement;
        this.geoData = geoData;
        this.airportData = airportData;

        // define colors
        this.colors = ['#fddbc7', '#f4a582', '#d6604d', '#b2182b']

        this.initVis()
    }

    initVis() {
        let vis = this;


        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        vis.svg.append('g')
            .attr('class', 'title')
            .attr('id', 'map-title')
            .append('text')
            .text('Title for Map')
            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle');

        // add color legend
        vis.legend = vis.svg.append("g")
            .attr('class', 'legend')
            .attr('transform', `translate(${vis.width * 2.8 / 4}, ${vis.height - 20})`)

        vis.legendScale = d3.scaleLinear()
            .range([0, 160])
            .domain([0, 100])

        vis.legendAxis = d3.axisBottom()
            .scale(vis.legendScale)
            .ticks(3)

        vis.legendAxisGroup = vis.legend.append("g")
            .attr("class", "axis axis--legend");

        vis.legend.selectAll().data(vis.colors)
            .enter()
            .append('rect')
            .attr('width', 40)
            .attr('height', 20)
            .attr('x', (d, i) => i * 40)
            .attr('y', -20)
            .attr('fill', d => d)

        vis.legendAxisGroup.call(vis.legendAxis)

        // tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip')


        //d3.geoOrthographic()
        vis.rotate = [0, 0];
        vis.zoom = vis.height / 600;


        vis.projection = d3.geoOrthographic() // d3.geoStereographic()
            .translate([vis.width / 2, vis.height / 2])
            .scale(249.5 * vis.zoom) // 249.5 is default. so multiply that by your zoom
            .rotate(vis.rotate);

        // path provider
        vis.path = d3.geoPath()
            .projection(vis.projection);


        vis.svg.append("path")
            .datum(
                {type: "Sphere"}
            )
            .attr("class", "graticule")
            .attr('fill', '#ADDEFF')
            .attr("stroke", "rgba(129,129,129,0.35)")
            .attr("d", vis.path);


        vis.svg.append("path")
            .datum(d3.geoGraticule())
            .attr("class", "graticule")
            .attr('fill', '#ADDEFF')
            .attr("stroke", "rgba(129,129,129,0.35)")
            .attr("d", vis.path);


        // Convert TopoJSON to GeoJSON (target object = 'states')
        let world = topojson.feature(vis.geoData, vis.geoData.objects.countries).features

        vis.countries = vis.svg.selectAll(".country")
            .data(world)
            .enter().append("path")
            .attr('class', 'country')
            .attr("d", vis.path)


        vis.airports = vis.svg.selectAll(".airport")
            .data(vis.airportData.nodes);

        vis.airports.exit().remove();
        vis.airports.enter().append("circle")
            .attr('class', 'airport')
            .attr('cx', d => vis.projection([d.longitude, d.latitude])[0])
            .attr('cy', d => vis.projection([d.longitude, d.latitude])[1])
            .attr('r', 5)
            .attr('fill', 'black')
            .attr("opacity", function(d) {
                if (vis.onMap(d.longitude, d.latitude)) {
                    return "1";
                } else {
                    return "0";
                }
            });
        let connections = vis.svg.selectAll(".connection")
            .data(vis.airportData.links);

        connections.exit().remove();
        connections.enter().append("line")
            .attr("class", "connection")
            .attr("x1", function(d) { return vis.projection([
                vis.airportData.nodes[d.source].longitude,
                vis.airportData.nodes[d.source].latitude
            ])[0]; })
            .attr("y1", function(d) { return vis.projection([
                vis.airportData.nodes[d.source].longitude,
                vis.airportData.nodes[d.source].latitude
            ])[1]; })
            .attr("x2", function(d) { return vis.projection([
                vis.airportData.nodes[d.target].longitude,
                vis.airportData.nodes[d.target].latitude
            ])[0]; })
            .attr("y2", function(d) { return vis.projection([
                vis.airportData.nodes[d.target].longitude,
                vis.airportData.nodes[d.target].latitude
            ])[1]; })
            .attr("stroke-opacity", function(d) {
                if (vis.onMap(vis.airportData.nodes[d.target].longitude,
                        vis.airportData.nodes[d.target].latitude) &&
                    vis.onMap(vis.airportData.nodes[d.source].longitude,
                        vis.airportData.nodes[d.source].latitude)) {
                    return "0.7";
                } else {
                    return "0";
                }
            });



        //
        let m0,
            o0;


        vis.svg.call(
            d3.drag()
                .on("start", function (event) {

                    let lastRotationParams = vis.projection.rotate();
                    m0 = [event.x, event.y];
                    o0 = [-lastRotationParams[0], -lastRotationParams[1]];
                })
                .on("drag", function (event) {
                    if (m0) {
                        let m1 = [event.x, event.y],
                            o1 = [o0[0] + (m0[0] - m1[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
                        vis.projection.rotate([-o1[0], -o1[1]]);
                    }

                    // Update the map
                    vis.path = d3.geoPath().projection(vis.projection);
                    d3.selectAll(".country").attr("d", vis.path)
                    d3.selectAll(".graticule").attr("d", vis.path);

                    // BONUS
                    d3.selectAll(".airport")
                        .attr('cx', d => vis.projection([d.longitude, d.latitude])[0])
                        .attr('cy', d => vis.projection([d.longitude, d.latitude])[1])
                        .attr("fill", "black")
                        .attr("opacity", function (d) {
                            if (vis.onMap(d.longitude, d.latitude)) {
                                return "1";
                            } else {
                                return "0";
                            }
                        });

                    // BONUS
                    d3.selectAll('.connection')
                        .attr("x1", function (d) {
                            return vis.projection([vis.airportData.nodes[d.source].longitude, vis.airportData.nodes[d.source].latitude])[0];
                        })
                        .attr("y1", function (d) {
                            return vis.projection([vis.airportData.nodes[d.source].longitude, vis.airportData.nodes[d.source].latitude])[1];
                        })
                        .attr("x2", function (d) {
                            return vis.projection([vis.airportData.nodes[d.target].longitude, vis.airportData.nodes[d.target].latitude])[0];
                        })
                        .attr("y2", function (d) {
                            return vis.projection([vis.airportData.nodes[d.target].longitude, vis.airportData.nodes[d.target].latitude])[1];
                        })
                        .attr("stroke-opacity", function (d) {
                            if (vis.onMap(vis.airportData.nodes[d.target].longitude,
                                    vis.airportData.nodes[d.target].latitude) &&
                                vis.onMap(vis.airportData.nodes[d.source].longitude,
                                    vis.airportData.nodes[d.source].latitude)) {
                                return "0.7";
                            } else {
                                return "0";
                            }
                        });
                })
        );

        vis.wrangleData()
    }

    wrangleData() {
        let vis = this;

        // create random data structure with information for each land
        vis.countryInfo = {};
        vis.geoData.objects.countries.geometries.forEach(d => {
            let randomCountryValue = Math.random() * 4
            vis.countryInfo[d.properties.name] = {
                name: d.properties.name,
                category: 'category_' + Math.floor(randomCountryValue),
                color: vis.colors[Math.floor(randomCountryValue)],
                value: randomCountryValue / 4 * 100
            }
        })

        vis.updateVis()
    }


    updateVis() {
        let vis = this;

        vis.countries
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .attr("fill", 'rgba(181,0,0,0.48)')
                    .attr("stroke", 'darkred')

                vis.tooltip
                    .style("opacity", 1)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                        <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
                            <h3>${d.properties.name}<h3>
                            <h4> Name: ${vis.countryInfo[d.properties.name].name}</h4>     
                            <h4> Category: ${vis.countryInfo[d.properties.name].category}</h4>       
                            <h4> Color: ${vis.countryInfo[d.properties.name].color}</h4>   
                            <h4> Value: ${vis.countryInfo[d.properties.name].value}</h4>               
                        </div>`);

            })
            .on('mouseout', function (event, d) {
                d3.select(this)
                    .attr('fill', d => vis.countryInfo[d.properties.name].color)
                    .attr("stroke", 'transparent')

                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0 + "px")
                    .style("top", 0 + "px")
            })
            .transition()
            .duration(500)
            .attr('fill', d => vis.countryInfo[d.properties.name].color)

    }

    // BONUS -- Is the point on the map as currently shown?
    onMap(...coord) {
        // return true if the point is on the currently positioned map or false otherwise
        let vis = this;

        // Use "Great Arc" distance to determine visibility;
        // see https://en.wikipedia.org/wiki/Great-circle_distance
        // value of geoDistance is retured in radians.
        var geoangle = d3.geoDistance(
            [coord[0], coord[1]],
            [-vis.projection.rotate()[0], -vis.projection.rotate()[1]]
        );
        // an object is visible if the distance is less than pi/2
        return (geoangle <= Math.PI / 2);
    }

}