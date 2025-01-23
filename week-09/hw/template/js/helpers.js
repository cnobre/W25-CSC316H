
function updateInputValues(){

    // update Input Values
    document.getElementById('exposureValue').innerText = document.getElementById('exposureSlider').value;
    document.getElementById('trialsValue').innerText = document.getElementById('trialsSlider').value;
    document.getElementById('elementsValue').innerText = document.getElementById('elementsSlider').value;
    document.getElementById('targetSizeValue').innerText = document.getElementById('targetSizeSlider').value;
    document.getElementById('distractorSizeValue').innerText = document.getElementById('distractorSizeSlider').value;
    document.getElementById('targetRotationValue').innerText = document.getElementById('targetRotationSlider').value;
    document.getElementById('distractorRotationValue').innerText = document.getElementById('distractorRotationSlider').value;

    // FIXME: the following line will be removed in template and students will need to implement a mechanism to store updated input values in the class!
    myExperiment.grabConfigs()
}


function storeResults() {

    // create header row
    const headers = [
        "number_of_trials", "single_trial_results", "exposure", "numberOfElements",
        "targetShape", "targetColor", "targetSize", "targetRotation",
        "distractorShape", "distractorColor", "distractorSize", "distractorRotation"
    ];

    // initialize rows with headers
    const csvRows = [headers.join(",")];

    // iterate over historicalData to build rows
    trialResults.forEach(trial => {
        // create row data with colors stored without the '#' symbol
        const row = [
            trial.trials,
            `"${trial.trialArray.toString()}"`,  // wrap array in quotes for a single cell
            trial.configs.exposure,
            trial.configs.numberOfElements,
            trial.configs.targetShape,
            `${trial.configs.targetColor.replace('#', '')}`,  // remove # from color
            trial.configs.targetSize,
            trial.configs.targetRotation,
            trial.configs.distractorShape,
            `${trial.configs.distractorColor.replace('#', '')}`,  // remove # from color
            trial.configs.distractorSize,
            trial.configs.distractorRotation
        ];

        // add row to csvRows
        csvRows.push(row.join(","));
    });


    // convert csvRows to a CSV content string
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);

    // create and trigger download link
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "trial_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);  // clean up
}