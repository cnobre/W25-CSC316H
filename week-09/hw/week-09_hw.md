<!---
layout: labold
exclude: true
--->

&nbsp;

# Week-09 | Homework

![Preview](assets/week-09-hw-gif-showcase.gif?raw=true "D3 Projections")

---

## Introduction

In this assignment, you will build an interactive experiment focused on **preattentive processing** using visual attributes. Preattentive processing refers to the rapid detection of features in a visual field without conscious effort. This ability allows us to quickly identify a target element among distractors based on visual features like color, size, and shape. Your task is to implement an experiment interface that displays target and distractor elements, logs the user’s responses, and visualizes results from multiple trials.

---

### Scenario: Your Role in the Experiment Team

You are a new member of a research team investigating **preattentive processing** in visual perception. The team is conducting a series of experiments to understand how quickly people can spot a unique target within a field of similar distractor elements. The experiment has been set up in a standardized format based on previous studies, and your colleagues have already completed portions of the experiment infrastructure, including the **grid layout** and **results matrix** for visualizing trial outcomes.

Your primary task is to develop the main **Experiment** component, which will generate randomized elements (target and distractors), display them in timed intervals, and capture user responses. This component will integrate with the existing infrastructure, so you will not need to modify any of the surrounding template code.

---

### Background: The Experiment Setup

Your experiment will present elements in a **four-quadrant grid** to users. Each trial briefly shows a single target element among several distractors. After the elements disappear, users will select the quadrant they believe contained the target. You will program the experiment logic to:
1. Randomly generate element positions within the grid.
2. Display elements for a controlled exposure time.
3. Capture user responses and record whether they correctly identified the quadrant containing the target.

---

### Template and File Structure

To help you get started, the project template includes several files that are already set up and connected:

1. **`index.html`**: Provides the user interface controls (e.g., exposure time, element settings) and buttons to run the experiment and download results.
2. **`Experiment.js`**: You will implement this file to manage the experiment’s logic. This includes the visualization, timing, and user interaction for each trial.
3. **`ResultsMatrix.js`**: Pre-built to handle the visualization of experiment results in a matrix format, showing accuracy across multiple trials and configurations.
4. **`main.js`**: Currently initializes the results matrix and populates the trial results with the historical data; You will add to this file and initialize a new instance of the experiment class and add additional logic depending on your experiment implementation.
5. **`helpers.js`**: Provides functions for updating UI elements, such as reflecting user-configured values in the HTML sliders and dropdowns. It also contains a utility function for saving experiment results as a CSV file. Depending on your implementation, you might have to add a line or two in some of those functions.

---

### How the Files Work Together

- **`index.html`** provides an HTML grid with user controls, making it possible for users to adjust experiment parameters like **exposure time**, **target shape**, **color**, and more.
- **`Experiment.js`** will take these configurations to display the target and distractors in randomized positions, run each trial with the specified settings, and record user responses.
- **`ResultsMatrix.js`** receives trial results after each run, updating the matrix to show accuracy levels over various conditions.
- **`main.js`** links the `Experiment` and `ResultsMatrix` classes, setting up the experiment and matrix displays.
- **`helpers.js`** provides useful functions such as updating user selections that have been outsourced from `main.js` to avoid clutter. 
---


### The Experiment Cycle

In the experiment you're about to design, users will complete multiple trials, each consisting of the following cycle:

1. **Preparation Phase (1s)**:  
   A blank screen is shown to reset the user’s attention before each trial.

2. **Target Display Phase**:
  - The target element appears on the screen with distractors in randomized positions.
  - Display time is controlled by the **exposure time** setting. This determines how long elements remain visible.

3. **Selection Phase**:
  - Elements are hidden, and the four quadrants become selectable.
  - Users have 2 seconds to select the quadrant where they believe the target was located.
  - Their selection is recorded as a success (correct quadrant) or a failure (incorrect quadrant).

4. **Result Logging and Visualization**:
  - Each trial’s result is stored, and after all trials, the results matrix is updated to visualize overall accuracy across different configurations.

The above phases should be implemented sequentially in the `runExperiment` method within `Experiment.js`, using appropriate D3 and JavaScript delay functions (e.g., `setTimeout`) to manage timing.

---
### The Experiment Class

To create the core logic of the experiment, your colleagues have outlined a plan for the `Experiment` class. This class will be responsible for setting up the experimental conditions, displaying elements during trials, and logging results based on user responses. The following methods are suggested to ensure structured and efficient functionality:

#### `constructor`
- Initializes essential properties such as the `parentContainer` (where the SVG visualization will be drawn) and `trialResults` (an array to store the results of each trial).
- Sets up a method to gather configurations dynamically from the HTML controls.

#### `initVis`
- Sets up the SVG visualization area by creating an SVG element within the specified `parentContainer`, applying the required margins and dimensions.
- Defines **x** and **y** scales, which will be fixed from -1 to 1 to support a standardized positioning of elements.
- Adds a simple gridline setup to split the SVG into four quadrants, providing a clear visual structure for the experiment.

#### `grabConfigs`
- Captures user-selected values from HTML input elements, including exposure time, number of elements, target/distractor shape, color, size, and rotation.
- Maps shape selections to D3 symbols, making it easy to render different shapes for the target and distractor elements in the SVG.

#### `wrangleData`
- Generates randomized data for each element (target and distractors) for each trial.
    - Creates an array of objects with each element’s position, color, shape, size, and rotation properties.
    - Randomly positions each element within the bounds of the SVG, while identifying the quadrant that contains the target element.
- Assigns the “correct” quadrant based on the target’s position, allowing the experiment to track if the user’s response aligns with the target’s true location.

#### `updateVis`
- Binds the randomized data to the SVG elements, allowing each element to be displayed within the designated quadrant.
    - Renders target and distractor elements, styling them based on the configuration settings.
- Highlights the correct quadrant (the one containing the target element), during the setup phase pre-trial.

#### `runExperiment`
- Manages the entire cycle of the experiment, from initial countdown to final result logging.
    - **Steps**:
        1. Displays elements (target and distractors) for the set **exposure time** to create a “flash” effect.
        2. Hides elements and shows clickable quadrants, allowing users to select the quadrant where they believe the target appeared.
        3. Logs user responses (correct or incorrect), storing them in the `trialResults` array for later analysis.
    - Upon completion of all trials, stores the final results and triggers an update of the results matrix to visualize user performance across different conditions.


This structured setup should provide the foundation for creating an experiment that effectively tracks and visualizes preattentive processing accuracy.

---

## Implementation (8 points)

Your task is to build the `Experiment` class to manage all experiment aspects, from configuring elements to running trials and logging results. Below are instructions for each stage of the implementation, along with hints and suggestions. Remember, while these guidelines provide a framework, you should think creatively to solve any challenges that arise!

### Step 0: Download the [Template.zip](week-09-lab-template.zip)

### Step 1: Setting Up the `Experiment` Class

1. **Define the Constructor**:
    - Initialize key properties, including the `parentContainer` for rendering, and create an empty array, `trialResults`, to hold the outcomes of each trial.
    - Think about how you’ll capture and use configurations (like exposure time, number of elements, and target/distractor properties).

2. **Build `initVis`**:
    - Create an SVG area and set its dimensions using best practices for responsive sizing.
    - Set up **x** and **y** scales, both with a fixed domain of `[-1, 1]` to keep element positioning standardized across trials.
    - Draw simple gridlines to divide the SVG into four quadrants, each representing a clickable area for user responses.

### Step 2: Collecting Configurations with `grabConfigs`

- Retrieve values from the HTML sliders and dropdowns
- Ensure this method is called whenever configurations change, keeping the class in sync with the UI.
- check out the `symbolMap` property in the constructor of `ResultsMatrix` to understand D3 symbols. You might also want to understand how these glyphs are generated and used in the ResultsMatrix since you might want to use a similar approache when displaying the elements in the Experiment.
- Map shapes to D3 symbols so that you can easily apply user-selected shapes to SVG elements.

### Step 3: Generating Trial Data with `wrangleData`

1. **Create Randomized Elements**:
    - Use `Array.from` to generate an array of objects, each representing either a target or distractor element.
    - For each object, assign properties like **position** (random x and y values within [-1,1]), **color**, **shape**, **size**, and **rotation**.
    - Identify the “target” element explicitly to distinguish it from distractors, and assign the unique visual properties for each.

2. **Determine the Correct Quadrant**:
    - After positioning the target element, calculate which quadrant it appears in:
        - Quadrant 1: x > 0, y > 0
        - Quadrant 2: x < 0, y > 0
        - Quadrant 3: x < 0, y < 0
        - Quadrant 4: x > 0, y < 0
    - Store this quadrant as the “correct” answer for user reference.

### Step 4: Rendering with `updateVis`

- **Bind Data to SVG Elements**:
    - Bind the randomized data to SVG `path` elements and render them on the SVG, applying the correct shape, color, and size.

- **Render Quadrants**:
    - Use `rect` elements to draw each quadrant, allowing users to click on them as part of the experiment interaction.
    - Style the “correct” quadrant to highlight it for reference during setup but ensure it is either fully hidden (during the reset phase) or a grey button (during the user feedback phase).

### Step 5: Managing the Experiment Flow with `runExperiment`

1. **Initialize the Countdown**:
    - Display a brief countdown (e.g., “3, 2, 1…”) before the first trial begins. Use transitions to create a smooth effect between numbers.

2. **Run Individual Trials**:
    - For each trial:
        - Display the elements for the configured exposure time using `setTimeout`.
        - Hide elements after the exposure time has elapsed and display the clickable quadrants instead.
        - Track the user’s response by capturing which quadrant they click on and compare it to the correct quadrant.

3. **Log Results**:
    - After each trial, record whether the user clicked the correct quadrant.
    - Once all trials are complete, push the trial data (number of trials, accuracy, configurations, etc.) to `trialResults`.

4. **Visualizing Results**:
    - After logging the results, call the `wrangleData` method in the `ResultsMatrix` class to refresh the results matrix.
    - Check the matrix to see a summary of your experimental results.

---


### Hints

- **D3 Symbol Usage**: To render shapes, use d3.symbol() to dynamically apply size and shape. Please check out `ResultsMatrix.js` where this idea has already been applied.

```javascript
vis.elements.enter()
.append('path')
...
.attr("d", d => d3.symbol()
.size(d.size)
.type(d.shape)());
```
- **Delays and Timing**: To manage the timing between showing and hiding elements, use `setTimeout` to sequence each step within a trial. Nest or chain `setTimeout` calls to move smoothly from displaying elements to hiding them and finally showing clickable quadrants for user interaction. Here’s a recommended structure for handling the timing in each trial:
```javascript
// Display elements, hide them after exposure, then capture user interaction
setTimeout(() => {
// Code to show elements
setTimeout(() => {
  // Code to hide elements and show clickable quadrants
  setTimeout(() => {
    // Code to capture user response
  }, 2000);  // Time in ms for user interaction
}, exposureTime);  // Duration in ms for element exposure
}, 1000);  // Initial delay before showing elements
```

## Design Critique (2 Points)

- **Experiment Setup Evaluation (1 Point)**: Critique the experimental setup in 3-5 sentences, focusing on the overall design, including the four-quadrant layout for identifying the target. Consider what aspects of the setup might present challenges or limitations for accurate results. Think about any potential issues users might face, and suggest possible improvements.

- **Results Series Evaluation (1 Point)**: Select two experiment series (i.e., all 10 exposure levels tested with at least 10 trials per level) and compare the results. If your `Experiment` class implementation is working, configure and run your own two experiment series with different configurations. If it isn’t working, use the provided historical data. Reflect on trends observed across exposure times and configurations, considering whether these reveal insights into preattentive processing.

    - *Bonus*: Earn an additional point by running and evaluating your own two complete experiment series with different configurations, downloading them and adding both the csv file as well as a screenshot of the results matrix to the submission.

## Submit Homework in Quercus

Use the following recommended folder structure & create a single .zip file:

```
/submission_week_09_FirstnameLastname
    hw/
        css/ 		...folder with all CSS files
        js/ 		...folder with all JavaScript files
        data/ 		...filder with all data for the project, e.g. csv files, etc.
        critique/   ...folder with design critique and potentially bonus .csv and screenshot 
        [potential other folders you might have used for the project, such as a fonts or an img folder]
        index.html
            
    lab/
        css/ 		
        js/ 
        index.html
        
    class_activity/
    	[either pdf or link to gdrive that contains your running doc with class activities]
    	[latest Tableau workbook (either added here separately or within the gdrive)]
```

A few remarks based on some submissions we've seen:
*  *Please upload a single .zip file.*
*  *Please make sure to name the root folder of your submitted project submission_week_05_FirstnameLastname. We'll be starting to subtract points if you fail to do so because this will prevent us from automating the grading assignments.*
*  *When grading your project, the grader expect your project to work when simply running your index file. This means all data as well as all other files you might have used need to be part of the project submission. If a grader needs to add any additional files, such as adding a data folder with the original .csv file, we'll start subtracting points. The idea is that your submission is the equivalent of hosting the project on a live webserver that we're visiting & evaluating.*

**Congratulations on finishing this week's homework! See you in class!**
