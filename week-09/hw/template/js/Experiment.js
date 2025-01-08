/**
 * Experiment Class
 * This class manages the entire experiment, including:
 * - Initializing the visualization area for target and distractor elements
 * - Generating randomized element attributes and positioning
 * - Displaying elements, capturing user interactions, and logging trial results
 * - Running each trial in a timed sequence to simulate exposure time and response windows

 * The following methods should be implemented by students:

 * constructor: prepares the container and initializes key properties
 * - Takes a single parameter (parentContainer) that specifies the ID of the container for the SVG
 * - Defines an array to store the trial results for the current experiment

 * initVis: initializes the main SVG visualization area
 * - Creates an SVG element inside the specified container
 * - Sets margins, width, and height for the SVG based on the container’s dimensions
 * - Initializes fixed x and y scales ranging from -1 to 1
 * - Adds gridlines to represent the four quadrants

 * grabConfigs: retrieves and stores experimental configurations from HTML form inputs
 * - Collects configurations for parameters such as exposure time, number of elements, and attributes for target and distractor elements
 * - Sets up mappings for shapes to D3 symbols to facilitate element rendering in D3

 * wrangleData: generates randomized data for each element in the trial
 * - Creates an array where each object represents either a target or distractor element
 * - Randomizes each element's x and y positions within the -1 to 1 range and assigns attributes (shape, color, size, and rotation)
 * - Determines the "correct" quadrant based on the target element’s position and assigns each quadrant a property to identify it as correct or incorrect

 * updateVis: renders the elements and quadrants on the SVG
 * - Binds the data generated in wrangleData to SVG paths representing the elements
 * - Renders each element according to its assigned properties: position, shape, color, size, and rotation
 * - Highlights the correct quadrant based on trial results

 * runExperiment: controls the experiment’s trial sequence and manages timing and user interactions
 * - Initializes a countdown (3...2...1...) before trials begin
 * - Manages each trial by:
 *    1. Displaying elements for the configured exposure time
 *    2. Hiding elements and displaying clickable quadrants for user selection
 *    3. Storing the user’s response (whether correct or incorrect)
 * - After all trials are complete, appends the results to a global array (trialResults) and updates the results matrix
 */

