

/*
    class that
 */

class Experiment {
    constructor(parentContainer) {
        this.parentContainer = parentContainer;
        this.currentExperimentTrialResultArray = [];
        this.initVis();
    }

    initVis() {
        let vis = this;

        // margin conventions
        let size = document.getElementById(vis.parentContainer).getBoundingClientRect();

        vis.margin = { top: 30, right: 30, bottom: 30, left: 30 };
        vis.width = size.width - vis.margin.left - vis.margin.right;
        vis.height = size.height - vis.margin.top - vis.margin.bottom;

        vis.svg = d3.select(`#${vis.parentContainer}`)
            .append('svg')
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // set up x and y scale - in this case, including the domain
        vis.x = d3.scaleLinear()
            .range([0, vis.width])
            .domain([-1, 1]); // we know that domain will be between -1 and 1

        vis.y = d3.scaleLinear()
            .range([vis.height,0])
            .domain([-1, 1]); // we know that domain will be between -1 and 1

        // grid lines for test
        vis.gridLines = vis.svg.append("g")

        vis.gridLines.append("line")
            .attr("x1", vis.x(-1))
            .attr("y1", vis.y(0))
            .attr("x2", vis.x(1))
            .attr("y2", vis.y(0))
            .attr("stroke", "gray");

        vis.gridLines.append("line")
            .attr("x1", vis.x(0))
            .attr("y1", vis.y(-1))
            .attr("x2", vis.x(0))
            .attr("y2", vis.y(1))
            .attr("stroke", "gray");

        vis.grabConfigs()
    }

    grabConfigs(){
        let vis = this;

        // grab inputs
        vis.trialConfigs = {
            exposure: +document.getElementById('exposureSlider').value,             // exposure: 300,
            numberOfElements: +document.getElementById('elementsSlider').value,             // numberOfElements: 50,
            targetShape: document.getElementById('targetShapePicker').value,            // targetShape: "Star",
            targetColor: document.getElementById('targetColorPicker').value,            // targetColor: "#e99bf1",
            targetSize: +document.getElementById('targetSizeSlider').value,            // targetSize: 30
            targetRotation: document.getElementById('targetRotationSlider').value,            // targetRotation: "0",
            distractorShape: document.getElementById('distractorShapePicker').value,            // distractorShape : "Star",
            distractorColor: document.getElementById('distractorColorPicker').value, // distractorColor :"#bcd0ea",
            distractorSize: +document.getElementById('distractorSizeSlider').value,            // distractorSize : 30,
            distractorRotation: document.getElementById('distractorRotationSlider').value             // distractorRotation : "0",
        };

        // map symbol inputs to d3 symbols
        vis.symbolMap = {
            Circle: d3.symbolCircle,
            Square: d3.symbolSquare,
            Triangle: d3.symbolTriangle,
            Diamond: d3.symbolDiamond,
            Cross: d3.symbolCross,
            Star: d3.symbolStar
        };

        vis.wrangleData()
    }

    wrangleData() {
        let vis = this;

        // Generate Data
        vis.displayData = Array.from({ length: vis.trialConfigs.numberOfElements }).map((_, i) => {
            return {
                target: i === 0,  // Mark the first element as target
                x: d3.randomUniform(-1, 1)(),  // Random x between -1 and 1
                y: d3.randomUniform(-1, 1)(),  // Random y between -1 and 1
                rotate: i === 0 ? vis.trialConfigs.targetRotation : vis.trialConfigs.distractorRotation,
                size: i === 0 ? vis.trialConfigs.targetSize * 10 : vis.trialConfigs.distractorSize * 10,
                color: i === 0 ? vis.trialConfigs.targetColor : vis.trialConfigs.distractorColor,
                shape: i === 0 ? vis.symbolMap[vis.trialConfigs.targetShape] : vis.symbolMap[vis.trialConfigs.distractorShape]
            };
        });

        // Determine the correct quadrant based on the x and y values of the target element
        vis.correctQuadrant = (() => {
            let { x, y } = vis.displayData[0];  // Get the target element (first in the data)
            if (x > 0 && y > 0) return 1;  // Top-right (Quadrant 1)
            if (x < 0 && y > 0) return 2;  // Top-left (Quadrant 2)
            if (x < 0 && y < 0) return 3;  // Bottom-left (Quadrant 3)
            if (x > 0 && y < 0) return 4;  // Bottom-right (Quadrant 4)
        })();

        // Generate the quadrants explicitly
        vis.quadrants = [
            {
                // Quadrant 1 (Top-right)
                x: vis.width / 2,
                y: 0,
                width: vis.width / 2,
                height: vis.height / 2
            },
            {
                // Quadrant 2 (Top-left)
                x: 0,
                y: 0,
                width: vis.width / 2,
                height: vis.height / 2
            },
            {
                // Quadrant 3 (Bottom-left)
                x: 0,
                y: vis.height / 2,
                width: vis.width / 2,
                height: vis.height / 2
            },
            {
                // Quadrant 4 (Bottom-right)
                x: vis.width / 2,
                y: vis.height / 2,
                width: vis.width / 2,
                height: vis.height / 2
            }
        ];

        // Assign 'correct' and 'fill' based on the target element's quadrant
        vis.quadrants = vis.quadrants.map((quadrant, i) => {
            return {
                ...quadrant,
                correct: i + 1 === vis.correctQuadrant,  // Check if this is the correct quadrant
                fill: i + 1=== vis.correctQuadrant ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.10)'  // 'green' for correct, 'red' for incorrect
            };
        });

        vis.updateVis()
    }

    updateVis() {
        let vis = this;

        vis.elements = vis.svg.selectAll(".test-element")
            .data(vis.displayData);

        vis.elements.exit().remove();

        vis.elements.enter()
            .append('path')
            .attr('id', (d,i) => 'test-element-id-' + i)
            .attr('class', 'test-element')
            .merge(vis.elements)
            .attr("transform", d => `translate(${vis.x(d.x)}, ${vis.y(d.y)}) rotate(${d.rotate})`)
            .attr("fill", d => d.color)
            .attr("d", d => d3.symbol()
                .size(d.size)
                .type(d.shape)())
            // HACK: Move the first element to the top by: selecting it by ID and re-append it

            .filter((d, i) => i === 0)  // Select only the first element
            .raise();

        // vis.svg.select('#test-element-id-0').raise();
        // const firstElement = vis.svg.select('#test-element-id-0');
        // firstElement.node().parentNode.appendChild(firstElement.node());

        vis.quadrants = vis.svg.selectAll("rect")
            .data(vis.quadrants);

        vis.quadrants.enter()
            .append('rect')
            .merge(vis.quadrants)
            .attr("height", d => d.height)
            .attr("width", d => d.width)
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("fill", d => d.fill)
            .on('mouseover', function (event, d){
                d3.select(this).style('opacity', 0.5)
            })
            .on('mouseout', function (event, d){
            d3.select(this).style('opacity', 1)
        });
    }

    // Function to start the experiment
    runExperiment() {
        let vis = this;

        vis.quadrants.style('display', 'none');


        // Set up the number of trials and reset current trial data
        vis.currentExperimentTrialResultArray = [];
        vis.totalTrials = +document.getElementById('trialsSlider').value;


        console.log("starting Trial", vis.trialConfigs);

        // Show countdown only once before the first trial
        const showCountdown = () => {

            // Show white space for 1 second
            vis.elements.style('display', 'none');
            vis.quadrants.style('display', 'none');
            vis.gridLines.style('display', 'none');

            const countdownText = vis.svg.append("text")
                .attr("x", vis.width / 2)
                .attr("y", vis.height / 2)
                .attr("text-anchor", "middle")
                .attr("font-size", "48px")
                .attr("fill", "black")
                .text(' ');

            countdownText
                .transition()
                .duration(500)
                .text('starting in...')
                .transition()
                .duration(1000)
                .attr("fill", "black")
                .text('3')
                .transition()
                .duration(1000)
                .text('2')
                .transition()
                .duration(1000)
                .text('1')
                .transition()
                .duration(1000)
                .on("end", function() {
                    countdownText.remove();  // Remove countdown text after it finishes
                    runSingleTrial(0);  // Start the first trial after countdown
                });
        };

        // Function to manage each trial
        const runSingleTrial = (trialNumber) => {
            if (trialNumber >= vis.totalTrials) {

                // If all trials for a defined experiment are done, store the results globally & call matrixVis wrangleData method
                trialResults.push({
                    trials:  +document.getElementById('trialsSlider').value,
                    trialArray: vis.currentExperimentTrialResultArray,
                    configs: vis.trialConfigs
                });

                myResultsMatrixVis.resultsData = trialResults;
                myResultsMatrixVis.wrangleData();

                // draw them

                console.log("Trial finished, results stored.");
                console.log("TrialArray for finished experiment:", vis.currentExperimentTrialResultArray)

                // display
                vis.elements.style('display', 'block');
                vis.quadrants
                    .attr('fill', d=> d.fill)
                    .style('display', 'block')

                vis.gridLines.style('display', 'block');

                return;
            }

            vis.wrangleData(); // Generate new data for the current trial

            // Show white space for 1 second
            vis.elements.style('display', 'none');
            vis.quadrants.style('display', 'none');
            vis.gridLines.style('display', 'none');

            // show white space for 1 second
            setTimeout(() => {
                // Show visualization for defined exposure time
                vis.elements.style('display', 'block');

                // Show visualization for the configured exposure time
                setTimeout(() => {
                    // Hide the visualization after showing it
                    vis.elements.style('display', 'none');

                    // Show quadrants as buttons for 2000ms or until clicked
                    vis.quadrants
                        .attr("fill", 'grey')
                        .attr("rx", 5)
                        .attr("ry", 5)
                        .attr("stroke", "white")
                        .attr('stroke-width', "2px")
                        .style('display', 'block');

                    const buttonTimeout = setTimeout(() => {
                        vis.quadrants.style('display', 'none'); // Hide the quadrants after 2000ms
                        runSingleTrial(trialNumber + 1); // Move to the next trial
                    }, 2000);  // Show buttons for 2000ms

                    console.log('weve been here')
                    // Handle button clicks for correct/incorrect quadrant selection
                    vis.svg.selectAll("rect")
                        .on("click", function(event, d) {
                            clearTimeout(buttonTimeout);  // Stop the timeout if a button is clicked
                            vis.quadrants.style('display', 'none');  // Hide quadrants after click
                            if (d.correct) {
                                vis.currentExperimentTrialResultArray.push(true);  // Correct quadrant clicked
                            } else {
                                vis.currentExperimentTrialResultArray.push(false);  // Incorrect quadrant clicked
                            }
                            console.log('clicked', d)
                            runSingleTrial(trialNumber + 1);  // Move to the next trial
                        });
                }, vis.trialConfigs.exposure);

                vis.svg.selectAll("rect") .on("click", function(event, d){
                    console.log('dont do shit')
                })
            }, 1000);  // Show white space for 1 second
        };
        showCountdown();  // Show the countdown before the loop of trials is starting
    }
}

