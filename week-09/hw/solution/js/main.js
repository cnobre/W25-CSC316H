

// Variables to store trial results
let trialResults = [];

// populate trialResults with historicalData
trialResults = historicalData;

// initialize test & matrix visualizations
let myResultsMatrixVis = new ResultsMatrixVis("resultsMatrixVisContainer", historicalData)

// FIXME: The following line will be removed in the template. Students will need to implement their own Experiment class
let myExperiment = new Experiment("mainVisContainer")

// FIXME: The following line will be removed in the template. Students will need to implement their own mechanism to run the trial
// Capture all current settings and run trial
function runTrial() {
    myExperiment.runExperiment()
}
