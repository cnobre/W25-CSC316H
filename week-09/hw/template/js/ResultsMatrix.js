
class ResultsMatrixVis {
    constructor(parentContainer, initialData) {
        this.parentContainer = parentContainer;
        this.resultsData = initialData;

        this.symbolMap = {
            'Circle': d3.symbolCircle,
            'Square': d3.symbolSquare,
            'Triangle': d3.symbolTriangle,
            'Diamond': d3.symbolDiamond,
            'Cross': d3.symbolCross,
            'Star': d3.symbolStar
        };

        this.initVis();


    }
    initVis() {
        let vis = this;

        // margin conventions
        let size = document.getElementById(vis.parentContainer).getBoundingClientRect();

        vis.margin = {top: 30, right: 50, bottom: 80, left: 100};
        vis.width = size.width - vis.margin.left - vis.margin.right;
        vis.height = size.height - vis.margin.top - vis.margin.bottom;

        vis.svg = d3.select("#" + vis.parentContainer)
            .append('svg')
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom);

        // storing inner svg group separately because we are changing the svg height based on number of experiment groups
        vis.svgInnerGroup = vis.svg
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        vis.xAxis = vis.svgInnerGroup.append("g")
            .attr("class", "x-axis");

        // add tooltip container
        vis.tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background-color", "lightgrey")
            .style("padding", "5px")
            .style("border-radius", "5px");

        // Add x-axis label below ticks
        vis.xLabel = vis.svg.append("text")
            .attr("class", "x-axis-label")
            .attr("text-anchor", "middle")
            .attr("x", 100 + vis.width / 2)
            .attr("y", vis.height - 20)  // Positioning below the axis
            .text("Exposure Time (ms)");

        vis.wrangleData()
    }

    wrangleData() {
        let vis = this;

        // store aggregated results by configuration and exposure time
        let experimentGroupRows = {};


        // iterate over all experiment results
        vis.resultsData.forEach(experiment => {
            // create a unique key based on target and distractor configuration
            let configKey = `${experiment.configs.targetShape}-${experiment.configs.targetColor}-${experiment.configs.targetSize}-${experiment.configs.targetRotation}-${experiment.configs.distractorShape}-${experiment.configs.distractorColor}-${experiment.configs.distractorSize}-${experiment.configs.distractorRotation}-${experiment.configs.numberOfElements}`;

            let exposure = experiment.configs.exposure;

            // if this config and exposure already exist, aggregate the results
            if (experimentGroupRows[configKey] && experimentGroupRows[configKey][exposure]) {

                let group = experimentGroupRows[configKey][exposure];

                // aggregate trials and accuracy
                group.trials += experiment.trials;
                group.trialArray = group.trialArray.concat(experiment.trialArray);
                group.accuracy = group.trialArray.filter(d => d).length / group.trialArray.length;

            } else {
                // if not, create a new entry for this config and exposure
                if (!experimentGroupRows[configKey]) {
                    experimentGroupRows[configKey] = {};
                }

                experimentGroupRows[configKey][exposure] = {
                    groupName: configKey,
                    trials: experiment.trials,
                    trialArray: experiment.trialArray.slice(),  // make a copy of the trial array
                    accuracy: experiment.trialArray.filter(d => d).length / experiment.trialArray.length,
                    configs: experiment.configs,
                    exposure: exposure
                };

            }
        });

        // store number of unique groups
        vis.groupNumbers = Object.keys(experimentGroupRows).length;

        // store groups & group configs
        vis.groupConfigs = [];
        Object.keys(experimentGroupRows).forEach(configKey => {
            Object.keys(experimentGroupRows[configKey]).forEach((exposure,i) => {
                if (i=== 0){
                    let groupData = {
                        groupName: experimentGroupRows[configKey][exposure].groupName,
                        configs: {
                            numberOfElements: experimentGroupRows[configKey][exposure].configs.numberOfElements,
                            distractorColor: experimentGroupRows[configKey][exposure].configs.distractorColor,
                            distractorRotation: experimentGroupRows[configKey][exposure].configs.distractorRotation,
                            distractorShape: experimentGroupRows[configKey][exposure].configs.distractorShape,
                            distractorSize: experimentGroupRows[configKey][exposure].configs.distractorSize,
                            targetColor: experimentGroupRows[configKey][exposure].configs.targetColor,
                            targetRotation: experimentGroupRows[configKey][exposure].configs.targetRotation,
                            targetShape: experimentGroupRows[configKey][exposure].configs.targetShape,
                            targetSize: experimentGroupRows[configKey][exposure].configs.targetSize
                        }
                    }
                    vis.groupConfigs.push(groupData);

                }
            });
        });

        console.log('distinct group configs (trial results & exposure excluded!):', vis.groupConfigs);

        // flatten grouped data into an array for rendering
        vis.aggregatedResults = [];
        Object.keys(experimentGroupRows).forEach(configKey => {
            Object.keys(experimentGroupRows[configKey]).forEach(exposure => {
                vis.aggregatedResults.push(experimentGroupRows[configKey][exposure]);
            });
        });

        console.log('all experiments conducted (trial results & exposure included!):', vis.aggregatedResults)
        // update the visualization
        vis.updateVis();
    }


    updateVis() {
        let vis = this;

        // adjust height of svg based on number of groups and make sure rects are quadratic
        vis.height = vis.groupNumbers * vis.width / 10;
        vis.xLabel.attr("y", vis.height + vis.margin.bottom)
        vis.svg.attr('height', vis.height + vis.margin.top+vis.margin.bottom)
        vis.svgInnerGroup.attr('height', vis.height)

        // x scale - first, define all exposure values (0ms to 1000ms in steps of 100ms)
        const exposureValues = Array.from({ length: 10 }, (_, i) => (i+1) * 100);  // [0, 100, 200, ..., 1000]
        vis.xScale = d3.scaleBand()
            .domain(exposureValues)  // all exposure times, even missing ones
            .range([0, vis.width])
            .padding(0.0);  // small padding for x-axis (exposure)

        // y scale
        vis.yScale = d3.scaleBand()
            .domain(vis.aggregatedResults.map(d => d.groupName))
            .range([0, vis.height])
            .padding(0);

        // x axis
        vis.xAxis
            .transition()
            .duration(200)
            .attr("transform", `translate(0,${vis.height})`)
            .call(d3.axisBottom(vis.xScale)
                .tickFormat(d => `${d} ms`)  // Format tick labels with "ms"
            )
            .selectAll("text")
            .style("text-anchor", "middle");



        // y-axis with ticks but no labels
        vis.svgInnerGroup.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(vis.yScale).tickFormat(''))
            .selectAll(".tick line").attr("stroke", "#000");

        const rectWidth = vis.xScale.bandwidth();
        const rectHeight = vis.yScale.bandwidth();

        // grid lines
        vis.grid = vis.svgInnerGroup.append("g")
            .attr("class", "grid")

        vis.xLines = vis.grid
            .selectAll("x-line")
            .data(vis.xScale.domain());

        vis.xLines.enter()
            .append("line")
            .attr('class', 'x-line')
            .merge(vis.xLines)
            .attr("x1", d => vis.xScale(d))
            .attr("x2", d => vis.xScale(d))
            .attr("y1", 0)
            .attr("y2", vis.height)
            .attr("stroke", "#ccc")
            .attr("stroke-dasharray", "2,2");

        vis.yLines = vis.grid
            .selectAll("y-line")
            .data(vis.yScale.domain());

        vis.yLines.enter()
            .append("line")
            .attr('class', 'y-line')
            .merge(vis.yLines)
            .attr("x1", 0)
            .attr("x2", vis.width)
            .attr("y1", d => vis.yScale(d))
            .attr("y2", d => vis.yScale(d))
            .attr("stroke", "#ccc")
            .attr("stroke-dasharray", "2,2");

        // append a new group that will contain all y label buttons & glyphs
        vis.yLabelGroup = vis.svgInnerGroup.append('g').attr('class', 'y-labels')

        // add custom glyphs for target (left) and distractor (right) elements
        vis.ybuttons = vis.yLabelGroup.selectAll('.y-button')
            .data(vis.groupConfigs)

        vis.ybuttons.exit().remove()

        vis.ybuttons
            .enter()
            .append("rect")
            .attr('class', 'y-button')
            .merge(vis.ybuttons)
            .attr('width', 100)
            .attr('height', vis.width / 10)
            .attr('y', d => vis.yScale(d.groupName))
            .attr('x', -100)
            .attr("fill", 'rgb(231,231,231)')
            .style("stroke", 'black')
            .style("stroke-width", '0.1')
            .on('mouseover', function (event, d){
                d3.select(this)
                    .style("stroke-width", '0.5')
                    .attr("fill", 'rgb(241,241,241)')

            })
            .on('mouseout', function (event, d){
                d3.select(this)
                    .style("stroke-width", '0.1')
                    .attr("fill", 'rgb(231,231,231)')

            })
            .on('click', function (event, d) {
                // update form controls based on d.configs
                console.log('set configs', d.configs);

                // update sliders for exposure, trials, and elements
                document.getElementById('exposureSlider').value = d.configs.exposure;
                document.getElementById('trialsSlider').value = d.configs.trials;
                document.getElementById('elementsSlider').value = d.configs.numberOfElements;

                // update shape pickers
                document.getElementById('targetShapePicker').value = d.configs.targetShape;
                document.getElementById('distractorShapePicker').value = d.configs.distractorShape;

                // update color pickers
                document.getElementById('targetColorPicker').value = d.configs.targetColor;
                document.getElementById('distractorColorPicker').value = d.configs.distractorColor;

                // update rotation sliders
                document.getElementById('targetRotationSlider').value = d.configs.targetRotation;
                document.getElementById('distractorRotationSlider').value = d.configs.distractorRotation;

                // update size sliders
                document.getElementById('targetSizeSlider').value = d.configs.targetSize;
                document.getElementById('distractorSizeSlider').value = d.configs.distractorSize;

                // update visible span elements for rotation and size values
                document.getElementById('targetRotationValue').textContent = d.configs.targetRotation;
                document.getElementById('distractorRotationValue').textContent = d.configs.distractorRotation;
                document.getElementById('targetSizeValue').textContent = d.configs.targetSize;
                document.getElementById('distractorSizeValue').textContent = d.configs.distractorSize;

                // update visible span elements for exposure, trials, and elements
                document.getElementById('exposureValue').textContent = d.configs.exposure;
                document.getElementById('trialsValue').textContent = d.configs.trials;
                document.getElementById('elementsValue').textContent = d.configs.numberOfElements;

                myExperiment.grabConfigs()
            });

        // left glyph
        vis.leftGlyphs = vis.yLabelGroup.selectAll('.glyphLeft')
            .data(vis.groupConfigs);

        vis.leftGlyphs.exit().remove();

        vis.leftGlyphs
            .enter()
            .append("path")
            .attr("class", "glyphLeft")
            .merge(vis.leftGlyphs)
            .attr("transform", d => `translate(-80, ${vis.yScale(d.groupName) + vis.yScale.bandwidth() / 2}) rotate(${d.configs.targetRotation})`)
            .attr("d", d => d3.symbol().type(vis.symbolMap[d.configs.targetShape]).size(d.configs.targetSize * 10)())
            .attr("fill", d => d.configs.targetColor);

        vis.svgInnerGroup.selectAll()
            .data(vis.aggregatedResults)
            .enter()
            .append("path")
            .attr("class", "glyphRight")
            .attr("transform", d => `translate(-20, ${vis.yScale(d.groupName) + vis.yScale.bandwidth() / 2}) rotate(${d.configs.distractorRotation})`)
            .attr("d", d => d3.symbol().type(vis.symbolMap[d.configs.distractorShape]).size(d.configs.distractorSize * 10)())
            .attr("fill", d => d.configs.distractorColor);

        // vs. text
        vis.svgInnerGroup.selectAll()
            .data(vis.groupConfigs)
            .enter()
            .append("text")
            .attr('class', 'vs-text')
            .attr('y', d => vis.yScale(d.groupName) + vis.yScale.bandwidth() / 2 + 5)
            .attr('x', -50)
            .attr('text-anchor', 'middle')
            .html(d => `vs.`);

        vis.svgInnerGroup.selectAll()
            .data(vis.groupConfigs)
            .enter()
            .append("text")
            .attr('class', 'tiny-text')
            .attr('y', d => vis.yScale(d.groupName) + vis.yScale.bandwidth() / 4)
            .attr('x', -20)
            .attr('text-anchor', 'middle')
            .html(d => `${d.configs.numberOfElements}x`);



        // color scale from red to white to green
        const colorScale = d3.scaleDiverging()
            .domain([0, 0.5, 1])
            .range(['#fc8d59', '#ffffbf', '#99d594']);

        // draw matrix cells with tooltip
        vis.tiles = vis.svgInnerGroup.selectAll(".cell")
            .data(vis.aggregatedResults)

        vis.tiles.exit().remove()

        vis.tiles
            .enter()
            .append("rect")
            .attr("class", "cell")
            .merge(vis.tiles)
            .attr("x", d => vis.xScale(d.exposure))
            .attr("y", 0)
            .attr("width", rectWidth)
            .attr("height", rectHeight)
            .attr("fill", d => colorScale(d.accuracy))
            .attr("stroke", "#000")
            .attr("stroke-width", 0.5)
            .on('mouseover', function (event, d) {
                // show tooltip on hover
                vis.tooltip.style("opacity", .9);
                vis.tooltip.html(`
                    <b>${d.trials} trials</b> <br>
                    Accuracy: ${Math.round(d.accuracy * 100)}%<br>
                    Exposure: ${d.exposure}ms<br>
                    `
                )
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");

                d3.select(this)
                    .attr('stroke-width', 2)
            })
            .on('mouseout', function (d) {
                // hide tooltip
                d3.select(this)
                    .attr('stroke-width', 0.5)
                vis.tooltip
                    .style("left", 0 + "px")
                    .style("top", 0 + "px")
                    .style("opacity", 0);
            })
            .transition()
            .duration(200)
            .attr("y", d => vis.yScale(d.groupName))
        ;
    }




}